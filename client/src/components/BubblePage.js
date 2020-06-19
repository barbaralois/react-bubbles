import React, { useContext, useEffect } from 'react';
import Bubbles from './Bubbles';
import ColorList from './ColorList';
import { BubblesContext } from '../contexts/BubblesContext';

const BubblePage = () => {
  const { getColors, colorList, setColorList } = useContext(BubblesContext);

  useEffect(() => {
    getColors();
  }, []);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
