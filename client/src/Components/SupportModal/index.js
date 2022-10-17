import React, { useState, useEffect } from 'react';
import { Modal, Button, Select, Form } from 'semantic-ui-react';
import styles from './SupportModal.module.scss';
import supportAction from '../../helpers/supportAction';

const pattern = new RegExp(/\S+@\S+\.\S+/i);

export default function SupportModal({ dispatch, state, id, whoSupports }) {

  const open = state && state.open;
  const dimmer = state && state.dimmer;

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [region, setRegion] = useState('');
  const [content, setContent] = useState('');
  const [valid, setValid] = useState('');
  const [thanks, setThanksGiving] = useState('');


  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeSurname = (e) => setSurname(e.target.value);
  const handleChangeMail = (e) => setMail(e.target.value);
  const handleChangePhone = (e) => setPhone(e.target.value);
  const handleChangeRegion = (e) => setRegion(e.target.innerText);

  const notSupportYet = whoSupports && whoSupports.every(el => el.email !== mail);
  useEffect(() => {
    if (!notSupportYet) {
      setContent(<p className={styles.already}>Вы уже одобрили данную инициативу! Спасибо!</p>);
    } else {
      if (!valid || !name || !surname) {
        setContent(<Button type='submit' className={styles.access} disabled>Одобрить!</Button>);
      } else if (valid && name && surname) {
        setContent(<Button type='submit' className={styles.access} onclick="ym(80625049, 'reachGoal', 'ClickForm');">Одобрить!</Button>);
      } else {
        setContent(<p />);
      }
    }
  }, [notSupportYet, region, valid, name, surname]);

  const data = {
    initiativeId: id,
    name: name,
    surname: surname,
    email: mail,
    phone: phone,
    region: region
  };


  useEffect(() => {
    if (!pattern.test(mail)) {
      setValid(false);
    } else {
      setValid(true);
    }


  }, [valid, mail]);

  return (
    <Modal
      dimmer={dimmer}
      open={open}
      onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
      id={styles.modal}
    >
      <Modal.Actions id={styles.modal} className={styles.wrapperClose}>
        <Button id={styles.modalClose} onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
          ✕
        </Button>
      </Modal.Actions>
      <Modal.Header id={styles.modal} className={styles.title}>Заполните данные о себе</Modal.Header>
      <Modal.Content id={styles.contentContainer}>
        <Form id={styles.form} onSubmit={() => supportAction(data, setThanksGiving)}>
          <Form.Field required>
            <p className={styles.text}>Чтобы оставить голос, необходимо представиться.</p>
            <label>Введите имя</label>
            <input className={styles.input + ' mb-20'} placeholder='Имя' onChange={(e) => handleChangeName(e)} />
            <label>Фамилия</label>
            <input className={styles.input} placeholder='Фамилия' onChange={(e) => handleChangeSurname(e)} />
          </Form.Field>
          <Form.Field className={styles.field_text} type='email'>
            <p className={styles.text}>Никакого спама - ваш контакт нам необходим для связи с вами в случае необходимости.</p>
            <label>Ваш email</label>
            <input className={styles.input} onChange={(e) => handleChangeMail(e)} placeholder='Укажите ваш email адрес' />
            {!valid && mail && <p className={styles.valid}>Пожалуйста, введите валидный email</p>}
          </Form.Field>
          <Form.Field className={styles.contact_telephone}>
            <label>Контактный телефон (по желанию)</label>
            <input className={styles.input} placeholder='Укажите ваш контактный телефон' onChange={(e) => handleChangePhone(e)} />
          </Form.Field>
          <Form.Field className={styles.field_region} required>
            <label>Укажите ваш регион (по желанию)</label>
            <Select className={styles.modal_select} placeholder='Московская область' options={regionOptions} onChange={(e) => handleChangeRegion(e)} />
          </Form.Field>
          {thanks ? thanks : content}
        </Form>
      </Modal.Content>
    </Modal>
  );
}

const regionOptions = [
  { key: 'alt', value: 'alt', text: 'Алтайский край' },
  { key: 'amu', value: 'amu', text: 'Амурская область' },
  { key: 'arc', value: 'arc', text: 'Архангельская область' },
  { key: 'ast', value: 'ast', text: 'Астраханская область' },
  { key: 'bel', value: 'bel', text: 'Белгородская область' },
  { key: 'bry', value: 'bry', text: 'Брянская область' },
  { key: 'vla', value: 'vla', text: 'Владимирская область' },
  { key: 'vlg', value: 'vlg', text: 'Волгоградская область' },
  { key: 'vol', value: 'vol', text: 'Вологодская область' },
  { key: 'vor', value: 'vor', text: 'Воронежская область' },
  { key: 'mos', value: 'mos', text: 'г.Москва' },
  { key: 'spb', value: 'spb', text: 'г.Санкт-Петербург' },
  { key: 'sev', value: 'sev', text: 'г.Севастополь' },
  { key: 'eao', value: 'eao', text: 'Еврейская автономная область' },
  { key: 'zab', value: 'zab', text: 'Забайкальский край' },
  { key: 'iva', value: 'iva', text: 'Ивановская область' },
  { key: 'bai', value: 'bai', text: 'Иные территории, включая город и космодром Байконур' },
  { key: 'irc', value: 'irc', text: 'Иркутская область' },
  { key: 'kbr', value: 'kbr', text: 'Кабардино-Балкарская Республика' },
  { key: 'kln', value: 'kln', text: 'Калининградская область' },
  { key: 'kal', value: 'kal', text: 'Калужская область' },
  { key: 'kam', value: 'kam', text: 'Камчатский край' },
  { key: 'kcr', value: 'kcr', text: 'Карачаево-Черкесская Республика' },
  { key: 'kuz', value: 'kuz', text: 'Кемеровская область' },
  { key: 'kir', value: 'kir', text: 'Кировская область' },
  { key: 'kos', value: 'kos', text: 'Костромская область' },
  { key: 'krd', value: 'krd', text: 'Краснодарский край' },
  { key: 'kry', value: 'kry', text: 'Красноярский край' },
  { key: 'kur', value: 'kur', text: 'Курганская область' },
  { key: 'krs', value: 'krs', text: 'Курская область' },
  { key: 'len', value: 'len', text: 'Ленинградская область' },
  { key: 'lip', value: 'lip', text: 'Липецкая область' },
  { key: 'mgd', value: 'mgd', text: 'Магаданская область' },
  { key: 'mob', value: 'mob', text: 'Московская область' },
  { key: 'mur', value: 'mur', text: 'Мурманская область' },
  { key: 'nen', value: 'nen', text: 'Ненецкий автономный округ' },
  { key: 'nig', value: 'nig', text: 'Нижегородская область' },
  { key: 'nov', value: 'nov', text: 'Новгородская область' },
  { key: 'nvs', value: 'nvs', text: 'Новосибирская область' },
  { key: 'oms', value: 'oms', text: 'Омская область' },
  { key: 'ore', value: 'ore', text: 'Оренбургская область' },
  { key: 'orl', value: 'orl', text: 'Орловская область' },
  { key: 'pen', value: 'pen', text: 'Пензенская область' },
  { key: 'per', value: 'per', text: 'Пермский край' },
  { key: 'pri', value: 'pri', text: 'Приморский край' },
  { key: 'psk', value: 'psk', text: 'Псковская область' },
  { key: 'ady', value: 'ady', text: 'Республика Адыгея' },
  { key: 'ral', value: 'ral', text: 'Республика Алтай' },
  { key: 'bsh', value: 'bsh', text: 'Республика Башкортостан' },
  { key: 'bur', value: 'bur', text: 'Республика Бурятия' },
  { key: 'dag', value: 'dag', text: 'Республика Дагестан' },
  { key: 'ing', value: 'ing', text: 'Республика Ингушетия' },
  { key: 'klk', value: 'klk', text: 'Республика Калмыкия' },
  { key: 'kar', value: 'kar', text: 'Республика Карелия' },
  { key: 'kom', value: 'kom', text: 'Республика Коми' },
  { key: 'cri', value: 'cri', text: 'Республика Крым' },
  { key: 'mel', value: 'mel', text: 'Республика Марий Эл' },
  { key: 'mor', value: 'mor', text: 'Республика Мордовия' },
  { key: 'yak', value: 'yak', text: 'Республика Саха (Якутия)' },
  { key: 'ose', value: 'ose', text: 'Республика Северная Осетия — Алания' },
  { key: 'tat', value: 'tat', text: 'Республика Татарстан' },
  { key: 'tyv', value: 'tyv', text: 'Республика Тыва' },
  { key: 'hak', value: 'hak', text: 'Республика Хакасия' },
  { key: 'ros', value: 'ros', text: 'Ростовская область' },
  { key: 'ryz', value: 'ryz', text: 'Рязанская область' },
  { key: 'sam', value: 'sam', text: 'Самарская область' },
  { key: 'sar', value: 'sar', text: 'Саратовская область' },
  { key: 'sah', value: 'sah', text: 'Сахалинская область' },
  { key: 'sve', value: 'sve', text: 'Свердловская область' },
  { key: 'smo', value: 'smo', text: 'Смоленская область' },
  { key: 'stv', value: 'stv', text: 'Ставропольский край' },
  { key: 'tam', value: 'tam', text: 'Тамбовская область' },
  { key: 'tve', value: 'tve', text: 'Тверская область' },
  { key: 'tom', value: 'tom', text: 'Томская область' },
  { key: 'tul', value: 'tul', text: 'Тульская область' },
  { key: 'tum', value: 'tum', text: 'Тюменская область' },
  { key: 'udm', value: 'udm', text: 'Удмуртская республика' },
  { key: 'uly', value: 'uly', text: 'Ульяновская область' },
  { key: 'hab', value: 'hab', text: 'Хабаровский край' },
  { key: 'hma', value: 'hma', text: 'Ханты-Мансийский автономный округ — Югра' },
  { key: 'che', value: 'che ', text: 'Челябинская область' },
  { key: 'chc', value: 'chc', text: 'Чеченская Республика' },
  { key: 'cuv', value: 'cuv', text: 'Чувашская республика' },
  { key: 'cuk', value: 'cuk', text: 'Чукотский автономный округ' },
  { key: 'yam', value: 'yam', text: 'Ямало-Ненецкий автономный округ' },
  { key: 'yar', value: 'yar', text: 'Ярославская область' }
];
