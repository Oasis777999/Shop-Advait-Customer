import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../apis/api";

const CheckoutPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    landMark: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [selectedPayment, setSelectedPayment] = useState("");
  
  useEffect(() => {
    const fetchCustomer = async () => {
      const storedCustomer = JSON.parse(localStorage.getItem("user"));
      console.log(storedCustomer);
      
      if (storedCustomer && storedCustomer.id) {
        try {
          const res = await api.get(`/api/customer/profile/${storedCustomer.id}`);
          const data = res.data;
          setCustomer(data);
          setForm({
            name: data.name || "",
            phone: data.mobile || "",
            email: data.email || "",
            address: data.address || "",
            landMark: data.landMark || "",
            city: data.city || "",
            state: data.state || "",
            pincode: data.pincode || "",
          });
        } catch (err) {
          console.error("Failed to load customer profile", err);
        }
      } else {
        alert("Please login to continue");
        navigate("/login");
      }
    };

    const fetchProduct = async () => {
      try {
        const res = await api.get(`/api/product/${id}`);
        console.log(res.data);
        
        setProduct(res.data);
      } catch (err) {
        console.error("Product fetch failed:", err);
        alert("Product not found");
        navigate("/productlist");
      }
    };

    fetchCustomer();
    fetchProduct();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPayment) {
      alert("Please select a payment method");
      return;
    }    

    const orderData = {
      productId: product._id,
      customerId: customer._id,
      paymentMethod: selectedPayment,
      billingData: form,
      product:product
    };

    console.log(orderData);
    

    try {
      await api.post("/api/order/add", orderData);
      alert(`Order placed with ${selectedPayment}. Thank you, ${form.name}!`);
      navigate("/");
    } catch (error) {
      console.error("Order failed:", error);
      alert("Order could not be placed. Please try again.");
    }
  };

  if (!product || !form.name) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-4">
      <h3>Checkout</h3>
      <div className="row mt-4">
        {/* Product Summary */}
        <div className="col-md-5">
          <div className="card p-3 shadow-sm">
            <h5>Product Summary</h5>
            <img
              src={product.heroImage || "https://via.placeholder.com/400x300?text=No+Image"}
              className="img-fluid rounded mb-2"
              alt={product.name}
            />
            <p><strong>{product.name}</strong></p>
            <p className="text-muted">{product.shortDesc}</p>
            {product.price && <p><strong>Price:</strong> ₹{product.price}</p>}
          </div>
        </div>

        {/* Billing Form */}
        <div className="col-md-7">
          <form className="card p-4 shadow-sm" onSubmit={handleSubmit}>
            <h5>Billing Details</h5>

            {[
              ["name", "Full Name"],
              ["email", "Email Address"],
              ["phone", "Phone Number"],
              ["address", "Full Address"],
              ["landMark", "Landmark"],
              ["city", "City"],
              ["state", "State"],
              ["pincode", "Pincode"]
            ].map(([key, label]) => (
              <div className="mb-3" key={key}>
                <label className="form-label">{label}</label>
                <input
                  type={key === "pincode" || key === "phone" ? "number" : "text"}
                  name={key}
                  className="form-control"
                  value={form[key]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}

            <h5 className="mt-4">Select Payment Method</h5>
            {["Cash on Delivery", "Card", "Online Payment"].map((method) => (
              <div className="form-check mb-2" key={method}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={selectedPayment === method}
                  onChange={() => setSelectedPayment(method)}
                  id={method}
                />
                <label className="form-check-label" htmlFor={method}>
                  {method}
                </label>
              </div>
            ))}

            <button type="submit" className="btn btn-success w-100 mt-3">
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
