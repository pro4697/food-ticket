import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Row, Col } from 'antd';
import { SERVER } from '../../Config.js';
import { Modal, Button } from 'antd';
import { sectionName } from '../LandingPage/LandingPage';
import QRCode from 'qrcode.react';

function TicketPage() {
  const user = useSelector((state) => state.user);
  const [Ticket, setTicket] = useState([]);
  const [Visible, setVisible] = useState(false);
  const [PopupData, setPopupData] = useState([]);

  useEffect(() => {
    if (typeof user.userData !== 'undefined') {
      axios
        .post(`${SERVER}/api/ticket/getTicket`, {
          userId: user.userData._id,
        })
        .then((response) => {
          if (response.data.success) {
            setTicket(response.data.result);
          } else {
            alert('식권 정보 불러오기 실패');
          }
        });
    }
  }, [user.userData]);

  const onClick = (e) => {
    // key 길이는 88
    setPopupData(Ticket[e.currentTarget.value]);
    setVisible(true);
  };

  return (
    <div className='app'>
      <Row
        gutter={[32, 16]}
        className='menu__container'
        style={{ width: '85%', height: '100%' }}
      >
        {Ticket.map((ticket, idx) => (
          <Col lg={4} md={8} xs={12} key={idx}>
            <Button
              onClick={onClick}
              value={idx}
              style={{ border: '0', width: '250px', height: '250px' }}
            >
              <img
                src={`${SERVER}/${ticket.url}`}
                alt={ticket.name}
                style={{ width: '100%' }}
              />
              <div>{ticket.name}</div>
            </Button>
          </Col>
        ))}
      </Row>

      <Modal
        title={`${PopupData.name} / ${sectionName[PopupData.section - 1]}`}
        centered
        visible={Visible}
        onCancel={() => setVisible(false)}
        footer={[
          <Button type='primary' onClick={() => setVisible(false)} key='ok'>
            OK
          </Button>,
        ]}
      >
        <QRCode
          value={PopupData.name + ' ' + PopupData.key}
          style={{ display: 'flex', margin: 'auto' }}
        />
      </Modal>
    </div>
  );
}

export default TicketPage;
