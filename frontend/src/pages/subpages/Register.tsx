import React from 'react';
// import { useState } from 'react';
// import { POST_request } from '../../utils/requestHelpers';
// import Login_Register from '../../components/LOGIN/Login_Register';
// import { RegisterFormType, defaultRegisterState } from '../../types/userTypes';
type Props = {};

const Register: React.FC<Props> = ({}) => {
  // const [registerForm, setRegisterForm] =
  //   useState<RegisterFormType>(defaultRegisterState);
  // // const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
  // //   e.preventDefault();
  // //   if (
  // //     registerForm &&
  // //     registerForm.password === registerForm.repeat_password
  // //   ) {
  // //     try {
  // //       const response = await POST_request('/user/create', registerForm);
  // //       if (response) {
  // //         console.log('response.data');
  // //         console.log('request successful!');
  // //         alert(
  // //           `Welcome to chatupp ${registerForm.firstname}! You can now login!`
  // //         );
  // //         setRegisterForm(defaultRegisterState);
  // //         return true;
  // //       } else {
  // //         console.log('Something went wrong with register');
  // //         return false;
  // //       }
  // //     } catch (err: any) {
  // //       console.error(err.message);
  // //       return false;
  // //     }
  // //   } else {
  // //     console.log('Error matching password');
  // //     return false;
  // //     //Set error state message for login field or something
  // //   }
  // // };
  return <>Register</>;
};

export default Register;
