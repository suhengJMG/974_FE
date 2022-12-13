import React from 'react';
import { PostWriteForm } from '@components/Form';
import { useForm } from '@hooks';
import { useHistory, useParams } from 'react-router-dom';
import { useUsers } from '@contexts/UserProvider';
import { createPost } from '@apis/post';

const PostWriteFormContainer = () => {
  const {
    values,
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
    onClick: () => {},

    
    
    onSubmit: async ({ location, sport, text, title, postImages, postImagesFile }) => {
      const { nickname, userId } = user;



      const response = await createPost({
        location,
        sport,
        text,
        title,
        nickname,
        userId,
        type,
        postImages,
        postImagesFile,
      }); 
      if (!response) return;
      history.push(`/view/${response.data.postId}`);
    },

    

    validate: ({ title, sport, location, text, postImagesFile }) => {
      const newErrors = {};
      if (!title) newErrors.title = '제목을 입력해주세요.';
      if (!sport) newErrors.title = '종목을 선택해주세요.';
      if (!location) newErrors.title = '지역을 선택해주세요.';
      if (!text) newErrors.title = '본문을 입력해주세요.';
      //if (!postImagesFile) newErrors.title = '사진을 삽입해주세요.';
      return newErrors;
    },
  }
   
  );

  const { type } = useParams();
  const history = useHistory();
  const { user } = useUsers();
  

  return (
    <PostWriteForm
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

export default PostWriteFormContainer;
