/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, deleteUser } from '../../../../_actions/user_actions';

function RightMenu(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logoutUser()).then((response) => {
      if (response.payload.success) {
        window.location.reload();
      } else {
        alert('로그아웃 실패');
      }
    });
  };

  const deleteHandler = () => {
    if (window.confirm('탈퇴 하시겠습니까?')) {
      dispatch(deleteUser()).then((response) => {
        if (response.payload.success) {
          alert('성공적으로 탈퇴 하였습니다.');
          window.location.reload();
        } else {
          alert('회원 탈퇴 실패');
        }
      });
    }
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key='mail'>
          <a href='/login'>Signin</a>
        </Menu.Item>
        <Menu.Item key='app'>
          <a href='/register'>Signup</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key='delete'>
          <a onClick={deleteHandler}>Delete account</a>
        </Menu.Item>
        <Menu.Item key='logout'>
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default RightMenu;
