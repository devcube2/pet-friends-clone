const getProductList = async () => {
	let productList = document.querySelector('product-list');

	let html = '';
	const option = { method: 'GET' };

	try {
		const response = await fetch('/pet-friends-clone/products', option);
		const dtoList = await response.json();

        // {
        //     "name": "알모네이쳐 캣 대서양참치 캔 70g",
        //     "price": 2600,
        //     "petType": "고양이",
        //     "petCareItemCategory1": "사료",
        //     "petCareItemCategory2": 5,
        //     "petCareItemCategory2s": "주식캔",
        //     "attributes": "",
        //     "stockQuantity": 0,
        //     "discount": 0,
        //     "contents": "{\"slideList\":[\"slide1.webp\",\"slide2.jpeg\",\"slide3.jpeg\",\"slide4.jpeg\"], \"mainList\":[\"main1.webp\",\"main2.webp\",\"main3.webp\",\"main4.webp\",\"main5.webp\",\"main6.webp\",\"main7.webp\"]}"
        //     },

		dtoList.forEach(dto => {
			html += `
                <li class="width190 margin-bottom12">
                    <img src="resources/images/products/${dto.petType}/${dto.petCareItemCategory1}/${dto.petCareItemCategory2s}/${dto.id}/slide/slide1.webp" class="w190h190 bd-radius12">
                    <p class="font-13 letter-minus1">${dto.name}</p>
                    <p class="pad5-0-2"><span class="bold">${dto.price}</span><span class="font-15 pos-bottom1">원</span></p>
                    <img src="resources/images/products/badge-morning.png" class="w62h16">
                </li>
			`;
		});
	} catch (error) {
		console.error('error:', error.message);
	}

	productList.innerHTML = html;
}