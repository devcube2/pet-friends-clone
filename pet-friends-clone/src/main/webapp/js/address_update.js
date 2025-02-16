// 유저정보 가져오기
function getLoginToken() {
	return JSON.parse(sessionStorage.getItem("loginToken"));
}

// 유저정보 넣기
function setLoginToken(userDto) {
	sessionStorage.setItem("loginToken", JSON.stringify(userDto));
}

function displayLoginAddress() {
	const result = document.getElementById("result");

	const dto = getLoginToken();
	const address = JSON.parse(dto.address).addr
	result.innerHTML = `
		<p class="font-13 bold color-757c89 margin-top5">최근 주소지</p>
		<br>
		<div class="bg-fff1f5 bd-radius5 w70h18">
			<div class="flex-left-align pos-left5">
				<div class="display-inline">
					<svg width="9" height="9" viewBox="0 0 12 9" fill="none"
					    xmlns="http://www.w3.org/2000/svg" class="c-ctigpz c-ctigpz-icciPuA-css">
					    <path d="M1.00003 3.95455L4.52944 7.5L11 1" stroke="#ea306f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
					</svg>
				</div>
				<span class="color-ea306f bold font-10 letter-minus1 padleft2">기본 배송지</span>
			</div>			
		</div>
		<p class="bold lh15 padtop3">${address}</p>
	`
}

async function searchAddress() {
    const keyword = document.getElementById("keyword").value;
    const result = document.getElementById("result");

    if (!keyword.trim()) {
        alert("검색어를 입력하세요.");
        return;
    }

    const apiKey = "U01TX0FVVEgyMDI1MDIxNjE1NTM0MjExNTQ3Mjk=";
    const url = `https://business.juso.go.kr/addrlink/addrLinkApi.do?confmKey=${apiKey}&currentPage=1&countPerPage=10&keyword=${encodeURIComponent(keyword)}&resultType=json`;

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
                        <li>
                            <a href="address_update2.html?keyword=${keyword}&roadAddr=${addr.roadAddr}&jibunAddr=${addr.jibunAddr}" class="flex-left">
                                <div class="bg-fafafa bd-radius5 w40h23 min-width40 text-center">
                                    <p class="font-10 bold color-626872">도로명</p>
                                </div>
                                <p class="pos-bottom3 bold">${addr.roadAddr}</p>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="margin-top5">
                    <ul>
                        <li>
                            <a href="address_update2.html?keyword=${keyword}&roadAddr=${addr.roadAddr}&jibunAddr=${addr.jibunAddr}" class="flex-left">
                                <div class="bg-fafafa bd-radius5 w40h23 min-width40 text-center">
                                    <p class="font-10 bold">지번</p>
                                </div>
                                <p class="pos-bottom3">${addr.jibunAddr}</p>
                            </a>
                        </li>
                    </ul>
                </div>
            `;
            if (index < addresses.length - 1) {
                html += '<div class="divider margin16-0"></div>';
            }
        });
        result.innerHTML = html;
    } catch (error) {
        result.innerHTML = `<p>오류 발생: ${error.message}</p>`;
    }
}

function displayAddress(keyword, roadAddr, jibunAddr, y, x) {
    // 이미지 지도에 표시할 마커입니다
    let marker = {
        position: new kakao.maps.LatLng(y, x),
        text: `${keyword}` // text 옵션을 설정하면 마커 위에 텍스트를 함께 표시할 수 있습니다
    };

    let staticMapContainer  = document.getElementById('kakao-map'), // 이미지 지도를 표시할 div
        staticMapOption = {
            center: new kakao.maps.LatLng(y, x), // 이미지 지도의 중심좌표
            level: 3, // 이미지 지도의 확대 레벨
            marker: marker // 이미지 지도에 표시할 마커
        };

    // 이미지 지도를 생성합니다
    let staticMap = new kakao.maps.StaticMap(staticMapContainer, staticMapOption);

    let addressContainer = document.getElementById('addressContainer');
    addressContainer.innerHTML = `
        <ul>
            <li class="font-13 flex-left margin-top15">
                <div class="bg-fafafa bd-radius5 w40h23 min-width40 text-center">
                    <p class="font-10 bold color-626872">도로명</p>
                </div>
                <p class="pos-bottom3 bold">${roadAddr}</p>
            </li>
            <li class="font-13 flex-left margin-top5">
                <div class="bg-fafafa bd-radius5 w40h23 min-width40 text-center">
                    <p class="font-10 bold color-626872">지번</p>
                </div>
                <p class="pos-bottom3">${jibunAddr}</p>
            </li>
        </ul>
    `;
}

// 도로명 주소로 위도, 경도 가져오기
function getCoordinates() {
    if (!window.kakao || !kakao.maps) {
        alert("카카오맵 API 로드 오류");
        return;
    }

    const params = new URLSearchParams(window.location.search);

    const keyword = params.get("keyword");
    const roadAddr = params.get("roadAddr");
    const jibunAddr = params.get("jibunAddr");

    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(roadAddr, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            // const lat = result[0].y;
            // const lng = result[0].x;
            displayAddress(keyword, roadAddr, jibunAddr, result[0].y, result[0].x);
        } else {
            alert("좌표 변환에 실패했습니다. 올바른 주소인지 확인하세요.");
        }
    });
}

async function resistAddress() {
    const params = new URLSearchParams(window.location.search);
    const roadAddr = params.get("roadAddr");
    const addressDetail = document.getElementById("address-detail").value;

    const newAddress = {
        primary: true,
        addr: `${roadAddr} ${addressDetail}`
    }

    try {
		const dto = getLoginToken();
        dto.address = JSON.stringify(newAddress);

        const option = {
			method: 'PUT',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(dto)
		};

		const response = await fetch('/pet-friends-clone/member/address', option);
		const result = await response.json();
		if (result == true) {
			alert('배송주소 등록 성공');
			setLoginToken(dto);
			location.href = 'index.html';
		} else {
			alert('배송주소 등록 실패');
		}
	} catch (error) {
		console.error('error:', error);
	}
}