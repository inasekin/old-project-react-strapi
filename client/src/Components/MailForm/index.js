import React, { useState, useContext, useReducer, useEffect } from 'react';
import ym from 'react-yandex-metrika';

import { DataContext } from '../../Context';
import styles from './MailForm.module.scss';
import { Form } from 'semantic-ui-react';
import axios from 'axios';
import modalReducer from '../../helpers/modalReducer';
import MailModal from '../MailModal';

export default function MailForm() {
  const { host } = useContext(DataContext);
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [question, setQuestion] = useState('');
  const [modalContent, setModalContent] = useState({});
  const [state, dispatch] = useReducer(modalReducer, {
    open: false,
    dimmer: undefined,
  });
  const request = {
    name: name,
    mail: mail,
    question: question
  };

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeMail = (e) => setMail(e.target.value);
  const handleChangeQuestion = (e) => setQuestion(e.target.value);

  const handleForm = async () => {
    try {
      await axios.post(`${host}/api/initiatives/sendMail`, request, {
        headers: { 'Content-Type': 'application/json' }
      });
      setModalContent({
        title: 'Вопрос отправлен',
        text: 'Спасибо за вопрос! Мы свяжемся с Вами'
      });
      dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' });

      ym('reachGoal', 'whateverGoal', {awesomeParameter: 80625049});
    } catch (err) {
      setModalContent({
        title: 'Вопрос не удалось отправить',
        text: 'К сожалению, письмо не удалось отправить. Пожалуйста, попробуйте внести в форму адрес с другим почтовым доменом'
      });
      dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' });

      ym('reachGoal', 'whateverGoal', {awesomeParameter: 80625049});
    }
  };

  useEffect(() => {
    if (modalContent.title === 'Вопрос отправлен') {
      setMail('');
      setName('');
      setQuestion('');
    }
  }, [modalContent]);

  return (
    <div className="container mb-50">
      <div className="row">
        <div className="col-12 col-lg-6">
          <h1 className={styles.question}>Остались вопросы? Пишите нам!</h1>
        </div>
        <div className={[styles.rightColumn, 'col-12 col-lg-6'].join(" ")}>
          <Form id={styles.form} onSubmit={handleForm}>
            <Form.Field className={styles.field}>
              <label>Введите имя</label>
              <input id={styles.input} value={name} placeholder='Введите имя' onChange={(e) => handleChangeName(e)} />
            </Form.Field>
            <Form.Field className={styles.field}>
              <label>Введите почту, чтобы получить ответ</label>
              <input id={styles.input} value={mail} onChange={(e) => handleChangeMail(e)} placeholder='Введите почту' />
            </Form.Field>
            <Form.Field className={styles.field}>
              <label>Задайте вопрос</label>
              <textarea id={styles.inputQuestion} value={question} placeholder='Введите вопрос сюда' onChange={(e) => handleChangeQuestion(e)} />
            </Form.Field>
            <Form.Field>
              <div className={styles.checkbox}>
                <label className={styles.customCheckbox}>
                  <input type="checkbox" name="color-5" value="green" checked />
                  <span>Даю согласие на обработку персональных данных</span>
                </label>
              </div>
            </Form.Field>
            <button className={styles.sendButton} type='submit' onClick="ym(80625049,'reachGoal','ClickForm')">Отправить</button>
          </Form>
        </div>
      </div>
      <MailModal dispatch={dispatch} state={state} content={modalContent} />
    </div>
  );
}

