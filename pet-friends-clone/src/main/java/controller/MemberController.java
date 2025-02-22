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
@WebServlet("/member")
public class MemberController extends Controller {
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
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		log.debug("[/member/doPost 호출]");

		try {
			ObjectMapper mapper = new ObjectMapper();
			MemberDto dto = mapper.readValue(req.getReader(), MemberDto.class);
			
			boolean result = MemberDao.getInstance().insertMember(dto);
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