import React from 'react';
import styled from 'styled-components';
import { Row, Col, Button } from 'antd';
import { SERVER } from '../../../Config.js';

const MenuList = styled(Row)`
  display: flex;
  width: 100% !important;
  height: 100%;
  transition: 1s;
`;

const Item = styled(Button)`
  display: flex;
  padding: 0 !important;
  flex-direction: column;
  align-items: center;
  border-radius: 5px !important;
  width: 100% !important;
  height: 100% !important;
  &:hover,
  &:focus {
    border-color: darkgray !important;
    background-color: darkgray !important;
    color: white !important;
  }
`;

const Img = styled.img`
  display: flex;
  width: 100%;
  border-radius: 4px;
`;

const ItemInfo = styled.span`
  display: flex;
  font-size: 14px;
  letter-spacing: 2px;
`;
// xs sm md lg xl xxl
function MenuContainer({ Menu, onClick }) {
  return (
    <MenuList gutter={[16, 16]} justify='center'>
      {Menu.map((item, idx) => (
        <Col lg={4} md={6} sm={8} xs={12} key={idx}>
          <Item onClick={onClick} value={idx}>
            <ItemInfo>{item.name}</ItemInfo>
            <Img src={`${SERVER}/${item.url}`} alt={item.name} />
            <ItemInfo>{item.price}원</ItemInfo>
          </Item>
        </Col>
      ))}
    </MenuList>
  );
}

export default MenuContainer;
