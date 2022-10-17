import React, { useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import MetelevInfo from '../../Components/MetelevInfo';
import Subscribe from '../../Components/Subscribe';
import AuthorProjects from '../../Components/AuthorProjects';
import AuthorInitiatives from '../../Components/AuthorInitiatives';
import styles from './Author.module.css';

export default function Author() {
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
      <MetelevInfo />
      <AuthorInitiatives />
      <AuthorProjects />
      <Subscribe />
      <Footer />
    </div>
  );
}