import { forwardRef, useContext, useImperativeHandle, useMemo, useRef } from "react";
import { MainContext } from "../context/MainContext";
import { useActionState } from "react";

const Checkout = forwardRef((prop, ref) => {
    const { actions } = useContext(MainContext);

    const dialogRef = useRef();

    useImperativeHandle(ref, () => ({
        open: () => {
            dialogRef.current.showModal();
        }
    }));

    const [state, submitAction, pending] = useActionState(async (previousState, formData) => {
        const {fullname, email, street, postcode, city} = Object.fromEntries(formData.entries());
        const state = {fullname, email, street, postcode, city};
        if (fullname.trim() === "") {
            return {...state, error: "Full Name is empty."};
        }
        if (!email.includes("@")) {
            return {...state, error: "E-mail is wrong."};
        }
      
        if (street.trim() === "") {
            return {...state, error: "Street is empty"};
        }
        if (postcode <= 0) {
            return {...state, error: "Post Code is wrong"};
        }
        if (city.trim() === "") {
            return {...state, error: "City is empty"};
        }

        await actions.checkoutHandler(state);
        dialogRef.current.close();

        return state;
      }, {});

    return <dialog className="modal" ref={dialogRef}>
        <div>
            <h2>Checkout</h2>
            <form action={submitAction}>
                <div className="control">
                    <label>Full Name</label>
                    <input name="fullname" defaultValue={state.fullname}/>
                </div>

                <div className="control">
                    <label>E-Mail Address</label>
                    <input name="email" type="email" defaultValue={state.email}/>
                </div>

                <div className="control">
                    <label>Street</label>
                    <input name="street" defaultValue={state.street}/>
                </div>

                <div className="control-row">
                    <div className="control">
                        <label>Post Code</label>
                        <input type="number" name="postcode" defaultValue={state.postcode}/>
                    </div>
                    <div className="control">
                        <label>City</label>
                        <input name="city" defaultValue={state.city}/>
                    </div>
                </div>

                {state.error && <div className="error">{state.error}</div>}


                <div className="modal-actions">
                    <button className="text-button" onClick={() => dialogRef.current.close()} disabled={pending}>Close</button>
                    <button className="button" disabled={pending}>Checkout</button>
                </div>
            </form>

        </div>
    </dialog>;

});

export default Checkout;