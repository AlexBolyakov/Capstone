console.log("Get to work, please!!!");
let total = document.querySelector("#product-count");

const showProductsButton = document.querySelector(".show-btn");
const submitEmail = document.querySelector(".submit-btn");
const subscribeForm = document.querySelector(".subscribe-form");
const myInput = document.querySelector("input");
const footer = document.querySelector("footer");
const cart = document.querySelector('#cart');

const getAllProducts = () => {
    axios.get('http://localhost:5500/api/products').then(products => {
        const collognesContainer = document.querySelector("#collognes-container")
        collognesContainer.innerHTML = products.data.map(product => {
            
            return `
            <div class="product-card">
                <img src="${product.image}" class="cologne-pic" alt="${product.alt}"/>
                <h3>${product.name}</h3>
                <h5>Price $${product.price}</h5>
                <h6>Rating ${product.rating}</h6>
                <button class="${product.name}-btn" 
                    onclick="addToCart('${product.product_id}')"                
                >Buy</button> 
                </div>
            `
        }).join('');
    })

}
const addToCart = (product) => {
    axios.post('http://localhost:5500/api/cart', {product}).then(
        res => {
            // getCartQt()
            getCartProducts()
        }

    
    ) 
}

const getCartQt = () => {
    axios.get('http://localhost:5500/api/carttotal').then(
        res => {
            // const {total} = res.data
            console.log(res.data[0].total) 
            const cartTotal = res.data[0].total
            total.textContent = cartTotal
        
        })
}

const getEmail = (email) => {
    axios.post('http://localhost:5500/api/email', {email}).then(
        res => {
            console.log(res.data)

        })
}

async function submitEmailHandler() {
    if (!myInput.value) {
        alert('Email address is missing!')
    } 
    const newEmail = myInput.value
    getEmail(newEmail)
    const message = document.createElement("p");
    message.textContent = "Thanks for subscribing! A confirmation email was sent to " + myInput.value;
    subscribeForm.remove();
    footer.appendChild(message);
  }

  const getCartProducts = async () => {
    axios.get('http://localhost:5500/api/cartproducts').then(products => {
        cart.innerHTML = products.data.map(product => {
            
            return `
            <div class="product-card">
                <img src="${product.image}" class="cologne-pic" alt="${product.alt}"/>
                <h3>${product.name}</h3>
                <h5>Price $${product.price}</h5>
                <h6>Rating ${product.rating}</h6>
                <button class="${product.name}-btn" 
                    onclick="delete('${product.product_id}')"                
                >Delete</button> 
                </div>
            `
        }).join('');
    })

}

// const ItemsInCart = () => {
//     axios.get('http://localhost:5500/api/cartitems').then(
//         res => {
//             // const {total} = res.data
//             console.log(res.data[0].total) 
//             const cartTotal = res.data[0].total
//             total.textContent = cartTotal
        
//         })


// }




showProductsButton.addEventListener("click", getAllProducts);
submitEmail.addEventListener('click', submitEmailHandler);
getCartProducts();



