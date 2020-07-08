let cartDisplay = document.getElementsByClassName('cartItems')
let products = document.getElementsByClassName('addToCart');
var cartItems = [];
console.log(cartDisplay)
cartDisplay.innerHTML = sessionStorage.getItem('persistentCartItems');
let addToCart = ( productName ) => {

    switch (productName ) {

        case 'honey': 
            cartItems += '<span> Price: $16.00 Product: Mason jar of Wildflower honey </span><br>';
        break;

        case 'masonJar': 
            cartItems += '<span> Price: $5.00 Product: Empty mason jar cup </span><br>';
        break;

        case 'tShirt': 
            cartItems += '<span> Price: $10.00 Product: Southern Charm White T-shirt for men </span><br>';
        break;

    }
    sessionStorage.setItem("persistentCartItems", cartItems);
    
    console.log(sessionStorage.getItem("persistentCartItems"))
}

for ( let i = 0; i < products.length; i++ ) {

    products[ i ].addEventListener('click', ( ) => { addToCart( products[ i ].getAttribute( 'data-product' ) ) } );

}

cartDisplay.innerHTML = sessionStorage.getItem('persistentCartItems');