import React from "react";
import { Alert } from "react-bootstrap";

export default function Message({ variant, children }) {
    return <Alert variant={variant}>{children}</Alert>;
}

// const Message = (variant, children) => {
//     return <Alert variant={variant}>{children}</Alert>;
// };

// export default Message;
