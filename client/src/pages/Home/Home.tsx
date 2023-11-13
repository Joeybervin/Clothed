/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'

import { PiHighHeelLight, PiTShirtLight } from "react-icons/pi";
import axios from 'axios';
import {StyledHome} from './home.style.ts'

import { ProductList, ProductCardProps } from '../../components/ui/ProductCard.tsx'

const Home = () => {


    const [products , setProducts] = useState<ProductCardProps[]>([])

    
    useEffect(() => {
        axios.get('/api/products/selectedProducts')
            .then(response => {
                setProducts(response.data)
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données : ', error);
        });
        
    }, []);




    return (
        <StyledHome>
    
            <section></section>

            <section className="discovery">
                <div>
                    <h1>CLOTHED</h1>
                    <p>Un style invisible</p>

                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dignissim ut mauris in pulvinar. Maecenas at imperdiet mauris. Praesent condimentum laoreet leo sed malesuada. Nunc luctus ligula quis tempus molestie. Morbi tellus nulla. </p>

                    <button>Shopper</button>
                </div>

                <div>
                    <div>
                        <p>vêtements</p>
                        <div><PiTShirtLight /></div>
                        <button>découvrir</button>

                    </div>

                    <div>
                        <p>chaussures</p>
                        <div><PiHighHeelLight /></div>
                        <button>découvrir</button>

                    </div>

                </div>
            </section>
            
            <section>
                <h2>Nos nouveautés</h2>


                <ProductList products={products} />



            </section>

        
        </StyledHome>
    );
};

export default Home;