import { useState } from "react";


// will add them to firebase and adminpanel

const Headads = () => {
  return (
    <div className=" relative flex flex-col lg:flex-row items-center justify-center p-8 lg:p-24 bg-[#FFECEE]">
            {/* Left images - stacked vertically with positioning */}
            <div className="relative w-40 h-64 lg:w-60 lg:h-96 mb-8 lg:mb-0">
                <img src="c1.png" alt="smallcake1" className="absolute top-32 -left-24 lg:-top-10 lg:-left-96 w-16 lg:w-24 h-auto" />
                <img src="c1.png" alt="smallcake1" className="absolute top-72 -left-36 lg:-top-10 lg:-left-96 w-16 lg:w-24 h-auto" />
                <img src="c2.png" alt="smallcake2" className="absolute bottom-10 -right-20 lg:-bottom-20 lg:right-20 w-16 lg:w-24 h-auto" />
                <img src="c2.png" alt="smallcake2" className="absolute bottom-10 -right-20 lg:-bottom-20 lg:right-20 w-16 lg:w-24 h-auto" />
                <img src="c2.png" alt="smallcake2" className="absolute -bottom-20 -right-36 lg:-bottom-20 lg:right-20 w-16 lg:w-24 h-auto" />
                <img src="c1.png" alt="smallcake1" className="absolute top-0 left-10 lg:top-20 lg:-left-28 w-16 lg:w-24 h-auto" />
            </div>

            {/* Center text */}
            <div className="text-center max-w-md z-10 mb-8 lg:mb-0">
                <h1 className="text-4xl lg:text-6xl font-serif text-[#8B1C2B] leading-tight">
                    Natural classic <br /> cakes & desserts
                </h1>
                <button className="mt-4 px-6 py-3 lg:px-8 lg:py-4 bg-[#B22234] text-white rounded-lg shadow-lg shadow-red-800 hover:bg-[#8B1C2B] transition">
                    Make a choice
                </button>
            </div>

            {/* Right images - stacked vertically with positioning */}
            <div className="relative w-40 h-48 lg:w-60 lg:h-96">
                <img src="c1.png" alt="smallcake1" className="absolute top-20 right-52 lg:-top-20 lg:right-80 w-16 lg:w-24 h-auto" />
                <img src="c1.png" alt="smallcake1" className="absolute top-10 -right-32 lg:top-20 lg:right-10 w-16 lg:w-24 h-auto" />
                <img src="c2.png" alt="smallcake2" className="absolute bottom-0 right-20 lg:-bottom-10 lg:right-40 w-16 lg:w-24 h-auto" />
            </div>

            {/* Background big image */}
            <div className="hidden lg:block absolute top-10 right-2 w-[40rem] h-auto drop-shadow-lg">
                <img src="/image.png" alt="bigcake" className="w-full h-auto" />
            </div>
        </div>
  );
};
export default Headads;