"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export const TextHoverEffect = ({
    text,
    duration,
}: {
    text: string;
    duration?: number;
    automatic?: boolean;
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [cursor, setCursor] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);
    const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

    useEffect(() => {
        if (svgRef.current && cursor.x !== null && cursor.y !== null) {
            const svgRect = svgRef.current.getBoundingClientRect();
            const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
            const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
            setMaskPosition({
                cx: `${cxPercentage}%`,
                cy: `${cyPercentage}%`,
            });
        }
    }, [cursor]);

    return (
        <svg
            ref={svgRef}
            width="100%"
            height="100%"
            viewBox="0 0 300 100"
            xmlns="http://www.w3.org/2000/svg"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
            className="select-none"
        >
            <defs>
                <linearGradient
                    id="textGradient"
                    gradientUnits="userSpaceOnUse"
                    cx="50%"
                    cy="50%"
                    r="25%"
                >
                    <stop offset="0%" stopColor={"#4f46e5"} />
                    <stop offset="25%" stopColor={"#7c3aed"} />
                    <stop offset="50%" stopColor={"#a855f7"} />
                    <stop offset="75%" stopColor={"#ec4899"} />
                </linearGradient>

                <motion.radialGradient
                    id="revealMask"
                    gradientUnits="userSpaceOnUse"
                    r="20%"
                    animate={maskPosition}
                    transition={{ duration: duration ?? 0, ease: "easeOut" }}
                >
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor="black" />
                </motion.radialGradient>
                <mask id="textMask">
                    <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        fill="url(#revealMask)"
                    />
                </mask>
            </defs>
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                strokeWidth="0.3"
                className="font-[helvetica] font-bold stroke-neutral-800 fill-transparent text-6xl"
                style={{ opacity: hovered ? 0.7 : 0 }}
            >
                {text}
            </text>
            <motion.text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                strokeWidth="0.3"
                className="font-[helvetica] font-bold fill-transparent text-6xl stroke-neutral-800"
                initial={{ strokeDashoffset: 2000, strokeDasharray: 2000 }}
                animate={{
                    strokeDashoffset: 0,
                    strokeDasharray: 2000,
                }}
                transition={{
                    duration: 4,
                    ease: "easeInOut",
                }}
            >
                {text}
            </motion.text>
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                stroke="url(#textGradient)"
                strokeWidth="0.3"
                mask="url(#textMask)"
                className="font-[helvetica] font-bold fill-transparent text-6xl"
            >
                {text}
            </text>
            <motion.line
                x1="0"
                y1="100%"
                x2="100%"
                y2="100%"
                stroke="currentColor"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: hovered ? 1 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            />
        </svg>
    );
};