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
          const res = await api.get(
            `/api/customer/profile/${storedCustomer.id}`
          );
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
      product: product,
    };

    console.log(orderData);

    try {
      await api.put(`/api/customer/update/${customer._id}`, form);
      console.log("Address Saved");
    } catch (error) {
      console.error("Address add fail");
    }

    try {
      await api.post("/api/order/add", orderData);
      alert(`Order placed with ${selectedPayment}. Thank you, ${form.name}!`);
      navigate("/");
    } catch (error) {
      console.error("Order failed:", error);
      alert("Order could not be placed. Please try again.");
    }
  };

  if (!product) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-4">
      <h3>Checkout</h3>
      <div className="row mt-4">
        {/* Product Summary */}
        <div className="col-md-5">
          <div className="card p-3 shadow-sm">
            <h5>Product Summary</h5>
            <img
              src={
                product.heroImage[0] ||
                "https://via.placeholder.com/400x300?text=No+Image"
              }
              className="img-fluid rounded mb-2"
              alt={product.name}
            />
            <p>
              <strong>{product.name}</strong>
            </p>
            <p className="text-muted">{product.shortDesc}</p>
            {product.price && (
              <p>
                <strong>Price:</strong> ₹{product.price}
              </p>
            )}
          </div>
          <div className="card shadow-sm p-4 border-0">
            <h5 className="mb-4">Order Summary</h5>

            <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
              <div>
                <strong>{product.name}</strong>
                <div className="text-muted small">
                  Qty: 1 × ₹{product.sellPrice}
                </div>
              </div>
            </div>

            <div className="border-top pt-3 mt-3">
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span>₹50</span>
              </div>
              <div className="d-flex justify-content-between border-top pt-3 fw-bold fs-5">
                <span>Total</span>
                <span>₹{product.sellPrice}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Billing Form */}
        <div className="col-md-7 col-lg-7">
          <form className="card p-4 shadow border-0" onSubmit={handleSubmit}>
            <h4 className="mb-4 text-center">Billing Details</h4>

            <div className="row g-3">
              {[
                ["name", "Full Name", "text"],
                ["email", "Email Address", "email"],
                ["phone", "Phone Number", "tel"],
                ["address", "Full Address", "text"],
                ["landMark", "Landmark", "text"],
                ["city", "City", "text"],
                ["state", "State", "text"],
                ["pincode", "Pincode", "tel"],
              ].map(([key, label, type]) => (
                <div className="col-12 col-md-6" key={key}>
                  <label className="form-label fw-medium">{label}</label>
                  <input
                    type={type}
                    name={key}
                    className="form-control"
                    placeholder={`Enter ${label.toLowerCase()}`}
                    value={form[key]}
                    onChange={handleChange}
                    required
                    inputMode={type === "tel" ? "numeric" : undefined}
                    pattern={key === "phone" ? "[0-9]{10}" : undefined}
                    maxLength={
                      key === "phone" ? 10 : key === "pincode" ? 6 : undefined
                    }
                  />
                </div>
              ))}
            </div>

            <div className="mt-4">
              <h5 className="mb-3">Select Payment Method</h5>
              <div className="d-flex flex-column gap-2">
                {["Cash on Delivery", "Card", "Online Payment"].map(
                  (method) => (
                    <div className="form-check" key={method}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={selectedPayment === method}
                        onChange={() => setSelectedPayment(method)}
                        id={method}
                        required
                      />
                      <label className="form-check-label" htmlFor={method}>
                        {method}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="mt-4">
              <button type="submit" className="btn btn-primary text-white w-100 py-2 fs-5">
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
