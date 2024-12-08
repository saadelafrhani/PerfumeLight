import { useState } from "react";

const Headads = () => {
  return (
    <div className="flex flex-col gap-6 px-4">
      {/* Heading */}
      <h1 className="pt-10 text-lg sm:text-xl md:text-3xl lg:text-6xl flex justify-center font-bold font-charm text-center">
        Let your presence linger with our captivating aromas.
      </h1>

      {/* Image Section */}
      <div className="flex flex-wrap gap-4 pt-8">
        {/* First Image */}
        <div className="group relative flex-1 min-w-[20%] sm:min-w-[48%] md:min-w-[30%] lg:min-w-[30%]">
          <h1 className="absolute bottom-2 right-2 text-white text-xl sm:text-lg lg:text-base font-bold font-charm z-10 px-4 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
            La Nuit de L'Homme, Yves Saint Laurent
          </h1>
          <img
            src="https://i.pinimg.com/736x/75/fd/8f/75fd8f9ab905b616eaf857252898dfcc.jpg"
            alt="La Nuit de L'Homme, Yves Saint Laurent"
            className="w-full h-full rounded-3xl border-2 border-white group-hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>

        {/* Second Image */}
        <div className="group relative flex-1 min-w-[20%] sm:min-w-[48%] md:min-w-[30%] lg:min-w-[30%]">
          <h1 className="absolute bottom-2 right-2 text-white text-xl sm:text-lg lg:text-base font-bold font-charm z-10 px-4 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
            Stronger With You, Giorgio Armani
          </h1>
          <img
            src="https://i.pinimg.com/736x/fd/51/49/fd5149878530a3c45fd350b18bf5afef.jpg"
            alt="Stronger With You"
            className="w-full h-full rounded-3xl border-2 border-white group-hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>

        {/* Third Image (Larger on Small Screens) */}
        <div className="group relative flex-1 min-w-[70%] sm:min-w-[48%] md:min-w-[30%] lg:min-w-[30%]">
          <h1 className="absolute bottom-2 right-2 text-white text-xl sm:text-lg lg:text-base font-bold font-charm z-10 px-4 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
            Sauvage Elixir, DIOR
          </h1>
          <img
            src="https://i.pinimg.com/736x/95/f9/a0/95f9a0c4727c2e8c96acd836c031363d.jpg"
            alt="Sauvage Elixir, DIOR"
            className="w-full h-full rounded-3xl border-2 border-white group-hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
      </div>

    </div>
  );
};

export default Headads;
