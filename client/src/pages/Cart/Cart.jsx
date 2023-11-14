
import { useEffect, useState } from 'react'
import {useSelector, useDispatch } from "react-redux";

/* style */
import {StyledCart} from './cart.style.js'

const Cart = () => {

    /* _____________ HOOKS _____________ */
    useEffect(() => {
        
    }, []);

    /* ___________ VARIABLES ___________ */

    /* _____________ STATES _____________ */
    const [init , setInit] = useState(false)


    /* ____________ FUNCTIONS ____________ */

    return (
        <>
            <div>
            
            <h1>Page Cart</h1>
            
            </div>
        </>
    );
};

export default Cart;