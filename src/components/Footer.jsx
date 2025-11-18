import React from "react";
import logo from "../assets/logo/logo-1.png";
import { Link } from "react-router-dom";
import Input from "./Form/Input";

const Footer = () => {
  const socialMediaIcons = [
    {
      id: 1,
      url: "https://www.tiktok.com/@stacked2025?_t=ZP-8w6nTzvmv4I&_r=1",
      icon: "fab fa-tiktok",
    },
    {
      id: 2,
      url: "https://www.facebook.com/stacked.2025/",
      icon: "fab fa-facebook",
    },
    {
      id: 3,
      url: "https://x.com/stacked2025",
      icon: "fab fa-x-twitter",
    },
    {
      id: 4,
      url: "https://www.pinterest.com/business/hub/",
      icon: "fab fa-pinterest",
    },
  ];

  return (
    <div className="w-full bg-[var(--lighter-dark)] py-8 px-5">
      {/* Footer Content Container */}
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between gap-8">
        {/* Logo and Copyright Section */}
        <div className="flex flex-col gap-4 items-center md:items-start">
          <img src={logo} alt="Stacked Logo" className="w-[240px]" />
          <p className="sub-heading !text-center md:!text-left">{`© ${new Date().getFullYear()} Stacked. All rights reserved.`}</p>

          {/* Quick Links */}
          <ul className="flex gap-6">
            <li>
              <a
                target="_blank"
                href="/privacy-policy"
                className="text-[var(--gray)] hover:text-[var(--primary-color)] transition-colors duration-300 text-sm"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="/terms-of-use"
                className="text-[var(--gray)] hover:text-[var(--primary-color)] transition-colors duration-300 text-sm"
              >
                Terms of Use
              </a>
            </li>
          </ul>
        </div>

        {/* Middle Section */}
        <div className="flex flex-col gap-4 items-center md:items-start">
          <h5 className="text-[16px] font-semibold text-[var(--white)]">
            Quick Links
          </h5>
          <div className="flex flex-col gap-2">
            <Link
              to="/login"
              className="text-[var(--gray)] hover:text-[var(--primary-color)] transition-colors duration-300"
            >
              Login
            </Link>
            <Link
              to="/pricing"
              className="text-[var(--gray)] hover:text-[var(--primary-color)] transition-colors duration-300"
            >
              Pricing
            </Link>
            <Link
              to="/real-estate"
              className="text-[var(--gray)] hover:text-[var(--primary-color)] transition-colors duration-300"
            >
              Real Estate
            </Link>
            <Link
              to="/wholesalers"
              className="text-[var(--gray)] hover:text-[var(--primary-color)] transition-colors duration-300"
            >
              Wholesalers
            </Link>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="flex flex-col gap-4 items-center md:items-start">
          <h5 className="text-[16px] font-semibold text-[var(--white)]">
            Stay Updated
          </h5>
          <div className="flex flex-col gap-2">
            <p className="text-[var(--gray)] text-sm">
              Subscribe to our newsletter
            </p>
            <div className="flex">
              <Input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 bg-[var(--dark)] text-[var(--white)] rounded-l outline-none border border-[var(--dark)]"
              />
              <button className="bg-[var(--primary-color)] text-[var(--white)] px-4 py-2 rounded-r hover:opacity-90 transition-opacity">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="flex flex-col gap-3 items-center md:items-start">
          <h5 className="text-[16px] font-semibold text-[var(--white)]">
            Follow Us On:
          </h5>
          <div className="flex justify-center gap-4">
            {socialMediaIcons?.map((icon) => (
              <a
                key={icon.id}
                href={icon.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--dark)] w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--primary-color)] transition-colors duration-300"
              >
                <i
                  className={`${icon.icon} text-[24px] text-[var(--white)]`}
                ></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
