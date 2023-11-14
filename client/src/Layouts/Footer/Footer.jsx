
import { useEffect, useState } from 'react'
import { NavLink, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch } from "react-redux";

/* style */
import {StyledFooter} from './footer.style.js'

const Footer = () => {

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
            
            <h1>Page Footer</h1>
            
            </div>
        </>
    );
};

export default Footer;