import React, { useState, useContext } from 'react';
import styles from './InitiativeComments.module.scss';
import { DataContext } from '../../Context';

export default function InitiativeComments({ comments }) {
  let splittedName = comments[0] && comments[0].user_name && comments[0].user_name.split(' ');
  let initialsZero = '';
  splittedName && splittedName.forEach(el => initialsZero += el[0]);
  const [detailedComment, setDetailedComment] = useState(comments[0]);
  const [detailedInitials, setDetailedInitials] = useState(initialsZero);
  const { host } = useContext(DataContext);
  comments[0].checked = true;

  function handleAvatarClick(event) {
    const currentComment = comments.filter(comment => comment.id == event.target.id)[0];
    let splittedCurrName = currentComment.user_name.split(' ');
    let initialsCurr = '';
    splittedCurrName.forEach(el => initialsCurr += el[0]);
    setDetailedComment(currentComment);
    setDetailedInitials(initialsCurr);
    return comments && comments.map(comment => {
      const checkedAvatars = document.querySelectorAll('.InitiativeComments_avatarChecked__Zq9Qy');
      if (checkedAvatars.length >= 1) {
        checkedAvatars[0].classList.add('InitiativeComments_avatar__ByNTX');
      }
      if (currentComment.id === Number(checkedAvatars[0].id)) {
        checkedAvatars[0].classList.remove('InitiativeComments_avatar__ByNTX');
      }
      if (comment.id === currentComment.id) {
        comment.checked = true;
      } else {
        comment.checked = false;
      }
    });
  }

  return (
    <div className={[styles.wrapper, "container-fluid mt-0 mb-0"].join(" ")}>
      <div className={[styles.container, 'row justify-content-center'].join(" ")}>
        <div className="col-lg-12 ocl-12">
          <div className="row">
            <div className="col-12 mt-5">
              <p className={styles.header}>Прямая речь</p>
            </div>

            <div className="col-lg-5 col-12">

              <div className={styles.avatarContainer}>
                {comments && comments.map(comment => {
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

            <div className="col-lg-7 col-12 mt-lg-0 mt-5">
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
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}