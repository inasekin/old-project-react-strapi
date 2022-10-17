import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card } from 'semantic-ui-react';
import styles from './ProjectPageNews.module.scss';
import { DataContext } from '../../Context';

export default function ProjectPageNews() {

  const { externalNews, host } = useContext(DataContext);
  const newsToShow = externalNews.length > 4 ?
    externalNews && externalNews.slice(externalNews.length - 4,) :
    externalNews && externalNews;

  return (
    <div className="container-fluid container-lg">
      {externalNews[0] && <div className="row justify-content-start">
        <div className="col-9">
          <p className={styles.title}>СМИ о нас</p>
        </div>
        <div className={[styles.WrapperNews, 'd-flex'].join(" ")}>
          {externalNews && newsToShow.map(article => {
            const day = new Date(article.date).getDate().toString().length > 1 ? new Date(article.date).getDate() : `0${new Date(article.date).getDate()}`;
            const month = new Date(article.date).getMonth().toString().length > 1 ? new Date(article.date).getMonth() + 1 : `0${new Date(article.date).getMonth() + 1}`;
            const date = `${day}.${month}.${new Date(article.date).getFullYear()}`;
            return (
              <div className="col-11 col-lg-3 p-0" key={article.id}>
                <a href={article.link} target='blank' className={styles.link}>
                  <div className={styles.step}>
                    {article.logo && <Link to={`/news/${article.id}`}><img id={styles.newsImage} src={`${host}${article.logo && article.logo.url}`} /></Link>}
                    <p className={styles.text}>{article.title}</p>
                    <Card.Meta className={styles.date}>
                      <span className='date'>{!isNaN(month) && date}</span>
                    </Card.Meta>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>}
    </div>
  );
}
