/* eslint-disable react/prop-types */
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import Modal from "../common/Modal";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { confirmPayment, createPaymentIntent } from "../../apis/payments";
import { toast } from "react-toastify";
import { transaction } from "../../redux/wallet";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentForm = () => {
  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.walletReducer);
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create PaymentIntent on the server
      const response = await createPaymentIntent({
        typeId: 2, // Credit transaction
        amount: parseFloat(amount),
        walletId: parseInt(wallet.id),
        lectureIds: [], // Add any other necessary fields
        teacherId: null,
        groupId: null,
      });

      const { clientSecret } = response.data;

      // Confirm the payment with Stripe
      const cardElement = elements.getElement(CardElement);
      console.log(cardElement);
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (paymentResult.error) {
        toast.error(paymentResult.error.message);
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        // Confirm the transaction on the server
        await confirmPayment({
          paymentIntentId: paymentResult.paymentIntent.id,
          paymentMethodId: paymentResult.paymentIntent.payment_method,
          typeId: 2, // Credit transaction
          amount: parseFloat(amount),
          walletId: parseInt(wallet.id),
          lectureIds: [], // Add any other necessary fields
          teacherId: null,
          groupId: null,
        });
        dispatch(transaction({ balance: wallet.balance + amount }));
        toast.success("Payment successful");
      }
    } catch (err) {
      toast.error("Payment failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <img src="/img/stripe.svg" alt="" className="w-60 mx-40" />
      <form onSubmit={handlePayment}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount:
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="border border-gray-300 rounded-lg p-3 w-full focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Number:
          </label>
          <div className="border border-gray-300 rounded-lg p-3">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button
            type="submit"
            disabled={loading || amount === 0}
            className={`bg-indigo-600 text-white px-10 py-3 rounded-lg w-fit font-medium ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            } transition duration-300 ease-in-out transform hover:bg-indigo-700`}
          >
            {loading ? "Processing..." : `Pay Now ${amount} DA`}
          </button>
        </div>
      </form>
    </div>
  );
};

function Deposit({ isOpen, close }) {
  return (
    <Modal
      title="Deposit"
      isOpen={isOpen}
      close={close}
      content={
        <Elements stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      }
    />
  );
}

export default Deposit;
