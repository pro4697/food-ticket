import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BootPay from 'bootpay-js';
import { motion } from 'framer-motion';
import { Button } from 'antd';
import { sectionName } from '../LandingPage/LandingPage';
import { SERVER } from '../../Config.js';

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

function MenuPage(props) {
  const section = props.match.params.section;
  const MaxCnt = 10;

  const [Menu, setMenu] = useState([]);
  const [Cart, setCart] = useState([]);
  const [Price, setPrice] = useState(0);

  useEffect(() => {
    axios
      .post(`${SERVER}/api/menus/getMenu`, { section: section })
      .then((response) => {
        if (response.data.success) {
          response.data.result.forEach((props) => {
            props.cnt = 0;
          });
          response.data.result.getCnt = function () {
            let count = 0;
            this.map((props) => {
              count += props.cnt;
            });
            return count;
          };
          setMenu(response.data.result);
        } else {
          alert('메뉴 불러오기 실패');
        }
      });
  }, [section]);

  const onClick = (e) => {
    if (Menu[e.currentTarget.value].cnt > MaxCnt - 1) {
      alert(`${MaxCnt}그릇 이상 주문할 수 없습니다.`);
    } else {
      Menu[e.currentTarget.value].cnt += 1;
      setMenu(Menu);
      setPrice(Price + Menu[e.currentTarget.value].price);
    }
  };

  const onDown = (e) => {
    Menu[e.currentTarget.value].cnt -= 1;
    setMenu(Menu);
    setPrice(Price - Menu[e.currentTarget.value].price);
  };

  const onRemove = (e) => {
    setPrice(
      Price -
        Menu[e.currentTarget.value].price * Menu[e.currentTarget.value].cnt
    );
    Menu[e.currentTarget.value].cnt = 0;
    setMenu(Menu);
  };

  const onSubmit = async () => {
    let variable = { _id: localStorage.getItem('userId'), Cart: [] };
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
    //     let variable = { _id: localStorage.getItem('userId'), Cart: [] };
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
      <div className='app'>
        <div
          className='menu__container'
          style={{ width: '55%', height: '100%', display: 'flex' }}
        >
          {Menu.map((menu, idx) => (
            <button
              onClick={onClick}
              value={idx}
              key={idx}
              style={{ backgroundColor: 'transparent', border: '0' }}
            >
              <div>
                <img
                  src={`${SERVER}/${menu.url}`}
                  alt=''
                  style={{ height: '250px' }}
                />
                <br />
                {menu.name}
                <br />
                {menu.price}
              </div>
            </button>
          ))}
        </div>
        <motion.div
          className='background'
          variants={sidebar}
          animate={Menu.getCnt() > 0 ? 'open' : 'closed'}
        >
          <div
            style={{ marginTop: '50px', fontSize: '24px', textAlign: 'center' }}
          >
            {sectionName[section]}
          </div>
          <ul className='nav__ul'>
            {Menu.map((menu, idx) => {
              if (menu.cnt !== 0) {
                return (
                  <li className='nav__li' key={idx}>
                    <div className='icon-placeholder'>
                      <img
                        src={`${SERVER}/${menu.url}`}
                        style={{
                          height: '100%',
                        }}
                      />
                    </div>
                    <div className='text-placeholder'>{menu.name}</div>
                    <div
                      className='text-placeholder'
                      style={{ float: 'right' }}
                    >
                      {menu.price} x {menu.cnt}
                    </div>
                    <Button size='small' onClick={onClick} value={idx}>
                      ∧
                    </Button>
                    <Button size='small' onClick={onDown} value={idx}>
                      ∨
                    </Button>
                    <Button size='small' onClick={onRemove} value={idx}>
                      X
                    </Button>
                  </li>
                );
              }
            })}
          </ul>
          <div className='buy_btn'>
            <div
              className='text-placeholder'
              style={{
                display: 'block',
                fontSize: '18px',
                textAlign: 'center',
              }}
            >
              {Price} 원
            </div>
            <hr />
            <Button onClick={onSubmit} style={{ width: '100%' }}>
              구매하기
            </Button>
          </div>
        </motion.div>
      </div>
    );
  } else return null;
}

export default MenuPage;

/*
.contentsWrap {
  position: relative;
  max-width: 1200px;
  margin: 0px auto 0px;
  padding: 16px 16px 50px;
  box-sizing: border-box;
  min-height: 83vh;
}
*/
