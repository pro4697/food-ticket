import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { Row, Col, Typography } from 'antd';
import { DropboxOutlined } from '@ant-design/icons';
import { SERVER } from '../../Config.js';
import { Modal, Button } from 'antd';
import { sectionName } from '../LandingPage/LandingPage';
import QRCode from 'qrcode.react';

const { Title } = Typography;

const StyledRow = styled(Row)`
  width: 85%;
  height: 100%;
`;

const Item = styled(Button)`
  display: flex;
  padding: 0 !important;
  flex-direction: column;
  align-items: center;
  border-radius: 5px !important;
  width: 100% !important;
  height: 100% !important;
  &:hover,
  &:focus {
    border-color: ${(props) => props.color} !important;
    background-color: ${(props) => props.color} !important;
    color: white !important;
  }
`;

const ItemInfo = styled.span`
  display: flex;
  font-size: 14px;
  letter-spacing: 2px;
`;

const Img = styled.img`
  display: flex;
  width: 100%;
  border-radius: 4px;
  margin-top: 2px;
  margin-bottom: 2px;
`;

const QrCode = styled(QRCode)`
  display: flex;
  margin: auto;
`;

const blink = keyframes`
  from { color: inherit; }
  to { color: #40a9ff; }
`;

const BoxIcon = styled(DropboxOutlined)`
  font-size: 300px;
  margin-bottom: 20px;
  animation: ${blink} 1s 0.2s infinite alternate;
`;

const BgColor = ['#7ac5c5', '#9bb7d6', '#c94476', '#955251', '#f7cac9'];

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

  if (Ticket && Ticket.length > 0) {
    return (
      <div className='app'>
        <StyledRow gutter={[16, 16]} justify='center'>
          {Ticket.map((ticket, idx) => (
            <Col lg={4} md={6} sm={8} xs={12} key={idx}>
              <Item
                onClick={onClick}
                value={idx}
                color={BgColor[idx % BgColor.length]}
              >
                <ItemInfo>{sectionName[ticket.section - 1]}</ItemInfo>
                <Img src={`${SERVER}/${ticket.url}`} alt={ticket.name} />
                <ItemInfo>{ticket.name}</ItemInfo>
              </Item>
            </Col>
          ))}
        </StyledRow>
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
          <QrCode value={PopupData.name + ' ' + PopupData.key} />
          <br />
          <div style={{ textAlign: 'center' }}>{PopupData.date}</div>
        </Modal>
      </div>
    );
  } else {
    return (
      <div className='app'>
        <BoxIcon />
        <Title level={2}>보유한 식권이 없습니다.</Title>
      </div>
    );
  }
}

export default TicketPage;
