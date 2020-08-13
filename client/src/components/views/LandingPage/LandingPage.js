import React from 'react';
import { motion } from 'framer-motion';

export const sectionName = ['1F 구내식당', 'B1 구내식당', '1F Starbucks'];

const page = {
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: '10vh',
  },
};

function LandingPage() {
  const CardRender = (name, idx) => (
    <a href={`/section/${idx}`} className='card__container' key={idx}>
      <img src={`/images/${idx}.jpg`} alt='' className='card__img' />
      <span className='card__name'>{name}</span>
    </a>
  );

  return (
    <div className='app'>
      <div>
        <br />
        <h1>모바일 식권 시스템</h1>
      </div>

      <br />
      <div className='card'>
        {sectionName.map((section, idx) => CardRender(section, idx + 1))}
        <a href={`/ticket`} className='card__container'>
          <img src={`/images/4.jpg`} alt='' className='card__img' />
          <span className='card__name'>식권 보관함</span>
        </a>
      </div>
    </div>
  );
}

export default LandingPage;
