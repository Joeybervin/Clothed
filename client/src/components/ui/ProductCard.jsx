/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from "styled-components";
import { useState } from "react";
import {useSelector, useDispatch } from "react-redux";


const ProductCardStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 200px;
    padding: 15px;

    .cart {
        display: flex;
        justify-content: center;
        background-color: #FFFF;
        flex: 1; 
        align-items: center;
        border: black solid 1px;
        border-radius: 5px;
        height: 35px;

        button {
            border: none;
            background-color: #FFFF;
            border-radius: 5px 0 0 5px;
            padding: 0;
            font-size: 1rem;
        }

        input {
            border: none;
            text-align: center;
            max-width: 80%;
            height: 100%;
        }
    }
`;


const ProductCard = ({
    category,
    name,
    price,
    inventory,
    ...props
    }) => {
    const [quantity, setQuantity] = useState(0);

    const handleIncrement = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 0) {
        setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    const imagePath = `/src/assets/${category}.png`;

    return (
        <ProductCardStyle className={props.className} onClick={props.onClick}>
            <img src={imagePath} alt={name} />
            <div>
            <p>{name}</p>
            <p>{price} €</p>

            <div className="cart">
                <button onClick={handleDecrement}>-</button>
                <input type="text" max={inventory} value={quantity} readOnly />
                <button onClick={handleIncrement}>+</button>
            </div>
            </div>
        </ProductCardStyle>
    );
};

const ProductListStyle = styled.div`

    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 20px;
`;

const ProductList= ({
    products,
    }) => {
    return (
        <ProductListStyle>
        {products.map((product) => (
            <div key={"prod" + product.id}>
            <ProductCard
                category={product.category}
                name={product.name}
                price={product.price}
                inventory={product.inventory}
                id={product.id}
                onClick={product.onClick}
            />
            </div>
        ))}
        </ProductListStyle>
    );
};

export { ProductCard, ProductList };  

