import React from "react";

const AboutUs = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">About AdvaitCart</h2>
      <div className="row">
        <div className="col-md-6 mb-4">
          <img
            src="https://shop.advaitteleservices.com/assets-front/img/bg/bg.png"
            alt="GPS Devices"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <h4 className="mb-3">Your Trusted Destination for GPS & Camera Solutions</h4>
          <p>
            At <strong>AdvaitCart</strong>, we specialize in providing advanced GPS tracking and high-resolution camera systems designed to offer security, transparency, and control for both personal and commercial vehicles.
          </p>
          <p>
            Whether you are a car owner, fleet manager, or concerned parent, our intelligent GPS and surveillance devices are tailored to meet your tracking and monitoring needs.
          </p>
          <p>
            With cutting-edge technology, easy installation, real-time alerts, and mobile app integration, we ensure complete peace of mind while your vehicle is on the road.
          </p>
        </div>
      </div>

      <hr className="my-5" />

      <div className="row text-center">
        <div className="col-md-4 mb-4">
          <i className="bi bi-geo-alt-fill fs-1 text-primary"></i>
          <h5 className="mt-2">Real-Time GPS Tracking</h5>
          <p>Track your vehicle 24/7 with precision and speed.</p>
        </div>
        <div className="col-md-4 mb-4">
          <i className="bi bi-camera-video-fill fs-1 text-primary"></i>
          <h5 className="mt-2">HD Surveillance Cameras</h5>
          <p>Monitor in-car and surrounding activity using crystal-clear footage.</p>
        </div>
        <div className="col-md-4 mb-4">
          <i className="bi bi-shield-lock-fill fs-1 text-primary"></i>
          <h5 className="mt-2">Safety & Security</h5>
          <p>Prevent theft, unauthorized access, and route deviation with intelligent alerts.</p>
        </div>
      </div>

      <div className="text-center mt-5">
        <h5>📞 Have questions?</h5>
        <p>We're here to help. Contact our support team for more information.</p>
      </div>
    </div>
  );
};

export default AboutUs;
