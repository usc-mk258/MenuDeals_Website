import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
 
export default () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  return (
    <div style={{ padding: `0 ${chevronWidth}px` }}>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={2}
        gutter={20}
        leftChevron={<button>{'<'}</button>}
        rightChevron={<button>{'>'}</button>}
        outsideChevron
        chevronWidth={chevronWidth}
      >
        <div style={{ height: 200, background: '#EEE' }}>First card</div>
        <div style={{ height: 200, background: '#EEE' }}>Second card</div>
        <div style={{ height: 200, background: '#EEE' }}>Third card</div>
        <div style={{ height: 200, background: '#EEE' }}>Fourth card</div>
      </ItemsCarousel>
    </div>
  );
};