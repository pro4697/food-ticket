import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Button } from 'antd';
import { sectionName } from '../../LandingPage/LandingPage';
import { SERVER } from '../../../Config.js';

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 1,
    },
  }),
  closed: () => ({
    clipPath: 'circle(0px at 40px 40px)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  }),
};

const CartList = styled(motion.div)`
  float: right;
  margin: 0;
  width: 330px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background: grey;
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
`;

const Icon = styled.div`
  border: 5px;
  overflow: hidden;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Img = styled.img`
  height: 100%;
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
  width: 100%;
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
    <CartList variants={sidebar} animate={Price > 0 ? 'open' : 'closed'}>
      <SectionTag>{sectionName[section - 1]}</SectionTag>
      <List>
        {Menu.map((menu, idx) => {
          if (menu.cnt > 0)
            return (
              <Item>
                <Icon>
                  <Img src={`${SERVER}/${menu.url}`} alt={menu.name} />
                </Icon>
                <Text>{menu.name}</Text>
                <PriceCnt>{`${menu.price} x ${menu.cnt}`}</PriceCnt>
                <Button size='small' onClick={onClick} value={idx}>
                  ∧
                </Button>
                <Button size='small' onClick={onDown} value={idx}>
                  ∨
                </Button>
                <Button size='small' onClick={onRemove} value={idx}>
                  X
                </Button>
              </Item>
            );
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
