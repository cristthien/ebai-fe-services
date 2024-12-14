// Import necessary libraries and external components
// Import internal components
// Import styles
// Fetch or get data

import clsx from "clsx";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    // <footer className="bg-gray-100 border-t border-gray-300 py-6">
    //   <div className="container mx-auto px-4 flex flex-col items-center">
    //     <div className="flex flex-wrap text-xs text-gray-600 justify-items-start md:items-center">
    //       {/* Links */}
    //       <div className="flex  gap-4">
    //         <a href="#" className="hover:underline">
    //           About eBay
    //         </a>
    //         <a href="#" className="hover:underline">
    //           Announcements
    //         </a>
    //         <a href="#" className="hover:underline">
    //           Community
    //         </a>
    //         <a href="#" className="hover:underline">
    //           Security Center
    //         </a>
    //         <a href="#" className="hover:underline">
    //           Seller Information Center
    //         </a>
    //         <a href="#" className="hover:underline">
    //           Policies
    //         </a>
    //         <a href="#" className="hover:underline">
    //           Affiliates
    //         </a>
    //         <a href="#" className="hover:underline">
    //           Help & Contact
    //         </a>
    //         <a href="#" className="hover:underline">
    //           Site Map
    //         </a>
    //       </div>
    //       {/* Copyright and Policies */}
    //       <div className="pt-6 md:mt-0 text-center md:text-right ">
    //         <p className="text-xs inline-block">
    //           Copyright © 1995-2024 eBay Inc. All Rights Reserved.
    //         </p>
    //         <div className="inline-flex flex-wrap gap-2 mt-2 justify-center md:justify-end">
    //           <a href="#" className="hover:underline">
    //             Accessibility
    //           </a>
    //           <a href="#" className="hover:underline">
    //             User Agreement
    //           </a>
    //           <a href="#" className="hover:underline">
    //             Privacy
    //           </a>
    //           <a href="#" className="hover:underline">
    //             Consumer Health Data
    //           </a>
    //           <a href="#" className="hover:underline">
    //             Payments Terms of Use
    //           </a>
    //           <a href="#" className="hover:underline">
    //             Cookies
    //           </a>
    //           <a href="#" className="hover:underline">
    //             CA Privacy Notice
    //           </a>
    //           <a href="#" className="hover:underline">
    //             Your Privacy Choices
    //           </a>
    //           <a href="#" className="hover:underline">
    //             AdChoice
    //           </a>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </footer>
    <div className={clsx("w-full bg-gray-100 py-6", className)}>
      <div className=" container mx-auto text-sm hidden md:grid grid-cols-2 md:grid-cols-6 gap-4 px-6 center ">
        {/* Cột 1 */}
        <div>
          <h2 className="font-semibold mb-2">Buy</h2>
          <ul>
            <li>
              <a href="#">Registration</a>
            </li>
            <li>
              <a href="#">eBay Money Back Guarantee</a>
            </li>
            <li>
              <a href="#">Bidding & buying help</a>
            </li>
            <li>
              <a href="#">Stores</a>
            </li>
          </ul>
        </div>
        {/* Cột 2 */}
        <div>
          <h2 className="font-bold mb-2">Sell</h2>
          <ul>
            <li>
              <a href="#">Start selling</a>
            </li>
            <li>
              <a href="#">Learn to sell</a>
            </li>
            <li>
              <a href="#">Affiliates</a>
            </li>
          </ul>
        </div>
        {/* Cột 3 */}
        <div>
          <h2 className="font-bold mb-2">Tools & apps</h2>
          <ul>
            <li>
              <a href="#">Developers</a>
            </li>
            <li>
              <a href="#">Security center</a>
            </li>
            <li>
              <a href="#">Site map</a>
            </li>
          </ul>
        </div>
        {/* Cột 4 */}
        <div>
          <h2 className="font-bold mb-2">Stay connected</h2>
          <ul>
            <li>
              <a href="#">eBays Blogs</a>
            </li>
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">Twitter</a>
            </li>
          </ul>
        </div>
        {/* Cột 5 */}
        <div>
          <h2 className="font-bold mb-2">About eBay</h2>
          <ul>
            <li>
              <a href="#">Company info</a>
            </li>
            <li>
              <a href="#">News</a>
            </li>
            <li>
              <a href="#">Investors</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
          </ul>
        </div>
        {/* Cột 6 */}
        <div>
          <h2 className="font-bold mb-2">Help & Contact</h2>
          <ul>
            <li>
              <a href="#">Seller Information Center</a>
            </li>
            <li>
              <a href="#">Contact us</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto text-sm flex justify-start items-center md:hidden space-x-6 p-6 mb-2">
        <a href="#" className="font-semibold hover:underline">
          Buy
        </a>
        <a href="#" className="font-semibold hover:underline">
          Sell
        </a>
        <a href="#" className="font-semibold hover:underline">
          Tools & apps
        </a>
        <a href="#" className="font-semibold hover:underline">
          Stay connected
        </a>
        <a href="#" className="font-semibold hover:underline">
          About eBay
        </a>
        <a href="#" className="font-semibold hover:underline">
          Help & Contact
        </a>
      </div>

      <div className="text-center mt-2 sm:mt-6 text-sm text-gray-600 ">
        Copyright © 1995-2024 eBay Inc. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
