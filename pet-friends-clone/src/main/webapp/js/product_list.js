const getProductList = async () => {
	let productListCount = document.querySelector('#product-list-count');
	let productList = document.querySelector('#product-list');

	let html = '';
	const option = { method: 'GET' };

	try {
		// 쿼리스트링 가져오기
		const params = new URLSearchParams(window.location.search);

		const type = params.get("petType");
		const category1 = params.get("petCareItemCategory1");
		const category2 = params.get("petCareItemCategory2");

		const response = await fetch(`/pet-friends-clone/product/list?petType=${type}&petCareItemCategory1=${category1}&petCareItemCategory2=${category2}`, option);
		const dtoList = await response.json();

        dtoList.forEach(dto => {
			html += `
                <li class="width190 margin-bottom12">
                    <img src="resources/images/products/${dto.petType}/${dto.petCareItemCategory1}/${dto.petCareItemCategory2s}/${dto.id}/slide/${dto.contens.slideList[0]}" class="w190h190 bd-radius12">
                    <p class="font-13 letter-minus1">${dto.name}</p>
                    <p class="pad5-0-2"><span class="bold">${dto.price}</span><span class="font-15 pos-bottom1">원</span></p>
                    <img src="resources/images/products/badge-morning.png" class="w62h16">
                </li>
			`;
		});

		productListCount.innerHTML = `${dtoList.length}개`;
	} catch (error) {
		console.error('error:', error.message);
	}

	productList.innerHTML = html;
}
getProductList();