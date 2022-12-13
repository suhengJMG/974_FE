import { DELETE, GET, POST, PUT } from './axios';

export const getMyPosts = async ({ page, userId }) => {
  const response = await GET({
    url: '/myPage/post',
    params: {
      page,
      userId,
    },
  });
  return response;
};

export const getRecentPlayer = async () => {
  const response = await GET({
    url: '/post/player',
  });
  return response;
};

export const getRecentCoach = async () => {
  const response = await GET({
    url: '/post/coach',
  });
  return response;
};

export const createPost = async ({
  location,
  sport,
  text,
  title,
  postImagesFile,
  nickname,
  userId,
  type, }) => {
    const formData = new FormData();
    formData.append("area", location.join('#'));
    formData.append("nickname", nickname);
    formData.append("category", sport.join('#'));
    formData.append("text", text);
    formData.append("title", title);
    formData.append("userId", userId);
    for (let key in postImagesFile) {
      if (postImagesFile[key]) {
        formData.append('postImages', postImagesFile[key]);
      } else continue;
  }

   const response =
    type === 'player'
      ? await POST({
          url: '/post/player',
          headers: { 'Content-Type': 'multipart/form-data' },
          method: "post",
          data: formData,
        })
      : await POST({
        url: '/post/player',
        headers: { 'Content-Type': 'multipart/form-data' },
        method: "post",
        data: formData,
      });
  return response;
};

export const getPlayerPosts = async ({ page }) => {
  const response = await GET({
    url: `/post/player/${page}`,
  });
  return response;
};

export const getCoachPosts = async ({ page }) => {
  const response = await GET({
    url: `/post/coach/${page}`,
  });
  return response;
};

export const getPost = async ({ id }) => {
  const response = await GET({
    url: `/post/${id}`,
  });
  return response;
};

export const updatePost = async ({
  location,
  sport,
  text,
  title,
  id,
  postImagesFile,
  nickname,
  userId,
}) => {
  const formData = new FormData();
  formData.append("area", location.join('#'));
  formData.append("nickname", nickname);
  formData.append("category", sport.join('#'));
  formData.append("text", text);
  formData.append("title", title);
  formData.append("postId", id);
  formData.append("userId", userId);
  for (let key in postImagesFile) {
    if (postImagesFile[key]) {
      formData.append('postImages', postImagesFile[key]);
    } else continue;
  }

  const response = await PUT({
    url: '/post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: formData,
  });
  return response;
};
export const deletePost = async ({ id }) => {
  const response = await DELETE({
    url: `/post/${id}`,
  });
  return response;
};
