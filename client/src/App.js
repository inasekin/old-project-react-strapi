import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Main from './Pages/Main';
import NotFound from './Pages/NotFound';
import { AuthProvider, DataContext } from './Context';
import axios from 'axios';
// import 'semantic-ui-css/semantic.min.css';
import Initiative from './Pages/Initiative';
import Author from './Pages/Author';
import Contacts from './Pages/Contacts';
import AllNews from './Pages/AllNews';
import AllInitiatives from './Pages/AllInitiatives';
import AboutProject from './Pages/AboutProject';
import Article from './Pages/Article';

function App() {

  const { hostname } = window.location;
  const host = window.location.hostname === 'localhost' ? 'http://127.0.0.1:1337' : `https://${window.location.hostname}`;

  const [initiatives, setInitiatives] = useState([]);
  const [news, setNews] = useState([]);
  const [comments, setComments] = useState([]);
  const [aboutProjectPageData, setAboutProjectPageData] = useState({});
  const [mainPage, setMainPage] = useState({});
  const [aboutAuthorPage, setAboutAuthorPage] = useState({});
  const [approvedCounter, setApprovedCounter] = useState(0);
  const [externalNews, setExternalNews] = useState([]);

  // const allInitiatives = await axios(`http://${hostname}:1337/api/initiatives`);
  // const allNews = await axios(`http://${hostname}:1337/api/project-news`);
  // const allComments = await axios(`http://${hostname}:1337/api/comments`);
  // const aboutProjectPage = await axios(`http://${hostname}:1337/api/about-project-page`);
  // const mainPage = await axios(`http://${hostname}:1337/api/main-page-content`);
  // const aboutAuthorPage = await axios(`http://${hostname}:1337/api/author-page-content`);
  // const externalNews = await axios(`http://${hostname}:1337/api/external-news`);

  // const allInitiatives = await axios(`https://${hostname}/api/initiatives`);
  // const allNews = await axios(`https://${hostname}/api/project-news`);
  // const allComments = await axios(`https://${hostname}/api/comments`);
  // const aboutProjectPage = await axios(`https://${hostname}/api/about-project-page`);
  // const mainPage = await axios(`https://${hostname}/api/main-page-content`);
  // const aboutAuthorPage = await axios(`https://${hostname}/api/author-page-content`);
  // const externalNews = await axios(`https://${hostname}/api/external-news`);

  useEffect(async () => {

    //TODO: закомментить (для прода)
    const allInitiatives = await axios(`http://${hostname}:1337/api/initiatives`);
    const allNews = await axios(`http://${hostname}:1337/api/project-news`);
    const allComments = await axios(`http://${hostname}:1337/api/comments`);
    const aboutProjectPage = await axios(`http://${hostname}:1337/api/about-project-page`);
    const mainPage = await axios(`http://${hostname}:1337/api/main-page-content`);
    const aboutAuthorPage = await axios(`http://${hostname}:1337/api/author-page-content`);
    const externalNews = await axios(`http://${hostname}:1337/api/external-news`);

    //TODO: раскомментить (для прода)
    // const allInitiatives = await axios(`https://${hostname}/api/initiatives`);
    // const allNews = await axios(`https://${hostname}/api/project-news`);
    // const allComments = await axios(`https://${hostname}/api/comments`);
    // const aboutProjectPage = await axios(`https://${hostname}/api/about-project-page`);
    // const mainPage = await axios(`https://${hostname}/api/main-page-content`);
    // const aboutAuthorPage = await axios(`https://${hostname}/api/author-page-content`);
    // const externalNews = await axios(`https://${hostname}/api/external-news`);

    const sortedInitiatives = allInitiatives.data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    const sortedNews = allNews.data.sort((a, b) => {

      const dateA = a.news_date.split('-').join();
      const dateB = b.news_date.split('-').join();
      return dateB < dateA ? -1 : (dateB > dateA ? 1 : 0);
    });
    const sortedComments = allComments.data.sort((a, b) => {
      const dateA = a.created_at.split('-').join();
      const dateB = b.created_at.split('-').join();
      return dateB < dateA ? -1 : (dateB > dateA ? 1 : 0);
    });
    const externalNewsSorted = externalNews.data.sort((a, b) => {
      const dateA = a.date.split('-').join();
      const dateB = b.date.split('-').join();
      return dateB < dateA ? -1 : (dateB > dateA ? 1 : 0);
    });

    setInitiatives(sortedInitiatives);
    setNews(sortedNews);
    setComments(sortedComments);
    setAboutProjectPageData(aboutProjectPage.data);
    setMainPage(mainPage.data);
    setAboutAuthorPage(aboutAuthorPage.data);
    setExternalNews(externalNewsSorted);

    let script = document.createElement('script');
    let noscript = document.createElement('noscript');
    script.type = 'text/javascript';
    let codeScript = `
<!-- Yandex.Metrika counter -->
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(80625049, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });
<!-- /Yandex.Metrika counter -->
    `;
    let codeNoscript = `
        <div><img src="https://mc.yandex.ru/watch/80625049" style="position:absolute; left:-9999px;" alt="" /></div>
    `;
    try {
      script.appendChild(document.createTextNode(codeScript));
      noscript.appendChild(document.createTextNode(codeNoscript));
      document.head.appendChild(script);
      document.head.appendChild(noscript);
    } catch (e) {
      console.log('document.head', document.head);
      script.text = codeScript;
      noscript.text = codeNoscript;
      document.head.appendChild(script);
      document.head.appendChild(noscript);
    }

  }, []);

  useEffect(() => {
    if (initiatives.length) {
      let counter = 0;
      initiatives.forEach((initiative) => counter += (initiative.start_number_of_supporting + initiative.users.length));
      setApprovedCounter(counter);
    }
  }, [initiatives, approvedCounter]);

  const [isLoading, setLoading] = useState(true);
  function fakeRequest() {
    return new Promise(resolve => setTimeout(() => resolve(), 2500));
  }

  useEffect(() => {
    fakeRequest().then(() => {
      const el = document.querySelector(".loader-wrapper");
      if (el) {
        el.remove();
        setLoading(!isLoading);
      }
    });
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <DataContext.Provider value={{ initiatives, news, comments, host, aboutProjectPageData, approvedCounter, externalNews, mainPage, aboutAuthorPage }}>
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Main />
            </Route>
            <Route path='/author'>
              <Author />
            </Route>
            <Route path='/contacts'>
              <Contacts />
            </Route>
            <Route path='/news/:id'>
              <Article />
            </Route>
            <Route path='/news'>
              <AllNews />
            </Route>
            <Route path='/initiatives/:name'>
              <Initiative />
            </Route>
            <Route path='/initiatives'>
              <AllInitiatives />
            </Route>
            <Route path='/about'>
              <AboutProject />
            </Route>
            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </DataContext.Provider >
  );
}

export default App;
