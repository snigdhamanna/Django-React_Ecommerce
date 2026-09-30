import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"


const Checkout = () => {
    const [form, setForm] = useState({
        name: "",
        address: "",
        phone: "",
        payment_method: "COD",
  });


    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    const navigate =useNavigate();
    const {clearCart} = useCart();
    

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASEURL}/api/orders/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        clearCart();
        alert("Order placed successfully!");
        navigate("/")
      } else {
        alert(data.error || "Order failed");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };



  return (
     <div className="container py-4">
      <div className="col-md-8 col-lg-5 mx-auto">
        <div className="card shadow-sm p-4">
          <h1 className="h3 fw-bold mb-3">Checkout</h1>

          <form onSubmit={handleSubmit}>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="form-control mb-3"
            />

            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
              required
              className="form-control mb-3"
            />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="form-control mb-3"
            />

            
            <select
              name="payment_method"
              value={form.payment_method}
              onChange={handleChange}
              className="form-select mb-3"
            >
              <option value="COD">Cash on Delivery</option>
              <option value="ONLINE">Online Payment</option>
            </select>

            <button className="btn btn-success w-100">Place Order</button>
          </form>


          </div>
          </div>
          </div>
  )
}

export default Checkout