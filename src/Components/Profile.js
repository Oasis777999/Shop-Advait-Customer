import React, { useEffect, useState } from "react";
import api from "../apis/api";

const Profile = () => {
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);

  let user = JSON.parse(localStorage.getItem("user"));
  console.log(user.id);

  const id = user.id;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerRes = await api.get(`/api/customer/profile/${id}`);
        setCustomer(customerRes.data);

        const orderRes = await api.get(`/api/order/customer/${id}`);
        setOrders(orderRes.data);
      } catch (error) {
        console.error("Error loading profile or orders:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!customer)
    return <div className="container mt-5">Loading profile...</div>;

  return (
    <div className="container mt-4">
      <h3>Customer Profile</h3>
      <div className="card p-4 shadow-sm mb-4">
        <p>
          <strong>Name:</strong> {customer.name}
        </p>
        <p>
          <strong>Email:</strong> {customer.email}
        </p>
        <p>
          <strong>Mobile:</strong> {customer.mobile}
        </p>
        <p>
          <strong>Address:</strong> {customer.address}
        </p>
        <p>
          <strong>City:</strong> {customer.city}
        </p>
        <p>
          <strong>State:</strong> {customer.state}
        </p>
        <p>
          <strong>Pincode:</strong> {customer.pincode}
        </p>
        <p>
          <strong>Landmark:</strong> {customer.landMark}
        </p>
      </div>

      <h4>My Orders</h4>
      {orders.length === 0 ? (
        <div className="alert alert-warning text-center mt-4">
          No orders placed yet.
        </div>
      ) : (
        <div className="table-responsive mt-4">
          <table className="table table-hover align-middle shadow-sm rounded">
            <thead className="table-dark text-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product</th>
                <th scope="col">Payment</th>
                <th scope="col">Status</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr key={order._id}>
                  <td>{idx + 1}</td>
                  <td>
                    <span className="text-primary">{order.productId}</span>
                  </td>
                  <td>
                    <span className="badge bg-info text-dark">
                      {order.paymentMethod}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        order.status === "Delivered"
                          ? "bg-success"
                          : order.status === "Cancelled"
                          ? "bg-danger"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Profile;
