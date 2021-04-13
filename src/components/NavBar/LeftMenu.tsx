import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

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

  return (
    <StyledMenu mode={mode}>
      {user.userData && user.userData.role && (
        <Menu.Item key="menuUploads">
          <Link to="/menu_uploads">Menu Uploads</Link>
        </Menu.Item>
      )}
      {user.userData && user.userData.role && (
        <Menu.Item key="qrReader">
          <Link to="/qr_reader">QR Reader</Link>
        </Menu.Item>
      )}
    </StyledMenu>
  );
}

export default LeftMenu;
