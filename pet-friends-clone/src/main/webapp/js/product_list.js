const getProductList = async () => {
	let productList = document.querySelector('product-list');

	let html = '';
	const option = { method: 'GET' };

	try {
		const response = await fetch('/pet-friends-clone/products', option);
		const dtoList = await response.json();

		dtoList.forEach(dto => {
			html += `
				    <li class="width190 margin-bottom12">
                        <img src="resources/images/products/고양이/사료/주식캔/1/slide/slide1.webp" class="w190h190 bd-radius12">
                        <p class="font-13 letter-minus1">${dto.name}</p>
                        <p class="pad5-0-2"><span class="bold">${dto.price}</span><span class="font-15 pos-bottom1">원</span></p>
                        <img src="resources/images/products/badge-morning.png" class="w62h16">
                    </li>
                    <li class="width190 margin-bottom12">
                        <img src="resources/images/products/고양이/사료/주식캔/1/slide/slide1.webp" class="w190h190 bd-radius12">
                        <p class="font-13 letter-minus1">${dto.name}</p>
                        <p class="pad5-0-2"><span class="bold">${dto.price}</span><span class="font-15 pos-bottom1">원</span></p>
                        <img src="resources/images/products/badge-morning.png" class="w62h16">
                    </li>
                    <li class="width190 margin-bottom12">
                        <img src="resources/images/products/고양이/사료/주식캔/1/slide/slide1.webp" class="w190h190 bd-radius12">
                        <p class="font-13 letter-minus1">${dto.name}</p>
                        <p class="pad5-0-2"><span class="bold">${dto.price}</span><span class="font-15 pos-bottom1">원</span></p>
                        <img src="resources/images/products/badge-morning.png" class="w62h16">
                    </li>
                    <li class="width190 margin-bottom12">
                        <img src="resources/images/products/고양이/사료/주식캔/1/slide/slide1.webp" class="w190h190 bd-radius12">
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