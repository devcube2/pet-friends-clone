package controller;

import java.io.IOException;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import model.dao.DBConnectionPool;
import model.dao.MemberDao;
import model.dto.MemberDto;

@Slf4j
@WebServlet("/member/address")
public class AddressController extends Controller {
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
		log.info("[/member/address/doGet 호출]");

		try {
			String email = req.getParameter("email");		
			
			if (email == null) {
				sendBadRequestError(resp, "QueryString Argument is NULL", "email is NULL");
				return;
			}
			
			String addreses = MemberDao.getInstance().getMemberAddress(email);
			
			send(resp, addreses);
		} catch (Exception e) {
			log.error(e.getMessage());
			sendInternalError(resp, "Error", e.getMessage());
		}
	}

	@Override
	protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		log.info("[/member/address/doPut 호출]");

		try {
			ObjectMapper mapper = new ObjectMapper();
			MemberDto dto = mapper.readValue(req.getReader(), MemberDto.class);
			
			boolean result = MemberDao.getInstance().updateMemberAddress(dto);
			if (!result) {
				sendInternalError(resp, "Database processing failed", "");
			} else {
				send(resp, result);
			}
		} catch (Exception e) {
			log.error(e.getMessage());
			sendInternalError(resp, "Error", e.getMessage());
		}
	}
}