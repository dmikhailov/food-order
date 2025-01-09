import { useContext } from "react";
import { MainContext } from "../context/MainContext";

export default function Meal({id, name, price, description, image}) {
    const {actions} = useContext(MainContext);

    return <div className="meal-item">
        <img src={image} />
        <h3>{name}</h3>
        <p className="meal-item-price">{price}</p>
        <p className="meal-item-description">{description}</p>
        <button className="button meal-item-actions" onClick={() => actions.addMeal(id)}>Add to Cart</button>
    </div>
}