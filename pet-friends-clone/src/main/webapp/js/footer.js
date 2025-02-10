let activeIndex = 0;

function footerMenuHighlight(index) {
    const footerMenuList = document.querySelectorAll('footer img');
    const footerMenuDescList = document.querySelectorAll('footer p');

    if (activeIndex == index) return; // 클릭된 메뉴가 현재 활성화 메뉴와 같으면 그냥 리턴한다.

    // 이전 활성화 이미지를 비활성화 이미지로 교체
    switch (activeIndex) {
        case 0:
            footerMenuList[activeIndex].src = '../resources/images/main/icons/footer/홈.png';
            break;
        case 1:
            footerMenuList[activeIndex].src = '../resources/images/main/icons/footer/카테고리.png';
            break;
        case 2:
            footerMenuList[activeIndex].src = '../resources/images/main/icons/footer/집사생활.png';
            break;
        case 3:
            footerMenuList[activeIndex].src = '../resources/images/main/icons/footer/검색.png';
            break;
    }
    footerMenuDescList[activeIndex].classList.remove("active");

    // 클릭된 메뉴에 활성화 이미지 적용
    switch (index) {
        case 0:
            footerMenuList[index].src = '../resources/images/main/icons/footer/홈활성화.png';
            break;
        case 1:
            footerMenuList[index].src = '../resources/images/main/icons/footer/카테고리활성화.png';
            break;
        case 2:
            footerMenuList[index].src = '../resources/images/main/icons/footer/집사생활활성화.png';
            break;
        case 3:
            footerMenuList[index].src = '../resources/images/main/icons/footer/검색활성화.png';
            break;
    }
    footerMenuDescList[index].classList.add("active");

    activeIndex = index; // 활성화된 메뉴 인덱스 저장
}