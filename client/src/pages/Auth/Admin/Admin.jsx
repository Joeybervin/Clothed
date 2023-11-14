
import { useEffect, useState } from 'react'
import {useSelector, useDispatch } from "react-redux";

/* style */
import {StyledAdmin} from './admin.style.js'

const Admin = () => {

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
            
            <h1>Page d'administration</h1>
            
            </div>
        </>
    );
};

export default Admin;

