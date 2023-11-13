/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import {useSelector, useDispatch } from "react-redux";

/* style */
import {StyledProfile} from './profile.style.ts';

const Profile = () => {

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
            
            <h1>Page Profile</h1>
            
            </div>
        </>
    );
};

export default Profile;