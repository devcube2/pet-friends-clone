package controller;

import java.io.IOException;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletResponse;
import model.dto.ErrorResponseDto;

public class Controller extends HttpServlet {	
	// 정상 응답 보내기
	protected void send(HttpServletResponse response, Object result) throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		
		response.setStatus(200);
		response.setContentType("application/json");		
		response.getWriter().write(mapper.writeValueAsString(result));
	}
	
	protected void send(HttpServletResponse response, Object result, ObjectMapper mapper) throws IOException {
		response.setStatus(200);
		response.setContentType("application/json");		
		response.getWriter().write(mapper.writeValueAsString(result));
	}

	// 에러 응답 생성 및 보내기
	protected void sendInternalError(HttpServletResponse response, String errorMsg, Object errorMsgDetail) throws IOException {
		ErrorResponseDto dto = new ErrorResponseDto(500, "Server Internal Error", errorMsg, errorMsgDetail);
		sendError(response, dto);
	}
	
	protected void sendNotFoundError(HttpServletResponse response, String errorMsg, Object errorMsgDetail) throws IOException {
		ErrorResponseDto dto = new ErrorResponseDto(404, "Not Found", errorMsg, errorMsgDetail);
		sendError(response, dto);
	}

	private void sendError(HttpServletResponse response, ErrorResponseDto dto) throws IOException {
		// 응답 상태 코드 설정
		response.setStatus(dto.getStatus());
		response.setContentType("application/json");

		// JSON 변환 및 응답 본문에 작성
		ObjectMapper mapper = new ObjectMapper();
		response.getWriter().write(mapper.writeValueAsString(dto));
	}
}