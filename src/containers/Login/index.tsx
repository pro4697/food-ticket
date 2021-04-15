import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { saveToken } from '@common/config';
import { StyledApp } from '@common/Style_Etc';
import { GithubLogin, KakaoLogin } from '@components/SocialLogin';
import { loginUser, registerUser, TUserData } from '@redux/actions/user_actions';
import { Button, Form, Input, Typography } from 'antd';
import { Formik } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';

type TLoginAction = {
  values: {
    email: string | null;
    password: string;
    name?: string;
    image?: string;
  };
  isSocial: boolean;
  setSubmitting: (e: boolean) => void | boolean;
};

const { Title } = Typography;

const InputFeedback = styled.div`
  color: red;
`;

const FormErrorMessage = styled.p`
  color: #ff0000bf;
  font-size: 0.7rem;
  border: 1px solid;
  padding: 1rem;
  border-radius: 10px;
`;

const StyledBtn = styled(Button)`
  width: 100%;
`;

const SocialLogin = styled.div`
  display: flex;
  margin: 24px auto;
  @media (max-width: 768px) {
    /* margin: 5px 0; */
  }
`;

const Register = styled(Button)`
  color: grey;
  border: 1px solid #d9d9d9;
  margin-top: 24px;
  width: 100%;
`;

function LoginPage() {
  const dispatch = useDispatch<any>();
  const history = useHistory();

  const [formErrorMessage, setFormErrorMessage] = useState('');

  const saveUserData = (params: any) => {
    localStorage.setItem('userId', params.userId);
    saveToken(params);
  };

  const loginAction = ({ values, isSocial, setSubmitting }: TLoginAction) => {
    setTimeout(() => {
      let dataToSubmit: TUserData = {
        email: values.email,
        password: values.password,
      };

      dispatch(loginUser(dataToSubmit))
        .then((response: any) => {
          if (response.payload.loginSuccess) {
            // 로그인 성공시
            saveUserData(response.payload);
            localStorage.setItem('msg', 'true');
            history.push('/');
          } else if (isSocial) {
            // 카카오로 처음 로그인 하는경우 자동 회원가입
            dataToSubmit = {
              email: values.email,
              password: values.password,
              name: values.name,
              image: values.image,
            };
            dispatch(registerUser(dataToSubmit)).then((_response: any) => {
              // 자동 회원가입
              if (_response.payload.success) {
                alert('회원가입이 완료되었습니다.');
                dispatch(loginUser(dataToSubmit)).then((__response: any) => {
                  // 자동 회원가입후 로그인 처리
                  if (__response.payload.loginSuccess) {
                    saveUserData(__response.payload);
                    history.push('/');
                  } else {
                    setFormErrorMessage('Check out your Account or Password again');
                  }
                });
              } else {
                // 자동 회원가입 실패시
                alert(_response.payload.err.errmsg);
              }
            });
          } else {
            // 카카오 계정이 아닌경우 에러메시지 출력
            setFormErrorMessage('Check out your Account or Password again');
          }
        })
        .catch((err: any) => {
          if (err?.message !== 'Network Error') {
            setFormErrorMessage(err);
            setTimeout(() => {
              setFormErrorMessage('');
            }, 3000);
            return;
          }
          alert('Server is offline');
        });
      if (setSubmitting) {
        setSubmitting(false);
      }
    }, 500);
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values, { setSubmitting }) => {
        loginAction({ values, isSocial: false, setSubmitting });
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Email is invalid').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      })}
    >
      {({ values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
        <StyledApp>
          <Title level={2}>Login</Title>
          <Form style={{ width: '350px' }}>
            <Form.Item required>
              <Input
                className={errors.email && touched.email ? 'text-input error' : 'text-input'}
                id="email"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Enter your email"
                prefix={<UserOutlined />}
                type="email"
                value={values.email === 'undefined' ? '' : (values.email as string)}
              />
              {errors.email && touched.email && <InputFeedback>{errors.email}</InputFeedback>}
            </Form.Item>

            <Form.Item required>
              <Input
                className={errors.password && touched.password ? 'text-input error' : 'text-input'}
                id="password"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="password."
                prefix={<LockOutlined />}
                type="password"
                value={values.password}
              />
              {errors.password && touched.password && <InputFeedback>{errors.password}</InputFeedback>}
            </Form.Item>

            {formErrorMessage && <FormErrorMessage>{formErrorMessage}</FormErrorMessage>}

            <Form.Item>
              <StyledBtn disabled={isSubmitting} onClick={handleSubmit as any} type="primary">
                Login
              </StyledBtn>
              <Register>
                <Link to="/register">Sign Up</Link>
              </Register>
              <SocialLogin>
                <KakaoLogin loginAction={loginAction} />
                <GithubLogin callback={false} />
              </SocialLogin>
            </Form.Item>
          </Form>
        </StyledApp>
      )}
    </Formik>
  );
}

export default LoginPage;
