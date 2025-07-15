import React, { useEffect, useState } from "react";
import api from "../apis/api";

const Profile = () => {
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const id = user?.id;

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

    if (id) fetchData();
  }, [id]);

  if (!customer)
    return <div className="container mt-5 text-center">Loading profile...</div>;

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Customer Profile</h3>
      {/* Customer Profile */}
      <div className="card shadow-sm p-4 mb-5">
        <div className="row">
          <div className="col-md-6">
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
          </div>
          <div className="col-md-6">
            <p>
              <strong>City:</strong> {customer.city}
            </p>
            <p>
              <strong>State:</strong> {customer.state}
            </p>
            <p>
              <strong>Pincode:</strong> {customer.pincode}
            </p>
          </div>
        </div>
      </div>

      {/* Order List  */}
      <h4 className="mb-3">My Orders</h4>
      {orders.length === 0 ? (
        <div className="alert alert-warning text-center">
          No orders placed yet.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr key={order._id}>
                  <td>{idx + 1}</td>
                  <td className="text-primary">
                    {/* If productId is populated with full product object */}
                    {typeof order.productId === "object"
                      ? order.productId.name
                      : order.productId}
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
