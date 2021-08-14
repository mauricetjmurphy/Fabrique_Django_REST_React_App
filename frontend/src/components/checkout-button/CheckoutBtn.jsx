import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../actions/orderActions";

const CheckoutBtn = ({ price, cart, total }) => {
    const dispatch = useDispatch();

    const publishableKey =
        "pk_test_51Hm0EzJ5jSqIz8UnqxlXMtTomLDcQPEss7hsbxdIMEAOeiM59FIsNLvrYvgdtJfMY2ZsVWr1TW0HSva7VLK3INwd00E5u3MgTK";

    const onToken = (token) => {
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: total,
            })
        );
    };

    const btnStyle = {
        width: "100%",
    };

    return (
        <StripeCheckout
            label="Pay Now"
            name="Fabrique"
            billingAddress
            shippingAddress
            style={btnStyle}
            amount={price}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
            triggerEvent="onClick"
        />
    );
};

export default CheckoutBtn;
