package controller;

import java.io.IOException;

import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import model.dao.DBConnectionPool;
import model.dao.ProductDao;
import model.dto.ProductDto;

@Slf4j
@WebServlet("/product/view")
public class ProductViewController extends Controller {
	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init();
		try {
			DBConnectionPool.setInstance(config);
		} catch (Exception e) {
			log.error(e.getMessage());
		}
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		log.info("[/product/view/doGet 호출]");

		try {
			String productId = req.getParameter("productId");
			if (productId == null) {
				sendBadRequestError(resp, "QueryString Argument is NULL", "productId is NULL");
				return;
			}
			
			int productIdNum = Integer.parseInt(req.getParameter("productId"));			
			
			ProductDto dto = ProductDao.getInstance().getProduct(productIdNum);
			
			send(resp, dto);
		} catch (Exception e) {
			log.error(e.getMessage());
			sendInternalError(resp, "Error", e.getMessage());
		}
	}
}