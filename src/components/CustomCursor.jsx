import React, { useEffect, useState } from 'react'

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY })
            // Slight delay for ring position
            setTimeout(() => {
                setRingPosition({ x: e.clientX, y: e.clientY })
            }, 100)
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <>
            {/* Small Dot */}
            <div 
                className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#111110] rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{ 
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    transition: 'transform 0.1s linear'
                }}
            />
            {/* Outer Ring */}
            <div 
                className="fixed top-0 left-0 w-9 h-9 border border-[#111110] rounded-full pointer-events-none z-[9998] transition-transform duration-300 ease-out mix-blend-difference"
                style={{ 
                    transform: `translate(${ringPosition.x - 13}px, ${ringPosition.y - 13}px)`
                }}
            />
        </>
    )
}

export default CustomCursor
