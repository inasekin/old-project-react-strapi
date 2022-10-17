import React, { useContext } from 'react';
import styles from './Slider.module.css';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { DataContext } from '../../Context';

export default function Slider({ currentInitiative }) {
  const { host } = useContext(DataContext);
  return (
    <div className={styles.container}>
      {currentInitiative && currentInitiative.slider_images.length && <ReactCompareSlider className={styles.slider} onlyHandleDraggable={true}
        itemOne={<ReactCompareSliderImage src={`${host}${currentInitiative.slider_images[0] && currentInitiative.slider_images[0].url}`} alt='Image one' />}
        itemTwo={<ReactCompareSliderImage src={`${host}${currentInitiative.slider_images[1] && currentInitiative.slider_images[1].url}`} alt='Image two' />}
      />}
    </div>
  );

}