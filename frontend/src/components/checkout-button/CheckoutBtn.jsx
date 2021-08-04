import React from "react";
import StripeCheckout from "react-stripe-checkout";

const CheckoutBtn = ({ price }) => {
    const publishableKey =
        "pk_test_51Hm0EzJ5jSqIz8UnqxlXMtTomLDcQPEss7hsbxdIMEAOeiM59FIsNLvrYvgdtJfMY2ZsVWr1TW0HSva7VLK3INwd00E5u3MgTK";

    const onToken = (token) => {
        console.log(token);
        alert("Payment Successful");
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
            description={`Your total is ${price}`}
            amount={price}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default CheckoutBtn;
