import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import ContactUs from '../../Components/ContactUs';
import MailForm from '../../Components/MailForm';
import styles from './Contacts.module.css';

export default function Contacts() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return (
    <div className={styles.page}>
      <Navbar backgroundColor='transparent' color='black' logoType='black' initiativeName='' main={false} />
      <ContactUs />
      <MailForm />
      <Footer />
    </div>
  );
}