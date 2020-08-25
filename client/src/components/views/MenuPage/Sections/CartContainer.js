import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { sectionName } from '../../LandingPage/LandingPage';
import { SERVER } from '../../../Config.js';

const CartList = styled.div`
  display: ${(props) => (props.open ? 'block' : 'none')};
  transition: 0.2s;
  margin: 0;
  border-radius: 5px;
  width: 450px;
  height: 100%;
  overflow: hidden;
  background-color: #a3e7d6;
  @media (max-width: 767px) {
    margin: auto;
    width: calc(100% - 16px);
    max-width: 450px;
  }
`;

const SectionTag = styled.div`
  margin-top: 50px;
  font-size: 24px;
  text-align: center;
`;

const List = styled.ul`
  position: relative;
  padding: 15px;
  margin: 0;
  padding: 0;
  width: 100%;
`;

const Item = styled.li`
  position: relative;
  list-style: none;
  margin: 20px 10px;
  display: flex;
  align-items: center;
  &:after {
    height: 1px;
    width: 100%;
    background-color: grey;
  }
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  height: 100%;
  border-radius: 50%;
`;

const Text = styled.div`
  border-radius: 5px;
  width: 250px;
  height: 20px;
  flex: 1;
`;

const PriceText = styled.div`
  display: block;
  font-size: 18px;
  text-align: center;
`;

const PriceCnt = styled.div`
  margin-right: 10px;
  float: right;
`;

const CartInfo = styled.div`
  position: sticky;
  bottom: 0;
  width: 100%;
`;

const BuyBtn = styled(Button)`
  width: calc(100% - 20px);
  border-radius: 4px !important;
  border-color: red !important;
  background-color: red !important;
  color: white !important;
  margin: 10px !important;
`;

function CartContainer({
  Menu,
  section,
  Price,
  onClick,
  onSubmit,
  onDown,
  onRemove,
}) {
  return (
    <CartList open={Price > 0 ? true : false}>
      <SectionTag>{sectionName[section - 1]}</SectionTag>
      <List>
        {Menu.map((menu, idx) => {
          if (menu.cnt > 0)
            return (
              <Item>
                <Img
                  src={`${SERVER}/${menu.url}`}
                  draggable='false'
                  alt={menu.name}
                />
                <Text>{menu.name}</Text>
                <PriceCnt>{`${menu.price} x ${menu.cnt}`}</PriceCnt>
                <Button size='small' onClick={onClick} value={idx}>
                  ∧
                </Button>
                <Button size='small' onClick={onDown} value={idx}>
                  ∨
                </Button>
                <Button size='small' onClick={onRemove} value={idx}>
                  x
                </Button>
              </Item>
            );
          else return null;
        })}
      </List>
      <CartInfo>
        <PriceText>{Price} 원</PriceText>
        <hr />
        <BuyBtn onClick={onSubmit}>구매하기</BuyBtn>
      </CartInfo>
    </CartList>
  );
}

export default CartContainer;
