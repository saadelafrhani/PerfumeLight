import React from "react";

const Footer = () => {
    const currentYear = new Date().getFullYear(); // Get the current year

    return (
        <footer id="Contact" className="relative py-8 mt-20 text-center border-t-2 border-gray-700 h-32">
            <h1 className="font-charm text-lg">© {currentYear} PerfumLight | Crafted with care for you.</h1>
        </footer>
    );
}

export default Footer;