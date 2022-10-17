import React, {useContext, useEffect, useState} from 'react';
import { DataContext } from '../../Context';
import styles from './Reviews.module.scss';

export default function Reviews() {
  const { comments, host } = useContext(DataContext);
  const commentsToMain = comments && comments.filter(comment => comment.show_on_main);
  const commentsToShow = commentsToMain.length > 24 ?
    commentsToMain.slice(0, 24) :
    commentsToMain;

  let splittedName = commentsToShow[0] && commentsToShow[0].user_name && commentsToShow[0].user_name.split(' ');
  let initialsZero = '';
  splittedName && splittedName.forEach(el => initialsZero += el[0]);
  const [detailedComment, setDetailedComment] = useState(commentsToShow[0]);
  const [detailedInitials, setDetailedInitials] = useState(initialsZero);

  if (commentsToShow[0]) {
    commentsToShow[0].checked = true;
  }

  function handleAvatarClick(event) {
    const currentComment = commentsToShow.filter(comment => comment.id == event.target.id)[0];
    let splittedCurrName = currentComment.user_name.split(' ');
    let initialsCurr = '';
    splittedCurrName.forEach(el => initialsCurr += el[0]);
    setDetailedComment(currentComment);
    setDetailedInitials(initialsCurr);
    return commentsToShow && commentsToShow.map(comment => {
      const checkedAvatars = document.querySelectorAll('.Reviews_avatarChecked__2uP4Q');
      if (checkedAvatars.length >= 1) {
        checkedAvatars[0].classList.add('Reviews_avatar__1Sa26');
      }
      if (currentComment.id === Number(checkedAvatars[0].id)) {
        checkedAvatars[0].classList.remove('Reviews_avatar__1Sa26');
      }
      if (comment.id === currentComment.id) {
        comment.checked = true;
      } else {
        comment.checked = false;
      }
    });
  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-7">
          <div className={styles.text}>
            <p className={styles.header}>Отзывы о проекте</p>
          </div>
          <div className={styles.avatarContainer}>
            {commentsToShow && commentsToShow.map(comment => {
              let splittedName = comment.user_name.split(' ');
              let initials = '';
              splittedName.forEach(el => initials += el[0]);
              return (
                comment.checked ?
                  (comment.avatar && comment.avatar.url ? <img key={comment.id} id={comment.id} className={styles.avatarChecked} src={`${host}${comment.avatar && comment.avatar.url}`} alt={comment.user_name} onClick={(e) => handleAvatarClick(e)} checked={false} /> :
                    <div key={comment.id} id={comment.id} className={styles.avatarChecked} onClick={(e) => handleAvatarClick(e)} style={{ 'background': comment.color }} checked={false}>{initials}</div>) :
                  (comment.avatar && comment.avatar.url ? <img key={comment.id} id={comment.id} className={styles.avatar} src={`${host}${comment.avatar && comment.avatar.url}`} alt={comment.user_name} onClick={(e) => handleAvatarClick(e)} checked={false} /> :
                    <div key={comment.id} id={comment.id} className={styles.avatar} style={{ 'background': comment.color }} onClick={(e) => handleAvatarClick(e)} checked={false}>{initials}</div>)
              );
            })}
          </div>
        </div>
        <div className="col-12 col-lg-5">
          {
            detailedComment ?
              <div className={styles.detailedContainer}>
                <div className={styles.upperRow}>
                  <div className={styles.imageBox}>
                    {
                      detailedComment.avatar ?
                        <img className={styles.avatarSmall} src={`${host}${detailedComment.avatar && detailedComment.avatar.url}`} alt={detailedComment.user_name} /> :
                        <div className={styles.avatarSmall} style={{ 'background': detailedComment.color }}>{detailedInitials}</div>
                    }
                  </div>
                  <div>
                    <h1 id={styles.name}>{detailedComment.user_name}</h1>
                    <p id={styles.about}>{detailedComment.about_user}</p>
                  </div>
                </div>
                <div className={styles.commentBox}>
                  <p id={styles.comment}>{detailedComment.comment}</p>
                </div>
              </div>
              :
              <div className={styles.secondaryContainer}>
                <div className={styles.detailedContainer}>
                  <div className={styles.upperRow}>
                    <div className={styles.wrapperImageBox}>
                      <div className={styles.imageBox}>
                        {
                          comments[0] && comments[0].avatar ?
                            <img className={styles.avatarSmall} src={`${host}${comments[0] && comments[0].avatar.url}`} alt={comments[0] && comments[0].user_name} /> :
                            <div className={styles.avatarSmall} style={{ 'background': comments[0] && comments[0].color }}>{initialsZero}</div>
                        }
                      </div>
                      <div className={styles.userBox}>
                        <h1 id={styles.name}>{comments[0] && comments[0].user_name}</h1>
                        <p id={styles.about}>{comments[0] && comments[0].about_user}</p>
                      </div>
                    </div>
                    <div className={styles.commentBox}>
                      <p id={styles.comment}>{comments[0] && comments[0].comment}</p>
                    </div>
                  </div>
                </div>
              </div>
          }
        </div>
      </div>
    </div>
  );

}
