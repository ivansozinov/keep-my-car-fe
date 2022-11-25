import React, { useState, useEffect } from 'react';
import CarPreview from './Car';
import AddCarButton from './AddCar/AddCarButton';
import Loading from '../Loading/Loading';
import axiosInstance from '../Utils/axiosInstance';
import './Cars.css';

export default function Cars() {
    const [carsData, setCarsData] = useState([]);
    const [isCarsLoading, setIsLoading] = useState(true);

    function updateCars() {
        setIsLoading(true)
        axiosInstance.get('/cars')
            .then(response => {
                setCarsData(response.data);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        updateCars();
    }, []);

    return(
        <section className='cars-list'>
            {isCarsLoading
                ? <Loading />
                : <>
                    { 
                        carsData.map((carItem, index) => {
                            return <CarPreview key={index} car={carItem} />
                        })
                    }
                    <AddCarButton setIsLoading={setIsLoading} carsData={carsData} setCarsData={setCarsData} />
                </>
            }
        </section>
    )
}