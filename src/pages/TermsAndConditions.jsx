
const TermsAndConditions = () => {
  return (
    <div className="hero w-full pb-20 pt-10">
      <div className="w-11/12 mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          Terms and Conditions
        </h1>
        <p className="text-gray-600 mb-6">
          Welcome to Maniacmilk Store! By accessing or using our website, you
          agree to comply with and be bound by the following terms and
          conditions. Please read them carefully before using our services.
        </p>

        <div className="text-gray-600 space-y-1">
          <h2 className="text-xl font-semibold">User Obligations</h2>
          <p>
            By using this website, you agree to provide accurate and complete
            information when making a purchase or creating an account.
          </p>
          <p className="pb-5">
            You are responsible for maintaining the confidentiality of your
            account and password and for all activities conducted under your
            account.
          </p>

          <h2 className="text-xl font-semibold">Order and Payment</h2>
          <p>
            All orders are subject to availability and confirmation of the order
            price. We reserve the right to refuse any order placed through our
            website.
          </p>
          <p className="pb-5">
            Payment must be made in full at the time of purchase. Accepted
            payment methods include credit cards, debit cards, and other online
            payment systems.
          </p>

          <h2 className="text-xl font-semibold">Shipping and Delivery</h2>
          <p className="pb-5">
            We strive to ensure timely delivery of all orders. However, delivery
            times may vary due to unforeseen circumstances. Please refer to our
            Shipping Policy for more details.
          </p>

          <h2 className="text-xl font-semibold">Returns and Refunds</h2>
          <p className="pb-5">
            Our refund and return policies are outlined in the Refund Policy
            section. By purchasing from Maniacmilk Store, you agree to these
            terms.
          </p>

          <h2 className="text-xl font-semibold">Intellectual Property</h2>
          <p className="pb-5">
            All content on this website, including text, images, and logos, is
            the property of Maniacmilk Store and is protected by intellectual
            property laws. Unauthorized use of this content is strictly
            prohibited.
          </p>

          <h2 className="text-xl font-semibold">Limitation of Liability</h2>
          <p className="pb-5">
            Maniacmilk Store will not be liable for any indirect, incidental, or
            consequential damages arising from the use of our website or
            products.
          </p>

          <h2 className="text-xl font-semibold">Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms and conditions at any
            time. Changes will be effective immediately upon posting on our
            website.
          </p>

          <p>
            For any questions or concerns, please contact us at{" "}
            <a
              href="mailto:maniacmilkstore@gmail.com"
              className="text-blue-600 hover:underline"
            >
              maniacmilkstore@gmail.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
