let cartDisplay = document.querySelector('.cartItems');
let addToCartBtn = document.getElementsByClassName('addToCart');
                
//display current items in the cart from session storage
let showCart = () => {

    if ( sessionStorage.getItem('persistentCartItems') && cartDisplay ) {
    
        //show all items in cart
        cartDisplay.innerHTML = JSON.parse( sessionStorage.getItem('persistentCartItems') ); 
        
        /*start of calculate and show total for items */

            let total = 0;
            let allPriceObjects = document.querySelectorAll('.price');
        
            allPriceObjects.forEach( element => {
        
                let singlePrice = element.innerHTML;
                //remove string from prices for math calculating
                singlePrice = singlePrice.replace('Price: $', '');
        
                total += parseInt(singlePrice);
            });
        
            cartDisplay.innerHTML += '<div class="row mt-5" ><span class=" col-12 text-right"> Total: $' + total + '</span></div>';

        /* end of calculate total */

        //setup the ability to remove single items from cart
        removeFromCartSetup();

    }//if( sessionStorage persistentCartItems)

}//showCart()

/* adds the item to the session storage */
let addToCart = ( productDescription ) => {

    let cartItems = [];

    //if we have all ready have items in the cart get them
    if( sessionStorage.getItem('persistentCartItems') ){

        cartItems = JSON.parse( sessionStorage.getItem('persistentCartItems') );

    }

    let nextCartItemNum = cartItems.length;
    
    //product description was passed in and originates from the data-product attribute
    cartItems[ nextCartItemNum ] = productDescription;
   
    //update/create the session storage with the cart items
    //can not store array to session must. convert to json for session storage
    sessionStorage.setItem("persistentCartItems", JSON.stringify(cartItems) );
    
}//addToCart()

let clearCart = () => {

    sessionStorage.setItem("persistentCartItems", '');
    cartDisplay.innerHTML = '';
    
}

//this function sets up the click listners and logic to be able to remove a single item form cart
let removeFromCartSetup = () => {

    //onclick of x remove single item
    //the removal x
    let removeFromCart = document.querySelectorAll('.fa-times');
    //for every remove x
    removeFromCart.forEach( closeX => {

        /*
            make sure data-product html attribute has not extra spaces. For some reason the js innerHTML dose not pick up these spaces and then the index of 
            will return -1(not found) when trying to delete.
        */        
        //get the remove x parents parents html. Then surround it with a div.row so that it will match the session storage format for persistent Cart Items
        let parentEl = "<div class=\"row\">" + closeX.parentElement.parentElement.innerHTML + "</div>";
            
        closeX.addEventListener('click', () => {

            //get current cart
            let cart = JSON.parse( sessionStorage.getItem('persistentCartItems'));
                    
            //get index of current clicked product.;
            let = cartIndex = cart.indexOf(parentEl);

            //remove from array
            cart.splice(cartIndex, 1);

            //update session value
            sessionStorage.setItem("persistentCartItems", JSON.stringify(cart) );

            //update displayed values
            showCart();
        
        });//click event
            
    })//foreach

}//removeFromCartSetup()

//set a click event listener on all addToCartBtn if their is any
if ( addToCartBtn ) {

    for ( let i = 0; i < addToCartBtn.length; i++ ) {

        //on click of add to cart btn call addToCart() passing in the productName that they clicked
        addToCartBtn[ i ].addEventListener('click', ( ) => { addToCart( addToCartBtn[ i ].getAttribute( 'data-product' ) ) } );
    
    }

}//if addToCartBtn

//on cart page load by default show the cart.
if( cartDisplay ) {

    showCart();

}//if cartDisplay