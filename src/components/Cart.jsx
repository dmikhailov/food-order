import { forwardRef, useContext, useImperativeHandle, useMemo, useRef } from "react";
import { MainContext } from "../context/MainContext";

const Cart = forwardRef(({onCheckout}, ref) => {
    const { meals, order, actions } = useContext(MainContext);

    const dialogRef = useRef();

    useImperativeHandle(ref, () => ({
        open: () => {
            dialogRef.current.showModal();
        },
        close: () => {
            dialogRef.current.close();
        }
    }));

    const [orderMeals, total] = useMemo(
        () => {
            if (meals.length === 0) {
                return [[], 0];
            }

            let orderMeals = {};
            let total = 0;
            order.forEach(id => {
                if (orderMeals[id]) {
                    orderMeals[id].count++;
                } else {
                    orderMeals[id] = {
                        ...meals.find(meal => meal.id === id),
                        count: 1
                    }
                }
                total += Number(orderMeals[id].price);
            })

            orderMeals = Object.entries(orderMeals).map(([, meal]) => meal).sort((meal1, meal2) => meal1.name > meal2.name ? 1 : -1 );

            return [orderMeals, total];
        },
        [meals, order]
    )

    return <dialog className="modal" ref={dialogRef}>
        <div className="cart">
            <h2>Your Cart</h2>
            <ul>
                {orderMeals.map(meal => {
                    return <li className="cart-item" key={meal.id}>
                        <p>{meal.name} - {meal.count}x{meal.price}</p>
                        <div className="cart-item-actions">
                            <button onClick={()=> actions.removeMeal(meal.id)}>-</button>{meal.count}<button onClick={()=> actions.addMeal(meal.id)}>+</button>
                        </div>
                    </li>
                })}
            </ul>
            <p className="cart-total">{Math.round(total * 100) / 100}</p>
            <div className="modal-actions">
                <button className="text-button" onClick={() => dialogRef.current.close()}>Close</button>
                <button className="button" onClick={onCheckout}>Go to Checkout</button>
            </div>
        </div>
    </dialog>;

});

export default Cart;