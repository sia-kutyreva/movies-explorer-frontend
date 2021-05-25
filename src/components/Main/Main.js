import React from 'react';
import './Main.css';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SideBar from '../SideBar/SideBar';

function Main(props) 
{
  return (
    <>
      <Header 
        mobileMenu={props.mobileMenu}
        clickMenu={props.clickMenu}
        loggedIn={props.loggedIn}
      />
      <SideBar 
        isOpen={props.isOpen}
        onClose={props.onClose}
      />
      <main className="main">
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}

export default Main;
