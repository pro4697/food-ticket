import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router-dom';

import { auth } from '@redux/actions/user_actions';

const Auth: any = (ComposedClass: React.ComponentType<any>, reload?: boolean, adminRoute?: boolean) => {
  console.log('???');
  const AuthenticationCheck = (props: RouteComponentProps) => {
    const dispatch = useDispatch<any>();
    const history = useHistory();
    console.log('auth 컴포넌트 진입');
    useEffect(() => {
      console.log('auth 인증 시작');
      dispatch(auth()).then(async (response: any) => {
        // history.push('/');
        // if (!response.payload.isAuth) {
        //   if (reload) {
        //     history.push('/');
        //     history.push('/login');
        //   }
        // } else if (adminRoute && !response.payload.isAdmin) {
        //   history.push('/login');
        // } else if (reload === false) {
        //   history.push('/');
        // }
      });
      console.log('auth 인증 종료');
    }, []);
    return <ComposedClass />;
  };
  return AuthenticationCheck;
};

export default Auth;
