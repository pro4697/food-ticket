import React from 'react';
import styled from 'styled-components';

const App = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 700px;
  max-width: 1600px;
  margin: auto;
`;

const Title = styled.div`
  font-size: 30px;
  margin-bottom: 50px;
`;

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Card = styled.a`
  position: relative;
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;
  transition: 0.15s;
  height: 27vw;
  &:hover {
    transition: 0.2s;
    transform: scale(1.15);
  }
`;

const Img = styled.img`
  border-radius: 5px;
  height: 100%;
`;

const CardTitle = styled.span`
  transition: 0.2s;
  position: absolute;
  bottom: 0px;
  color: white;
  font-size: 24px;
  text-align: center;
  text-decoration: none;
  ${Card}:hover & {
    transition: 0.2s;
    bottom: 200px;
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

  return (
    <App>
      <Title>모바일 식권 시스템</Title>
      <CardContainer>
        {sectionName.map((section, idx) => (
          <Card href={isSection(idx + 1)} key={idx}>
            <Img src={`/images/${idx + 1}.jpg`} alt={sectionName[idx]} />
            <CardTitle>{section}</CardTitle>
          </Card>
        ))}
      </CardContainer>
    </App>
  );
}

export default LandingPage;
