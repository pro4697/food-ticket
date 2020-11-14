import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Menu } from 'antd';

const StyledMenu = styled(Menu)`
  @media (max-width: 768px) {
    & .ant-menu-item-selected {
      background-color: transparent !important;
    }
    & .ant-menu-item-selected a {
      color: rgba(0, 0, 0, 0.65) !important;
    }
    & .ant-menu-item-selected:after {
      opacity: 0 !important;
    }
  }
`;

function LeftMenu({ mode }) {
  const user = useSelector((state) => state.user);

  return (
    <StyledMenu mode={mode}>
      {/* <Menu.Item key='main'>
        <Link to='/'>Home</Link>
      </Menu.Item> */}
      {user.userData && user.userData.role && (
        <Menu.Item key='menuUploads'>
          <Link to='/menu_uploads'>Menu Uploads</Link>
        </Menu.Item>
      )}
      {user.userData && user.userData.role && (
        <Menu.Item key='qrReader'>
          <Link to='/qr_reader'>QR Reader</Link>
        </Menu.Item>
      )}
    </StyledMenu>
  );
}

LeftMenu.propTypes = {
  mode: PropTypes.string.isRequired,
};

export default LeftMenu;
