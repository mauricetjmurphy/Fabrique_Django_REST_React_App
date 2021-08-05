import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../sidemenu/sidemenu.css";

function Sidemenu(height) {
    const toggleSidemenu = useSelector((state) => state.toggleSidemenu);
    const { toggle } = toggleSidemenu;

    return (
        <ul
            style={{ height: height }}
            className={toggle ? "product-menu show" : "product-menu"}
        >
            <li>
                <Link to="/products/men" className="link">
                    Coats
                </Link>
            </li>
            <li>
                <Link className="link">Jackets</Link>
            </li>
            <li>
                <Link className="link">Shirts</Link>
            </li>
            <li>
                <Link className="link">Shorts</Link>
            </li>
            <li>
                <Link className="link">Trousers</Link>
            </li>
        </ul>
    );
}

export default Sidemenu;
