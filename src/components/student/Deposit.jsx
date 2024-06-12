/* eslint-disable react/prop-types */
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import Modal from "../common/Modal";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { confirmPayment, createPaymentIntent } from "../../apis/payments";
import { transaction } from "../../redux/wallet";
import Lottie from "react-lottie";
import * as successAnimationData from "./success-animation.json";
import * as failedAnimationData from "./failed-animation.json";
import "./PaymentForm.css";
import StripeLogo from "./stripelogo.png"; // Ensure the correct path

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// const PaymentForm = () => {
//   const dispatch = useDispatch();
//   const wallet = useSelector((state) => state.walletReducer);
//   const stripe = useStripe();
//   const elements = useElements();
//   const [amount, setAmount] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handlePayment = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Create PaymentIntent on the server
//       const response = await createPaymentIntent({
//         typeId: 2, // Credit transaction
//         amount: parseFloat(amount),
//         walletId: parseInt(wallet.id),
//         lectureIds: [], // Add any other necessary fields
//         teacherId: null,
//         groupId: null,
//       });

//       const { clientSecret } = response.data;

//       // Confirm the payment with Stripe
//       const cardElement = elements.getElement(CardElement);
//       console.log(cardElement);
//       const paymentResult = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: cardElement,
//         },
//       });

//       if (paymentResult.error) {
//         toast.error(paymentResult.error.message);
//       } else if (paymentResult.paymentIntent.status === "succeeded") {
//         // Confirm the transaction on the server
//         await confirmPayment({
//           paymentIntentId: paymentResult.paymentIntent.id,
//           paymentMethodId: paymentResult.paymentIntent.payment_method,
//           typeId: 2, // Credit transaction
//           amount: parseFloat(amount),
//           walletId: parseInt(wallet.id),
//           lectureIds: [], // Add any other necessary fields
//           teacherId: null,
//           groupId: null,
//         });
//         dispatch(transaction({ balance: parseFloat(amount) + wallet.balance }));
//         toast.success("Payment successful");
//       }
//     } catch (err) {
//       toast.error("Payment failed. Please try again.");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg">
//       <img src="/img/stripe.svg" alt="" className="w-60 mx-40" />
//       <form onSubmit={handlePayment}>
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Amount:
//           </label>
//           <input
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             required
//             className="border border-gray-300 rounded-lg p-3 w-full focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Card Number:
//           </label>
//           <div className="border border-gray-300 rounded-lg p-3">
//             <CardElement
//               options={{
//                 style: {
//                   base: {
//                     fontSize: "16px",
//                     color: "#424770",
//                     "::placeholder": {
//                       color: "#aab7c4",
//                     },
//                   },
//                   invalid: {
//                     color: "#9e2146",
//                   },
//                 },
//               }}
//             />
//           </div>
//         </div>
//         <div className="w-full flex justify-center">
//           <button
//             type="submit"
//             disabled={loading || amount === 0}
//             className={`bg-indigo-600 text-white px-10 py-3 rounded-lg w-fit font-medium ${
//               loading ? "opacity-50 cursor-not-allowed" : ""
//             } transition duration-300 ease-in-out transform hover:bg-indigo-700`}
//           >
//             {loading ? "Processing..." : `Pay Now ${amount} DA`}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// eslint-disable-next-line no-unused-vars
const PaymentForm = ({ clientSecret, amount, walletId, close, wallet }) => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [showFailedAnimation, setShowFailedAnimation] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    setShowSuccessAnimation(false);
    setShowFailedAnimation(false);

    try {
      const paymentResult = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Do not include return_url to stay on the same page
        },
        redirect: "if_required", // This will prevent redirection if the payment doesn't require additional steps
      });

      if (paymentResult.error) {
        setError(paymentResult.error.message);
      } else if (
        paymentResult.paymentIntent &&
        paymentResult.paymentIntent.status === "succeeded"
      ) {
        // Confirm the transaction on the server
        await confirmPayment({
          paymentIntentId: paymentResult.paymentIntent.id,
          paymentMethodId: paymentResult.paymentIntent.payment_method,
          typeId: 2, // Credit transaction
          amount: parseFloat(amount),
          walletId: parseInt(walletId),
          lectureIds: [], // Add any other necessary fields
          teacherId: null,
          groupId: null,
        });
        dispatch(transaction({ balance: parseFloat(amount) + wallet.balance }));
        setSuccess("Payment successful!");
        setTimeout(() => {
          close();
        }, 3000); // Adjust the timeout duration to match your animation duration
      }
    } catch (err) {
      setError("Payment failed. Please try again.");
    }

    setLoading(false);
  };

  const successOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const failedOptions = {
    loop: false,
    autoplay: true,
    animationData: failedAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="payment-form-container">
      {showSuccessAnimation && (
        <div className="success-animation">
          <Lottie options={successOptions} height={600} width={600} />
        </div>
      )}
      {showFailedAnimation && (
        <div className="failed-animation">
          <Lottie options={failedOptions} height={600} width={600} />
        </div>
      )}
      <div className="flex justify-center">
        <div className="stripe-logo">
          <img src={StripeLogo} alt="Stripe" />
        </div>
      </div>
      <form onSubmit={handlePayment}>
        <label>
          Amount:
          <input type="number" value={amount} disabled className="min-w-96" />
        </label>
        <PaymentElement />
        <button type="submit" disabled={loading} className="my-3">
          {loading ? "Processing..." : "Pay"}
        </button>
      </form>
      {error && <div className="message error-message">{error}</div>}
      {success && <div className="message success-message">{success}</div>}
      <div className="flex justify-center">
        <div className="powered-by-stripe">
          <img
            src="https://img.shields.io/badge/Powered%20by-Stripe-5a67d8?style=for-the-badge&logo=stripe&logoColor=white"
            alt="Powered by Stripe"
          />
        </div>
      </div>
    </div>
  );
};

function Deposit({ isOpen, close }) {
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState(1); // 1: Input step, 2: Payment step
  const wallet = useSelector((state) => state.walletReducer);

  const handleNext = async () => {
    // Fetch client secret from your backend
    const response = await createPaymentIntent({
      typeId: 2, // Credit transaction
      amount: parseFloat(amount),
      walletId: parseInt(wallet.id),
      lectureIds: [], // Add any other necessary fields
      teacherId: null,
      groupId: null,
    });
    setClientSecret(response.data.clientSecret);
    setStep(2); // Move to the payment step
  };
  return (
    <Modal
      title="Deposit"
      isOpen={isOpen}
      close={() => {
        setAmount(0);
        setStep(1);
        close();
      }}
      content={
        step === 1 ? (
          <div className="initial-form-container">
            <label>
              Amount:
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                min={100}
              />
            </label>
            <button onClick={handleNext} disabled={!amount}>
              Next
            </button>
          </div>
        ) : (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm
              clientSecret={clientSecret}
              amount={amount}
              walletId={wallet.id}
              wallet={wallet}
              close={() => {
                setAmount(0);
                setStep(1);
                close();
              }}
            />
          </Elements>
        )
      }
    />
  );
}

export default Deposit;
