document.addEventListener("DOMContentLoaded", function () {
    const checkAll = document.getElementById("checkAll");
    const terms = document.querySelectorAll(".term");
    const agreeJoin = document.getElementById("agree-join");

    // 전체 동의 체크 시 모든 체크박스 변경
    checkAll.addEventListener("change", function () {
        terms.forEach(term => term.checked = checkAll.checked);

        // 전체동의 확인해서 회원가입버튼 active 클래스 변경
        if (checkAll.checked) {
            agreeJoin.classList.add("active");
        } else {
            agreeJoin.classList.remove("active");
        }
    });

    // 개별 체크박스 변경 시 전체 동의 체크 여부 확인
    terms.forEach(term => {
        term.addEventListener("change", function () {
            checkAll.checked = [...terms].every(term => term.checked);

            // 전체동의 확인해서 회원가입버튼 active 클래스 변경
            if (checkAll.checked) {
                agreeJoin.classList.add("active");
            } else {
                agreeJoin.classList.remove("active");
            }
        });
    });
});