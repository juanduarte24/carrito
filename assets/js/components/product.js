function products(products){
    const db = [...products]

    function printProducts (){
        const productsDom = document.querySelector('.products-container')
        let htmlProduct = ''
        
        for(let product of db){
            htmlProduct += ` <article class="product">
            <div class="product-image">
                <img src="${product.image}"
                    data-id="${product.id}" alt="${product.name}">
            </div>
            <div class="product-content">
                <button type="button" class="product-btn add-to-cart data-id="${product.id}">
                    <i class='bx bx-cart-add'></i>
                </button>
                <span class="product-price">$${product.price}</span>
                <span class="product-stock">Disponibles: ${product.quantity}</span>
                <h3 class="product-title">${product.name}</h3>
            </div>
        </article>`
        }
        productsDom.innerHTML = htmlProduct
    }

    printProducts()
    return {
        db,
        printProducts
    }

}

export default products