const ShippingPolicy = () => {
    return (
        <div className="hero w-full pb-20 pt-10">
            <div className="w-11/12 mx-auto">
                <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                    Shipping Policy
                </h1>
                <p className="text-gray-600 mb-6">
                    Please note that the free shipping policy will apply only if specified
                    as part of promotional campaigns or special offers.
                </p>

                <div className="text-gray-600 space-y-1">
                    <h2 className="text-xl font-semibold">Shipping Timelines:</h2>
                    <p>
                        If the ordered item is <strong>in stock</strong>, it will be packed
                        and dispatched within <strong>3 working days</strong>, with delivery
                        in <strong>5-7 working days</strong>.
                    </p>
                    <p>
                        If the ordered item is <strong>out of stock</strong>, it will be
                        restocked and dispatched within <strong>10 working days</strong>,
                        with delivery in <strong>12-15 working days</strong>.
                    </p>
                    <p className="pb-5">
                        Delivery time may vary due to unforeseen circumstances such as
                        weather conditions, strikes, or courier partner delays.
                    </p>

                    <h2 className="text-xl font-semibold">Shipping Details:</h2>
                    <p>
                        A complete postal address, including PIN code, email ID, and contact
                        number, is essential for us to ship your order. Please ensure the
                        accuracy of your details before completing your order.
                    </p>

                    <p>
                        Our courier partners deliver shipments
                        <strong> Monday to Sunday: 9 AM to 7 PM</strong>.
                    </p>

                    <p>
                        Once your package is dispatched, we will send you an email with your
                        <strong> order tracking details</strong>.
                    </p>

                    <p>
                        For any further clarifications, please contact us at{" "}
                        <a
                            href="mailto:maniacmilkstore@gmail.com"
                            className="text-blue-600 hover:underline"
                        >
                            maniacmilkstore@gmail.com
                        </a>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ShippingPolicy;
