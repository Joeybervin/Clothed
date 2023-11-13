/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import { NavLink, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch } from "react-redux";

/* style */
import {StyledShop} from './shop.style.ts'

const Shop = () => {

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
            
            <h1>Page Shop</h1>
            
            </div>
        </>
    );
};

export default Shop;