import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import { SERVER } from '../../../Config.js';

const MenuList = styled(Row)`
  display: flex;
  width: calc(100% - 330px);
  height: 100%;
`;

const Item = styled.button`
  background-color: transparent;
  border: 0;
`;

const ItemImg = styled.img`
  height: 15rem;
`;
// xs sm md lg xl xxl
function MenuContainer({ Menu, onClick }) {
  return (
    <MenuList>
      {Menu.map((item, idx) => (
        <Col lg={8} md={12} sm={12} xs={12} key={idx}>
          <Item onClick={onClick} value={idx}>
            <ItemImg src={`${SERVER}/${item.url}`} alt={item.name} />
            <br />
            {item.name}
            <br />
            {item.price}
          </Item>
        </Col>
      ))}
    </MenuList>
  );
}

export default MenuContainer;
