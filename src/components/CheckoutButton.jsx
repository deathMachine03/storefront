import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe("pk_test_...");

const CheckoutButton = ({ cartItems, address }) => {
  const handleCheckout = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/payment/create-checkout-session", {
        items: cartItems,
        address,
      });
      window.location.href = res.data.url;
    } catch (err) {
      alert("Ошибка оплаты");
      console.error(err);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
    >
      Перейти к оплате
    </button>
  );
};

export default CheckoutButton;
