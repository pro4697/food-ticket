import React from 'react';
import { useSelector } from 'react-redux';
import { Menu } from 'antd';

// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  const user = useSelector((state) => state.user);

  return (
    <Menu mode={props.mode}>
      <Menu.Item key='main'>
        <a href='/'>Home</a>
      </Menu.Item>
      {user.userData && user.userData.role && (
        <Menu.Item key='menuUploads'>
          <a href='/menuUploads'>Menu Uploads</a>
        </Menu.Item>
      )}
      {user.userData && user.userData.role && (
        <Menu.Item key='qrReader'>
          <a href='/qr_reader'>QR Reader</a>
        </Menu.Item>
      )}
      {/* <SubMenu title={<span>Blogs</span>}>
        <MenuItemGroup title='Item 1'>
          <Menu.Item key='setting:1'>Option 1</Menu.Item>
          <Menu.Item key='setting:2'>Option 2</Menu.Item>
        </MenuItemGroup>
        <MenuItemGroup title='Item 2'>
          <Menu.Item key='setting:3'>Option 3</Menu.Item>
          <Menu.Item key='setting:4'>Option 4</Menu.Item>
        </MenuItemGroup>
      </SubMenu> */}
    </Menu>
  );
}

export default LeftMenu;
