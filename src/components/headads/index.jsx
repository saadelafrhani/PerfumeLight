import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/connection"; // Make sure this path is correct

const Headads = () => {
  const [heading, setHeading] = useState(""); // For the main heading
  const [fragrances, setFragrances] = useState([]); // For fragrance data

  // Fetch data from Firebase when the component mounts
  useEffect(() => {
    // Set up real-time listener for the headads collection (which includes heading, title, and imageUrl)
    const headadsUnsubscribe = onSnapshot(collection(db, "headads"), (snapshot) => {
      const headadsData = snapshot.docs.map((doc) => doc.data());
      if (headadsData.length > 0) {
        setHeading(headadsData[0].heading); // Assuming "heading" is the field for the heading
        setFragrances(headadsData); // Assuming "title" and "imageUrl" are fields for each ad
      }
    });

    // Cleanup function to unsubscribe from Firestore listeners
    return () => {
      headadsUnsubscribe();
    };
  }, []);

  return (
    <section id="news" className="flex flex-col gap-6 px-4">
      {/* Heading */}
      <h1 className="pt-10 text-lg sm:text-xl md:text-3xl lg:text-6xl flex justify-center font-bold font-charm text-center">
        {heading || "Loading..."}
      </h1>

      {/* Image Section */}
      <div className="flex flex-wrap gap-4 pt-8">
        {fragrances.map((fragrance, index) => (
          <div
            key={index}
            className="group relative flex-1 min-w-[20%] sm:min-w-[48%] md:min-w-[30%] lg:min-w-[30%] animate-slideIn"
          >
            <h1 className="absolute bottom-2 right-2 text-white text-xl sm:text-lg lg:text-base font-bold font-charm z-10 px-4 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
              {fragrance.title}
            </h1>
            <img
              src={fragrance.imageUrl}
              alt={fragrance.title}
              className="w-full h-full rounded-3xl border-2 border-white group-hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Headads;
