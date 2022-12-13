import { GET, POST, PUT } from './axios';

export const updateMyInfo = async ({
  email,
  id,
  intro,
  nickname,
  profileImageFile,
}) => {




  const response = await PUT({
    url: '/myPage/info',
    headers: { 'Content-Type': 'multipart/form-data' },
    params: {
      email,
      id,
      intro,
      nickname,
    },
    data: {
      profileImage: profileImageFile,
    },
    
  });
 


  console.log(response);
  return response;
};

export const getMyInfo = async ({ id }) => {
  const response = await GET({
    url: `/myPage/info/${id}`,
  });
  return response;
};

export const signin = async ({ email, password }) => {
  const response = await POST({
    url: '/user/login',
    data: {
      email,
      password,
    },
  });
  return response;
};

export const signup = async ({
  email,
  confirmPassword,
  nickname,
  password,
}) => {
  const response = await POST({
    url: 'user/join',
    data: {
      email,
      password,
      confirmPassword,
      nickname,
    },
  });
  return response;
};

export const checkEmail = async ({ email }) => {
  const response = await GET({
    url: `/user/email/${email}`,
  });
  return response;
};

export const checkNickname = async ({ nickname }) => {
  const response = await GET({
    url: `/user/nickname/${nickname}`,
  });
  return response;
};
