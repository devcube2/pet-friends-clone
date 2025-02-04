function easter_egg() {
    const a = `
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡠⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⡔⠉⠒⢄⢤⢒⢖⢇⢏⢎⢇⡠⠂⠉⢢⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⡇⠀⡀⣄⠑⠷⠽⠜⠼⠜⠊⣀⠠⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⡇⢄⠐⠃⠁⠀⠀⠀⠀⠀⠈⠐⠊⢠⠀⠇⠀⠀⠀반려동물 1등 쇼핑몰⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢠⠁⠀⠀⠀⠀⢠⡄⢀⡀⢠⡄⠀⠀⠀⠀⣧⠀⠀⠀펫프렌즈 입니다.
⠀⠀⠀⠀⠀⢙⠀⠀⠀⠀⠀ ⢢⡨⢆⠔⠀⠀⠀⠀⠀⡙⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢸⠀⠀⠷⠷⠀⠀⠀⠀⠀⠀ ⠷⠷⠀⠀⣧⠀⢠⠤⡀⠄⢄⢄⡠⢤⢄⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠘⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠇⠀⡌⠕⠀⠀⢣⢣⠣⡣⡸⡀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⡎⠀⠀⢄⡀⠀⠀⡀⠀⠀⢀⡠⠀⠀⠘⡄⣰⣁⠀⢀⠀⢀ ⣉⠪⠪⢓⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⡔⠂⢆⡇⠀⠀⠀⠈⠑⠢⢄⠕⠈⠁⠀⠀⠀⠀⡇⢖⠐⢘⣨⣮⠘⠐⠐⠂⠀⠐⣅⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢣⡀⠰⡃⠀⠐⠢⢄⣀⢐⢭⣂⢀⡠⠔⠘⠀⢠⠃⠘⣔⢇⢠⠞⠀⠀⠀⠀⠀⠀⠠⡀⠀⡔⠦⡄⠀
⠀⠀⠀⢇⡀⠀⠱⡀⠀⠐⠠⢀⠡⠀⠄⡁⠐⡈⠀⠀⡘⠀⢸⡰⠁⠀⠀⠀⠀⠀⠀⡔⠂⠀⢣⠀⡇⠧⢇⠀
⠀⠀⠀⠀⠘⠔⠢⡱⡀⠀⠈⠄⠐⡈⠠⢀⠡⠐⠀⡰⠁⠀⠀⠑⡄⠀⠀⡄⠀⠄⠨⡀⠀⠀⢸⢠⠣⡭⠚⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠘⢄⣠⠰⠑⠔⠔⠔⢢⢀⡰⠁⠀⠀⠀⠀⠈⠢⢔⣁⢀⢇⢔⠁⠀⢀⠼⠕⠕⠃⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠈⠈⠈⠀⠀⠀⠀⠀⠀⠀
    `;
    console.log(a);
}
easter_egg();

const images = ["1.webp", "2.webp", "3.webp"];
let currentIndex = 0;
const imgElement = document.getElementById("slideImage");

function nextSlide() {
    imgElement.style.transform = "translateX(-100%)"; // 왼쪽으로 이동

    imgElement.addEventListener("transitionend", () => {
        currentIndex = (currentIndex + 1) % images.length; // 다음 이미지 설정
        imgElement.src = images[currentIndex];
        imgElement.style.transition = "none"; // 애니메이션 효과 제거
        imgElement.style.transform = "translateX(100%)"; // 오른쪽으로 이동 후 리셋

        setTimeout(() => {
            imgElement.style.transition = "transform 150ms ease-out"; // 다시 애니메이션 적용
            imgElement.style.transform = "translateX(0)"; // 원래 위치로 이동
        });
    }, { once: true }); // 이벤트 한 번만 실행
}