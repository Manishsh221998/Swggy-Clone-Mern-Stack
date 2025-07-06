import React from "react";
import { Helmet } from "react-helmet";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Helmet>
        <title>Eatzy - Terms and Conditions</title>
      </Helmet>
      
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Eatzy Terms and Conditions</h1>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </header>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
            <p className="mb-4 text-gray-700">
              Welcome to Eatzy! These Terms and Conditions ("Terms") govern your use of the Eatzy food delivery application ("App") and services ("Services"). By accessing or using our App, you agree to be bound by these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. Account Registration</h2>
            <p className="mb-4 text-gray-700">
              To use certain features of the App, you must register for an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. Orders and Payments</h2>
            <p className="mb-4 text-gray-700">
              All food orders placed through the App are subject to availability. Prices are as displayed in the App and may change without notice. Payment is processed through our secure payment gateway.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>All sales are final unless otherwise stated</li>
              <li>We accept major credit cards and digital payment methods</li>
              <li>You are responsible for any applicable taxes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Delivery</h2>
            <p className="mb-4 text-gray-700">
              Delivery times are estimates only. Eatzy is not responsible for delays due to circumstances beyond our control. You are responsible for providing accurate delivery information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. User Conduct</h2>
            <p className="mb-4 text-gray-700">
              You agree not to use the App to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Violate any laws or regulations</li>
              <li>Infringe on any intellectual property rights</li>
              <li>Transmit any harmful or offensive content</li>
              <li>Interfere with the operation of the App</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Limitation of Liability</h2>
            <p className="mb-4 text-gray-700">
              Eatzy shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of the App or Services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">7. Changes to Terms</h2>
            <p className="mb-4 text-gray-700">
              We may modify these Terms at any time. Your continued use of the App after such changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">8. Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about these Terms, please contact us at <a href="mailto:legal@eatzy.com" className="text-blue-600 hover:underline">legal@eatzy.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;