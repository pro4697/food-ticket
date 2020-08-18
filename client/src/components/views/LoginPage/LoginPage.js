import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { loginUser, registerUser } from '../../../_actions/user_actions';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { headersConfig } from '../../Config';
import KakaoBtn from '../KakaoBtn/KakaoBtn';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

function LoginPage(props) {
  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem('rememberMe') ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(rememberMeChecked);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const saveUserData = (props) => {
    localStorage.setItem('userId', props.userId);
    localStorage.setItem('x_token', props.token);
    localStorage.setItem('x_tokenExp', props.tokenExp);
    headersConfig.headers['x_token'] = localStorage.getItem('x_token');
    headersConfig.headers['x_tokenExp'] = localStorage.getItem('x_tokenExp');
  };

  const initialEmail = localStorage.getItem('rememberMe')
    ? localStorage.getItem('rememberMe')
    : '';

  const loginAction = (values, isKakao, { setSubmitting }) => {
    setTimeout(() => {
      let dataToSubmit = {
        email: values.email,
        password: values.password,
      };

      dispatch(loginUser(dataToSubmit))
        .then((response) => {
          if (response.payload.loginSuccess) {
            // 로그인 성공시
            saveUserData(response.payload);
            if (rememberMe === true) {
              localStorage.setItem('rememberMe', values.email);
            } else {
              localStorage.removeItem('rememberMe');
            }
            props.history.push('/');
          } else {
            // 로그인 실패시
            if (isKakao) {
              // 카카오로 처음 로그인 하는경우 자동 회원가입
              let _dataToSubmit = {
                email: values.email,
                password: values.password,
                name: values.name,
                image: values.image,
              };
              dispatch(registerUser(_dataToSubmit)).then((response) => {
                // 자동 회원가입
                if (response.payload.success) {
                  alert('회원가입이 완료되었습니다.');
                  dispatch(loginUser(dataToSubmit)).then((response) => {
                    // 자동 회원가입후 로그인 처리
                    if (response.payload.loginSuccess) {
                      saveUserData(response.payload);
                      props.history.push('/');
                    } else {
                      // 로그인 에서 메시지 출력
                      setFormErrorMessage(
                        'Check out your Account or Password again'
                      );
                    }
                  });
                } else {
                  // 자동 회원가입 실패시
                  alert(response.payload.err.errmsg);
                }
              });
            } else {
              // 카카오 계정이 아닌경우 에러메시지 출력
              setFormErrorMessage('Check out your Account or Password again');
            }
          }
        })
        .catch((err) => {
          setFormErrorMessage(err);
          setTimeout(() => {
            setFormErrorMessage('');
          }, 3000);
        });
      if (setSubmitting) {
        setSubmitting(false);
      }
    }, 500);
  };

  return (
    <Formik
      initialValues={{
        email: initialEmail,
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        loginAction(values, false, { setSubmitting });
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <div className='app'>
            <div
              className='formWrapper'
              style={{ backgroundColor: 'white', padding: '2rem' }}
            >
              <Title level={2}>Login </Title>
              <form onSubmit={handleSubmit} style={{ width: '350px' }}>
                <Form.Item required>
                  <Input
                    id='email'
                    prefix={<UserOutlined />}
                    placeholder='Enter your email'
                    type='email'
                    value={values.email === 'undefined' ? '' : values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.email && touched.email
                        ? 'text-input error'
                        : 'text-input'
                    }
                  />
                  {errors.email && touched.email && (
                    <div className='input-feedback'>{errors.email}</div>
                  )}
                </Form.Item>

                <Form.Item required>
                  <Input
                    id='password'
                    prefix={<LockOutlined />}
                    placeholder='password.'
                    type='password'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.password && touched.password
                        ? 'text-input error'
                        : 'text-input'
                    }
                  />
                  {errors.password && touched.password && (
                    <div className='input-feedback'>{errors.password}</div>
                  )}
                </Form.Item>

                {formErrorMessage && (
                  <label>
                    <p
                      style={{
                        color: '#ff0000bf',
                        fontSize: '0.7rem',
                        border: '1px solid',
                        padding: '1rem',
                        borderRadius: '10px',
                      }}
                    >
                      {formErrorMessage}
                    </p>
                  </label>
                )}

                <Form.Item>
                  <Checkbox
                    id='rememberMe'
                    onChange={handleRememberMe}
                    checked={rememberMe}
                  >
                    Remember me
                  </Checkbox>
                  {/* <a
                    className='login-form-forgot'
                    href='/reset_password'
                    style={{ float: 'right' }}
                  >
                    forgot password
                  </a> */}
                  <div>
                    <Button
                      type='primary'
                      htmlType='submit'
                      className='login-form-button'
                      style={{ minWidth: '100%' }}
                      disabled={isSubmitting}
                      onSubmit={handleSubmit}
                    >
                      Log in
                    </Button>
                    <KakaoBtn loginAction={loginAction} />
                  </div>
                  Or <a href='/register'>register now!</a>
                </Form.Item>
              </form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
}

export default withRouter(LoginPage);
