import React from "react";
import { Helmet } from "react-helmet";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50  text-gray-900">
      <Helmet>
        <title>Eatzy - Privacy Policy</title>
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Eatzy Privacy Policy</h1>
          <p className="text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
        </header>

        {/* Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-10">
          <section className="mb-10">
            <p className="text-gray-700 text-lg leading-relaxed">
              At Eatzy, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our food delivery application and services.
            </p>
          </section>

          {/* Section Template */}
          {[
            {
              title: "1. Information We Collect",
              items: [
                "<strong>Personal Information:</strong> Name, email address, phone number, delivery address",
                "<strong>Payment Information:</strong> Credit card details (processed securely by our payment partners)",
                "<strong>Device Information:</strong> IP address, device type, operating system",
                "<strong>Usage Data:</strong> App interactions, order history, preferences",
                "<strong>Location Data:</strong> For delivery services and local restaurant listings",
              ],
            },
            {
              title: "2. How We Use Your Information",
              items: [
                "Provide, operate, and maintain our services",
                "Process transactions and deliver orders",
                "Improve, personalize, and expand our services",
                "Communicate with you, including order updates and promotions",
                "Analyze usage and trends to enhance user experience",
                "Prevent fraud and enhance security",
              ],
            },
            {
              title: "3. Information Sharing",
              items: [
                "With restaurants to fulfill your orders",
                "With delivery personnel to complete deliveries",
                "With payment processors to complete transactions",
                "When required by law or to protect our rights",
                "With your consent for other purposes",
              ],
              note: "We do not sell your personal information to third parties.",
            },
            {
              title: "4. Data Security",
              items: [
                "Encryption of sensitive data",
                "Secure servers and networks",
                "Regular security assessments",
                "Limited access to personal information",
              ],
            },
            {
              title: "5. Your Rights",
              items: [
                "Access and receive a copy of your data",
                "Request correction of inaccurate data",
                "Request deletion of your data",
                "Object to or restrict processing of your data",
                "Withdraw consent where applicable",
              ],
            },
            {
              title: "6. Cookies and Tracking",
              items: [
                "Remember user preferences",
                "Analyze app performance",
                "Deliver targeted advertisements",
              ],
              note: "You can control cookies through your browser or device settings.",
            },
            {
              title: "7. Children's Privacy",
              content:
                "Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If we become aware of such collection, we will take steps to delete the information.",
            },
            {
              title: "8. Changes to This Policy",
              content:
                "We may update this Privacy Policy periodically. We will notify you of significant changes through the app or via email. Your continued use of our services after such changes constitutes acceptance of the updated policy.",
            },
            {
              title: "9. Contact Us",
              content: (
                <>
                  <p>If you have questions about this Privacy Policy or our privacy practices, please contact us at:</p>
                  <p className="mt-2">
                    <strong>Email:</strong>{" "}
                    <a href="mailto:privacy@eatzy.com" className="text-blue-600 hover:underline">
                      privacy@eatzy.com
                    </a>
                  </p>
                  <p>
                    <strong>Address:</strong> 123 Food Lane, San Francisco, CA 94107
                  </p>
                </>
              ),
            },
          ].map((section, idx) => (
            <section key={idx} className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 pb-2">
                {section.title}
              </h2>
              {section.content ? (
                <div className="text-gray-700 text-base space-y-2">{section.content}</div>
              ) : (
                <>
                  <ul
                    className="list-disc pl-5 space-y-2 text-gray-700 text-base"
                    dangerouslySetInnerHTML={{
                      __html: section.items
                        .map((item) => `<li>${item}</li>`)
                        .join(""),
                    }}
                  />
                  {section.note && (
                    <p className="mt-4 text-gray-700 font-medium">{section.note}</p>
                  )}
                </>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
