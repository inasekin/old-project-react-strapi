import React, { useEffect, useContext, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { DataContext } from '../../Context';
import styles from './AllNews.module.scss';

function between(min, max) {
  return Math.floor(
    Math.random() * (max - min) + min
  );
}

export default function AllNews() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  const { news, host, initiatives, externalNews } = useContext(DataContext);
  const latestNews = news[0] && news.slice(0, 7).reverse();
  const latestExternalNews = externalNews && externalNews.slice(0, 8);
  const [tags, setTags] = useState([]);
  const [randomIndex, setRandomIndex] = useState(() => between(0, initiatives && initiatives.length));
  const [initiativeToShow, setInitiativeToShow] = useState({});
  const [newsToShow, setNewsToShow] = useState(latestNews);
  const [externalNewsToShow, setExternalNewsToShow] = useState(latestExternalNews);
  const [indexMore, setIndexMore] = useState(0);
  const [showMore, setShowMore] = useState([]);
  const [blocksMore, setBlocksMore] = useState([]);
  const [externalMobile, setExternalMobile] = useState([]);
  const [blocksMoreMobile, setBlocksMoreMobile] = useState([]);
  const [showMoreMobile, setShowMoreMobile] = useState([]);

  useEffect(() => {
    setNewsToShow(latestNews);
    setExternalNewsToShow(latestExternalNews);
    setExternalMobile(externalNews);
    const numberOfBlocks = Math.ceil(news.length / 7);
    const numberOfBlocksExternal = Math.ceil(externalNews.length / 8);
    const limit = numberOfBlocks > numberOfBlocksExternal ? numberOfBlocks : numberOfBlocksExternal;
    const arr = [];
    for (let i = 1; i <= limit; i++) {
      const leftColumn = news.slice(i * 7, i * 7 + 7).reverse();
      const rightColumn = externalNews.slice(i * 8, i * 8 + 8).reverse();
      arr.push({
        leftColumn: leftColumn,
        rightColumn: rightColumn
      });
    }
    setBlocksMore(arr);

    const arrMob = [];
    for (let i = 0; i <= numberOfBlocks; i++) {
      const newBlock = news.slice(i * 7, i * 7 + 7).reverse();
      arrMob.push(newBlock);
    }
    setBlocksMoreMobile(arrMob);

  }, [news, externalNews, tags]);

  useEffect(() => {
    if (tags.includes('Все новости')) {
      setNewsToShow(latestNews);
      setExternalNewsToShow(latestExternalNews);
    } else if (!tags.includes('Все новости') && tags.length) {
      const filteredNews = news.filter(el => tags.includes(el.tag)).reverse();
      const filteredExternalNews = externalNews.filter(el => tags.includes(el.tag)).reverse();
      const numberOfBlocks = Math.ceil(filteredNews.length / 7);
      const numberOfBlocksExternal = Math.ceil(filteredExternalNews.length / 8);
      const limit = numberOfBlocks > numberOfBlocksExternal ? numberOfBlocks : numberOfBlocksExternal;
      const arr = [];
      for (let i = 1; i <= limit; i++) {
        arr.push({
          leftColumn: news.slice(i * 7, i * 7 + 7).filter(el => tags.includes(el.tag)).reverse(),
          rightColumn: externalNews.slice(i * 8, i * 8 + 8).filter(el => tags.includes(el.tag)).reverse()
        });
      }
      setBlocksMore(arr);

      const arrMob = [];
      for (let i = 0; i <= numberOfBlocks; i++) {
        const newBlock = news.slice(i * 7, i * 7 + 7).filter(el => tags.includes(el.tag)).reverse();
        arrMob.push(newBlock);
      }
      setBlocksMoreMobile(arrMob);

      setNewsToShow(filteredNews);
      setExternalNewsToShow(filteredExternalNews);
    }
  }, [tags]);

  const handleFilter = (e) => {
    if (!tags.includes(e.target.value)) {
      setTags([...tags, e.target.value]);
    } else {
      setTags((tags) => tags.filter(el => el !== e.target.value));
    }
    e.target.isChecked = !e.target.isChecked;
    e.target.id = e.target.isChecked ? styles.filterTagChecked : styles.filterTag;
  };

  const allTags = ['Все новости'];
  const allInitiatives = [];
  initiatives.forEach(el => allInitiatives.push(el.title));
  news.forEach(article => allTags.push(article.tag));
  externalNews.forEach(article => allTags.push(article.tag));
  const uniqueTags = Array.from(new Set(allTags));

  const handleClickMore = () => {

    if (indexMore <= blocksMore.length) {
      setIndexMore((indexMore) => indexMore += 1);
      setShowMore((showMore) => [...showMore, blocksMore[indexMore]]);
    }

    if (isMobile && indexMore <= blocksMoreMobile.length + 1) {
      setIndexMore((indexMore) => indexMore += 1);
      setShowMoreMobile((showMoreMobile) => [...showMoreMobile, blocksMoreMobile[indexMore]]);
    }
  };


  const currentInitiatives = tags.filter(el => allInitiatives.includes(el));
  useEffect(() => {
    if (currentInitiatives.length === 1) {
      const currentInitiativeIndex = initiatives.findIndex(el => el.title === currentInitiatives[0]);
      setInitiativeToShow(initiatives[currentInitiativeIndex]);
    } else if (currentInitiatives.length > 1) {
      const currentInitiativeIndex = currentInitiatives.length - 1;
      const randomInitiative = initiatives[initiatives.findIndex(el => el.title === currentInitiatives[currentInitiativeIndex])];
      setInitiativeToShow(randomInitiative);
    } else {
      setInitiativeToShow(initiatives[randomIndex]);
    }
  }, [currentInitiatives, randomIndex]);

  const width = window.screen.availWidth;
  const isMobile = width < 992 ? true : false;
  return (
    <>
      <Navbar backgroundColor='transparent' color='black' logoType='black' initiativeName='' main={false} />

      <div className="container">
        <div className="row">

          <div className="col-12">
            <h1 className={styles.header}>Новости</h1>
          </div>
          <div className="col-10 mb-4">
            {uniqueTags && uniqueTags.map(tag => <button isChecked={false} onClick={(e) => handleFilter(e)} value={tag} key={tag} id={styles.filterTag}>{tag}</button>)}
          </div>


          <div className="col-12 col-lg-8">
            <div className="row">
              <div className="col-12 col-lg-6">
                {newsToShow && newsToShow[newsToShow.length - 1] && <CardVertical article={newsToShow[newsToShow.length - 1] && newsToShow[newsToShow.length - 1]} host={host} />}
              </div>
              <div className="col-12 col-lg-6">
                {newsToShow && newsToShow[newsToShow.length - 2] && <CardVertical article={newsToShow[newsToShow.length - 2] && newsToShow[newsToShow.length - 2]} host={host} />}
              </div>
              <div className="col-12">
                {newsToShow && newsToShow[newsToShow.length - 4] && <CardHorizontal article={newsToShow[newsToShow.length - 4] && newsToShow[newsToShow.length - 4]} host={host} />}
              </div>
              <div className="col-12">
                {newsToShow && newsToShow[newsToShow.length - 3] && <CardHorizontal article={newsToShow[newsToShow.length - 3] && newsToShow[newsToShow.length - 3]} host={host} />}
              </div>

              <div className="col-12">
                {initiativeToShow && <InitiativeCard initiative={initiativeToShow} host={host} />}
              </div>

              <div className="col-12">
                {newsToShow && newsToShow[newsToShow.length - 5] && <CardHorizontal article={newsToShow[newsToShow.length - 5] && newsToShow[newsToShow.length - 5]} host={host} />}
              </div>
              <div className="col-12 col-lg-6">
                {newsToShow && newsToShow[newsToShow.length - 7] && <CardVertical article={newsToShow[newsToShow.length - 7] && newsToShow[newsToShow.length - 7]} host={host} />}
              </div>
              <div className="col-12 col-lg-6">
                {newsToShow && newsToShow[newsToShow.length - 6] && <CardVertical article={newsToShow[newsToShow.length - 6] && newsToShow[newsToShow.length - 6]} host={host} />}
              </div>

            </div>
          </div>

            <div className="col-12 col-lg-1"></div>

          {!isMobile && <div className="col-3 pl-3">
            {externalNewsToShow.length > 0 && <h1 className={styles.subHeader}>СМИ о нас</h1>}
            {externalNewsToShow && externalNewsToShow.map(article => {
              return <ExternalCard key={article.id} article={article} host={host} />;
            })}
          </div>}

        </div>
        {showMore && showMore.map(block => {
          const rightId = block.leftColumn.length === 0 ? styles.rightColumnAlone : '';
          return (
            <div key={block && block.leftColumn && block.leftColumn[0] && block.leftColumn[0].id} className="row">

              <div className="col-12 col-lg-8">
                {block.leftColumn.length > 0 && <>
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      {block && block.leftColumn && block.leftColumn[block.leftColumn.length - 1] && <CardVertical article={block.leftColumn[block.leftColumn.length - 1] && block.leftColumn[block.leftColumn.length - 1]} host={host} />}
                    </div>
                    <div className="col-12 col-lg-6">
                      {block && block.leftColumn && block.leftColumn[block.leftColumn.length - 2] && <CardVertical article={block.leftColumn[block.leftColumn.length - 2] && block.leftColumn[block.leftColumn.length - 2]} host={host} />}
                    </div>
                    <div className="col-12">
                      {block && block.leftColumn && block.leftColumn[block.leftColumn.length - 3] && <CardHorizontal article={block.leftColumn[block.leftColumn.length - 3] && block.leftColumn[block.leftColumn.length - 3]} host={host} />}
                    </div>
                    <div className="col-12">
                      {block && block.leftColumn && block.leftColumn[block.leftColumn.length - 4] && <CardHorizontal article={block.leftColumn[block.leftColumn.length - 4] && block.leftColumn[block.leftColumn.length - 4]} host={host} />}
                    </div>

                    <div className="col-12">
                      {block && block.leftColumn && block.leftColumn[block.leftColumn.length - 5] && <CardHorizontal article={block.leftColumn[block.leftColumn.length - 5] && block.leftColumn[block.leftColumn.length - 5]} host={host} />}
                    </div>
                    <div className="col-12 col-lg-6">
                      {block && block.leftColumn && block.leftColumn[block.leftColumn.length - 6] && <CardVertical article={block.leftColumn[block.leftColumn.length - 6] && block.leftColumn[block.leftColumn.length - 6]} host={host} />}
                    </div>
                    <div className="col-12 col-lg-6">
                      {block && block.leftColumn && block.leftColumn[block.leftColumn.length - 7] && <CardVertical article={block.leftColumn[block.leftColumn.length - 7] && block.leftColumn[block.leftColumn.length - 7]} host={host} />}
                    </div>
                  </div>
                </>}
              </div>
              {block.rightColumn.length > 0 && !isMobile && <div className="col-4" id={rightId}>
                {block && block.rightColumn && block.rightColumn[block.rightColumn.length - 1] && <ExternalCard article={block.rightColumn[block.rightColumn.length - 1] && block.rightColumn[block.rightColumn.length - 1]} host={host} />}
                {block && block.rightColumn && block.rightColumn[block.rightColumn.length - 2] && <ExternalCard article={block.rightColumn[block.rightColumn.length - 2] && block.rightColumn[block.rightColumn.length - 2]} host={host} />}
                {block && block.rightColumn && block.rightColumn[block.rightColumn.length - 3] && <ExternalCard article={block.rightColumn[block.rightColumn.length - 3] && block.rightColumn[block.rightColumn.length - 3]} host={host} />}
                {block && block.rightColumn && block.rightColumn[block.rightColumn.length - 4] && <ExternalCard article={block.rightColumn[block.rightColumn.length - 4] && block.rightColumn[block.rightColumn.length - 4]} host={host} />}
                {block && block.rightColumn && block.rightColumn[block.rightColumn.length - 5] && <ExternalCard article={block.rightColumn[block.rightColumn.length - 5] && block.rightColumn[block.rightColumn.length - 5]} host={host} />}
                {block && block.rightColumn && block.rightColumn[block.rightColumn.length - 6] && <ExternalCard article={block.rightColumn[block.rightColumn.length - 6] && block.rightColumn[block.rightColumn.length - 6]} host={host} />}
                {block && block.rightColumn && block.rightColumn[block.rightColumn.length - 7] && <ExternalCard article={block.rightColumn[block.rightColumn.length - 7] && block.rightColumn[block.rightColumn.length - 7]} host={host} />}
                {block && block.rightColumn && block.rightColumn[block.rightColumn.length - 8] && <ExternalCard article={block.rightColumn[block.rightColumn.length - 8] && block.rightColumn[block.rightColumn.length - 8]} host={host} />}
              </div>}
            </div>
          );
        })}
        {
          indexMore < blocksMore.length ?
            <button onClick={handleClickMore} className={styles.showMore}>Больше новостей</button> :
            <div className={styles.endContainer}><p className={styles.end}>Вы посмотрели все новости</p></div>
        }
      </div>

      {isMobile &&
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className={styles.subHeader}>СМИ о нас</h1>
            <div className={styles.rightColumn}>
              {externalMobile && externalMobile.map(article => {
                return <ExternalCard key={article.id} article={article} host={host} />;
              })}
            </div>
          </div>
        </div>
      </div>}

      <Footer />
    </>
  );
}


function CardVertical({ article, host }) {
  const day = new Date(article.news_date).getDate().toString().length > 1 ? new Date(article.news_date).getDate() : `0${new Date(article.news_date).getDate()}`;
  const month = new Date(article.news_date).getMonth().toString().length > 1 ? new Date(article.news_date).getMonth() + 1 : `0${new Date(article.news_date).getMonth() + 1}`;
  const date = `${day}.${month}.${new Date(article.news_date).getFullYear()}`;
  const tagWidth = article.tag && article.tag.length <= 10 ? styles.tagShort : styles.tagLong;
  return (
    <div key={article.id} className={styles.cardVertical}>
      {article.image_for_news_page && <Link to={`/news/${article.id}`}><img id={styles.newsImage} src={`${host}${article.image_for_news_page && article.image_for_news_page.url}`} /></Link>}
      <Link id={styles.link} to={`/news/${article.id}`}><div className={styles.text}>{article.title}</div></Link>
      {article.tag && article.tag && <div className={styles.tag} id={tagWidth}>{article.tag && article.tag}</div>}
      <Card.Meta className={styles.date}>
        {!isNaN(day) && <span className='date'>{date}</span>}
      </Card.Meta>
    </div>
  );
}

function CardHorizontal({ article, host }) {
  const day = new Date(article.news_date).getDate().toString().length > 1 ? new Date(article.news_date).getDate() : `0${new Date(article.news_date).getDate()}`;
  const month = new Date(article.news_date).getMonth().toString().length > 1 ? new Date(article.news_date).getMonth() + 1 : `0${new Date(article.news_date).getMonth() + 1}`;
  const date = `${day}.${month}.${new Date(article.news_date).getFullYear()}`;
  const tagWidth = article.tag && article.tag.length <= 10 ? styles.tagShort : styles.tagLong;
  return (
    <div key={article.id} className={[styles.cardHorizontal, 'row'].join(" ")}>
      {article.image_for_news_page && <Link className={['col-12 col-lg-6 p-0'].join(" ")} to={`/news/${article.id}`}><img id={styles.newsImage} src={`${host}${article.image_for_news_page && article.image_for_news_page.url}`} /></Link>}
      <div className={['col-12 col-lg-6'].join(" ")}>
        <Link id={styles.link} to={`/news/${article.id}`}><div className={styles.textHorizontal}>{article.title}</div></Link>
        {article.tag && article.tag && <div className={styles.tag} id={tagWidth}>{article.tag && article.tag}</div>}
        <Card.Meta className={[styles.date].join(" ")}>
          {!isNaN(day) && <span className='date'>{date}</span>}
        </Card.Meta>
      </div>
    </div>
  );
}

function InitiativeCard({ initiative, host }) {

  return (
    <Link key={initiative.id} to={initiative.readyToShow ? `/initiatives/${initiative.name}` : '#'} >
      <div key={initiative.id} className={[styles.initiativeCard, 'row'].join(" ")} style={{ 'background': initiative.card_background }}>
        <div className={['col-12 col-lg-5 p-0'].join(" ")}>
          <img src={`${host}${initiative.image && initiative.image.url}`} alt={initiative.title} />
        </div>
        <div className={["col-12 col-lg-7", styles.initiativeWrapper].join(" ")}>
          <h1 className={styles.initiativeName} >{initiative.title}</h1>
          <p className={styles.initiativeDescription} >{initiative.short_description}</p>
          {initiative.readyToShow ?
            <Link to={initiative.readyToShow ? `/initiatives/${initiative.name}` : '#'} ><button className={styles.supportButton}>Поддержать</button></Link> :
            <p className={styles.initiativeDeveloping}>Инициатива в разработке</p>}
        </div>
      </div>
    </Link>
  );
}

function ExternalCard({ article, host }) {
  const day = new Date(article.date).getDate().toString().length > 1 ? new Date(article.date).getDate() : `0${new Date(article.date).getDate()}`;
  const month = new Date(article.date).getMonth().toString().length > 1 ? new Date(article.date).getMonth() + 1 : `0${new Date(article.date).getMonth() + 1}`;
  const date = `${day}.${month}.${new Date(article.date).getFullYear()}`;
  return (
    <div style={{ 'background': article.background }} className={styles.externalCard}>
      <a href={article.link} target='blank' id={styles.link}>
        <img className={styles.logo} src={`${host}${article.logo && article.logo.url}`} alt={article.title} />
        <p className={styles.title}>{article.title}</p>
        <Card.Meta className={styles.dateExt}>
          {!isNaN(day) && <span className='date'>{date}</span>}
        </Card.Meta>
      </a>
    </div>
  );
}
