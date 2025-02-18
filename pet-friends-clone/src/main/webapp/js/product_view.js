const viewProduct = async () => {
	try {
		// 쿼리스트링 가져오기
		const params = new URLSearchParams(window.location.search);

		const productId = params.get("productId");

        const option = { method: 'GET' };
		const response = await fetch(`/pet-friends-clone/product/view?productId=${productId}`, option);
		const dto = await response.json();
		
		dto.contents = JSON.parse(dto.contents);

        let productThumbnail = document.querySelector('#product-thumbnail');
        let productHeader = document.querySelector('#product-header');
        let productMain = document.querySelector('#product-main');

        productThumbnail.innerHTML = `
            <img class="w429h420" src="resources/images/products/${dto.petType}/${dto.petCareItemCategory1}/${dto.petCareItemCategory2s}/${dto.id}/slide/${dto.contents.slideList[0]}">
			<div class="text-center">
				<p class="font-18 bold">${dto.name}</p>
	            <p class="font-16">${dto.price}원</p>
			</div>
            <img src="resources/images/products/ddong-go-house.png" class="width400">
        `

        //productHeader.innerHTML = `
        //    <p class="font-18 bold">${dto.name}</p>
        //    <p class="font-16 text-right">${dto.price}원</p>
        //    <img src="resources/images/products/ddong-go-house.png" class="width400">
        //`

        //let html = '';
        //dto.contents.mainList.forEach((mainItem, index) => {			
		//	html += `<li><img class="width400" src="resources/images/products/${dto.petType}/${dto.petCareItemCategory1}/${dto.petCareItemCategory2s}/${dto.id}/${dto.contents.mainList[index]}"></li>`;
		//});
		//productMain.innerHTML = html;		
	} catch (error) {
		console.error('error:', error.message);
	}	
}
viewProduct();