import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../apis/api";

const DetailedProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/api/product/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error loading product:", err);
        alert("Could not load product");
        navigate("/productlist");
      }
    };

    fetchProduct();
  }, [id, navigate]);

  if (!product) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="row g-4">
        {/* Image Section */}
        <div className="col-md-6">
          <div className="border rounded p-3 bg-light shadow-sm">
            <img
              src={
                product.heroImage ||
                "https://via.placeholder.com/500x400?text=No+Image"
              }
              className="img-fluid rounded"
              alt={product.name}
              style={{ objectFit: "cover", maxHeight: "400px", width: "100%" }}
            />
          </div>
        </div>

        {/* Product Info Section */}
        <div className="col-md-6">
          <h2 className="fw-bold">{product.name}</h2>
          <p className="text-muted">{product.shortDesc}</p>
          <hr />

          <div className="mb-3">
            <span className="badge bg-secondary me-2">{product.category}</span>
            <span className="badge bg-info">{product.brand}</span>
          </div>

          <div>
            <span className="me-2 text-muted">
              <s>₹{product.costPrice}</s>
            </span>
            <span className="h5 text-dark">₹{product.sellPrice}</span>
            {product.costPrice > product.sellPrice && (
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

          {/* Optional: Pricing */}
          {product.price && <h4 className="text-success">₹ {product.price}</h4>}

          <table className="table table-sm table-striped mt-4">
            <tbody>
              <tr>
                <th>SKU</th>
                <td>{product.sku}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{product.status ? "Available" : "Unavailable"}</td>
              </tr>
              <tr>
                <th>Payment</th>
                <td>{product.payment}</td>
              </tr>
              <tr>
                <th>Sequence</th>
                <td>{product.sequence}</td>
              </tr>
              <tr>
                <th>Colour</th>
                <td>{product.colour}</td>
              </tr>
              <tr>
                <th>Warranty</th>
                <td>{product.warranty}</td>
              </tr>
              <tr>
                <th>Length</th>
                <td>{product.length} cm</td>
              </tr>
              <tr>
                <th>Breadth</th>
                <td>{product.breadth} cm</td>
              </tr>
              <tr>
                <th>Height</th>
                <td>{product.height} cm</td>
              </tr>
              <tr>
                <th>Weight</th>
                <td>{product.weight} kg</td>
              </tr>
            </tbody>
          </table>

          {/* Action Buttons */}
          <div className="d-flex gap-3 mt-4">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate(`/checkout/${product._id}`)}
            >
              Buy Now
            </button>
            <button
              className="btn btn-outline-secondary btn-lg"
              onClick={() => navigate(`/billing/${product._id}`)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedProduct;
