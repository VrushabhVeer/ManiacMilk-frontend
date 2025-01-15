// RefundPolicy.jsx
const RefundPolicy = () => {
  return (
    <div className="hero w-full pb-20 pt-10">
      <div className="w-11/12 mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          Refund Policy
        </h1>
        <p className="text-gray-600 mb-6">
          Once an order is confirmed, Maniacmilkstore will not accept return or
          refund requests. However, in any of the below situations, we are more
          than happy to work with our patrons to find an amicable solution that
          is fair to all parties.
        </p>

        <div className="text-gray-600 space-y-1">
          <h2 className="text-xl font-semibold">In Case of Damaged Product</h2>
          <p>
            Maniacmilkstore needs to be notified of damaged product within 5 days
            from the delivery date via email to{" "}
            <a
              href="mailto:maniacmilkstore@gmail.com"
              className="text-blue-600 hover:underline"
            >
              maniacmilkstore@gmail.com
            </a>
            .
          </p>
          <p>
            In the email, order number, image of invoice, 1 outer box image, and
            2 clear images of the damaged product must be sent.
          </p>
          <p>
            In case of multiple item shipments, only the affected product can be
            returned and replaced.
          </p>
          <p>
            We will be happy to re-send and replace the product(s) promptly, and
            we will work with you on providing an amicable solution.
          </p>
          <p className="pb-5">
            Email will be responded to within 24-48 hours, and full assistance
            will be provided thereafter.
          </p>

          <h2 className="text-xl font-semibold">In Case of Missing Product</h2>
          <p>
            Maniacmilkstore needs to be notified of missing product within 5 days
            from the delivery date via email to{" "}
            <a
              href="mailto:maniacmilkstore@gmail.com"
              className="text-blue-600 hover:underline"
            >
              maniacmilkstore@gmail.com
            </a>
            .
          </p>
          <p>
            In the email, order number, image of the invoice, 1 outer box image,
            and 2 clear images of the opened box with all items received must be
            sent.
          </p>
          <p>
            We will be unable to accept a refund request. However, we will be
            happy to promptly re-send the missing product.
          </p>
          <p className="pb-5">
            Email will be responded to within 24-48 hours, and full assistance
            will be provided thereafter.
          </p>

          <h2 className="text-xl font-semibold">In Case of Spoiled Product</h2>
          <p>
            Maniacmilkstore needs to be notified of spoilage of product within 10
            days from the delivery date via email to{" "}
            <a
              href="mailto:maniacmilkstore@gmail.com"
              className="text-blue-600 hover:underline"
            >
              maniacmilkstore@gmail.com
            </a>
            .
          </p>
          <p>
            In the email, order number, date of packaging/manufacture, and clear
            images or a video of the product must be shared.
          </p>
          <p>
            We will be unable to accept returns due to variance in taste,
            texture, color, or aroma. This is because our products are
            completely natural and made mostly by hand, so no two batches will
            be identical. No compromise is made in the natural production
            process, use of the best natural ingredients, and we ensure maximum
            nutritional value is retained.
          </p>
          <p>
            We will work with you on providing an amicable solution. The product
            will be replaced after due investigation and diligence, and we
            assure a fair outcome at all times.
          </p>
          <p>
            Email will be responded to within 24-48 hours, and full assistance
            will be provided thereafter.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
