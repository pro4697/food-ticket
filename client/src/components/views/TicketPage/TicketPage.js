import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import QRCode from 'qrcode.react';
import styled, { keyframes } from 'styled-components';
import { Row, Col, Typography, Modal, Button } from 'antd';
import { DropboxOutlined, LoadingOutlined } from '@ant-design/icons';
import { SERVER } from '../../Config.js';
import { sectionName, FadeIn } from '../LandingPage/LandingPage';

const { Title } = Typography;

const StyledRow = styled(Row)`
  width: 85%;
  height: 100%;
  margin-top: 100px !important;
  @media (max-width: 767px) {
    margin-top: 30px !important;
    margin-bottom: 40px !important;
  }
`;

const StyledCol = styled(Col)`
  -webkit-animation: ${FadeIn} 0.3s ease;
  -moz-animation: ${FadeIn} 0.3s ease;
  -ms-animation: ${FadeIn} 0.3s ease;
  -o-animation: ${FadeIn} 0.3s ease;
  animation: ${FadeIn} 0.3s ease;
`;

const Item = styled(Button)`
  display: flex;
  padding: 0 !important;
  flex-direction: column;
  align-items: center;
  border-radius: 5px !important;
  width: 100% !important;
  height: 100% !important;
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025) !important;
  &:hover,
  &:focus {
    border-color: ${(props) => props.color} !important;
    background-color: ${(props) => props.color} !important;
    color: white !important;
  }
`;

const ItemInfo = styled.span`
  display: flex;
  font-size: 16px;
  letter-spacing: 2px;
  @media (max-width: 1200px) {
    font-size: 16px;
  }
  @media (max-width: 992px) {
    font-size: 14px;
  }
  @media (max-width: 767px) {
    font-size: 12px;
  }
`;

const Img = styled.img`
  display: flex;
  width: 100%;
  border-radius: 5px;
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
  const [Loading, setLoading] = useState(false);
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
            setLoading(true);
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

  if (Loading && Ticket.length > 0) {
    return (
      <div className='app'>
        <StyledRow gutter={[16, 16]} justify='center'>
          {Ticket.map((ticket, idx) => (
            <StyledCol lg={4} md={6} sm={8} xs={12} key={idx}>
              <Item
                onClick={onClick}
                value={idx}
                color={BgColor[idx % BgColor.length]}
              >
                <ItemInfo>{sectionName[ticket.section - 1]}</ItemInfo>
                <Img
                  src={`${SERVER}/${ticket.url}`}
                  draggable='false'
                  alt={ticket.name}
                />
                <ItemInfo>{ticket.name}</ItemInfo>
              </Item>
            </StyledCol>
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
        {Loading && (
          <>
            <BoxIcon />
            <Title level={2}>보유한 식권이 없습니다.</Title>
          </>
        )}
        {!Loading && <LoadingOutlined style={{ fontSize: '55px' }} />}
      </div>
    );
  }
}

export default TicketPage;
