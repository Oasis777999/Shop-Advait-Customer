import React from "react";

const Footer = () => {
  return (
    <div>
      <footer class="bg-dark text-light pt-5 pb-3">
        <div class="container">
          <div class="row">
            {/* <!-- Policies --> */}
            <div class="col-md-4 mb-4">
              <h5 class="fw-semibold">Policies</h5>
              <ul class="list-unstyled">
                <li>
                  <a href="#" class="text-light text-decoration-none">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" class="text-light text-decoration-none">
                    Return & Shipping Policy
                  </a>
                </li>
                <li>
                  <a href="#" class="text-light text-decoration-none">
                    Refund and Cancellation policy
                  </a>
                </li>
                <li>
                  <a href="#" class="text-light text-decoration-none">
                    Privacy Policy
                  </a>
                </li>
              </ul>

              {/* <!-- Social Icons --> */}
              <div class="mt-3">
                <a href="#" class="text-light me-3">
                  <i class="bi bi-facebook"></i>
                </a>
                <a href="#" class="text-light me-3">
                  <i class="bi bi-instagram"></i>
                </a>
                <a href="#" class="text-light me-3">
                  <i class="bi bi-youtube"></i>
                </a>
              </div>
            </div>

            {/* <!-- Contact Us --> */}
            <div class="col-md-4 mb-4">
                <h5 class="fw-semibold">Contact Us</h5>
              <p class="mb-1">Mobile Number: +91-82829 82829</p>
              <p class="mb-0">WhatsApp: +91-82829 82829</p>
            </div>

            {/* Address */}
            <div class="col-md-4 mb-4">
              <h5 class="fw-semibold">Address</h5>
              <p class="mb-1">ADVAIT TELESERVICES Private Limited</p>
              <p class="mb-1">
                Office No.522, 5th Floor, Amanora Chambers,
                <br />
                Amanora Town Centre East Block, Pune 411028
              </p>
            </div>
          </div>

          <hr class="border-light" />
          <p class="text-center small mb-0">
            &copy; 2025, ADVAIT TELESERVICES PVT. LTD.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
