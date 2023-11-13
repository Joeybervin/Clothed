/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import { NavLink, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { ProductList, ProductCardProps } from '../../components/ui/ProductCard.tsx'


/* style */
import {StyledShop} from './shop.style.ts'

const Shop = () => {

    const [products , setProducts] = useState<ProductCardProps[]>([])

    
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