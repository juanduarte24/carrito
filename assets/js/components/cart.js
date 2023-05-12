function cart(db, printProducts) {
    let cart = []
    //Elemntos del DOM

    const productsDom = document.querySelector('.products-container')
    const notifyDom = document.querySelector('.notify')
    const cartDom = document.querySelector('.cart-body')
    const countDom = document.querySelector('.cart-count-item')
    const totalDom = document.querySelector('.cart-total-item')
    const checkOutDom = document.querySelector('.btn-buy')
    //Funciones

    function printCart() {
        let htmlCart = ''

        if (cart.length === 0) {
            htmlCart += `<div class="cart-empty">
            <i class='bx bx-shopping-bag'></i>
            <p class="cart-empty-text">No hay productos en el Carrito</p>
        </div>`
            notifyDom.classList.remove('show-notify')
        } else {
            for (const item of cart) {
                const product = db.find(p => p.id === item.id)
                htmlCart += `
                <article class="article">
                <div class="article-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="article-content">
                    <h3 class="article-title">${product.name}</h3>
                    <span class="article-price">$${product.price}</span>
                    <div class="article-quantity">
                        <button type="button" class="aticle-quantity-btn article-minus" data-id="${item.id}">
                            <i class='bx bx-minus'></i>

                        </button>
                        <span class="article-quantity-text">${item.qty}</span>
                        <button type="button" class="aticle-quantity-btn article-plus" data-id="${item.id}">
                            <i class='bx bx-plus'></i>

                        </button>
                    </div>
                    <button type="button" class="article-btn remoove-from-cart" data-id="${item.id}">
                        <i class='bx bx-trash'></i>
                    </button>
                </div> 
            </article>
                `
            }
            notifyDom.classList.add('show-notify')
        }
        cartDom.innerHTML = htmlCart
        notifyDom.innerHTML = showItemsCount()
        countDom.innerHTML = showItemsCount()
        totalDom.innerHTML = showTotal()

    }

    function addToCart(id, qty = 1) {
        const itemFinder = cart.find(i => i.id === id)

        if (itemFinder) {
            itemFinder.qty += qty
        } else {
            cart.push({ id, qty })

        }

        printCart()

    }

    function removeFromCart(id, qty = 1) {
        const itemFinder = cart.find(i => i.id === id)

        const result = itemFinder.qty - qty
        if (result > 0) {

            itemFinder.qty -= qty
        } else {

            cart = cart.filter(i => i.id !== id)
        }
        printCart()
    }


    function deletFromCart(id) {
        cart = cart.filter(i => i.id !== id)

        printCart()


    }


    function showItemsCount() {
        let suma = 0
        for (let item of cart) {
            suma += item.qty
        }
        return suma
    }

    function showTotal() {
        let total = 0
        for (const item of cart) {
            const productFinder = db.find(p => p.id === item.id)
            total += item.qty * productFinder.price

        }
        return total
    }
    function checkOut() {
        for (const item of cart) {
            const productFinder = db.find(p => p.id === item.id)
            productFinder.quantity -= item.qty
        }
        cart = []
        printCart()
        printProducts()
        window.alert('Gracias por su compra.')
    }
    printCart()

    //Eventos
    productsDom.addEventListener('click', function (e) {
        if (e.target.closest('.add-to-cart')) {
            const id = +e.target.closest('.add-to-cart').dataset.id
            addToCart(id)
        }
        else{
            window.alert('Lo sentimos! Parece que ya no tenemos ese producto en inventario!')
        }
    })

    cartDom.addEventListener('click', function (e) {
        if (e.target.closest('.article-minus')) {
            const id = +e.target.closest('.article-minus').dataset.id
            removeFromCart(id)
        }
        if (e.target.closest('.article-plus')) {
            const id = +e.target.closest('.article-plus').dataset.id
            addToCart(id)
        }
        if (e.target.closest('.remove-from-cart')) {
            const id = +e.target.closest('.remove-from-cart').dataset.id
            deletFromCart(id)
        }

    })
    checkOutDom.addEventListener('click',function(){
        checkOut()
    })
}
export default cart 