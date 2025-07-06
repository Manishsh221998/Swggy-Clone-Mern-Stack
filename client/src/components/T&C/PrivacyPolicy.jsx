import React from "react";
import { Helmet } from "react-helmet";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Helmet>
        <title>Eatzy - Privacy Policy</title>
      </Helmet>
      
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Eatzy Privacy Policy</h1>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </header>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
          <section className="mb-8">
            <p className="mb-4 text-gray-700">
              At Eatzy, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our food delivery application and services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">1. Information We Collect</h2>
            <p className="mb-4 text-gray-700">
              We may collect the following types of information:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
              <li><strong>Personal Information:</strong> Name, email address, phone number, delivery address</li>
              <li><strong>Payment Information:</strong> Credit card details (processed securely by our payment partners)</li>
              <li><strong>Device Information:</strong> IP address, device type, operating system</li>
              <li><strong>Usage Data:</strong> App interactions, order history, preferences</li>
              <li><strong>Location Data:</strong> For delivery services and local restaurant listings</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">2. How We Use Your Information</h2>
            <p className="mb-4 text-gray-700">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
              <li>Provide, operate, and maintain our services</li>
              <li>Process transactions and deliver orders</li>
              <li>Improve, personalize, and expand our services</li>
              <li>Communicate with you, including order updates and promotions</li>
              <li>Analyze usage and trends to enhance user experience</li>
              <li>Prevent fraud and enhance security</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">3. Information Sharing</h2>
            <p className="mb-4 text-gray-700">
              We may share your information in the following circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
              <li>With restaurants to fulfill your orders</li>
              <li>With delivery personnel to complete deliveries</li>
              <li>With payment processors to complete transactions</li>
              <li>When required by law or to protect our rights</li>
              <li>With your consent for other purposes</li>
            </ul>
            <p className="text-gray-700">
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">4. Data Security</h2>
            <p className="mb-4 text-gray-700">
              We implement appropriate technical and organizational measures to protect your personal information, including:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
              <li>Encryption of sensitive data</li>
              <li>Secure servers and networks</li>
              <li>Regular security assessments</li>
              <li>Limited access to personal information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">5. Your Rights</h2>
            <p className="mb-4 text-gray-700">
              Depending on your location, you may have certain rights regarding your personal information:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
              <li>Access and receive a copy of your data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Withdraw consent where applicable</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">6. Cookies and Tracking</h2>
            <p className="mb-4 text-gray-700">
              We use cookies and similar tracking technologies to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
              <li>Remember user preferences</li>
              <li>Analyze app performance</li>
              <li>Deliver targeted advertisements</li>
            </ul>
            <p className="text-gray-700">
              You can control cookies through your browser or device settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">7. Children's Privacy</h2>
            <p className="mb-4 text-gray-700">
              Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If we become aware of such collection, we will take steps to delete the information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">8. Changes to This Policy</h2>
            <p className="mb-4 text-gray-700">
              We may update this Privacy Policy periodically. We will notify you of significant changes through the app or via email. Your continued use of our services after such changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">9. Contact Us</h2>
            <p className="text-gray-700">
              If you have questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <p className="mt-2 text-gray-700">
              <strong>Email:</strong> <a href="mailto:privacy@eatzy.com" className="text-blue-600 hover:underline">privacy@eatzy.com</a>
            </p>
            <p className="text-gray-700">
              <strong>Address:</strong> 123 Food Lane, San Francisco, CA 94107
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;