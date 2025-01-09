import { useEffect, useState, createContext, useCallback } from "react";

const BE_HOST = "http://localhost:3000/";

export const MainContext = createContext();

export function MainContextProvider({ children }) {
    const [meals, setMeals] = useState([]);
    const [order, setOrder] = useState(["m1"]);

    useEffect(() => {
        (async () => {
            const res = await fetch(BE_HOST + "meals");
            let data = await res.json();
            data = data.map(meal => {
                return {
                    ...meal,
                    image: BE_HOST + meal.image
                }
            })

            setMeals(data);
        })();
    }, []);

    const addMeal = useCallback((id) => {
        setOrder(order => [...order, id]);
    });

    const removeMeal = useCallback((id) => {
        setOrder(order => {
            const newOrder = [...order];
            if (newOrder.indexOf(id) !== -1) {
                newOrder.splice(newOrder.indexOf(id), 1);
            }
            return newOrder;
        });
    });

    const checkoutHandler = useCallback(async (customer) => {
        customer.name= customer.fullname;
        customer["postal-code"] = customer.postcode;
        delete customer.fullname;
        delete customer.postcode;
        debugger;

        const res = await fetch(BE_HOST + "orders", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                order: {
                    customer,
                    items: order
                }
            })
        });

        return res.status === 200;
    });


    return <MainContext.Provider value={{ 
        meals, 
        order, 
        actions: {
            addMeal,
            removeMeal,
            checkoutHandler
        }
        }}>
        {children}
    </MainContext.Provider>
}