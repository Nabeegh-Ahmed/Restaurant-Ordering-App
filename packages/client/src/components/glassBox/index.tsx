import React from "react"

interface GlassBoxProps {
    className?: string
    children: React.ReactNode
}
const GlassBox: React.FC<GlassBoxProps> = ({ children, className }) => {
    return (
        <div 
            style={{
                background: "rgba(255, 255, 255, 0.24)",
                borderRadius: "16px",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(4.2px)",
                WebkitBackdropFilter: "blur(4.2px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
            className={`${className}`}
        >
            {children}
        </div>
    )
}

export default GlassBox