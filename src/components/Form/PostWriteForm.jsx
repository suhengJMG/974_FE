import React, { useState } from 'react';
import styles from './PostWriteForm.module.scss';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router-dom';
import { LocationModal, SportModal } from '@components/Modal';

const cx = classNames.bind(styles);

const PostWriteForm = (props) => {
  const {
    values = {},
    onChange = () => console.log('onChange'),
    onImage = () => console.log('onImage'),
    onSubmit = () => console.log('onSubmit'),
    //onUpload = () => console.log('onUpload'),
    onListClick = () => console.log('onListClick'),
    
    className: rootClassName,
  } = props;
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isSportOpen, setIsSportOpen] = useState(false);
  const className = cx(styles.root, rootClassName);

  const handleLocationClick = () => {
    setIsLocationOpen(!isLocationOpen);
  };

  const handleSportClick = () => {
    setIsSportOpen(!isSportOpen);
  };


  return (
    <form className={className} onSubmit={onSubmit} encType="multipart/form-data" method="post">
      <h1 className={styles.title}>게시글 쓰기</h1>
      <div className={styles.wrapper}>
        {/* 제목 */}
        <input
          className={styles.input}
          name="title"
          value={values.title}
          type="text"
          placeholder="제목을 입력하세요."
          onChange={onChange}
        />
      </div>
      {/* 위치 */}
      <div className={styles.modal_wrapper}>
        <div className={styles.modal} onClick={handleLocationClick}>
          지역 선택하기 &gt;
          <div>
            {values.location.map((element) => (
              <span className={styles.badge} key={element}>
                {element}
              </span>
            ))}
          </div>
        </div>
        {isLocationOpen ? (
          <LocationModal
            onClick={handleLocationClick} onListClick={onListClick}
          />
        ) : (
          ''
        )}
        {/* 종목 */}
        <div className={styles.modal} onClick={handleSportClick}>
          종목 선택하기 &gt;
          <div>
            {values.sport.map((element) => (
              <span className={styles.badge} key={element}>
                {element}
              </span>
            ))}
          </div>
        </div>
        {isSportOpen ? (
          <SportModal onClick={handleSportClick} onListClick={onListClick} />
        ) : (
          ''
        )}
        {/* 사진 */}
        <div className={styles.modal}>
          사진선택하기 &gt;
          <input
            //className={styles.disabled}
            type="file"
            name="postImages"
            multiple={true}
            onChange={onImage}
          />
        </div>
      </div>
      
      
      {/* 본문 */}
      <textarea className={styles.textarea} name="text" onChange={onChange} />
      <button className={styles.button_large} type="submit">
        작성
      </button>
    </form>
  );

};




export default withRouter(PostWriteForm);
