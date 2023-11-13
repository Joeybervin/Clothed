/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import { NavLink, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch } from "react-redux";

/* style */
import {StyledNavbar} from './navbar.style.ts'

const Navbar = () => {

    /* _____________ HOOKS _____________ */
    const navigate = useNavigate();
    useEffect(() => {
        
    }, []);

    /* ___________ VARIABLES ___________ */
    const isLoggedIn= false;

    /* _____________ STATES _____________ */
    const [init , setInit] = useState(false)


    /* ____________ FUNCTIONS ____________ */
    const handleButtonClick = () => {
        if (isLoggedIn) {
            navigate('/connexion/mon-profile');
        } else {
            navigate('/connexion');
        }
      };

    return (
        <StyledNavbar>


            <NavLink to="/">
                <p>CLOTHED</p>
            </NavLink>

            <div>
                <nav>
                    <ul>
                    <li ><NavLink to="/">Accueil</NavLink></li>
                    <li ><NavLink to="/shop/mixte">Nos produits</NavLink></li>
                    <li ><NavLink to="/nous-contactez">Contact</NavLink></li>
                    <li ><button onClick={handleButtonClick}>{isLoggedIn ? 'Profil' : 'Se connecter'}</button></li>
                    </ul>
                </nav>
                
                    

            </div>
            
        
        </StyledNavbar>
    );
};

export default Navbar;