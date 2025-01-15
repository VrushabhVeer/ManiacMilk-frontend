
const ShippingPolicy = () => {
    return (
        <div className="hero w-full pb-20 pt-10">
            <div className="w-11/12 mx-auto">
                <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                    Shipping Policy
                </h1>
                <p className="text-gray-600 mb-6">
                    Please note that the free shipping policy will apply only if specified
                    so as part of promotional campaigns or special offers.
                </p>

                <div className="text-gray-600 space-y-1">
                    <h2 className="text-xl font-semibold">
                        Please Note Our Shipping Policies as Below:
                    </h2>

                    <p>
                        A complete postal address including pin code, email ID, and contact
                        number is essential to help us ship your order. Kindly cross-check
                        your pin code and contact number before you complete your order.
                    </p>

                    <p>
                        If the ordered item is in stock, it will be packed and dispatched
                        from our warehouse within 3 working days.
                    </p>

                    <p>
                        However, if some of the ordered items are not in stock, we will get
                        them produced and have them dispatched within 10 working days of the
                        order being placed. We will keep you informed under such
                        circumstances.
                    </p>

                    <p>
                        Our courier partners will be able to deliver the shipment to you
                        between Monday to Sunday: 9am to 7pm. Working days exclude public
                        holidays and Sundays. Delivery time is subject to factors beyond our
                        control, including unexpected travel delays from our courier
                        partners and transporters due to weather conditions and strikes.
                    </p>

                    <p>
                        As soon as your package is dispatched, we will email you your order
                        tracking details. Kindly bear with us until then.
                    </p>

                    <p>
                        For any further clarifications, please contact us at{" "}
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

export default ShippingPolicy;
