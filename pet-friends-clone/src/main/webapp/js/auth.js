export function setLoginToken(userDto) {
	sessionStorage.setItem("loginToken", JSON.stringify(userDto));	
}

export function getLoginToken() {
	return JSON.parse(sessionStorage.getItem("loginToken"));
}