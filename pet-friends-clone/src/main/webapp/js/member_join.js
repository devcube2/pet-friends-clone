async function memberJoin() {
    // TODO: 백엔드와 통신 추가
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

document.addEventListener("DOMContentLoaded", function () {
    const checkAll = document.getElementById("checkAll");
    const terms = document.querySelectorAll(".term");
    const agreeJoinBtn = document.getElementById("agree-join-btn");

    // 전체 동의 체크 시 모든 체크박스 변경
    checkAll.addEventListener("change", function () {
        terms.forEach(term => term.checked = checkAll.checked);

        // 전체동의 확인해서 회원가입버튼 활성화 or 비활성화
        agreeJoinActive(agreeJoinBtn, checkAll);
    });

    // 개별 체크박스 변경 시 전체 동의 체크 여부 확인
    terms.forEach(term => {
        term.addEventListener("change", function () {
            checkAll.checked = [...terms].every(term => term.checked);

            // 전체동의 확인해서 회원가입버튼 활성화 or 비활성화
            agreeJoinActive(agreeJoinBtn, checkAll);
        });
    });
});