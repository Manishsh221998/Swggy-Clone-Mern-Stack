import React from "react";
import { Helmet } from "react-helmet";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Helmet>
        <title>Eatzy - Terms and Conditions</title>
      </Helmet>

      <div className="w-full max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full shadow-sm mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 9h.008v.008H9.75V9zm4.5 0h.008v.008H14.25V9zM9 13a3 3 0 006 0m-9 6h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Eatzy Terms and Conditions</h1>
          <p className="text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
        </header>

        {/* Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-10">
          {[
            {
              title: "1. Introduction",
              content:
                "Welcome to Eatzy! These Terms and Conditions ('Terms') govern your use of the Eatzy food delivery application ('App') and services ('Services'). By accessing or using our App, you agree to be bound by these Terms.",
            },
            {
              title: "2. Account Registration",
              content:
                "To use certain features of the App, you must register for an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate.",
            },
            {
              title: "3. Orders and Payments",
              content:
                "All food orders placed through the App are subject to availability. Prices are as displayed in the App and may change without notice. Payment is processed through our secure payment gateway.",
              list: [
                "All sales are final unless otherwise stated",
                "We accept major credit cards and digital payment methods",
                "You are responsible for any applicable taxes",
              ],
            },
            {
              title: "4. Delivery",
              content:
                "Delivery times are estimates only. Eatzy is not responsible for delays due to circumstances beyond our control. You are responsible for providing accurate delivery information.",
            },
            {
              title: "5. User Conduct",
              content: "You agree not to use the App to:",
              list: [
                "Violate any laws or regulations",
                "Infringe on any intellectual property rights",
                "Transmit any harmful or offensive content",
                "Interfere with the operation of the App",
              ],
            },
            {
              title: "6. Limitation of Liability",
              content:
                "Eatzy shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of the App or Services.",
            },
            {
              title: "7. Changes to Terms",
              content:
                "We may modify these Terms at any time. Your continued use of the App after such changes constitutes acceptance of the new Terms.",
            },
            {
              title: "8. Contact Us",
              content: (
                <>
                  <p>
                    If you have any questions about these Terms, please contact us at{" "}
                    <a href="mailto:legal@eatzy.com" className="text-blue-600 hover:underline">
                      legal@eatzy.com
                    </a>.
                  </p>
                </>
              ),
            },
          ].map((section, idx) => (
            <section key={idx} className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 pb-2">
                {section.title}
              </h2>
              <div className="text-gray-700 text-base space-y-4">
                {typeof section.content === "string" ? <p>{section.content}</p> : section.content}
                {section.list && (
                  <ul className="list-disc pl-5 space-y-2">
                    {section.list.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
