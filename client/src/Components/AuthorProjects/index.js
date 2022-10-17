import React, { useContext } from 'react';
import styles from './AuthorProjects.module.scss';
import { DataContext } from '../../Context';

export default function AuthorProjects() {
  const { host, aboutAuthorPage } = useContext(DataContext);
  const { projects_header, project_card_author_page } = aboutAuthorPage && aboutAuthorPage;
  const cardsToShow = project_card_author_page && project_card_author_page.sort((a, b) => a.position - b.position);
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mb-3">
          <h1 className={styles.header}>Проекты</h1>
          <p className={styles.info}>{projects_header}</p>
        </div>
          {cardsToShow && cardsToShow.map(card => {
            return <ProjectCard key={card.description} icon={`${host}${card.icon && card.icon.url}`} text={card.description} link={card.link} />;
          })}
      </div>
    </div>
  );
}

function ProjectCard({ icon, text, link }) {
  const result = link ?
    <a href={link} target='blank' className={[styles.projectCardLinked].join(" ")}>
      <div className={styles.card}>
        <div className={styles.iconContainer}>
          <img className={styles.icon} src={icon} alt='project_icon' />
        </div>
        <p className={styles.text}>{text}</p>
      </div>
    </a> :
    <div className={[styles.card].join(" ")}>
      <div className={styles.iconContainer}>
        <img className={styles.icon} src={icon} alt='project_icon' />
      </div>
      <p className={styles.text}>{text}</p>
    </div>;
  return (
    <div className="col-lg-4 col-12 mb-2">
      {result}
    </div>
  );
}

