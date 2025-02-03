import React from "react";
import "./Footer.scss";
import { FaInstagram } from "react-icons/fa";
import { TbBrandLinkedin } from "react-icons/tb";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineFacebook } from "react-icons/ai";
import { ImPinterest2 } from "react-icons/im";
import { GrLanguage } from "react-icons/gr";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <hr className="line" />
        <div className="bottom">
          <div className="left">
            <h3>SevaSquad</h3>
            <span>© SevaSquad International Ltd. 2024</span>
          </div>

          <div className="right">
            <div className="social">
              <FaInstagram />
              <TbBrandLinkedin />
              <FaXTwitter />
              <AiOutlineFacebook />
              <ImPinterest2 />
            </div>

            <div className="language">
              <GrLanguage />
              <span>English</span>
            </div>

            <div className="currency">
              <HiOutlineCurrencyRupee />
              <span>INR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
