import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useCookies } from 'react-cookie';

import Header from './common/Header.js';
import AboutUs from './common/AboutUs.js';
import Footer from './common/Footer.js';
import Banner from './common/Banner.js';

import Dictaphone from "./home/Dictaphone.js";
import Transliterate from './home/Transliterate.js';
import ImageToText from "./home/ImageToText.js";

import Register from './authentication/Register.js';


const Home = () => {
  const [cookies, setCookie] = useCookies(['user']);

  const isAdmin = useSelector(state=> state.isAdmin)
  const token = useSelector(state => state.token)

  useEffect(() => { 
    if(token!= cookies.getUserAuthToken)
        setCookie('getUserAuthToken',token, { path: '/' })
    window.scrollTo(0, 0) 
  }, [])

  return (
    <div>
        <Header/>
        <br/><br/>
        <Banner/>
        <br/><br/>
        <AboutUs/>
        <br/><br/>
        <Dictaphone/>
        <br/><br/>
        <Transliterate/> 
        <br/><br/>
        <ImageToText/> 
        <br/><br/>
        { isAdmin && <><Register/><br/><br/></> }
        <Footer/>
    </div>
  );
};

export default Home;