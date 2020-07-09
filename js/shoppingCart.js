let cartDisplay = document.querySelector('.cartItems');
let products = document.getElementsByClassName('addToCart');
                
//display current items in the cart from session storage
if ( sessionStorage.getItem('persistentCartItems') && cartDisplay ) {
    
    //show all items in cart
    cartDisplay.innerHTML = JSON.parse( sessionStorage.getItem('persistentCartItems') ); 

    let total = 0;
    let allPriceObjects = document.querySelectorAll('.price');

    allPriceObjects.forEach( element => {

        let singlePrice = element.innerHTML;
        //remove string from prices for math calculating
        singlePrice = singlePrice.replace('Price: $', '');

        total += parseInt(singlePrice);
    });

    cartDisplay.innerHTML += '<div class="row mt-5" ><span class=" col-12 text-right"> Total: $' + total + '</span></div>';
    
}

/* determines the item they are trying to add to the cart and adds the item via html to the session storage */
let addToCart = ( productDescription ) => {
    let cartItems = [];

    if( sessionStorage.getItem('persistentCartItems') ){

        cartItems = JSON.parse( sessionStorage.getItem('persistentCartItems') );

    }

    let nextCartItemNum = cartItems.length;
    
    cartItems[ nextCartItemNum ] = productDescription;
   
    //update/create the session storage with the cart items
    //can not store array to session must. convert to json for session storage
    sessionStorage.setItem("persistentCartItems", JSON.stringify(cartItems) );
    
}//addToCart()

//set a click event listener on all products add to cart btn
for ( let i = 0; i < products.length; i++ ) {

    //on click of add to cart btn call addToCart() passing in the productName that they clicked
    products[ i ].addEventListener('click', ( ) => { addToCart( products[ i ].getAttribute( 'data-product' ) ) } );

}

