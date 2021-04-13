import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { auth } from '@redux/actions/user_actions';

const Auth: any = (ComposedClass: React.ComponentType<any>, reload?: boolean, adminRoute?: boolean) => {
  const AuthenticationCheck = () => {
    const dispatch = useDispatch<any>();
    const history = useHistory();
    useEffect(() => {
      dispatch(auth()).then(async (response: any) => {
        history.push('/');
        if (!response.payload.isAuth) {
          if (reload) {
            history.push('/');
            history.push('/login');
          }
        } else if (adminRoute && !response.payload.isAdmin) {
          history.push('/login');
        } else if (reload === false) {
          history.push('/');
        }
      });
    }, []);
    return <ComposedClass />;
  };
  return AuthenticationCheck;
};

export default Auth;
