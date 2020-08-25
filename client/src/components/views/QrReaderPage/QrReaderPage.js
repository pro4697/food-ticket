import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import QrReader from 'react-qr-reader';
import { List } from 'antd';
import { SERVER } from '../../Config.js';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const QrContainer = styled(QrReader)`
  display: flex;
  margin: auto;
  width: 500px;
`;

const Li = styled(List)`
  display: flex;
  margin: 0;
  background-color: grey;
  & .ant-list-item {
    display: flex;
    font-size: 24px;
    margin: auto;
  }
`;

function QrReaderPage() {
  const [Name, setName] = useState([]);
  const successSound = new Audio('/audios/success.mp3');
  const errorSound = new Audio('/audios/error.mp3');

  const handleScan = (data) => {
    if (data) {
      //이상한 값이 들어오면 예외처리 해야함///////////////////////////// ex-> 1234aa
      let tmp = data.split(' ');
      if (tmp[1].length === 88) {
        axios
          .post(`${SERVER}/api/ticket/useTicket`, { key: tmp[1] })
          .then((response) => {
            if (response.data.success) {
              setName([{ color: 'black', msg: tmp[0] }, ...Name]);
              successSound.play();
            } else {
              setName([
                { color: 'blue', msg: '유효하지 않은 식권입니다.' },
                ...Name,
              ]);
              errorSound.play();
            }
          });
      }
    }
  };
  const handleError = () => {
    setName([{ color: 'orange', msg: '감지된 카메라가 없습니다.' }, ...Name]);
  };

  return (
    <Container>
      <QrContainer delay={300} onError={handleError} onScan={handleScan} />
      <Li
        itemLayout='horizontal'
        bordered
        dataSource={Name}
        renderItem={(item) => (
          <List.Item style={{ color: item.color }}>{item.msg}</List.Item>
        )}
      />
    </Container>
  );
}

export default QrReaderPage;
