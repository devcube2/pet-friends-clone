package controller;

import java.io.IOException;
import java.util.ArrayList;

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
@WebServlet("/product/list")
public class ProductController extends Controller {
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
		log.debug("[/product/list/doGet 호출]");

		try {
			String petType = req.getParameter("petType");			
			String petCareItemCategory1 = req.getParameter("petCareItemCategory1");
			int petCareItemCategory2 = Integer.parseInt(req.getParameter("petCareItemCategory2"));

			ArrayList<ProductDto> list = ProductDao.getInstance().getProductList(new ProductDto(petType, petCareItemCategory1, petCareItemCategory2));
			
			send(resp, list);
		} catch (Exception e) {
			log.error(e.getMessage());
			sendInternalError(resp, "Error", e.getMessage());
		}
	}
}