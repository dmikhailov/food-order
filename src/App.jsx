import { useContext, useRef } from "react";
import Cart from "./components/Cart";
import Header from "./components/Header";
import Meal from "./components/Meal";
import { MainContext } from "./context/MainContext";
import { createPortal } from "react-dom";
import Checkout from "./components/Checkout";

function App() {
  const { meals, order } = useContext(MainContext);
  const cartRef = useRef();
  const checkoutRef = useRef();

  const cartClickHandler = () => {
    if (order.length > 0) {
      cartRef.current.open();
    }
  };

   const orderClickHandler = () => {
    cartRef.current.close();
    checkoutRef.current.open();
  };


  return (
    <>
      {order.length > 0 ? createPortal(
        <Cart ref={cartRef} onCheckout={orderClickHandler}/>,
        document.body
      ) : null}
      {true ? createPortal(
        <Checkout ref={checkoutRef} />,
        document.body
      ) : null}

      <Header onCartClick={cartClickHandler} />
      <main id="meals">
        {meals.map(({ id, name, price, description, image }) => <Meal
          key={id}
          id={id}
          name={name}
          price={price}
          description={description}
          image={image}
        />
        )}
      </main>
    </>
  );
}

export default App;
