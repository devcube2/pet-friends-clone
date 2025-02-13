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
		log.info("[/member/doPost 호출]");

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

//	@Override
//	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//		log.debug("[/member/doGet 호출]");
//		
//		resp.setContentType("application/json");
//		
//		ArrayList<MemberDto> list = MemberDao.getInstance().getMemberList();
//		if (list == null) {
//			sendInternalError(resp, "Database Error", "");
//			return;
//		}
//
//		ObjectMapper mapper = new ObjectMapper();
//		mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS); // 날짜를 타임스탬프가 아닌 문자열로 직렬화
//
//		String jsonResult = mapper.writeValueAsString(list);
//
//		resp.getWriter().print(jsonResult);
//	}
//
//	@Override
//	protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//		log.debug("[/member/doPut 호출]");
//		
//		ObjectMapper mapper = new ObjectMapper();
//		MemberDto dto = mapper.readValue(req.getReader(), MemberDto.class);
//
//		int result = MemberDao.getInstance().updateMember(dto);
//		if (result <= 0) {
//			if (result == 0) sendNotFoundError(resp, "Member not found", String.valueOf(dto.custno()));
//			else if (result < 0) sendInternalError(resp, "Database process is failed", "");			
//			return;
//		}
//
//		send(resp, result);
//	}
}