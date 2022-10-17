import React, { useContext, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import News from '../../Components/News';
import { DataContext } from '../../Context';
import Slider from '../../Components/Slider';
import InitiativeInfo from '../../Components/InitiativeInfo';
import InitiativeVideo from '../../Components/InitiativeVideo';
import Problem from '../../Components/Problem';
import Solution from '../../Components/Solution';
import Steps from '../../Components/Steps';
import Proposal from '../../Components/Proposal';
import SupportedBy from '../../Components/SupportedBy';
import InitiativeComments from '../../Components/InitiativeComments';
import Documents from '../../Components/Documents';
import Companies from '../../Components/Companies';
import Help from '../../Components/Help';
import Experience from '../../Components/Experience';
import styles from './Initiative.module.css';
import Infographics from '../../Components/Infographics';

export default function Initiative() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);
  const { initiatives, news, comments } = useContext(DataContext);
  const { name } = useParams();
  const currentInitiative = initiatives.filter(el => el.name == name)[0];
  const projectNews = news.filter(el => el.tag === currentInitiative.title);
  const newsToShow = projectNews.slice(0, 4).sort((a, b) => {
    const dateA = a.news_date.split('-').join();
    const dateB = b.news_date.split('-').join();
    return dateB < dateA ? -1 : (dateB > dateA ? 1 : 0);
  });
  const projectComments = comments.filter(el => el.initiative && el.initiative.title === currentInitiative.title);
  const commentsForInitiative = projectComments.filter(el => el.showOnInitiativePage);
  const commentsToShow = commentsForInitiative.length > 6 ?
    commentsForInitiative.slice(0, 6) :
    commentsForInitiative;
  const whoSupports = currentInitiative && currentInitiative.users;
  return (
    <div className={styles.page}>
      <Navbar backgroundColor='dark' color='white' logoType='white' main={false} initiativeName={currentInitiative && currentInitiative.title} />
      <InitiativeInfo currentInitiative={currentInitiative} whoSupports={whoSupports} />
      {currentInitiative && currentInitiative.infographics && <Infographics infographics={currentInitiative && currentInitiative.infographics} />}
      {currentInitiative && currentInitiative.foreign_experience && currentInitiative.foreign_experience.text && <Experience text={currentInitiative && currentInitiative.foreign_experience} />}
      {currentInitiative && currentInitiative.videoId && <InitiativeVideo currentInitiative={currentInitiative} />}
      {currentInitiative && currentInitiative.problem_short && <Problem currentInitiative={currentInitiative} />}
      {currentInitiative && currentInitiative.slider_images[0] && <Slider currentInitiative={currentInitiative} />}
      {currentInitiative && (currentInitiative.solution_without_sections || currentInitiative.solution_short_sections) && <Solution currentInitiative={currentInitiative} />}
      {currentInitiative && currentInitiative.steps && <Steps steps={currentInitiative && currentInitiative.steps} />}
      {currentInitiative && currentInitiative.proposal && <Proposal text={currentInitiative && currentInitiative.proposal} whoSupports={whoSupports} />}
      {currentInitiative && currentInitiative.supported_by[0] && <SupportedBy supported={currentInitiative && currentInitiative.supported_by} />}
      <News newsToShow={newsToShow} backgroundColor='dark' />
      <Help whoSupports={whoSupports} style='dark' />
      {commentsToShow[0] && <InitiativeComments comments={commentsToShow} />}
      {currentInitiative && currentInitiative.documents && currentInitiative.documents.document && <Documents documents={currentInitiative && currentInitiative.documents && currentInitiative.documents.document} header={currentInitiative && currentInitiative.documents_header} />}
      {currentInitiative && currentInitiative.companies[0] && <Companies companies={currentInitiative && currentInitiative.companies} partnersNum={currentInitiative && currentInitiative.partners_number} />}
      <Footer />
    </div>
  );
}