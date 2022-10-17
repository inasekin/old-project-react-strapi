import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import styles from './News.module.scss';
import { DataContext } from '../../Context';

export default function News({ newsToShow, backgroundColor, title }) {

  const { host } = useContext(DataContext);
  const theme = backgroundColor ? styles.darkWrapper : styles.transparentWrapper;
  const tagStyle = backgroundColor ? styles.tagDark : styles.tag;
  const textColoring = backgroundColor ? styles.whiteText : styles.blackText;
  const width = window.screen.availWidth;
  const isMobile = width < 428 ? true : false;
  return (
    <div className={[theme, backgroundColor ? 'container-fluid mt-0 mb-0 py-5' : 'container'].join(" ")}>
      <div className="row justify-content-center">
        <div className={[backgroundColor ? "col-lg-12 col-12" : 'col-12'].join(" ")}>
          <div className={styles.upperRow}>
            <p className={styles.header} id={textColoring}>{title ? title : 'Новости проекта'}</p>
            {!backgroundColor && !isMobile && <Link to='/news' id={styles.link}>Посмотреть все</Link>}
          </div>

          {newsToShow[0] && <div className="row">
            {newsToShow && newsToShow.map(article => {
              const day = new Date(article.news_date).getDate().toString().length > 1 ? new Date(article.news_date).getDate() : `0${new Date(article.news_date).getDate()}`;
              const month = new Date(article.news_date).getMonth().toString().length > 1 ? new Date(article.news_date).getMonth() + 1 : `0${new Date(article.news_date).getMonth() + 1}`;
              const date = `${day}.${month}.${new Date(article.news_date).getFullYear()}`;
              const tagWidth = article.tag && article.tag <= 10 ? styles.tagShort : styles.tagLong;
              const card = <div className="col-12 col-lg-3"><DesktopCard key={article.id} article={article} host={host} date={date} tagWidth={tagWidth} textColoring={textColoring} tagStyle={tagStyle} /></div>;
              return card;
            })}
          </div>}
          {!backgroundColor && isMobile && <Link to='/news' id={styles.link}>Посмотреть все</Link>}
        </div>
      </div>
    </div>
  );
}

const DesktopCard = ({ article, date, tagWidth, host, textColoring, tagStyle }) => {
  return (
    <div key={article && article.id} className={styles.card}>
      {article.image && <Link to={`/news/${article.id}`} className={styles.newsImage}><img src={`${host}${article.image && article.image.url}`} alt=""/></Link>}
      <div className="d-flex flex-column">
        <div className={styles.tagWrapper}>
          <div className={[tagStyle, 'order-lg-1 order-2'].join(" ")} id={tagWidth}>{article.tag && article.tag}</div>
        </div>
        <Link className={['order-lg-2 order-1'].join(" ")} to={`/news/${article.id}`}><div className={styles.text} id={textColoring}>{article.title}</div></Link>
        <Card.Meta className={[styles.date, "order-lg-3 order-3"].join(" ")}>
          <span className='date'>{date}</span>
        </Card.Meta>
      </div>
    </div>
  );
};
