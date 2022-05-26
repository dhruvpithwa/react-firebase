import { useEffect } from "react";

import Header from './common/Header.js';
import AboutUs from './common/AboutUs.js';
import Footer from './common/Footer.js';
import Banner from './common/Banner.js';

import Login from "./authentication/Login";


const Authentication = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <Header />
      <br /><br />
      <Banner />
      <br /><br />
      <AboutUs />
      <br /><br />
      <Login />
      <br /><br />
      <Footer />
    </div>
  );
};

export default Authentication;