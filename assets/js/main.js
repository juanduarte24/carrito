import loader from './components/loader.js'
import showMenu from './components/showMenu.js'
import showCart from './components/showCart.js'
import products from './components/product.js'
import getProducts from './helpers/getProducts.js'
import cart from './components/cart.js'
//UI Elements
// Ocular LKoader
loader()


//Mostrar Menu
showMenu()

//Mostrar Cart
showCart()

//Productos
const {db,printProducts} = products(await getProducts())

//CArrito
cart(db,printProducts)