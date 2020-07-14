let cartDisplay = document.querySelector('.cartItems');
let addToCartBtn = document.getElementsByClassName('addToCart');
let payBtn = document.querySelector('.payBtn');

//display current items in the cart from session storage
let showCart = () => {

    if ( sessionStorage.getItem('persistentCartItems') &&cartDisplay ) {
        
        //allow form submission if items in cart
        payBtn.removeAttribute('disabled');
        let cartArray = JSON.parse( sessionStorage.getItem('persistentCartItems') ) ;
        
        //show all items in cart. converts cart array to string with no commas in between them
        cartDisplay.innerHTML = '<button class="btn col-3 offset-9 mb-5" onclick="clearCart()">Clear Cart</button>' + cartArray.join(""); 
        
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

    }//they have no items in the session storage/ persistentCartItems and their is a cartDisplay(they are on the cart.html)
    else if (cartDisplay && payBtn) {

        cartDisplay.innerHTML = '<div class="container-fluid mt-5" ><p>Sorry, no items found. Please add some awesome Items to your cart to proceed.</p></div>';
        //disable submission of form if cart is empty
        payBtn.setAttribute('disabled', 'disabled');

    }

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
    cartDisplay.innerHTML = '<div class="container-fluid mt-5" ><p>Sorry, no items found. Please add some awesome Items to your cart to proceed.</p></div>';
    //cart is empty disable form submission
    payBtn.setAttribute('disabled', 'disabled');
    
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

            if(cart.length > 0 ) {

                //update session value
                sessionStorage.setItem("persistentCartItems", JSON.stringify(cart) );

                //update displayed values
                showCart();

            } else {

                clearCart();

            }
           
        
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