package model.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import lombok.Data;

@Data
public class ErrorResponseDto {
	private int status;
	private String statusDetail;
	private String errorMsg;
	private Object errorMsgDetail;
	private String occuredTime;
	
	public ErrorResponseDto(int status, String statusDetail, String errorMsg, Object errorMsgDetail) {	
		setStatus(status);
		setStatusDetail(statusDetail);
		setErrorMsg(errorMsg);
		setErrorMsgDetail(errorMsgDetail);
		setOccuredTime();
	}
	
	public void setOccuredTime() {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		occuredTime = LocalDateTime.now().format(formatter).toString();
	}
}