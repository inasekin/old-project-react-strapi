import React, { useContext, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styles from './Article.module.scss';
import { DataContext } from '../../Context';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import Help from '../../Components/Help';
import News from '../../Components/News';
import { Table, Embed } from 'semantic-ui-react';
import Markdown from 'react-markdown';

export default function Article() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  const { host, news } = useContext(DataContext);
  const { id } = useParams();
  const article = news.filter(el => el.id == id)[0];
  const width = window.screen.availWidth;
  const isMobile = width < 428 ? true : false;

  const connectedNews = news.filter(el => el.tag === article.tag);
  const newsToShow = connectedNews.slice(0, 4).sort((a, b) => {

    const dateA = a.news_date.split('-').join();
    const dateB = b.news_date.split('-').join();
    return dateB < dateA ? -1 : (dateB > dateA ? 1 : 0);
  });
  let tableComponent;
  if (article && article.table_component) {
    tableComponent = isMobile ? <MobileTable table={article.table_component.table_content} table_header={article.table_component.table_header} /> : <MyTable table={article.table_component.table_content} table_header={article.table_component.table_header} />;
  }

  return (
    <>
      <Navbar backgroundColor='transparent' color='black' logoType='black' initiativeName='' main={false} />

      <div className='container'>
        <div className='row'>

          <div className="col-12 col-lg-10">
            {article && article.title && <h1 className={styles.title}>{article.title}</h1>}
            {article && article.subtitle1 && <h2 className={styles.subtitle}>{article.subtitle1}</h2>}
          </div>

          <div className="col-lg-11 col-12">
            {article && article.image_for_news_page && <img className={styles.image} src={`${host}${article.image_for_news_page.url}`} alt='article_image' />}
            {article && article.image_info && <p className={styles.mediaInfo}>{article.image_info}</p>}
          </div>

          <div className="col-12">
            {article && article.expert_block &&
            <div className="row">
              <div className="col-lg-10 col-12 ">
                <Markdown className={styles.pre}>{article.expert_block.expert_text}</Markdown>
              </div>
              <div className="col-lg-2 col-12 d-flex align-items-center">
                {article.expert_block.showExpert && <div className={styles.sideImageContainer}>
                  <img className={styles.expertAvatar} src={`${host}${article.expert_block.expert_avatar && article.expert_block.expert_avatar.url}`} alt='avatar' />
                  <Markdown className={styles.expertAbout}>{article.expert_block.about_expert}</Markdown>
                </div>}
              </div>
            </div>
            }
          </div>

          <div className="col-lg-9 col-12">
            {article && article.videoId &&
            <div className={styles.videoBox}>
              <Embed
                className={styles.video}
                placeholder={`${host}${article.videoBackground && article.videoBackground.url}`}
                id={article.videoId}
                source='youtube'
                aspectRatio='16:9'
                color='blue'
                icon='play circle'
              />
              <p className={styles.mediaInfo}>{article.video_info}</p>
            </div>
            }
          </div>

          <div className="col-lg-10 col-12">
            {article && article.subtitle2 && <Markdown className={styles.subtitle}>{article.subtitle2}</Markdown>}
            {article && article.text1 && <Markdown className={styles.pre}>{article.text1}</Markdown>}
          </div>


          {article && article.quote && <div className="col-12">
            <div className="row">
              <div className="col-lg-2 col-6">
                <img className={styles.quotesImg} src={`${host}${article.quotes && article.quotes.url}`} alt='quotes' />
              </div>
              <div className="col-lg-8 col-12">
                  <Markdown className={styles.quote}>{article.quote}</Markdown>
                  <Markdown className={styles.quoteAuthor}>{article.quote_info}</Markdown>
              </div>
            </div>
          </div> }

          <div className="col-lg-10 col-12 mt-3">
            {article && article.text2 && <Markdown className={styles.pre}>{article.text2}</Markdown>}
            {article && article.subtitle3 && <h2 className={styles.subtitle}>{article.subtitle3}</h2>}
          </div>

          <div className="col-12">
            {article && article.news_list &&
            <div className="row">
              <div className="col-lg-10 col-12">
                {article.news_list.bullets.map((bullet, index) => {
                  return (
                    <div key={index} className={styles.bullet}>
                      <Markdown className={styles.index}>{index + 1}.</Markdown>
                      <Markdown className={styles.preNar}>{bullet}</Markdown>
                    </div>
                  );
                })}
              </div>
              <div className="col-lg-2 col-12 d-flex flex-column">
                <img src={`${host}${article.news_list.icon && article.news_list.icon.url}`} alt='icon' />
                <Markdown className={styles.expertAbout}>{article.news_list.text_under_icon}</Markdown>
              </div>
            </div>
            }
          </div>

          <div className="col-lg-10 col-12">
            {article && article.text3 && <Markdown className={styles.pre}>{article.text3}</Markdown>}
          </div>

          <div className="col-lg-10 col-12">
            {article && article.subtitle4 && <h2 className={styles.subtitle}>{article.subtitle4}</h2>}
            {article && article.text4 && <Markdown className={styles.pre}>{article.text4}</Markdown>}
          </div>
          <div className="col-12 col-lg-10">
            {article && article.table && tableComponent && tableComponent}
          </div>
          <div className="col-lg-10 col-12">
            {article && article.subtitle5 && <h2 className={styles.subtitle}>{article.subtitle5}</h2>}
            {article && article.text5 && <Markdown className={styles.pre}>{article.text5}</Markdown>}
          </div>

          <div className="col-12">
            {article && article.news_plan &&
            <div className="row">
              <div className="col-lg-10 col-12 pl-5">
                <h2 className={styles.subtitle}>{article.news_plan.title}</h2>
                <Markdown className={styles.pre}>{article.news_plan.plan_text}</Markdown>
              </div>
              <div className="col-lg-2 col-12 d-flex justify-content-center flex-column">
                {article.news_plan.icon && !isMobile && <img src={`${host}${article.news_plan.icon && article.news_plan.icon.url}`} alt='icon' />}
                {article.news_plan.icon_text && !isMobile && <p className={styles.expertAbout}>{article.news_plan.icon_text}</p>}
              </div>
            </div>
            }
          </div>

          <div className="col-lg-10 col-12">
            {article && article.text6 && <Markdown className={styles.pre}>{article.text6}</Markdown>}
          </div>

          {article && article.documents && article.documents.map(document => {
            return (
              <div key={document.id} className={styles.linkContainer}>
                <a className={styles.linkTag} href={`${host}${document.document && document.document.url}`} download target='blank'><div className={styles.tag}>{document.file_format}</div></a>
                <a className={styles.link} href={`${host}${document.document && document.document.url}`} download target='blank'>{document.name}</a>
              </div>
            );
          })}
          {article && article.tags &&
            <div className={styles.tagsContainer}>
              {article.tags.map((tag, index) => <div key={index} className={styles.lowTag}>{tag}</div>)}
            </div>
          }
        </div>
      </div>

      <Help />
      <div className={styles.newsContainer}><News newsToShow={newsToShow} title='Новости по теме' /></div>
      <Footer />
    </>
  );
}

function MyTable({ table, table_header }) {
  const headers = table && table[0];
  const rows = table && table.slice(1,);
  return (
    <>
      <h2 className={styles.subtitle}>{table_header}</h2>
      <div className={styles.tableWrapper}>
        <div className={styles.tableContainer}>
          <Table celled id={styles.table}>
            <Table.Header id={styles.row}>
              <Table.Row>
                {table && headers && headers.map((header, index) => <Table.HeaderCell id={styles.header} key={index}>{header}</Table.HeaderCell>)}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {table && rows && rows.map((row, index) => {
                return (
                  <Table.Row key={index}>
                    {row.map((cell, index) => <Table.Cell id={styles.cell} key={index}>{cell}</Table.Cell>)}
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
}

function MobileTable({ table, table_header }) {
  const headers = table && table[0];
  const rows = table && table.slice(1,);
  return (
    <>
      <h2 className={styles.subtitle}>{table_header && table_header}</h2>
      <div className={styles.tableWrapper}>
        <div className={styles.tableContainer}>
          <table celled id={styles.table}>
            <tr id={styles.row}>
              {headers && headers.map((header, index) => <th id={styles.header} key={index}>{header}</th>)}
            </tr>
            {rows && rows.map((row, index) => {
              return (
                <tr key={index}>
                  {row.map((cell, index) => <td id={styles.cell} key={index}>{cell}</td>)}
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
}
