import React, { useEffect, useState } from "react";
import api from "../apis/api"; // axios instance

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [customer, setCustomer] = useState({});

  console.log(products);
  
  

  useEffect(() => {
    const fetchCartAndProducts = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      try {
        // 1. Get cart from customer
        const res = await api.get(`/api/customer/cart/${user.id}`);
        const customerCart = res.data.cart || [];
        
        setCart(customerCart); // store raw cart
        
        console.log(res);
        

        // 2. Fetch each product details by ID
        const productResponses = await Promise.all(
          customerCart.map((item) =>
            api.get(`/api/product/${item.productId}`)
            
          )
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
                    <td>{item.quantity}</td>
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
