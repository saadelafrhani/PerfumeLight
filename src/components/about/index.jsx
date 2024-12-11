import { useState } from "react";

const About = () => {
    return (

        <div id="about" className="mt-10">
            <div className="flex justify-center">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-charm text-center">
                   About Us
                </h1>
            </div>
            <div
                className="h-auto  flex flex-col sm:flex-row justify-around p-10 sm:p-14 gap-10"
            >


                {/* Individual Item */}
                <div className="flex flex-col items-center gap-3 text-center">
                    <img
                        src="https://cdn-user-icons.flaticon.com/116652/116652410/1733248647854.svg?token=exp=1733249548~hmac=eab7e2ae580293f849e4777e1d81b68c"
                        alt="premium-quality-icon"
                        className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20"
                    />
                    <h1 className="text-lg sm:text-xl lg:text-2xl font-bold font-charm">
                        Premium Quality
                    </h1>
                    <p className="text-sm sm:text-base lg:text-lg px-2 sm:px-4 lg:px-6">
                        Our perfumes are crafted with authentic, premium ingredients,
                        delivering luxurious fragrances that reflect the quality of original
                        brands.
                    </p>
                </div>

                {/* Copy Item for Consistency */}
                <div className="flex flex-col items-center gap-3 text-center">
                    <img
                        src="https://cdn-user-icons.flaticon.com/116652/116652410/1733250035401.svg?token=exp=1733250935~hmac=121f8362086dba49bf6a474d2fad7c89"
                        alt="tailored-fragrance-options"
                        className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20"
                    />
                    <h1 className="text-lg sm:text-xl lg:text-2xl font-bold font-charm">
                        Tailored Fragrance Options
                    </h1>
                    <p className="text-sm sm:text-base lg:text-lg px-2 sm:px-4 lg:px-6">
                        Explore a curated collection of perfumes designed to match any mood or
                        occasion, from bold and daring to soft and elegant.
                    </p>
                </div>

                {/* Third Item */}
                <div className="flex flex-col items-center gap-3 text-center">
                    <img
                        src="https://cdn-user-icons.flaticon.com/116652/116652410/1733250226455.svg?token=exp=1733251127~hmac=d289e06f5e0add639d2122a67fe0ba1c"
                        alt="quick-secure-delivery"
                        className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20"
                    />
                    <h1 className="text-lg sm:text-xl lg:text-2xl font-bold font-charm">
                        Quick & Secure Delivery
                    </h1>
                    <p className="text-sm sm:text-base lg:text-lg px-2 sm:px-4 lg:px-6">
                        Enjoy fast shipping with every order, along with secure packaging that
                        ensures your product arrives safely and in perfect condition.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
