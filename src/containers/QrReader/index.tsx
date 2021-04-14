import { useState } from 'react';
import QrReader from 'react-qr-reader';

import { SERVER } from '@common/config';
import { List } from 'antd';
import axios from 'axios';
import styled from 'styled-components';

const App = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 100%;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const QrContainer = styled(QrReader)`
  display: flex;
  margin: auto;
  width: 40%;
  @media (max-width: 767px) {
    width: 80%;
  }
`;

const StyledList = styled(List)`
  display: flex;
  margin: 0;
  background-color: grey;
  & .ant-spin-nested-loading {
    width: 100% !important;
  }
`;

const Item = styled(List.Item)`
  display: flex !important;
  margin: auto !important;
  font-size: 30px !important;
  width: 100% !important;
  text-align: center !important;
  color: ${({ color }) => color} !important;

  @media (max-width: 1200px) {
    font-size: 20px !important;
  }
  @media (max-width: 767px) {
    font-size: 14px !important;
  }
`;

type TNameType = {
  color: string;
  msg: string;
};

function QrReaderPage() {
  const [name, setName] = useState<TNameType[]>([]);
  const successSound = new Audio('/audios/success.mp3');
  const errorSound = new Audio('/audios/error.mp3');

  const handleScan = (data: string | null) => {
    if (data) {
      const tmp = data.split('^');
      if (tmp[1] && tmp[1].length === 88) {
        axios.post(`${SERVER}/api/tickets/using`, { key: tmp[1] }).then((response) => {
          if (response.data.success) {
            setName([{ color: 'white', msg: tmp[0] }, ...name]);
            successSound.play();
          } else {
            setName([{ color: 'blue', msg: '유효하지 않은 식권입니다.' }, ...name]);
            errorSound.play();
          }
        });
      }
    }
  };
  const handleError = () => {
    setName([{ color: 'orange', msg: '감지된 카메라가 없습니다.' }, ...name]);
  };

  return (
    <App>
      <QrContainer delay={1500} onError={handleError} onScan={handleScan} />
      <StyledList
        bordered
        dataSource={name}
        itemLayout="horizontal"
        renderItem={(item: any) => <Item color={item.color}>{item.msg}</Item>}
      />
    </App>
  );
}

export default QrReaderPage;
