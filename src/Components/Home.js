import React, { useEffect, useState } from "react";
import api from "../apis/api";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/api/product/list");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        alert("Failed to load products");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Available Products</h3>

      {/* Card Items */}
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div className="col-md-6 col-lg-4 mb-4" key={product._id}>
              <div className="card h-100 shadow-sm">
                {/* Hero Image */}
                <img
                  src={
                    product.heroImage[0] ||
                    "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "300px", objectFit: "cover" }}
                />

                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h4 className="card-title">{product.name}</h4>
                    <ul className="list-unstyled small">
                      <li>
                        <strong>Category:</strong> {product.category}
                      </li>
                      <li>
                        <strong>Color:</strong> {product.colour}
                      </li>
                    </ul>
                  </div>
                  <div>
                    <span className="me-2 text-muted">
                      <s>₹{product.costPrice}</s>
                    </span>
                    <span className="h5 text-dark">₹{product.sellPrice}</span>
                    {product.costPrice && product.sellPrice && (
                      <span className="badge bg-danger ms-2">
                        {Math.round(
                          ((product.costPrice - product.sellPrice) /
                            product.costPrice) *
                            100
                        )}
                        % OFF
                      </span>
                    )}
                  </div>
                  <div className="mt-2">
                    <span
                      className={`badge bg-${
                        product.status ? "success" : "secondary"
                      }`}
                    >
                      {product.status ? "Available" : "Unavailable"}
                    </span>
                  </div>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <button
                    className="btn btn btn-outline-success"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    View
                  </button>
                  <button className="btn btn-outline-primary">
                    Buy 
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
