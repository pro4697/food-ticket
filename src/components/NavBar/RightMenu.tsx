import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { TReducer } from '@/redux';
import { deleteUser, logoutUser } from '@redux/actions/user_actions';
import { Menu } from 'antd';
import styled from 'styled-components';

import { TSideMenuParams } from './index';

const Div = styled.div``;

function RightMenu({ mode }: TSideMenuParams) {
  const dispatch = useDispatch<any>();
  const user = useSelector((state: TReducer) => state.user);
  const { pathname } = useLocation<string>();

  const logoutHandler = () => {
    dispatch(logoutUser()).then((response: any) => {
      if (response.payload.success) {
        localStorage.clear(); // 삭제해야함
        window.location.reload();
      } else {
        alert('로그아웃 실패');
      }
    });
  };

  const deleteHandler = () => {
    if (window.confirm('탈퇴 하시겠습니까?')) {
      dispatch(deleteUser()).then((response: any) => {
        if (response.payload.success) {
          localStorage.clear(); // 삭제해야함
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
      <Menu mode={mode} selectedKeys={[pathname]}>
        <Menu.Item key="/login">
          <Link to="/login">Sign in</Link>
        </Menu.Item>
        <Menu.Item key="/register">
          <Link to="/register">Sign up</Link>
        </Menu.Item>
      </Menu>
    );
  }
  return (
    <Menu mode={mode}>
      <Menu.Item key="/delete">
        <Div onClick={deleteHandler}>Delete account</Div>
      </Menu.Item>
      <Menu.Item key="/logout">
        <Div onClick={logoutHandler}>Logout</Div>
      </Menu.Item>
    </Menu>
  );
}

export default RightMenu;
