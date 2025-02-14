function setLoginToken(userDto) {
	sessionStorage.setItem("loginToken", JSON.stringify(userDto));
}

async function login() {
    let email = document.querySelector('#email').value;
	let password = document.querySelector('#password').value;

    try {
		const option = {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({"email":email, "password":password})
		};

		const response = await fetch('/pet-friends-clone/login', option);
		const dto = await response.json();
		if (response.ok) {
			setLoginToken(dto);
			alert('로그인 성공');
			location.href = 'index.html';
		} else {
			alert('로그인 실패');
		}
	} catch (error) {
		console.error('error:', error);
	}
}