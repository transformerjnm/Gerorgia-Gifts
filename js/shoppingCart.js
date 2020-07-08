let cartDisplay = document.getElementsByClassName('cartItems')
let products = document.getElementsByClassName('addToCart');
var cartItems = [];

console.log(cartDisplay)

//display current items in the cart from session storage
cartDisplay.innerHTML = sessionStorage.getItem('persistentCartItems');

/* determines the item they are trying to add to the cart and adds the item via html to the sesson storage */
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

    //update/create the session storage with the cart items
    sessionStorage.setItem("persistentCartItems", cartItems);
    
    console.log(sessionStorage.getItem("persistentCartItems"))

}//addToCart()

//set a click event listener on all products add to cart btn
for ( let i = 0; i < products.length; i++ ) {

    //on click of add to cart btn call addToCart() passing in the productName that they clicked
    products[ i ].addEventListener('click', ( ) => { addToCart( products[ i ].getAttribute( 'data-product' ) ) } );

}

//display current items in the cart from session storage
cartDisplay.innerHTML = sessionStorage.getItem('persistentCartItems');