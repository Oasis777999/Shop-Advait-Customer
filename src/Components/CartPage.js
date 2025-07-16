import React, { useEffect, useState } from "react";
import api from "../apis/api"; // axios instance

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [customer, setCustomer] = useState({});

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

      // console.log(productResponses);

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
      const res = await api.post(
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
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
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

          <div className="d-flex justify-content-end">
            <h5>Total: ₹{total}</h5>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
