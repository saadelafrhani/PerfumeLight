import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/connection"; // Make sure this path is correct

const Headads = () => {
  const [heading, setHeading] = useState("");
  const [fragrances, setFragrances] = useState([]);

  // Fetch data from Firebase when the component mounts
  useEffect(() => {
    // Set up real-time listener for the headings collection
    const headingUnsubscribe = onSnapshot(collection(db, "headings"), (snapshot) => {
      snapshot.forEach((doc) => {
        setHeading(doc.data().text); // Assuming "text" is the field for heading
      });
    });

    // Set up real-time listener for the fragrances collection
    const fragrancesUnsubscribe = onSnapshot(collection(db, "fragrances"), (snapshot) => {
      const fragrancesData = snapshot.docs.map((doc) => doc.data());
      setFragrances(fragrancesData);
    });

    // Cleanup function to unsubscribe from Firestore listeners
    return () => {
      headingUnsubscribe();
      fragrancesUnsubscribe();
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
