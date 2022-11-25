import React from 'react';

export default function CarInfo(props) {
    const { data } = props;
    
    return(
        <section className="loading-wrapper">
            <h1>{data.manufacturer} {data.model}({data.submodel}) {data.modification}</h1>
        </section>
    )
}