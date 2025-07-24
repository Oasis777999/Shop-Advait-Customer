import React, { useEffect, useState } from "react";
import api from "../apis/api"; // axios instance
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  // User stored in the localstorage
  const user = JSON.parse(localStorage.getItem("user"));

  console.log(products);

  const fetchCartAndProducts = async () => {
    try {
      // 1. Get cart from customer
      const res = await api.get(`/api/customer/cart/${user.id}`);
      const customerCart = res.data.cart || [];

      setCart(customerCart); // store raw cart

      console.log(res);

      // 2. Fetch each product details by ID
      const productResponses = await Promise.all(
        customerCart.map((item) => api.get(`/api/product/${item.productId}`))
      );

      console.log(productResponses);

      // 3. Merge product info with quantity
      const fullProducts = productResponses.map((res, index) => ({
        ...res.data,
        quantity: customerCart[index].quantity,
      }));

      setProducts(fullProducts);
    } catch (error) {
      console.error("Error fetching cart or product info", error);
    }
  };

  const updateQuantity = async (productId, action) => {
    try {
      await api.post(
        `/api/customer/cart/update-quantity/${user.id}`,
        { productId, action }
      );
    } catch (error) {
      console.error("Quantity update failed : ", error.message);
    }
    fetchCartAndProducts();
  };

  useEffect(() => {
    fetchCartAndProducts();
  }, []);

  const total = products.reduce(
    (sum, item) => sum + item.sellPrice * item.quantity,
    0
  );

  return (
    <div className="container py-4">
      <h3 className="mb-4">Your Cart</h3>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead className="table-light">
                <tr>
                  <th>Sr. No</th>
                  <th>Product</th>
                  <th>Description</th>
                  <th>Color</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={item.heroImage[0]}
                        height={100}
                        width={100}
                      ></img>
                    </td>
                    <td className="fw-bold">{item.name}</td>
                    <td>{item.colour}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => updateQuantity(item._id, "decrease")}
                        >
                          –
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => updateQuantity(item._id, "increase")}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>₹{item.sellPrice}</td>
                    <td>₹{item.sellPrice * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex flex-column align-items-end mt-4">
            <h5>Total: ₹{total}</h5>
            <button
              className="btn btn-primary btn-lg mt-2"
              onClick={() =>navigate("/checkout")}
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
