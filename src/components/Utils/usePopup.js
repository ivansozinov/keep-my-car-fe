import { useState } from "react";
import * as ReactDOM from 'react-dom/client';

const container = document.getElementById('for-popup');
const popupRoot = ReactDOM.createRoot(container);

export default function usePopup (content, title) {
    const [isVisible, setVisibility] = useState(false);

    const closeHandler = (e) => {
        setVisibility(false);
    };

    const Popup = () => {
        console.log(isVisible)
        return (
            <>
                {isVisible &&
                    <section className='overlay' style={{
                        visibility: isVisible ? "visible" : "hidden",
                        opacity: isVisible ? "1" : "0"
                      }}>
                        <div className='popup'>
                        <span className='close' onClick={closeHandler}>&times;</span>
                            {title && <h2>{title}</h2>}
                            {content}
                        </div>
                    </section>
                }
            </>
        )
    }

    popupRoot.render(<Popup/>);

    return {
        Popup,
        isVisible,
        popupVisibility: setVisibility
    }
}