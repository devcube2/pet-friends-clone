function getLoginToken() {
	return JSON.parse(sessionStorage.getItem("loginToken"));
}

function setNick() {
	let nickElement = document.querySelector('#nick');
	
	const loginUser = getLoginToken();
	
	nickElement.innerHTML = loginUser.nick;
}
setNick();