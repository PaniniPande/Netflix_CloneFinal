import React, { useEffect, useState } from 'react';
import db from "../firebase";
import './PlansScreen.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/counter/userSlice';
import { loadStripe } from "@stripe/stripe-js";

function PlansScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    const [subscriptions, setSubscriptions] = useState(null);

    useEffect(() => {
        db.collection('customers').doc(user.uid).collection('subscriptions').get().then(querySnapshot => {
            querySnapshot.forEach(async subscriptions => {
                setSubscriptions({
                    role: subscriptions.data().role,
                    current_period_end: subscriptions.data().current_period_end.seconds,
                    current_period_start: subscriptions.data().current_period_start.seconds
                });
            });
        });
    }, [user.uid]);

    useEffect(() => {
        db.collection('products').where('active', '==', true).get().then((querySnapshot) => {
            const products = {};
            querySnapshot.forEach(async productDoc => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection('prices').get();
                priceSnap.docs.forEach(price => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data()
                    };
                });
            });
            setProducts(products);
        });
    }, []);

    console.log(products);
    console.log(subscriptions);

    const loadCheckout = async (priceId) => {
        const docRef = await db.collection('customers').doc(user.uid).collection("checkout_sessions").add({
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin
        });

        docRef.onSnapshot(async (snap) => {
            const { error, sessionId } = snap.data();

            if (error) {
                alert(`An error occurred: ${error.message}`);
            }

            if (sessionId) {
                const stripe = await loadStripe("pk_test_51N8VUfJSA252XYBeDOTH0XBWl3l6rgjxl8ZHVewz1DDA5iCRYcPdvO264F2q77NFQPbUleRNni82Lt6els0Rup1D00io29zoq7");
                stripe.redirectToCheckout({ sessionId });
            }
        });
    };

    return (
        <div className='plansScreen'>
            <br />
            {subscriptions && (
                <p>
                    Renewal Date: {new Date(subscriptions?.current_period_end * 1000).toLocaleDateString()}
                </p>
            )}
            {Object.entries(products).map(([productId, productData]) => {
                // add some logic to check if user subscriptions is active
                const isCurrentPackage = productData.name?.toLowerCase().includes(subscriptions?.role.toLowerCase());

                console.log(isCurrentPackage);
                return (
                    <div
                        key={productId}
                        className={`${isCurrentPackage && "plansScreen__plan--disabled"} plansScreen__plan`}
                    >
                        <div className='plansScreen__info'>
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}>
                            {isCurrentPackage ? 'Current Package' : 'Subscribe'}
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
export default PlansScreen;

