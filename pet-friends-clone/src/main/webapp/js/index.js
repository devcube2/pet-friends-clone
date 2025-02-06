// TODO: 실제 사이트에서는 이렇게 고정된 배열에 넣지 않겠지만.. 할게 많아서 그냥 고정..
const path = '/pet-friends-clone/src/main/resources/images/rotation/';
const images = [
    path + "1.webp", path + "2.webp", path + "3.webp", path + "4.webp",
    path + "5.webp", path + "6.webp", path + "7.webp", path + "8.webp",
    path + "9.webp", path + "10.webp", path + "11.webp", path + "12.webp",
    path + "13.webp", path + "14.webp", path + "15.webp", path + "16.webp",
    path + "17.webp", path + "18.webp", path + "19.webp", path + "20.webp"
];

// HTML-CSS 모든 요소들이 다 로딩된 후 호출되는 이벤트
document.addEventListener("DOMContentLoaded", function () {
    // 네비게이터 메뉴 클릭시 하이라이트 기능 세팅
    const listItems = document.querySelectorAll("#nav-ul li");
    let activeItem = listItems[0]; // 처음은 HOME 버튼만 active 상태

    activeItem.classList.add("active");

    listItems.forEach((li) => {
        li.addEventListener("click", function () { // li 요소마다 click 이벤트를 넣어준다.
            if (activeItem) { // 현재 active 상태인 li 요소가 있다면 active css 제거
                activeItem.classList.remove("active");
            }

            this.classList.add("active"); // 새로 클릭된 li 요소에 active css 적용
            activeItem = this; // 현재 active 된 item 은 클릭된 자신이므로 activeItem 변수에 대입
        });
    });

    // 첫 슬라이드 이미지 세팅
    const imgElement = document.getElementById("slideImage");
    imgElement.src = images[0];
});

// 메인쇼핑 슬라이드 화면 구현
let currentIndex = 0;
const interval = 3000; // 3초 간격 이미지 슬라이드
let rotateSlideTimerList = [];

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

    imgElement.src = images[currentIndex];
    imgElement.style.transition = "none"; // 다음 이미지를 안보이게 이동시킬때 애니메이션 효과 제거
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

rotateSlideTimerList.push(setTimeout(rotateSlide, interval)); // 첫 자동 슬라이드 시작