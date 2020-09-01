import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { SERVER } from '../../../Config.js';

const CartList = styled.div`
  display: ${(props) => (props.open ? 'block' : 'none')};
  position: relative;
  transition: 0.2s;
  margin: 0 0 0 20px;
  border-radius: 5px;
  width: 450px;
  overflow: hidden;
  background-color: #77bdff;
  color: white;
  @media (max-width: 767px) {
    position: fixed;
    border-radius: 0;
    bottom: 0;
    z-index: 1;
    margin: 0;
    width: 100%;
  }
`;

const SectionTag = styled.div`
  margin-top: 10px;
  font-size: 24px;
  letter-spacing: 2px;
  text-align: center;
  @media (max-width: 767px) {
    margin-bottom: ${(props) => (props.margin ? '0' : '10px')};
    transition: 0.2s ease-in-out;
  }
`;

const ToggleBtn = styled.button`
  display: none;
  @media (max-width: 767px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    margin: 8px 15px 0 0;
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 24px;
  }
`;

const List = styled.ul`
  position: relative;
  padding: 15px;
  margin: 0;
  padding: 0;
  width: 100%;
  @media (max-width: 767px) {
    max-height: ${(props) => (props.fold ? '800px' : '0px')};
    transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);
  }
`;

const Item = styled.li`
  position: relative;
  list-style: none;
  margin: 0px 10px;
  display: flex;
  align-items: center;
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

const PriceCnt = styled.div`
  margin-right: 10px;
  float: right;
`;

const BuyBtn = styled(Button)`
  width: calc(100% - 20px);
  height: 100% !important;
  border-radius: 4px !important;
  border-color: red !important;
  background-color: red !important;
  color: white !important;
  margin: 10px !important;
  margin-top: 3px !important;
  letter-spacing: 2px !important;
  font-size: 15px !important;
`;

function CartContainer({ Menu, Price, onClick, onSubmit, onDown, onRemove }) {
  const [Visible, setVisible] = useState(false);
  const onToggle = () => {
    setVisible(!Visible);
  };

  return (
    <CartList open={Price > 0 ? true : false}>
      <SectionTag margin={Visible}>주문표</SectionTag>
      <ToggleBtn onClick={onToggle}>
        {Visible && <ArrowDownOutlined />}
        {!Visible && <ArrowUpOutlined />}
      </ToggleBtn>
      <List fold={Visible}>
        <hr />
        {Menu.map((menu, idx) => {
          if (menu.cnt > 0)
            return (
              <>
                <Item>
                  <Img
                    src={`${SERVER}/${menu.url}`}
                    draggable='false'
                    alt={menu.name}
                  />
                  <Text>{menu.name}</Text>
                  <PriceCnt>{`₩${menu.price} x ${menu.cnt}`}</PriceCnt>
                  <Button size='small' onClick={onClick} value={idx}>
                    <ArrowUpOutlined />
                  </Button>
                  <Button size='small' onClick={onDown} value={idx}>
                    <ArrowDownOutlined />
                  </Button>
                  <Button size='small' onClick={onRemove} value={idx}>
                    <CloseOutlined />
                  </Button>
                </Item>
                <hr />
              </>
            );
          else return null;
        })}
        <BuyBtn onClick={onSubmit}>₩{Price} 구매하기</BuyBtn>
      </List>
    </CartList>
  );
}

export default CartContainer;
