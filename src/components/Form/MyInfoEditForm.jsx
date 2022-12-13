import React, { useRef } from 'react';
import styles from './MyInfoEditForm.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const MyInfoEditForm = (props) => {
  const {
    values = {},
    onChange = () => console.log('onChange'),
    onSubmit = () => console.log('onSubmit'),
    onUpload = () => console.log('onUpload'),
    onClick = () => console.log('onClick'),
    onEmailClick = () => console.log('onEmailClick'),
    className: rootClassName,
  } = props;
  const inputRef = useRef();

  const className = cx(styles.root, rootClassName);

  const handleClick = () => {
    inputRef?.current?.click();
  };

  return (
    <form className={className} onSubmit={onSubmit}>
      <h1 className={styles.title}>내 정보 수정</h1>
      <button className={styles.signup} type="button" onClick={onClick}>
        로그아웃
      </button>
      <div className={styles.wrapper}>
        <div className={styles.upload} onClick={handleClick}>
          <input
            className={styles.disabled}
            type="file"
            name="profileImage"
            ref={inputRef}
            onChange={onUpload}
          />
          <img
            className={styles.image}
            src={
              values.profileImage ||
              'https://974s3.s3.ap-northeast-2.amazonaws.com/90acde97-ed9d-425e-bdf0-00d161a550ae.png'
            }
            alt=""
          />
        </div>
        <div className={styles.input_wrapper}>
          <input
            className={cx(styles.input, styles.email)}
            type="text"
            name="email"
            value={values.email}
            placeholder="이메일"
            onChange={onChange}
            disabled
          />
          <div className={styles.nickname_wrapper}>
            <input
              className={styles.input}
              type="text"
              name="nickname"
              value={values.nickname}
              placeholder="변경할 닉네임을 입력해주세요."
              onChange={onChange}
            />
            <button
              className={styles.button_small}
              type="button"
              name="nickname"
              onClick={onEmailClick}
            >
              확인
            </button>
          </div>
        </div>
      </div>
      <textarea
        className={styles.textarea}
        type="text"
        name="intro"
        value={values.intro || ''}
        placeholder="멋진 한 줄 소개를 입력해주세요."
        onChange={onChange}
      />
      <button className={styles.button_large} type="submit">
        수정
      </button>
    </form>
  );

};

export default MyInfoEditForm;
