import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';

export const FadeIn = keyframes`
  0% {
    opacity: 0;
    margin-top: 30px;
  }
  100% {
   opacity: 1;
   margin-top: 0px;
 }
`;

const App = styled.div`
  flex-direction: column;
  padding-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  /* min-height: 600px; */
  max-width: 1600px;
  margin: auto;
  @media (max-width: 767px) {
    padding-top: 0rem;
    height: 100%;
    background-color: #1890ff;
  }
`;

const Title = styled.div`
  font-size: 30px;
  margin-bottom: 100px;
  @media (max-width: 767px) {
    margin-top: 50px;
    margin-bottom: 70px;
    color: white;
  }
`;

const CardContainer = styled(Row)`
  width: 100%;
  @media (max-width: 767px) {
    padding: 5px !important;
    margin: 0 !important;
    margin-bottom: -1px !important;
    border-radius: 30px 30px 0 0 !important;
    background-color: white;
    box-shadow: 3px -7px 5px rgba(50, 50, 93, 0.2),
      -3px -7px 5px rgba(50, 50, 93, 0.2);
  }
`;
const Img = styled.img`
  display: flex;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 5px;
  transition: 0.2s;
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 5px;
  transition: 0.2s;
  overflow: visible !important;
`;

const CardTitle = styled.span`
  z-index: 1;
  color: black;
  font-size: 22px;
  letter-spacing: 2px;
  transition: 0.2s;
  font-weight: 700;
  margin-top: 5px;
  @media (max-width: 1200px) {
    font-size: 18px;
  }
  @media (max-width: 992px) {
    font-size: 16px;
  }
  @media (max-width: 767px) {
    font-size: 14px;
  }
`;

const Card = styled(Col)`
  position: relative !important;
  transition: 0.2s !important;
  -webkit-animation: ${FadeIn} 0.3s ease;
  -moz-animation: ${FadeIn} 0.3s ease;
  -ms-animation: ${FadeIn} 0.3s ease;
  -o-animation: ${FadeIn} 0.3s ease;
  animation: ${FadeIn} 0.3s ease;
  &:hover ${StyledLink} {
    transition: 0.2s;
    border: 20px solid transparent;
    transform: scale(1.08) !important;
  }
  &:hover ${CardTitle} {
    font-size: 20px;
    transition: 0.2s;
    @media (max-width: 1200px) {
      font-size: 18px;
    }
    @media (max-width: 992px) {
      font-size: 16px;
    }
    @media (max-width: 767px) {
      font-size: 14px;
    }
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
          `${user.userData.name || 'Guest'}님 환영합니다`
        ) : (
          <LoadingOutlined />
        )}
      </Title>
      <CardContainer gutter={[32, 32]}>
        {sectionName.map((section, idx) => (
          <Card md={6} sm={12} xs={12} key={idx}>
            <StyledLink to={isSection(idx + 1)} draggable='false' key={idx}>
              <Img
                src={`/images/${idx + 1}.jpg`}
                draggable='false'
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `/images/${idx + 1}.png`;
                }}
                alt={sectionName[idx]}
              />
              <CardTitle>{section}</CardTitle>
            </StyledLink>
          </Card>
        ))}
      </CardContainer>
    </App>
  );
}

export default withRouter(LandingPage);
