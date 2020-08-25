import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';

const App = styled.div`
  flex-direction: column;
  padding-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 700px;
  max-width: 1600px;
  margin: auto;
  @media (max-width: 767px) {
    padding-top: 1rem;
  }
`;

const Title = styled.div`
  font-size: 30px;
  margin-bottom: 50px;
`;

const CardContainer = styled(Row)`
  width: 100%;
`;
const Img = styled.img`
  display: flex;
  width: 100%;
  border-radius: 4px;
`;

const A = styled.a`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  align-items: center;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  transition: 0.2s;
`;

const Card = styled(Col)`
  position: relative !important;
  &:hover ${A} {
    letter-spacing: 2px;
    border: 30px solid transparent;
    transition: 0.2s !important;
    transform: scale(1.08) !important;
  }
`;

const CardTitle = styled.span`
  display: block;
  z-index: 1;
  color: black;
  font-size: 24px;
  text-align: center;
  transition: order 0.5s;
  @media (max-width: 1200px) {
    font-size: 20px;
  }
  @media (max-width: 992px) {
    font-size: 18px;
  }
  @media (max-width: 767px) {
    font-size: 16px;
  }
`;

export const sectionName = [
  '1F 구내식당',
  'B1 구내식당',
  '1F Starbucks',
  '식권 보관함',
];

function LandingPage() {
  const isSection = (idx) => (idx < 4 ? `/section/${idx}` : '/ticket');
  const user = useSelector((state) => state.user);
  return (
    <App>
      <Title>
        {user.userData !== undefined ? (
          `${user.userData.name}님 환영합니다`
        ) : (
          <LoadingOutlined />
        )}
      </Title>
      <CardContainer gutter={[32, 32]}>
        {sectionName.map((section, idx) => (
          <Card md={6} sm={12} xs={12} key={idx}>
            <A href={isSection(idx + 1)} key={idx}>
              <Img
                src={`/images/${idx + 1}.jpg`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `/images/${idx + 1}.png`;
                }}
                alt={sectionName[idx]}
              />
              <CardTitle>{section}</CardTitle>
            </A>
          </Card>
        ))}
      </CardContainer>
    </App>
  );
}

export default LandingPage;
