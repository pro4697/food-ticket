import React, { useEffect } from 'react';
import { auth } from '../_actions/user_actions';
import { useDispatch } from 'react-redux';

export default function (ComposedClass, reload, adminRoute = null) {
	function AuthenticationCheck(props) {
		const dispatch = useDispatch();

		useEffect(() => {
			dispatch(auth()).then(async (response) => {
				if (await !response.payload.isAuth) {
					if (reload) {
						props.history.push('/');
						props.history.push('/login');
					}
				} else {
					if (adminRoute && !response.payload.isAdmin) {
						props.history.push('/login');
					} else {
						if (reload === false) {
							props.history.push('/');
						}
					}
				}
			});
		}, [dispatch, props.history]);

		return <ComposedClass {...props} />;
	}
	return AuthenticationCheck;
}
