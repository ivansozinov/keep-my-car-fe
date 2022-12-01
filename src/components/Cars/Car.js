import React from 'react';
import CarInfo from './CarInfo';
import usePopup from '../Utils/usePopup';

export default function CarPreview(props) {
  const { car } = props;

  const { popupVisibility } = usePopup(<CarInfo data={car} />, 'Car Info');

  function showCarInfo() {
    popupVisibility(true);
  }

  return(
    <div onClick={showCarInfo}>
      <p><strong>{car.manufacturer} {car.model}({car.submodel}) {car.modification} {car.cabinType}</strong> {car.productionYear}</p>
      <p>{car.vin}</p>
      <p>{car.engine && car.engine.engineType + ' ' + car.engine.volume + ' ' + car.engine.power.hp + 'hp'}</p>
    </div>
  )
}