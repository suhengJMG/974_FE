import { useState, useEffect } from 'react';
import { checkEmail, checkNickname } from '@apis/auth';

const useForm = ({ initialValues, onSubmit, validate }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => () => {
      setErrors({});
      setIsLoading(false);
    },
    []
  );

  const handleEmailClick = async (e) => {
    setIsLoading(true);

    e.preventDefault();
    const { email } = values;
    const newErrors = {};

    if (!email) {
      newErrors.email = '이메일을 입력해주세요.';
    }

    if (!newErrors || Object.keys(newErrors).length === 0) {
      const response = await checkEmail({ email });
      if (response) {
        setValues({
          ...values,
          emailCheck: true,
        });
        setErrors({ ...errors, ...newErrors });
        alert('이메일 확인이 완료되었습니다.');
      }
    } else setErrors(newErrors);

    setIsLoading(false);
  };

  const handleNicknameClick = async (e) => {
    setIsLoading(true);

    e.preventDefault();
    const { nickname } = values;
    const newErrors = {};

    if (!nickname) {
      newErrors.nickname = '닉네임을 입력해주세요.';
    }

    if (!newErrors || Object.keys(newErrors).length === 0) {
      const response = await checkNickname({ nickname });
      if (response) {
        setValues({
          ...values,
          nicknameCheck: true,
        });
        alert('닉네임 확인이 완료되었습니다.');
        setErrors({ ...errors, ...newErrors });
      }
    } else setErrors(newErrors);

    setIsLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const newErrors = validate(values);
    if (!newErrors || Object.keys(newErrors).length === 0) {
      await onSubmit(values);
      setErrors({ newErrors });
    } else setErrors(newErrors);
    setIsLoading(false);
  };

  const handleImageUpload = (e) => {
    const { name, files } = e.target;
    const imageFile = files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = () => {
      setValues({
        ...values,
        [`${name}`]: fileReader.result,
        [`${name}File`]: imageFile,
      });
    };
  };

  const handlePostImage = (e) => {
    const { name, files } = e.target;
    let fileURLs = [];
    let file;
    let filesLength = files.length > 10 ? 10 : files.length;

    for (let i = 0; i < filesLength; i++) {
      file = files[i];
      
      fileURLs[i] = file;
      console.log(file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
    };

    setValues({
      ...values,
      [`${name}File`]: fileURLs,
    });
  };

  const handleListClick = ({ name, value }) => {
    setValues({ ...values, [name]: value });
  };

  return {
    values,
    errors,
    isLoading,
    setValues,
    handleChange,
    handleEmailClick,
    handleNicknameClick,
    handleSubmit,
    handleImageUpload,
    handleListClick,
    handlePostImage,
  };
};
export default useForm;
