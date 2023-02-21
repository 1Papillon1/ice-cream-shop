import React, { useEffect } from "react";
import { getProducts } from "../redux/app/api";
import { useAppSelector, useAppDispatch } from "../redux/app/hooks";
import { receivedProducts } from "../redux/icecreams/productsSlice";
import { addToCart } from "../redux/icecreams/cartSlice";

function Icecreams() {
    
    // document title
    useEffect(() => {
        document.title = "Ice creams"
    }, [])


    const dispatch = useAppDispatch();
    // products 

    useEffect(() => {
        getProducts().then((products) => {
            dispatch(receivedProducts(products));
        });
    }, []);


const products = useAppSelector(state => state.products.products);

    return (
        <div>
            <div className="container">
                <div className="flex">
                    {Object.values(products).map((product) => (
                        <div className="flex__box">
                            <img className="flex__box__image" src={`${product.src}`}/>
                            <h3 className="flex__box__title">{product.name}</h3>
                            <h3 className="flex__box__title flex__box__title--secondary">${product.price}</h3>
                            <p className="flex__box__paragraph">{product.description}</p>
                            <button onClick={() => dispatch(addToCart(product.id))}className="button">Add to cart</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default Icecreams;
