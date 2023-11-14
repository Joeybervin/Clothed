
import { useEffect, useState } from 'react'
import { NavLink, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { ProductList } from '../../components/ui/ProductCard.jsx'


/* style */
import {StyledShop} from './shop.style.js'

const Shop = () => {

    const [products , setProducts] = useState([])

    
    useEffect(() => {
        axios.get('/api/products?')
            .then(response => {
                setProducts(response.data)
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données : ', error);
        });
        
    }, []);

    return (
        <StyledShop>
            <div>

            <input type="search" />
            
            <ProductList products={products} />
            
            </div>
        </StyledShop>
    );
};

export default Shop;