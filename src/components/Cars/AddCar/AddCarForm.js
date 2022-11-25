import React from "react";
import { useRef } from "react";
import axiosInstance from '../../Utils/axiosInstance';
import './AddCarForm.css';

export default function AddCartForm(props) {
    const { setCarsData, carsData, setIsLoading } = props;

    function saveCar(data) {
        setIsLoading(true)
        axiosInstance.post('/cars', JSON.stringify(data))
            .then((response) => {
                carsData.push(response.data);
                setCarsData(carsData);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    }

    //const fields = ['manufacturer', 'model', 'submodel', 'modification', 'vin', 'productionYear', 'color'];

    const manufacturerRef = useRef();
    const modelRef = useRef();
    const vinRef = useRef();
    const modificationRef = useRef();
    const yearRef = useRef();
    const submodelRef = useRef();
    const colorRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        const data = {
            'manufacturer': manufacturerRef.current.value,
            'model': modelRef.current.value,
            'submodel': submodelRef.current.value,
            'vin': vinRef.current.value,
            'productionYear': parseInt(yearRef.current.value),
            'color': colorRef.current.value,
        };
        saveCar(data);
    }

    return (
        <div><form className="add-car-form" onSubmit={handleSubmit}>
            <label>VIN: </label>
                    <input
                        autoFocus
                        required
                        type="text"
                        ref={vinRef}
                    />

<label>Manufacturer: </label>
                <input
                    required
                    type="text"
                    ref={manufacturerRef}
                />

<label>Model: </label>
                <input
                    required
                    type="text"
                    ref={modelRef}
                />

<label>Submodel: </label>
                <input
                    type="text"
                    ref={submodelRef}
                />

<label>Modification: </label>
                <input
                    required
                    type="text"
                    ref={modificationRef}
                />

<label>Year: </label>
                <input
                    required
                    type="text"
                    ref={yearRef}
                />

<label>Color: </label>
                <input
                    required
                    type="text"
                    ref={colorRef}
                />
            
            <button type="submit">Add car</button>
        </form></div>
    )
}