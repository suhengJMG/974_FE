import React, { useEffect, useCallback } from 'react';
import { MyInfoEditForm } from '@components/Form';
import { useForm } from '@hooks';
import { useUsers } from '@contexts/UserProvider';
import { getMyInfo, updateMyInfo } from '@apis/auth';

const MyInfoEditContainer = (props) => {
  const {
    values,
    setValues,
    handleChange,
    handleSubmit,
    handleImageUpload,
    handleNicknameClick,
  } = useForm({
    initialValues: {
      email: '',
      nickname: '',
      nicknameCheck: '',
      intro: '',
      profileImage: '',
    },
    onSubmit: async ({ email, intro, nickname, profileImageFile }) => {
      const response = await updateMyInfo({
        email,
        intro,
        id: user.userId,
        nickname,
        profileImageFile,
      });


      if (response) {
        alert('내 정보를 수정했습니다.');
      }
    },
    validate: ({ intro }) => {
      if (!intro) return { intro: '소개글을 입력해주세요.' };
    },
  });
  const { user, removeUser } = useUsers();

  const handleClick = () => {
    removeUser();
  };

  const init = useCallback(async () => {
    const { data } = await getMyInfo({ id: user.userId });

    setValues({
      email: data.email,
      intro: data.intro,
      nickname: data.nickname,
      profileImage: data.profileImage,
    });
  }, [user.userId, setValues]);

  useEffect(() => {
    init();
  }, [init]);


  return (
    <MyInfoEditForm
      values={values}
      setValues={setValues}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onUpload={handleImageUpload}
      onClick={handleClick}
      onEmailClick={handleNicknameClick}
    />
  );
};

export default MyInfoEditContainer;
