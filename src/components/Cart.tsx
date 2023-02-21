import React, { useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { useAppSelector, useAppDispatch } from "../redux/app/hooks";
import { getMemoizedNumItems } from "../redux/icecreams/cartSlice";
import { getTotalPrice, removeItem, updateQuantity } from "../redux/icecreams/cartSlice";





function Cart() {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.products.products);
    const items = useAppSelector((state) => state.cart.items);
    const totalPrice = useAppSelector(getTotalPrice);
    const numItems = useAppSelector(getMemoizedNumItems);

    function quantityChanged(e: React.FocusEvent<HTMLInputElement>, id: string) {
        const quantity = Number(e.target.value) || 0;
        dispatch( updateQuantity({ id, quantity }));

    }

    useEffect(() => {
        document.title = "Cart"
    }, [])

    // Enums
    type CartStep = "Cart" | "Checkout" | "Ordered"

    // States 
    const [cartStep, setCartStep] = useState<CartStep>("Cart")



    // country selector
        const options = [
            { value: "croatia", label: "Croatia"},
            { value: "serbia", label: "Serbia"},
            { value: "slovenia", label: "Slovenia"},
            { value: "bih", label: "Bosnia & Herzegovina"},
        ]


    return (
        <div className="layout"> 
        {cartStep == "Cart" && (
                <>
            <h2 className="layout__title">Cart</h2>
            <div className="box">
                <h3 className="box__title">Shopping cart</h3>
                <table className="table">
                    <tbody className="table__body">
                    {Object.entries(items).map(([id, quantity]) => (
                        <tr className="table__row">
                            <td className="table__data table__data--secondary"><img className="icons icons--secondary" src="./x.png" alt="image" onClick={() => dispatch(removeItem(id))}/></td>
                            <td className="table__data table__data--image"><img className="table__image" src={`${products[id].src}`} alt="image"/></td>
                            <td className="table__data">{products[id].name}</td>
                            <td className="table__data">
                                <input
                                    type="number"
                                    className="table__input"
                                    defaultValue={quantity}
                                    onBlur={(e) => quantityChanged(e, id)}
                                    min = {1}
                                />
                            </td> 
                            <td className="table__data">${products[id].price * quantity}</td>
                        </tr>
                    ))}
                        
                        <tr className="table__row">
                            <td className="table__data"></td>
                            <td className="table__data"></td>
                            <td className="table__data table__data--left">Total:</td>
                            <td className="table__data table__data--special">${totalPrice}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex flex--right">
                {numItems > 0 &&
                <button onClick={() => setCartStep("Checkout")}className="button">Checkout</button>
                }
                </div>
            </div>
            </>
            )}

            {cartStep == "Checkout" && (
                <>
                    <h2 className="layout__title">Checkout</h2>
                    <div className="box">
                        <label className="box__label" htmlFor="fname">First name:</label>
                        <input className="box__input" type="text" name="fname" id="fname"/>
                        <label className="box__label" htmlFor="lname">Last name:</label>
                        <input className="box__input" type="text" name="lname" id="lname" />
                        <label className="box__label" htmlFor="email">email:</label>
                        <input className="box__input" type="email" name="email" id="email" />
                        <label className="box__label" htmlFor="country">Delivery Country:</label>
                        <Select className="select" options={options} />
                        <label className="box__label" htmlFor="address">Address:</label>
                        <input className="box__input" type="text" name="address" id="address" />
                        <br/>
                        <p className="box__paragraph">Total: ${totalPrice}</p>
                        <div className="flex">
                        <button onClick={() => setCartStep("Ordered")}className="button">Order & Pay</button>
                        </div>
                    </div>
                </>
            )}

            {cartStep == "Ordered" && (
                <>
                    <h2 className="layout__title">Thank you for shopping with us!</h2>
                </>
            )}

        </div>
    )
}

export default Cart;