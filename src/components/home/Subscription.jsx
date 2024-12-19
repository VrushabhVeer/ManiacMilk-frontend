const Subscription = () => {
    return (
        <div className="w-11/12 mx-auto mt-20 md:mt-24 lg:mt-40 mb-10 md:mb-20">
            <h1 className="text-center text-xl md:text-3xl font-bold text-[#1a1d20]">
                Subscription Plans
            </h1>

            <p className="text-center text-gray-600 mt-1">
                Choose the perfect plan to ensure your daily supply of fresh milk.
            </p>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 mt-10">
                {/* Basic Plan */}
                <div className="p-8 rounded-md shadow-lg border border-gray-200">
                    <h2 className="text-xl font-bold text-green-900 mb-4 border-b pb-3">Basic Plan</h2>
                    <p className=" text-gray-600">
                        Ideal for individuals or small families.
                    </p>
                    <ul className="mt-4 text-gray-700">
                        <li>• 1 Liter of milk daily</li>
                        <li>• Free delivery</li>
                        <li>• Flexible cancellation</li>
                    </ul>
                    <p className=" text-2xl font-bold text-green-900 mt-6 border-t pt-3">₹999/<span className="text-md">month</span></p>
                    <button className="bg-green-900 text-white w-full rounded-md py-3 mt-6">
                        Select
                    </button>
                </div>

                {/* Family Plan */}
                <div className="p-8 rounded-md shadow-lg border border-gray-200">
                    <h2 className="text-xl font-bold text-green-900 mb-4 border-b pb-3">Family Plan</h2>
                    <p className=" text-gray-600">
                        Perfect for medium-sized families.
                    </p>
                    <ul className="mt-4 text-gray-700">
                        <li>• 2 Liters of milk daily</li>
                        <li>• Free delivery</li>
                        <li>• Priority customer support</li>
                    </ul>
                    <p className=" text-2xl font-bold text-green-900 mt-6 border-t pt-3">₹1899/<span className="text-md">month</span></p>
                    <button className="bg-green-900 text-white w-full rounded-md py-3 mt-6">
                        Select
                    </button>
                </div>

                {/* Premium Plan */}
                <div className="p-8 rounded-md shadow-lg border border-gray-200">
                    <h2 className="text-xl font-bold text-green-900 mb-4 border-b pb-3">Premium Plan</h2>
                    <p className=" text-gray-600">
                        Best for large families or heavy milk usage.
                    </p>
                    <ul className="mt-4 text-gray-700">
                        <li>• 3 Liters of milk daily</li>
                        <li>• Free delivery</li>
                        <li>• Exclusive offers & discounts</li>
                    </ul>
                    <p className=" text-2xl font-bold text-green-900 mt-6 border-t pt-3">₹2699/<span className="text-md">month</span></p>
                    <button className="bg-green-900 text-white w-full rounded-md py-3 mt-6">
                        Select
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Subscription;
