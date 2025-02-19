const getProductList = async () => {
	let productListCount = document.querySelector('#product-list-count');
	let productList = document.querySelector('#product-list');
	let productCategory2 = document.querySelector('#product-category2');

	let html = '';
	const option = { method: 'GET' };

	try {
		// 쿼리스트링 가져오기
		const params = new URLSearchParams(window.location.search);

		const type = params.get("petType");
		const category1 = params.get("petCareItemCategory1");
		const category2 = params.get("petCareItemCategory2");

		const url = `/pet-friends-clone/product/list?petType=${type}&petCareItemCategory1=${category1}&petCareItemCategory2=${category2}`;
		console.log(url);
		const response = await fetch(url, option);
		console.log(response);
		const dtoList = await response.json();
		
		console.log(dtoList);
		console.log(dtoList.length);
		if (dtoList.length == 0) {
			productList.innerHTML = '상품이 없습니다.';
			return;
		}
		
		productCategory2.innerHTML = dtoList[0].petCareItemCategory2s;

		dtoList.forEach(dto => {
			dto.contents = JSON.parse(dto.contents);
			html += `
                <li class="width190 margin-bottom12">
					<a href="product_view.html?productId=${dto.id}">
	                    <img src="resources/images/products/${dto.petType}/${dto.petCareItemCategory1}/${dto.petCareItemCategory2s}/${dto.id}/slide/${dto.contents.slideList[0]}" class="w190h190 bd-radius12">
	                    <p class="font-13 letter-minus1">${dto.name}</p>
	                    <p class="pad5-0-2"><span class="bold">${dto.price}</span><span class="font-15 pos-bottom1">원</span></p>
	                    <img src="resources/images/products/badge-morning.png" class="w62h16">
					</a>
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