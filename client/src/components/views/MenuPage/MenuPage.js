import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import BootPay from 'bootpay-js';
import { SERVER } from '../../Config.js';

import MenuContainer from './Sections/MenuContainer';
import CartContainer from './Sections/CartContainer';

function MenuPage(props) {
  const section = props.match.params.section;
  const MaxCnt = 10;

  const user = useSelector((state) => state.user);
  const [Menu, setMenu] = useState([]);
  const [Price, setPrice] = useState(0);

  useEffect(() => {
    axios
      .post(`${SERVER}/api/menus/getMenu`, { section: section })
      .then((response) => {
        if (response.data.success) {
          //cnt property 생성
          response.data.result.forEach((props) => {
            props.cnt = 0;
          });
          setMenu(response.data.result);
        } else {
          alert('메뉴 불러오기 실패');
        }
      });
  }, [section]);

  const onClick = (e) => {
    let targetIdx = parseInt(e.currentTarget.value);
    if (Menu[targetIdx].cnt > MaxCnt - 1) {
      alert(`${MaxCnt}그릇 이상 주문할 수 없습니다.`);
    } else {
      setMenu(
        Menu.map((item, idx) =>
          idx === targetIdx ? { ...item, cnt: item.cnt + 1 } : item
        )
      );
      setPrice(Price + Menu[targetIdx].price);
    }
  };

  const onDown = (e) => {
    let targetIdx = parseInt(e.currentTarget.value);
    setMenu(
      Menu.map((item, idx) =>
        idx === targetIdx ? { ...item, cnt: item.cnt - 1 } : item
      )
    );
    setPrice(Price - Menu[targetIdx].price);
  };

  const onRemove = (e) => {
    let targetIdx = parseInt(e.currentTarget.value);
    setPrice(Price - Menu[targetIdx].price * Menu[targetIdx].cnt);
    setMenu(
      Menu.map((item, idx) => (idx === targetIdx ? { ...item, cnt: 0 } : item))
    );
  };

  const onSubmit = async () => {
    //////////////////////////////////// 페이지 이동 제대로 안됨
    if (!user.userData.isAuth) {
      alert('회원가입이 필요한 서비스입니다.');
      window.location.href = '/login';
    }
    let variable = { _id: user.userData._id, Cart: [] };
    Menu.map((menu) => {
      if (menu.cnt > 0) {
        variable.Cart.push(menu);
      }
    });

    axios.post(`${SERVER}/api/ticket/payment`, variable).then((response) => {
      if (!response.data.success) {
        alert('식권 구매후 저장 오류');
      }
    });
    props.history.push('/');
    ////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////
    // auth 체크후 비로그인이면 로그인 페이지로 튕구기
    // BootPay.request({
    //   price: Price, // 결제할 금액
    //   application_id: '5cc7f458396fa6771abd07a8',
    //   name: `식권 ${Menu.getCnt()}장`, // 아이템 이름,
    //   order_id: '1234', //(이 결제를 식별할 수 있는 고유 주문 번호)
    //   // pg: '',
    //   // method: '',
    //   show_agree_window: 0, // 결제 동의창 띄우기 여부 1 - 띄움, 0 - 띄우지 않음
    // })
    //   .error(function (data) {
    //     let msg = '결제 에러입니다.: ' + JSON.stringify(data);
    //     alert(msg);
    //     console.log(data);
    //   })
    //   .cancel(() => {})
    //   .done(() => {
    //     let variable = { _id: user.userData._id, Cart: [] };
    //     Menu.map((menu) => {
    //       if (menu.cnt > 0) {
    //         variable.Cart.push(menu);
    //       }
    //     });

    //     axios
    //       .post(`${SERVER}/api/ticket/payment`, variable)
    //       .then((response) => {
    //         if (!response.data.success) {
    //           alert('식권 구매후 저장 오류');
    //         }
    //       });
    //     props.history.push('/');
    //   });
  };

  if (Menu.length !== 0) {
    return (
      <div className='app row'>
        <MenuContainer Menu={Menu} onClick={onClick} />
        <CartContainer
          Menu={Menu}
          Price={Price}
          section={section}
          onClick={onClick}
          onDown={onDown}
          onRemove={onRemove}
          onSubmit={onSubmit}
        />
      </div>
    );
  } else {
    return null;
  }
}

export default MenuPage;
