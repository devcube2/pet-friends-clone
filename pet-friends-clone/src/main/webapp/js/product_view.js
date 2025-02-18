const viewProduct = async () => {
	try {
		// 쿼리스트링 가져오기
		const params = new URLSearchParams(window.location.search);

		const productId = params.get("productId");

        const option = { method: 'GET' };
		const response = await fetch(`/pet-friends-clone/product/view?productId=${productId}`, option);
		const dto = await response.json();

        // <section id="product-thumbnail">
        // <!-- JS 에서 넣어준다. -->
        // <img class="w429h420" src="resources/images/products/고양이/사료/주식캔/3/slide/slide1">
        // </section>

        let productThumbnail = document.querySelector('#product-thumbnail');
        let productHeader = document.querySelector('#product-header');
        let productMain = document.querySelector('#product-main');

        // {
        //     "id": 1,
        //     "name": "벤티 캣 참치&닭가슴살 캔 90g",
        //     "price": 1800,
        //     "petType": "고양이",
        //     "petCareItemCategory1": "사료",
        //     "petCareItemCategory2": 5,
        //     "petCareItemCategory2s": "주식캔",
        //     "attributes": "",
        //     "stockQuantity": 0,
        //     "discount": 0,
        //     "contents": "{\"slideList\":[\"slide1.webp\"], \"mainList\":[\"main1.webp\"]}"
        //     }
        productThumbnail.innerHTML = `
            <img class="w429h420" src="resources/images/products/${dto.petType}/${dto.petCareItemCategory1}/${dto.petCareItemCategory2s}/${id}/slide/slide1">
        `

        // <section id="product-header" class="pad20-16-0">
        //     <!-- JS 에서 넣어준다. -->
        //     <p class="font-18 bold">알모네이쳐 캣 참치&새우 캔 70g </p>
        //     <p class="font-16 text-right">2,600원</p>
        //     <img src="resources/images/products/ddong-go-house.png" class="width400">
        // </section>
        productHeader.innerHTML = `
            <p class="font-18 bold">${dto.name}</p>
            <p class="font-16 text-right">${dto.price}원</p>
            <img src="resources/images/products/ddong-go-house.png" class="width400">
        `

        // <section id="product-main">
        //     <!-- JS 에서 넣어준다. -->
        //     <ul>
        //         <li><img src="resources/images/products/고양이/사료/주식캔/3/main1"></li>
        //         <li><img src="resources/images/products/고양이/사료/주식캔/3/main2"></li>
        //         <li><img src="resources/images/products/고양이/사료/주식캔/3/main3"></li>
        //         <li><img src="resources/images/products/고양이/사료/주식캔/3/main4"></li>
        //         <li><img src="resources/images/products/고양이/사료/주식캔/3/main5"></li>
        //         <li><img src="resources/images/products/고양이/사료/주식캔/3/main6"></li>
        //         <li><img src="resources/images/products/고양이/사료/주식캔/3/main7"></li>
        //     </ul>
        // </section>
        let html = '';
        dto.contents.mainList.forEach((item, index) => {
			html += `<li><img src="resources/images/products/${dto.petType}/${dto.petCareItemCategory1}/${dto.petCareItemCategory2s}/${id}/${dto.contents.mainList[index]}"></li>`;
		});
		productMain.innerHTML = html;
	} catch (error) {
		console.error('error:', error.message);
	}

	productList.innerHTML = html;
}