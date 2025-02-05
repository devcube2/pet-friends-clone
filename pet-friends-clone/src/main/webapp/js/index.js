// 네비게이터 메뉴 클릭시 하이라이트 기능
document.addEventListener("DOMContentLoaded", function () {
    const listItems = document.querySelectorAll("#nav-ul li");
    let activeItem = listItems[0];

    activeItem.classList.add("active");

    listItems.forEach((li) => {
        li.addEventListener("click", function () {
            if (activeItem) {
                activeItem.classList.remove("active");
            }

            this.classList.add("active");
            activeItem = this;
        });
    });
});

// 메인쇼핑 슬라이드 화면 구현
let currentIndex = -1;
const interval = 3000; // 3초 간격 이미지 슬라이드

// TODO: 실제 사이트에서는 이렇게 고정된 배열에 넣지 않겠지만.. 할게 많아서 그냥 고정..
const path = '/pet-friends-clone/src/main/resources/images/rotation/';
const images = [
    path + "1.webp", path + "2.webp", path + "3.webp", path + "4.webp",
    path + "5.webp", path + "6.webp", path + "7.webp", path + "8.webp",
    path + "9.webp", path + "10.webp", path + "11.webp", path + "12.webp",
    path + "13.webp", path + "14.webp", path + "15.webp", path + "16.webp",
    path + "17.webp", path + "18.webp", path + "19.webp", path + "20.webp"
];

let rotateSlideTimerList = [];

// 수동 슬라이드 교체하면 빨리 넘어가는 증상이 있어서 추가
function clearAllTimer() {
    rotateSlideTimerList.forEach(id => clearTimeout(id));
    rotateSlideTimerList = [];
}

// 자동 슬라이드 함수
function rotateSlide() {
    const imgElement = document.getElementById("slideImage");

    // 첫 이미지는 애니메이션 처리 안함
    if (currentIndex == -1) {
        currentIndex++; // 다음 자동 슬라이드 처리를 위해 ++
        imgElement.src = images[0];
        rotateSlideTimerList.push(setTimeout(rotateSlide, interval));
        return;
    }

    imgElement.style.transform = "translateX(-100%)"; // 왼쪽으로 이동

    currentIndex = (currentIndex + 1) % images.length; // 다음 이미지 설정
    imgElement.src = images[currentIndex];
    imgElement.style.transition = "none"; // 애니메이션 효과 제거
    imgElement.style.transform = "translateX(100%)"; // 오른쪽으로 이동 후 리셋

    setTimeout(() => {
        imgElement.style.transition = "transform 150ms ease-out"; // 다시 애니메이션 적용
        imgElement.style.transform = "translateX(0)"; // 원래 위치로 이동
    });

    rotateSlideTimerList.push(setTimeout(rotateSlide, interval));
}

// 수동 슬라이드 함수
function nextSlide() {
    const imgElement = document.getElementById("slideImage");

    clearAllTimer(); // 타이머 겹치지 않도록 삭제

    imgElement.style.transform = "translateX(-100%)"; // 왼쪽으로 이동

    currentIndex = (currentIndex + 1) % images.length; // 다음 이미지 설정
    imgElement.src = images[currentIndex];
    imgElement.style.transition = "none"; // 애니메이션 효과 제거
    imgElement.style.transform = "translateX(100%)"; // 오른쪽으로 이동 후 리셋

    setTimeout(() => {
        imgElement.style.transition = "transform 150ms ease-out"; // 다시 애니메이션 적용
        imgElement.style.transform = "translateX(0)"; // 원래 위치로 이동
    });

    // 버튼 클릭 후 3초 뒤에 자동 슬라이드 재시작
    rotateSlideTimerList.push(
        setTimeout(
            () => { rotateSlideTimerList.push(setTimeout(rotateSlide, interval)); },
            interval
        )
    );
}

rotateSlide(); // 첫 자동 슬라이드 시작