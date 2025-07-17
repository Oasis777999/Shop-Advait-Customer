import React, { useEffect, useState } from "react";
import api from "../apis/api";
import { Link, useNavigate } from "react-router-dom";

const sliderImages = [
  {
    src: "https://media.tomtom.com/f/178460/1920x800/0032ce87bd/apps-landing-slider-go-nav-app-desktop.jpg",
    alt: "Product 1",
  },
  {
    src: "https://chirpgps.com/images/sliderbg3.jpg",
    alt: "Product 2",
  },
  {
    src: "https://www.vms4x4.com/cdn/shop/files/3DX_v4_1400x.jpg?v=1661471859",
    alt: "Product 3",
  },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const storedCustomer = JSON.parse(localStorage.getItem("user"));

  const ProductInCart = async (id) => {
    try {
      const res = await api.post(`/api/customer/cart/${storedCustomer.id}`, {
        productId: id,
      });
      alert("Product added to cart");
    } catch (error) {
      console.log("Product save to cart failed:", error.message);
    }
  };

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
    <>
      <div className="container-fluid">
        <div
          id="homeSlider"
          className="carousel slide mb-4"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {sliderImages.map((img, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  src={img.src}
                  className="d-block w-100"
                  alt={img.alt}
                  style={{ maxHeight: "800px", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>

          {/* Optional Controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#homeSlider"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#homeSlider"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>

      {/* Card Items */}
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="container">
          <h3 className="mb-4">Available Products</h3>
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

                  <div className="card-body d-flex flex-column justify-content-between pt-5">
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
                      <span className="h4 text-dark">₹{product.sellPrice}</span>
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
                    {storedCustomer ? (
                      <button
                        className="btn btn-outline-primary btn-lg"
                        onClick={() => ProductInCart(product._id)}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => navigate("/login")}
                      >
                        Buy Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
