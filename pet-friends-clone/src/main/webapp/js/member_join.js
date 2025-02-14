import {setLoginToken} from './auth.js';

const getMemberDto = () => {
	let email = document.querySelector('#email').value;
	let password = document.querySelector('#password').value;
	let nick = document.querySelector('#nick').value;
	let phone = document.querySelector('#phone').value;
	let inviteCode = document.querySelector('#inviteCode').value;	
	
	return {
		'email': email,
		'password': password,
		'nick': nick,
		'phone': phone,
		'inviteCode': inviteCode		
	}	
}

async function memberJoin() {
	try {
		const dto = getMemberDto();
		const option = {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(dto)
		};

		const response = await fetch('/pet-friends-clone/member', option);
		const result = await response.json();
		if (result == true) {
			alert('회원등록이 완료 되었습니다.');
			setLoginToken(dto);
			location.href = 'index.html';						
		} else {
			alert('회원등록 실패');			
		}
	} catch (error) {
		console.error('error:', error);
	}
}

function agreeJoinActive(agreeJoinBtn, checkAll) {
	if (checkAll.checked) {
		agreeJoinBtn.classList.add("active");
		agreeJoinBtn.onclick = memberJoin;
		agreeJoinBtn.style.cursor = "pointer";
	} else {
		agreeJoinBtn.classList.remove("active");
		agreeJoinBtn.onclick = '';
		agreeJoinBtn.style.cursor = "default";
	}
}

document.addEventListener("DOMContentLoaded", function() {
	const checkAll = document.getElementById("checkAll");
	const terms = document.querySelectorAll(".term");
	const agreeJoinBtn = document.getElementById("agree-join-btn");

	// 전체 동의 체크 시 모든 체크박스 변경
	checkAll.addEventListener("change", function() {
		terms.forEach(term => term.checked = checkAll.checked);

		// 전체동의 확인해서 회원가입버튼 활성화 or 비활성화
		agreeJoinActive(agreeJoinBtn, checkAll);
	});

	// 개별 체크박스 변경 시 전체 동의 체크 여부 확인
	terms.forEach(term => {
		term.addEventListener("change", function() {
			checkAll.checked = [...terms].every(term => term.checked);

			// 전체동의 확인해서 회원가입버튼 활성화 or 비활성화
			agreeJoinActive(agreeJoinBtn, checkAll);
		});
	});
});