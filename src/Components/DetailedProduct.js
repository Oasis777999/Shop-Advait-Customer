import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../apis/api";
import ProductImageSlider from "./ProductImageSlider";

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

  // Display all the images stored for database
  const sampleImages = [
    "https://as2.ftcdn.net/jpg/03/80/45/67/1000_F_380456718_GvztQTLq7G7QWlTovmDmmZLOd2KTl4Ss.jpg",
    "https://t3.ftcdn.net/jpg/08/30/29/20/240_F_830292015_ygQp4THNtsi9RmhIlZwB0sn3IIdlYRis.jpg",
    "https://as2.ftcdn.net/jpg/03/80/45/67/1000_F_380456718_GvztQTLq7G7QWlTovmDmmZLOd2KTl4Ss.jpg",
    "https://t3.ftcdn.net/jpg/08/30/29/20/240_F_830292015_ygQp4THNtsi9RmhIlZwB0sn3IIdlYRis.jpg",
    "https://as2.ftcdn.net/jpg/03/80/45/67/1000_F_380456718_GvztQTLq7G7QWlTovmDmmZLOd2KTl4Ss.jpg",
    "https://t3.ftcdn.net/jpg/08/30/29/20/240_F_830292015_ygQp4THNtsi9RmhIlZwB0sn3IIdlYRis.jpg",
    "https://as2.ftcdn.net/jpg/03/80/45/67/1000_F_380456718_GvztQTLq7G7QWlTovmDmmZLOd2KTl4Ss.jpg",
    "https://t3.ftcdn.net/jpg/08/30/29/20/240_F_830292015_ygQp4THNtsi9RmhIlZwB0sn3IIdlYRis.jpg",
    "https://as2.ftcdn.net/jpg/03/80/45/67/1000_F_380456718_GvztQTLq7G7QWlTovmDmmZLOd2KTl4Ss.jpg",
    "https://t3.ftcdn.net/jpg/08/30/29/20/240_F_830292015_ygQp4THNtsi9RmhIlZwB0sn3IIdlYRis.jpg",
    "https://as2.ftcdn.net/jpg/03/80/45/67/1000_F_380456718_GvztQTLq7G7QWlTovmDmmZLOd2KTl4Ss.jpg",
    "https://t3.ftcdn.net/jpg/08/30/29/20/240_F_830292015_ygQp4THNtsi9RmhIlZwB0sn3IIdlYRis.jpg",
  ];

  return (
    <>
      <div className="container mt-4">
        <div className="row g-4">
          {/* Image Section */}
          <div className="col-md-6">
            {/* <div className="border rounded p-3 bg-light shadow-sm">
            <img
              src={
                product.heroImage ||
                "https://via.placeholder.com/500x400?text=No+Image"
              }
              className="img-fluid rounded"
              alt={product.name}
              style={{ objectFit: "cover", maxHeight: "400px", width: "100%" }}
            />
          </div> */}
            <ProductImageSlider images={sampleImages} />
          </div>

          {/* Product Info Section */}
          <div className="col-md-6">
            <h2 className="fw-bold">{product.name}</h2>
            <p className="text-muted">{product.shortDesc}</p>
            <hr />

            <div className="mb-3">
              <span className="badge bg-secondary me-2">
                {product.category}
              </span>
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
            {product.price && (
              <h4 className="text-success">₹ {product.price}</h4>
            )}

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

      <section class="py-5 bg-light text-center">
        <div class="container">
          <h4 class="mb-4 fw-semibold">Suitable for</h4>
          <div class="row justify-content-center">
            <div class="col-6 col-md-4 mb-3">
              <i class="bi bi-bicycle"></i>
              <h4 class="fw-semibold">Superbikes</h4>
            </div>

            <div class="col-6 col-md-4 mb-3">
              <i class="bi bi-car-front-fill"></i>
              <h4 class="fw-semibold">Cars</h4>
            </div>

            <div class="col-6 col-md-4 mb-3">
              <i class="bi bi-truck-front"></i>
              <h4 class="fw-semibold">Scooter</h4>
            </div>
          </div>
        </div>
      </section>

      <section class="py-5 bg-light">
        <div class="container">
          <h3 class="text-center mb-5 fw-bold">Benefits</h3>

          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {/* <!-- Benefit Card 1 --> */}
            <div class="col">
              <div class="card h-100 border-0 shadow-sm">
                <img
                  src="https://vamosys.com/wp-content/uploads/2020/10/GPS-tracker.svg"
                  class="card-img-top rounded-top"
                  alt="Real-Time Vehicle Tracking"
                />
                <div class="card-body">
                  <h6 class="card-title fw-semibold">
                    Real-Time Vehicle Tracking
                  </h6>
                  <p class="card-text text-muted small">
                    Monitor your vehicle's live location and movements in
                    real-time using the GPS app.
                  </p>
                </div>
              </div>
            </div>

            {/* <!-- Benefit Card 2 --> */}
            <div class="col">
              <div class="card h-100 border-0 shadow-sm">
                <img
                  src="https://mobicip-content-files.s3.amazonaws.com/Family%20Locator%20App%20.jpg"
                  class="card-img-top rounded-top"
                  alt="Family Vehicle Tracker"
                />
                <div class="card-body">
                  <h6 class="card-title fw-semibold">
                    App-Enabled Family Tracker
                  </h6>
                  <p class="card-text text-muted small">
                    Keep your family safe by sharing real-time location through
                    app-enabled tracking.
                  </p>
                </div>
              </div>
            </div>

            {/* <!-- Benefit Card 3 --> */}
            <div class="col">
              <div class="card h-100 border-0 shadow-sm">
                <img
                  src="https://planetretail.com.au/wp-content/uploads/2021/02/GeoFence_AdvSite.png"
                  class="card-img-top rounded-top"
                  alt="Geo-Fencing Alerts"
                />
                <div class="card-body">
                  <h6 class="card-title fw-semibold">Geo-Fencing Alerts</h6>
                  <p class="card-text text-muted small">
                    Get alerts if your vehicle crosses custom-defined zones for
                    enhanced security.
                  </p>
                </div>
              </div>
            </div>

            {/* <!-- Benefit Card 4 --> */}
            <div class="col">
              <div class="card h-100 border-0 shadow-sm">
                <img
                  src="https://www.intellitrac.com.au/images/pics/DriverBehaviourCoR570x310.jpg"
                  class="card-img-top rounded-top"
                  alt="Driver Behavior Monitoring"
                />
                <div class="card-body">
                  <h6 class="card-title fw-semibold">
                    Driver Behavior Monitoring
                  </h6>
                  <p class="card-text text-muted small">
                    Detect harsh braking, speeding, and unsafe driving patterns
                    through the GPS system.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-5 bg-white">
        <div class="container">
          <h2 class="text-center fw-bold mb-5">Frequently Asked Questions</h2>

          <div class="accordion accordion-flush" id="faqAccordion">
            {/* <!-- FAQ 1 --> */}
            <div class="accordion-item bg-light rounded mb-3">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed bg-light fw-semibold rounded"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq1"
                >
                  Q: Can I install the GPS device myself?
                </button>
              </h2>
              <div
                id="faq1"
                class="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >
                <div class="accordion-body text-muted">
                  We provide free installation. Just call the customer care
                  number from our website. You can also install it yourself if
                  you're familiar with the internal wiring of your vehicle.
                </div>
              </div>
            </div>

            {/* <!-- FAQ 2 --> */}
            <div class="accordion-item bg-light rounded mb-3">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed bg-light fw-semibold rounded"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq2"
                >
                  Q: How long does the device’s inbuilt battery last if
                  disconnected from the vehicle battery?
                </button>
              </h2>
              <div
                id="faq2"
                class="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >
                <div class="accordion-body text-muted">
                  The Wired GPS device has a 270 mAh inbuilt battery that lasts
                  up to 4 hours if disconnected.
                </div>
              </div>
            </div>

            {/* <!-- FAQ 3 --> */}
            <div class="accordion-item bg-light rounded mb-3">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed bg-light fw-semibold rounded"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq3"
                >
                  Q: Can I monitor my vehicle from outside India?
                </button>
              </h2>
              <div
                id="faq3"
                class="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >
                <div class="accordion-body text-muted">
                  Yes, you can track your vehicle’s live location from anywhere
                  in and outside India using our app.
                </div>
              </div>
            </div>

            {/* <!-- FAQ 4 --> */}
            <div class="accordion-item bg-light rounded mb-3">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed bg-light fw-semibold rounded"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq4"
                >
                  Q: Is this device compatible with bikes?
                </button>
              </h2>
              <div
                id="faq4"
                class="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >
                <div class="accordion-body text-muted">
                  Absolutely! The device works with all bikes, trucks, and car
                  models. Just ensure you select the correct subscription plan
                  from our website.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailedProduct;
