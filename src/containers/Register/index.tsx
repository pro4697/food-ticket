import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { StyledApp } from '@common/Style_Etc';
import { registerUser } from '@redux/actions/user_actions';
import { Button, Form, Input, message, Typography } from 'antd';
import { Formik } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';

const { Title } = Typography;

const InputFeedback = styled.div`
  color: red;
`;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage() {
  const history = useHistory();
  const dispatch = useDispatch<any>();

  return (
    <Formik
      initialValues={{
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          const dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
            image: `uploads/images/no-user.svg`,
          };

          dispatch(registerUser(dataToSubmit)).then((response: any) => {
            if (response.payload.success) {
              history.push('/login');
            } else {
              message.error('이미 존재하는 email입니다.', 2);
            }
          });
          setSubmitting(false);
        }, 500);
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Email is invalid.').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required'),
      })}
    >
      {({ values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
        <StyledApp>
          <Title level={2}>Sign up </Title>
          <Form style={{ minWidth: '375px' }} {...formItemLayout}>
            {/* onSubmit -> onClick */}
            <Form.Item label="name" required>
              <Input
                className={errors.name && touched.name ? 'text-input error' : 'text-input'}
                id="name"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="name"
                type="text"
                value={values.name}
              />
              {errors.name && touched.name && <InputFeedback>{errors.name}</InputFeedback>}
            </Form.Item>

            <Form.Item hasFeedback label="email" required validateStatus={errors.email && touched.email ? 'error' : 'success'}>
              <Input
                id="email"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="email"
                type="email"
                value={values.email}
              />
              {errors.email && touched.email && <InputFeedback>{errors.email}</InputFeedback>}
            </Form.Item>

            <Form.Item
              hasFeedback
              label="password"
              required
              validateStatus={errors.password && touched.password ? 'error' : 'success'}
            >
              <Input
                className={errors.password && touched.password ? 'text-input error' : 'text-input'}
                id="password"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="password"
                type="password"
                value={values.password}
              />
              {errors.password && touched.password && <InputFeedback>{errors.password}</InputFeedback>}
            </Form.Item>

            <Form.Item hasFeedback label="confirm" required>
              <Input
                className={errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'}
                id="confirmPassword"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="confirm"
                type="password"
                value={values.confirmPassword}
              />
              {errors.confirmPassword && touched.confirmPassword && <InputFeedback>{errors.confirmPassword}</InputFeedback>}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button disabled={isSubmitting} onClick={handleSubmit as any} type="primary">
                {/* onClick -> onSubmit */}
                submit
              </Button>
            </Form.Item>
          </Form>
        </StyledApp>
      )}
    </Formik>
  );
}

export default RegisterPage;
