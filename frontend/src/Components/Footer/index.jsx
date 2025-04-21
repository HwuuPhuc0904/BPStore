import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="flex justify-between">
        <div>
          <h3 className="font-bold">SHOP.CO</h3>
          <p>We have clothes that suit your style.</p>
        </div>
        <div>
          <h3 className="font-bold">Company</h3>
          <ul>
            <li>About</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold">Help</h3>
          <ul>
            <li>Customer Support</li>
            <li>Delivery Details</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}