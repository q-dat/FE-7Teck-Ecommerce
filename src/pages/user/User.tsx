import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/UserPage/Header';
import FooterFC from '../../components/UserPage/Footer';
import ContactForm from '../../components/UserPage/ContactForm';
import ScrollToTopButton from '../../components/orther/scrollToTop/ScrollToTopButton';
import NavBottom from '../../components/UserPage/NavBottom';

const User: React.FC = () => {
  return (
    <div className="flex min-h-screen select-none flex-col bg-white dark:bg-black dark:bg-opacity-80">
      <Header />
      <ScrollToTopButton />
      <div className="flex-1 xl:pt-[100px]">
        <Outlet />
      </div>
      <ContactForm />
      <FooterFC />
      <NavBottom />
    </div>
  );
};

export default User;
