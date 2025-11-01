import React, { useEffect, useRef, useState } from 'react';
import canvasImages from "./images";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function Canvas( { details }) {
    const { startIndex, numImages, duration, size, top, left, zIndex } = details;
    const [index, setIndex] = useState({ value : startIndex });
    const canvasRef = useRef(null);
    const scrollSpeedRef = useRef(Math.random().toFixed(1));

    useGSAP(() => {
        gsap.to(index, {
            value: (startIndex + numImages - 1),
            duration: duration,
            repeat: -1,
            ease: "linear",
            onUpdate: () => {
                setIndex({ value: Math.round(index.value) })
            }
        });
        gsap.from(canvasRef.current, {
            opacity: 0,
            scale: Math.random().toFixed(2),
            duration: 2.5,
            ease: "circ.out"
        })
    });
    
    useEffect(() => {
        const scale = window.devicePixelRatio;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = canvasImages[index.value];
        img.onload = () => {
            canvas.width = canvas.offsetWidth * scale;
            canvas.height = canvas.offsetHeight * scale;
            canvas.style.width = canvas.offsetWidth + "px";
            canvas.style.height = canvas.offsetHeight + "px";

            ctx.scale(scale, scale);
            ctx.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
        }

    }, [index]);

    return (
        <>
            <canvas 
            data-scroll
            data-scroll-speed={scrollSpeedRef.current}
            ref={canvasRef} 
            className='absolute'
            style={{ 
                width: `${size * 1.8}px`,
                height: `${size * 1.8}px`,
                top: `${top}%`,
                left: `${left}%`,
                zIndex: `${zIndex}`
            }} id="canvas"
            >Canvas</canvas>
        </>
    )
}

export default Canvas