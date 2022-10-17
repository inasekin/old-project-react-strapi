import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import Help from '../../Components/Help';
import MailForm from '../../Components/MailForm';
import ProjectPageScheme from '../../Components/ProjectPageScheme';
import ProjectPageNews from '../../Components/ProjectPageNews';
import ProjectPageDetailed from '../../Components/ProjectPageDetailed';
import ProjectPageVideo from '../../Components/ProjectPageVideo';
import { DataContext } from '../../Context';
import ProjectPageAbout from '../../Components/ProjectPageAbout';

export default function AboutProject() {
  const { pathname } = useLocation();
  const { aboutProjectPageData, host, approvedCounter } = useContext(DataContext);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);
  return (
    <>
      <Navbar backgroundColor='transparent' color='black' logoType='black' initiativeName='' main={false} />
      <ProjectPageAbout host={host} counter={approvedCounter} text={aboutProjectPageData && aboutProjectPageData.about_text} logo={aboutProjectPageData && aboutProjectPageData.project_logo && aboutProjectPageData.project_logo.url}  />
      {aboutProjectPageData && aboutProjectPageData.videoId && <ProjectPageVideo videoId={aboutProjectPageData && aboutProjectPageData.videoId} videoText={aboutProjectPageData && aboutProjectPageData.video_text} videoBackground={aboutProjectPageData && aboutProjectPageData.video_background} />}
      <ProjectPageScheme steps={aboutProjectPageData && aboutProjectPageData.scheme}/>
      <ProjectPageDetailed header={aboutProjectPageData && aboutProjectPageData.we_propose_header} text={aboutProjectPageData && aboutProjectPageData.we_propose_text} />
      <Help />
      <ProjectPageNews />
      <MailForm />
      <Footer />
    </>
  );
}