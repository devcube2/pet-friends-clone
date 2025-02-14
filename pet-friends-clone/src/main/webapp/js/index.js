// TODO: 실제 사이트에서는 이렇게 고정된 배열에 넣지 않겠지만.. 할게 많아서 그냥 고정..
const path = 'resources/images/rotation/';
const images = [
    path + "1.webp", path + "2.webp", path + "3.webp", path + "4.webp",
    path + "5.webp", path + "6.webp", path + "7.webp", path + "8.webp",
    path + "9.webp", path + "10.webp", path + "11.webp", path + "12.webp",
    path + "13.webp", path + "14.webp", path + "15.webp", path + "16.webp",
    path + "17.webp", path + "18.webp", path + "19.webp", path + "20.webp"
];

// 메인쇼핑 슬라이드 화면 구현 관련 전역변수
let currentIndex = 0;
const interval = 3000; // 3초 간격 이미지 슬라이드
let rotateSlideTimerList = [];

function getLoginToken() {
	return JSON.parse(sessionStorage.getItem("loginToken"));
}

// HTML-CSS 모든 요소들이 다 로딩된 후 호출되는 이벤트
document.addEventListener("DOMContentLoaded", function () {
    // 상단 네비게이터 메뉴 클릭시 하이라이트
    navTopActive();

    // 첫 슬라이드 이미지 세팅
    const imgElement = document.getElementById("slideImage");
    imgElement.src = images[0];

    // 카테고리 쇼핑 네비게이터 메뉴 클릭시 하이라이트 기능
    navCategoryActive();

	// 로그인 상태에 따라서 푸터 HTML 교체
	const loginElement = document.getElementById("login-join");
	const dto = getLoginToken();
	if (dto != null) {
		//console.log(dto.email);
		//console.log(dto.password);
		//console.log(dto.nick);
		//console.log(dto.phone);
		//console.log(dto.inviteCode);
		//console.log(dto.address);
		loginElement.innerHTML = `
			<a href="my_info.html" class="text-center" onclick="javascript:footerMenuHighlight(4)">
				<img src="resources/images/main/icons/footer/마이펫프.png" class="icon24x24">
				<p class="font-10 bold">마이펫프</p>
			</a>
		`;
	} else {
		loginElement.innerHTML = `
			<a href="login.html" class="text-center">
				<img src="resources/images/main/icons/footer/로그인회원가입.png" class="icon24x24">
				<p class="font-10 bold">로그인/가입</p>
			</a>
		`;
	}
});

/*
 *   네비게이터 액티브 아이템 세팅 구현
 */
function setActiveClassTag(element) {
    const listItems = document.querySelectorAll(element);
    let activeItem = listItems[0]; // 첫 active 요소 지정

    activeItem.classList.add("active");

    listItems.forEach((li) => {
        li.addEventListener("click", function () { // 요소마다 click 이벤트를 넣어준다.
            if (activeItem) { // 현재 active 상태인 요소가 있다면 active css 제거
                activeItem.classList.remove("active");
            }

            this.classList.add("active"); // 새로 클릭된 요소에 active css 적용
            activeItem = this; // 현재 active 된 item 은 클릭된 자신이므로 activeItem 변수에 대입
        });
    });
}

// 상단 메뉴 하이라이팅
function navTopActive() {
    setActiveClassTag("#nav-ul li");
}

// 카테고리 쇼핑 하이라이팅
function navCategoryActive() {
    const buttonListItems = document.querySelectorAll("#category-main button");
    const spanListItems = document.querySelectorAll("#category-main span");

    let buttonActiveItem = buttonListItems[0];
    let spanActiveItem = spanListItems[0];

    buttonActiveItem.classList.add("active");
    spanActiveItem.classList.add("active");

    buttonListItems.forEach((element, index) => {
        // 해당 요소 클릭 이벤트시 호출 코드를 추가하는건데..
        // 코드안에 설정된 index 변수값까지 고정되는것으로 보임..
        // 즉 define 처럼 클릭할때 define 된 함수 코드가 실행되는것 같다. (index 값 잘 적용됨..)
        element.addEventListener("click", function () {
            // 기존 버튼에서 active 제거하고, 새로 클릭된 버튼에 active 추가
            buttonActiveItem.classList.remove("active");
            buttonActiveItem = this;
            buttonActiveItem.classList.add("active");

            // 기존 span 요소에서 active 제거하고, 새로 클릭된 span 에 active 추가
            // 실제 span 이 클릭된건 아니지만, 해당 버튼 하위요소로 포함되어 있기에 index 이용하여 이렇게 처리하였다.
            spanActiveItem.classList.remove("active");
            spanActiveItem = spanListItems[index];
            spanActiveItem.classList.add("active");
        });
    });
}

/*
 *   슬라이드 화면 구현
 */

// 수동 슬라이드 교체하면 빨리 넘어가는 증상이 있어서 추가
function clearAllTimer() {
    rotateSlideTimerList.forEach(id => clearTimeout(id));
    rotateSlideTimerList = [];
}

// 자동 슬라이드 함수
function rotateSlide() {
    const imgElement = document.getElementById("slideImage");

    imgElement.style.transform = "translateX(-100%)"; // 왼쪽으로 이동

    currentIndex = (currentIndex + 1) % images.length; // 다음 이미지 설정
    imgElement.src = images[currentIndex];
    imgElement.style.transition = "none"; // 애니메이션 효과 제거
    imgElement.style.transform = "translateX(100%)"; // 오른쪽으로 이동 후 리셋

    clearAllTimer(); // 타이머 겹치지 않도록 삭제

    setTimeout(() => {
        imgElement.style.transition = "transform 150ms ease-out"; // 다시 애니메이션 적용
        imgElement.style.transform = "translateX(0)"; // 원래 위치로 이동
    });

    rotateSlideTimerList.push(setTimeout(rotateSlide, interval));

    setSlideCurrentCount(currentIndex + 1);
}

// 수동 슬라이드 함수
function sliding(currentIndex, x1, x2) {
    const imgElement = document.getElementById("slideImage");

    clearAllTimer(); // 타이머 겹치지 않도록 삭제

    imgElement.style.transform = `translateX(${x1}%)`; // 원래 이미지를 이동시켜서 안보이게 한다.

    imgElement.src = images[currentIndex]; // 다음 이미지 세팅
    imgElement.style.transition = "none"; // 다음 이미지를 안보이게 하기 위해 이동시킬때 애니메이션 효과 제거
    imgElement.style.transform = `translateX(${x2}%)`; // 다음 이미지를 이동시켜서 안보이게 한다.

    setTimeout(() => {
        imgElement.style.transition = "transform 150ms ease-out"; // 다시 애니메이션 적용
        imgElement.style.transform = "translateX(0)"; // 안보이게 이동된 다음 이미지가 다시 원래 자리로 들어올때 애니메이션이 적용되어 들어오게 된다.
    });

    // 3초뒤 자동 슬라이드 재시작
    rotateSlideTimerList.push(
        setTimeout(
            () => { rotateSlideTimerList.push(setTimeout(rotateSlide, interval)); },
            interval
        )
    );

    setSlideCurrentCount(currentIndex + 1);
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length; // 다음 이미지 설정
    sliding(currentIndex, -100, 100);
}

function prevSlide() {
    if (--currentIndex < 0) currentIndex = images.length - 1; // 다음 이미지 설정
    sliding(currentIndex, 100, -100);
}

function setSlideCurrentCount(count) {
    const element = document.getElementById("slideCurrentCount");
    element.innerHTML = count;
}

/*
 *   카테고리 쇼핑 메뉴 슬라이드 구현
 */
function categoryMainSliding(category) {
    const categoryElement = document.getElementById("catogorySub");

    // 1290px 에서 절대위치로 이동이다.
    if (category == '사료') {
        categoryElement.style.transform = `translateX(0)`;
    } else if (category == '간식') {
        categoryElement.style.transform = `translateX(-440px)`;
    } else if (category == '용품') {
        categoryElement.style.transform = `translateX(-880px)`;
    }
    categoryElement.style.transition = "transform 300ms ease-out";
}

// 메인쇼핑 자동 슬라이드 시작
rotateSlideTimerList.push(setTimeout(rotateSlide, interval));