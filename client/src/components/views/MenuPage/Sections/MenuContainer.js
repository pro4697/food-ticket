import React from 'react';
import styled from 'styled-components';
import { Row, Col, Button } from 'antd';
import { SERVER } from '../../../Config.js';
import { FadeIn } from '../../LandingPage/LandingPage';

const StyledRow = styled(Row)`
  display: flex;
  width: 100% !important;
  height: 100%;
  transition: 1s;
`;

const StyledCol = styled(Col)`
  -webkit-animation: ${FadeIn} 0.3s ease;
  -moz-animation: ${FadeIn} 0.3s ease;
  -ms-animation: ${FadeIn} 0.3s ease;
  -o-animation: ${FadeIn} 0.3s ease;
  animation: ${FadeIn} 0.3s ease;
`;

const Img = styled.img`
  display: block;
  border-radius: 10px;
  margin-bottom: 5px;
  width: 100%;
  z-index: 0;
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
`;

const ItemInfo = styled.div`
  display: block;
  position: relative;
  border: 5px solid white;
  border-radius: 30px;
  text-align: center;
  background-color: white;
  width: 80%;
  margin: -30px auto 0 auto;
  z-index: 1;
  -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
`;

const Item = styled(Button)`
  display: flex;
  padding: 0 !important;
  flex-direction: column;
  align-items: center;
  border: 0 !important;
  width: 100% !important;
  height: 100% !important;
  color: black !important;
  &:hover ${ItemInfo}, &:focus ${ItemInfo} {
    border-color: ${(props) => props.color} !important;
    background-color: ${(props) => props.color} !important;
    color: white !important;
  }
`;

const ItemTitle = styled.div`
  display: block;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 2px;
`;

const ItemPrice = styled.div`
  display: block;
  font-size: 14px;
  letter-spacing: 2px;
  margin-left: -5px;
`;

const BgColor = ['#7ac5c5', '#9bb7d6', '#c94476', '#955251', '#f7cac9'];

// xs sm md lg xl xxl
function MenuContainer({ Menu, onClick }) {
  return (
    <StyledRow gutter={[32, 32]} justify='center'>
      {Menu.map((item, idx) => (
        <StyledCol lg={4} md={6} sm={8} xs={12} key={idx}>
          <Item
            onClick={onClick}
            value={idx}
            color={BgColor[idx % BgColor.length]}
          >
            <Img
              draggable='false'
              src={`${SERVER}/${item.url}`}
              alt={item.name}
            />
            <ItemInfo>
              <ItemTitle>{item.name}</ItemTitle>
              <ItemPrice>₩ {item.price}</ItemPrice>
            </ItemInfo>
          </Item>
        </StyledCol>
      ))}
    </StyledRow>
  );
}

export default MenuContainer;
