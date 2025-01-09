import { useContext } from "react";
import logo from "../assets/logo.jpg";
import { MainContext } from "../context/MainContext";

export default function Header({onCartClick}) {
    const {order} = useContext(MainContext);

    return <header id="main-header">
        <h1 id="title">
            <img src={logo} alt="logo"/> reactfood
        </h1>
        <button className="text-button" onClick={onCartClick}>Cart ({order.length})</button>
    </header>;
}