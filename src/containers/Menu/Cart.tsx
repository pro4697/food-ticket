import React, { useState } from 'react';

import { ArrowDownOutlined, ArrowUpOutlined, CloseOutlined } from '@ant-design/icons';
import { SERVER } from '@common/config';
import { Button } from 'antd';
import styled from 'styled-components';

import { TMenuType } from '.';

type TCartListType = {
  open?: boolean;
};

type TSectionTagType = {
  margin?: boolean;
};

type TListType = {
  fold?: boolean;
};

type TCartContainerParams = {
  menu: TMenuType[];
  price: number;
  onClick: (e: any) => void;
  onSubmit: (e: any) => void;
  onDown: (e: any) => void;
  onRemove: (e: any) => void;
};

const CartList = styled.div<TCartListType>`
  display: ${({ open }) => (open ? 'block' : 'none')};
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

const SectionTag = styled.div<TSectionTagType>`
  margin-top: 10px;
  font-size: 24px;
  letter-spacing: 2px;
  text-align: center;
  @media (max-width: 767px) {
    margin-bottom: ${({ margin }) => (margin ? '0' : '10px')};
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

const List = styled.ul<TListType>`
  position: relative;
  padding: 15px;
  margin: 0;
  padding: 0;
  width: 100%;
  @media (max-width: 767px) {
    max-height: ${({ fold }) => (fold ? '800px' : '0px')};
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

const ItemName = styled.div`
  border-radius: 5px;
  width: 250px;
  height: 20px;
  flex: 1;
`;

const ItemPrice = styled.div`
  margin-right: 10px;
  float: right;
  letter-spacing: 1px;
`;

const BuyBtn = styled(Button)`
  width: calc(100% - 20px);
  height: 100% !important;
  border-radius: 4px !important;
  border-color: #f62e3d !important;
  background-color: #f62e3d !important;
  color: white !important;
  margin: 10px !important;
  margin-top: 3px !important;
  letter-spacing: 2px !important;
  font-size: 15px !important;
`;

function CartContainer({ menu, price, onClick, onSubmit, onDown, onRemove }: TCartContainerParams) {
  const [Visible, setVisible] = useState(false);
  const onToggle = () => {
    setVisible(!Visible);
  };

  return (
    <CartList open={price > 0}>
      <SectionTag margin={Visible}>주문표</SectionTag>
      <ToggleBtn onClick={onToggle}>
        {Visible && <ArrowDownOutlined />}
        {!Visible && <ArrowUpOutlined />}
      </ToggleBtn>
      <List fold={Visible}>
        <hr />
        {menu.map((item, idx) => {
          if (item.cnt > 0)
            return (
              <React.Fragment key={item.name}>
                <Item>
                  <Img alt={item.name} draggable="false" src={`${SERVER}/${item.url}`} />
                  <ItemName>{item.name}</ItemName>
                  <ItemPrice>{`₩${item.price} x ${item.cnt}`}</ItemPrice>
                  <Button onClick={onClick} size="small" value={idx}>
                    <ArrowUpOutlined />
                  </Button>
                  <Button onClick={onDown} size="small" value={idx}>
                    <ArrowDownOutlined />
                  </Button>
                  <Button onClick={onRemove} size="small" value={idx}>
                    <CloseOutlined />
                  </Button>
                </Item>
                <hr />
              </React.Fragment>
            );
          return null;
        })}
        <BuyBtn onClick={onSubmit}>₩{price} 구매하기</BuyBtn>
      </List>
    </CartList>
  );
}

export default CartContainer;
