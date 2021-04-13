import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { TReducer } from '@/redux';
import { SERVER } from '@common/config';
import { BoxIcon, LoadingIcon } from '@common/Style_Etc';
import { message, Typography } from 'antd';
import axios from 'axios';
// import BootPay from 'bootpay-js';
import styled from 'styled-components';

import CartContainer from './Cart';
import MenuContainer from './Menu';

export type TMenuType = {
  name: string;
  url: string;
  price: number;
  cnt: number;
};

type TParamsType = {
  section: string;
};

const { Title } = Typography;

const App = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 700px;
  margin-top: 20px;
  @media (max-width: 1200px) {
    flex-direction: column;
    margin-top: 15px;
    padding: 5px;
  }
`;

function MenuPage() {
  const history = useHistory();
  const { section } = useParams<TParamsType>();
  const maxCnt = 10;

  const user = useSelector((state: TReducer) => state.user);
  const [menu, setMenu] = useState<TMenuType[]>([]);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`${SERVER}/api/menus/menus`, { params: { section } }).then((response) => {
      if (response.data.success) {
        setMenu(response.data.result.map((item: any) => ({ ...item, cnt: 0 })));
        setLoading(true);
      } else {
        alert('메뉴 불러오기 실패');
      }
    });
  }, []);

  const onClick = (e: any) => {
    const targetIdx = parseInt(e.currentTarget.value, 10);
    if (menu[targetIdx].cnt > maxCnt - 1) {
      alert(`${maxCnt}그릇 이상 주문할 수 없습니다.`);
    } else {
      setMenu(menu.map((item, idx) => (idx === targetIdx ? { ...item, cnt: item.cnt + 1 } : item)));
      setPrice(price + menu[targetIdx].price);
    }
  };

  const onDown = (e: any) => {
    const targetIdx = parseInt(e.currentTarget.value, 10);
    setMenu(menu.map((item, idx) => (idx === targetIdx ? { ...item, cnt: item.cnt - 1 } : item)));
    setPrice(price - menu[targetIdx].price);
  };

  const onRemove = (e: any) => {
    const targetIdx = parseInt(e.currentTarget.value, 10);
    setPrice(price - menu[targetIdx].price * menu[targetIdx].cnt);
    setMenu(menu.map((item, idx) => (idx === targetIdx ? { ...item, cnt: 0 } : item)));
  };

  const onSubmit = async () => {
    if (!user.userData.isAuth) {
      alert('회원가입이 필요한 서비스입니다.');
      history.push('/login');
      return;
    }

    const totalTicketCnt = menu.reduce((acc, v) => acc + v.cnt, 0);

    // BootPay.request({
    //   price: price,
    //   application_id: '5cc7f458396fa6771abd07a8',
    //   name: `식권 ${totalTicketCnt}장`,
    //   order_id: '1234', // (이 결제를 식별할 수 있는 고유 주문 번호)
    //   // pg: '',
    //   // method: '',
    //   show_agree_window: 0, // 결제 동의창 띄우기 여부 1 - 띄움, 0 - 띄우지 않음
    // })
    //   .error((data) => {
    //     const msg = `결제 에러입니다.: ${JSON.stringify(data)}`;
    //     alert(msg);
    //     console.log(data);
    //   })
    //   .cancel(() => {})
    //   .done(() => {
    //     const variable = { _id: user.userData._id, Cart: [] };
    //     menu.forEach((menu) => {
    //       if (menu.cnt > 0) {
    //         variable.Cart.push(menu);
    //       }
    //     });

    //     axios.post(`${SERVER}/api/tickets/payment`, variable).then((response) => {
    //       if (response.data.success) {
    //         message.success('식권 구매 완료.');
    //         setTimeout(() => {
    //           history.push('/ticket');
    //         }, 750);
    //       } else {
    //         alert('식권 구매후 저장 오류');
    //       }
    //     });
    //   });
  };

  if (loading && menu.length !== 0) {
    return (
      <App>
        <MenuContainer menu={menu} onClick={onClick} />
        <CartContainer menu={menu} onClick={onClick} onDown={onDown} onRemove={onRemove} onSubmit={onSubmit} price={price} />
      </App>
    );
  }
  return (
    <App>
      {loading && (
        <>
          <BoxIcon />
          <Title level={2}>메뉴가 없습니다.</Title>
        </>
      )}
      {!loading && <LoadingIcon />}
    </App>
  );
}

export default MenuPage;
