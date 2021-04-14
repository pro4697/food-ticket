import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { TReducer } from '@redux/index';
import { Menu } from 'antd';
import styled from 'styled-components';

import { TSideMenuParams } from './index';

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

function LeftMenu({ mode }: TSideMenuParams) {
  const user = useSelector((state: TReducer) => state.user);
  const { pathname } = useLocation<string>();

  if (user?.userData && user?.userData?.role) {
    return (
      <StyledMenu mode={mode} selectedKeys={[pathname]}>
        <Menu.Item key="/menu_uploads">
          <Link to="/menu_uploads">Menu Uploads</Link>
        </Menu.Item>
        <Menu.Item key="/qr_reader">
          <Link to="/qr_reader">QR Reader</Link>
        </Menu.Item>
      </StyledMenu>
    );
  }
  return null;
}

export default LeftMenu;
