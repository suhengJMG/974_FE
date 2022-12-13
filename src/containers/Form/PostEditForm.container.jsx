import React, { useEffect, useCallback } from 'react';
import { PostEditForm } from '@components/Form';
import { useForm } from '@hooks';
import { useParams, useHistory } from 'react-router-dom';
import { getPost, updatePost } from '@apis/post';
import { useUsers } from '@contexts/UserProvider';

const PostEditFormContainer = () => {
  const {
    values,
    setValues,
    errors,
    handleChange,
    handleSubmit,
    handleImageUpload,
    handleListClick,
    handlePostImage,
  } = useForm({
    initialValues: {
      title: '',
      sport: [],
      location: [],
      text: '',
      postImages: [],
      postImagesFile: [],
    },
    onClick: (e) => {},
    onSubmit: async ({ location, sport, text, title, postImages, postImagesFile }) => {
      const { nickname, userId } = user;
      const response = await updatePost({
        location,
        sport,
        text,
        title,
        id,
        nickname,
        userId,
        postImages,
        postImagesFile,
      });

      if (!response) return;
      history.push(`/view/${id}`);
    },
    validate: ({ title, sport, location, text, postImagesFile }) => {
      const newErrors = {};
      if (!title) newErrors.title = '제목을 입력해주세요.';
      if (!sport) newErrors.title = '종목을 선택해주세요.';
      if (!location) newErrors.title = '지역을 선택해주세요.';
      if (!text) newErrors.title = '본문을 입력해주세요.';
      //if (!postImagesFile) newErrors.title = '사진을 입력해주세요.';

      return newErrors;
    },
  });
  const { id } = useParams();
  const history = useHistory();
  const { user } = useUsers();

  const init = useCallback(async () => {
    const { data } = await getPost({ id });
    setValues({
      location: data.area,
      title: data.title,
      sport: data.category,
      text: data.text,
      nickname: data.nickname,
      postImages: data.postImagesFile,
    });
  }, [setValues, id]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <PostEditForm
      values={values}
      errors={errors}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onUpload={handleImageUpload}
      onImage={handlePostImage}
      onListClick={handleListClick}
    />
  );
};

export default PostEditFormContainer;
