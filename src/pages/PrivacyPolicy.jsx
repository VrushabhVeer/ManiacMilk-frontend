
const PrivacyPolicy = () => {
  return (
    <div className="hero w-full pb-20 pt-10">
      <div className="w-11/12 mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          Privacy Policy
        </h1>
        <p className="text-gray-600 mb-6">
          At Maniacmilk Store, we value your trust and are committed to
          protecting your privacy. This Privacy Policy outlines how we collect,
          use, and safeguard your personal information.
        </p>

        <div className="text-gray-600 space-y-1">
          <h2 className="text-xl font-semibold">Information We Collect</h2>
          <p>
            We collect personal information such as your name, email address,
            phone number, and shipping address when you make a purchase or
            interact with our services.
          </p>
          <p className="pb-5">
            Additionally, we may collect non-personal information like your
            browser type, IP address, and browsing behavior to improve our
            services.
          </p>

          <h2 className="text-xl font-semibold">
            How We Use Your Information
          </h2>
          <p>
            The information collected is used to process orders, provide
            customer support, and send important updates about your
            transactions.
          </p>
          <p className="pb-5">
            We may also use your information to personalize your shopping
            experience and notify you about new products, services, or special
            promotions.
          </p>

          <h2 className="text-xl font-semibold">Data Protection</h2>
          <p className="pb-5">
            Maniacmilk Store takes all reasonable steps to ensure the security
            of your personal information. However, no method of transmission
            over the internet is 100% secure, and we cannot guarantee absolute
            security.
          </p>

          <h2 className="text-xl font-semibold">Third-Party Sharing</h2>
          <p className="pb-5">
            We do not sell or rent your personal information to third parties.
            Your information may only be shared with trusted partners to fulfill
            orders, process payments, or provide customer support.
          </p>

          <h2 className="text-xl font-semibold">Policy Updates</h2>
          <p>
            This Privacy Policy may be updated periodically. Any changes will be
            posted on this page with an updated revision date.
          </p>

          <p>
            If you have any questions or concerns about our Privacy Policy,
            please contact us at{" "}
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

export default PrivacyPolicy;
