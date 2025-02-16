// Enter 키 감지 이벤트 추가
document.getElementById("keyword").addEventListener("keydown", function (event) {
    if (event.key === "Enter") { // 또는 event.keyCode === 13 (구형 브라우저)
        searchAddress(); // 검색 실행
    }
});

async function searchAddress() {
    const keyword = document.getElementById("keyword").value;
    const result = document.getElementById("result");

    if (!keyword.trim()) {
        alert("검색어를 입력하세요.");
        return;
    }

    const apiKey = "U01TX0FVVEgyMDI1MDIxNjE1NTM0MjExNTQ3Mjk=";
    const url = `https://business.juso.go.kr/addrlink/addrLinkApi.do?confmKey=${apiKey}&currentPage=1&countPerPage=12&keyword=${encodeURIComponent(keyword)}&resultType=json`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results.common.errorCode != 0) {
            result.innerHTML = `<p>오류: ${data.results.common.errorMessage}</p>`;
            return;
        }

        const addresses = data.results.juso || [];

        if (addresses.length === 0) {
            result.innerHTML = "<p>검색 결과가 없습니다.</p>";
            return;
        }

        let html = `<p class="font-14 bold letter-minus1"><span class="color-ea306f">${keyword}</span> 검색 결과</p> <div><br></div>`;
        addresses.forEach((addr, index) => {
            html += `
                <div>
                    <ul>
                        <li class="flex-left">
                            <div class="bg-fafafa bd-radius5 w40h23 min-width40 text-center">
                                <p class="font-10 bold color-626872">도로명</p>
                            </div>
                            <p class="pos-bottom3 bold">${addr.roadAddr}</p>
                        </li>
                    </ul>
                </div>
                <div class="margin-top5">
                    <ul>
                        <li class="flex-left">
                            <div class="bg-fafafa bd-radius5 w40h23 min-width40 text-center">
                                <p class="font-10 bold">지번</p>
                            </div>
                            <p class="pos-bottom3">${addr.jibunAddr}</p>
                        </li>
                    </ul>
                </div>
            `;
            if (index < addresses.length - 1) {
                html += '<br><div class="divider"></div>';
            }
        });
        result.innerHTML = html;
    } catch (error) {
        result.innerHTML = `<p>오류 발생: ${error.message}</p>`;
    }
}