import React from 'react';
import usePopup from '../../Utils/usePopup';
import AddCartForm from './AddCarForm';

export default function AddCarButton(props) {
  const { popupVisibility } = usePopup(<AddCartForm {...props} />, 'Add Car');
  
  const handleClick = (e) => {
    e.preventDefault();
    popupVisibility(true);
  }

  return(
    <>
      <div onClick={handleClick} className='cars-car-add'><p>+</p></div>
    </>
  )
}