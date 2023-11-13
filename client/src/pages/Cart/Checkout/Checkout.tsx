/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import {useSelector, useDispatch } from "react-redux";

/* style */
import {StyledCheckout} from './checkout.style.js'

const Checkout = () => {

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
            
            <h1>Page Checkout</h1>
            
            </div>
        </>
    );
};

export default Checkout;