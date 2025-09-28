import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import UpButton from "./UpButton";

const Footer = () => {
  const logo1 = "/images/logo1.svg";

  return (
    <footer className="bg-white w-full shadow-inner -mt-16">
      <div className="container mx-auto px-6 py-10 flex flex-col lg:flex-row justify-between gap-10">
        {/* Left side - Logo + Socials */}
        <div className="flex flex-col items-center lg:items-start gap-6 w-full lg:w-auto">
          {/* Logo */}
          <img
            src={logo1}
            alt="Brand"
            className="h-10 sm:h-14 lg:h-9 2xl:h-24 w-auto rounded-lg object-contain drop-shadow-[0_0_8px_red] scale-[1.02]"
          />

          {/* Social icons - evenly spread */}
          <div className="grid grid-cols-3 w-full max-w-[240px] text-gray-600">
            <a
              href="https://www.linkedin.com/company/bioorgo-kempmann-bioorganics-llp/"
              className="flex items-center justify-center hover:text-blue-600"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={40} />
            </a>
            <a
              href="#"
              className="flex items-center justify-center hover:text-blue-600"
              aria-label="Facebook"
            >
              <FaFacebookF size={40} />
            </a>
            <a
              href="#"
              className="flex items-center justify-center hover:text-blue-600"
              aria-label="Twitter"
            >
              <FaTwitter size={40} />
            </a>
          </div>
        </div>

        {/* Right side - Info Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 text-gray-700 w-full lg:w-[60%]">
          {/* Column 1 - Addresses */}
          <div className="space-y-4 text-sm leading-relaxed">
            <div>
              <h4 className="font-extrabold text-2xl mb-1">
                Marketing (SEA Region)
              </h4>
              <address className="text-lg font-semibold  text-gray-500">
                Blk 103A, Unit no. 08-101 Edgefield Plains
                <br />
                Punggol, Singapore - 821103
              </address>
            </div>
            <div>
              <h4 className="font-extrabold text-2xl mb-1">
                Kempmann Bioorganics LLP
              </h4>
              <address className="text-lg font-semibold text-gray-500">
                #149, 6th Main, 60 Feet Road
                <br />
                D Group Layout, Srighandadakaval
                <br />
                Bangalore - 560091
              </address>
            </div>
          </div>

          {/* Column 2 - Contact Info */}

          <div className="grid grid-cols-1 gap-6 text-sm leading-relaxed w-full lg:w-auto">
            {/* Enquiries */}
            <div className="flex flex-col md:flex-col lg:flex-row items-start gap-2 md:gap-4">
              <div className="flex items-center gap-2 font-semibold text-gray-700">
                <FaPhoneAlt className="text-green-600 text-3xl" />
                <span className="text-3xl font-extrabold">Enquiries</span>
              </div>
              <div className="text-gray-600 text-xl font-semibold">
                <p>+65 9865 8323</p>
                <p>+91 99 86 082079</p>
              </div>
            </div>

            {/* Mail Us */}
            <div className="flex flex-col md:flex-col lg:flex-row items-start gap-2 md:gap-4 my-7">
              <div className="flex items-center gap-2 font-semibold text-gray-700">
                <FaEnvelope className="text-green-600 text-3xl" />
                <span className="text-3xl font-extrabold">Mail Us</span>
              </div>
              <div>
                <a
                  href="mailto:contact@bioorgo.com"
                  className="text-blue-600 hover:underline break-all text-2xl font-bold"
                >
                  contact@bioorgo.com
                </a>
              </div>
            </div>

            {/* UpButton */}
            <div className="flex justify-end mt-2 mr-1">
              <UpButton />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CopyRight */}
      <div className="bg-gray-100 text-gray-600 font-bold text-center py-4 text-xl">
        © {new Date().getFullYear()} Bioorgo. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
