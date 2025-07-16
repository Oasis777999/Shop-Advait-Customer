import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../apis/api";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
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

  console.log("Product List", product);

  useEffect(() => {
    fetchCustomer();
  }, [navigate]);

  useEffect(() => {
    if (customer) {
      fetchProduct();
    }
  });

  const fetchCustomer = async () => {
    const storedCustomer = JSON.parse(localStorage.getItem("user"));

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
      if (!customer) return;

      const productIdList = customer.cart; // [{ productId, quantity }]
      console.log("Cart:", productIdList);

      // Fetch product details for each item in the cart
      const productResponses = await Promise.all(
        productIdList.map((item) => api.get(`/api/product/${item.productId}`))
      );

      // Combine product details with quantity from cart
      const fullProducts = productResponses.map((res, index) => ({
        ...res.data,
        quantity: productIdList[index].quantity,
      }));

      console.log("Products with quantity:", fullProducts);

      setProduct(fullProducts);
    } catch (err) {
      console.error("Product fetch failed:", err.message);
    }
  };

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

  const total = product.reduce(
    (sum, item) => sum + item.sellPrice * item.quantity,
    0
  );

  const costTotal = product.reduce(
    (sum, item) => sum + item.costPrice * item.quantity,
    0
  );

  const discount = costTotal - total;

  if (!product) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-4">
      <h3>Checkout</h3>
      <div className="row mt-4">
        {/* Product Summary */}
        <div className="col-md-5">
          <h5 className="mb-4">Order Summary</h5>

          <div className="card shadow-sm p-4 border-0 mb-4">
            {/* List of Products */}
            {product.map((product, index) => (
              <div
                key={index}
                className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2"
              >
                <div>
                  <strong>{product.name}</strong>
                  <div className="text-muted small">
                    Qty: {product.quantity} × ₹{product.sellPrice}
                  </div>
                </div>
                <div>₹{product.quantity * product.sellPrice}</div>
              </div>
            ))}

            {/* Shipping and Total */}
            <div className="border-top pt-3 mt-3">
              <div className="d-flex justify-content-between mb-2">
                <span>Sub Total</span>
                <span className="">₹{costTotal}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Delivery Charges</span>
                <span className="text-decoration-line-through">₹50</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Your total savings</span>
                <span className="text-decoration-line-through">₹ {discount}</span>
              </div>
              <div className="d-flex justify-content-between border-top pt-3 fw-bold fs-5">
                <span>Total</span>
                <span>₹{total}</span>
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
              <button
                type="submit"
                className="btn btn-primary text-white w-100 py-2 fs-5"
              >
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
