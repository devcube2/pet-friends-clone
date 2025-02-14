async function login() {
    let email = document.querySelector('#email').value;
	let password = document.querySelector('#password').value;

    try {
		const option = {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(getMemberDto())
		};

		const response = await fetch('/pet-friends-clone/login', option);
		const result = await response.json();
		if (result == true) {
			alert('로그인 성공');
			location.href = 'index.html';
		} else {
			alert('로그인 실패');
		}
	} catch (error) {
		console.error('error:', error);
	}
}