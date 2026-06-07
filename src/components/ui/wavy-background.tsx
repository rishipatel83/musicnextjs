"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { createNoise3D } from "simplex-noise";

// 1. Properly type the props and extend standard HTML attributes to remove `[key: string]: any`
interface WavyBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
    containerClassName?: string;
    colors?: string[];
    waveWidth?: number;
    backgroundFill?: string;
    blur?: number;
    speed?: "slow" | "fast";
    waveOpacity?: number;
    }

    // Extract default colors outside the component so its reference never changes unnecessarily
    const DEFAULT_COLORS = [
    "#38bdf8",
    "#818cf8",
    "#c084fc",
    "#e879f9",
    "#22d3ee",
    ];

    export const WavyBackground = ({
    children,
    className,
    containerClassName,
    colors,
    waveWidth = 50,
    backgroundFill = "black",
    blur = 10,
    speed = "fast",
    waveOpacity = 0.5,
    ...props
    }: WavyBackgroundProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isSafari, setIsSafari] = useState<boolean>(false);

    // Memoize colors to prevent unnecessary re-renders of the canvas effect
    const waveColors = useMemo(() => colors ?? DEFAULT_COLORS, [colors]);

    useEffect(() => {
        // 2. Move canvas variables inside useEffect to avoid stale closures and re-declarations on render
        const canvas = canvasRef.current;
        if (!canvas) return;

        // 3. Remove `any` types for canvas and context
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let w: number;
        let h: number;
        let nt = 0;
        const noise = createNoise3D();

        const getSpeed = () => {
        switch (speed) {
            case "slow":
            return 0.001;
            case "fast":
            return 0.002;
            default:
            return 0.001;
        }
        };

        const resize = () => {
        w = ctx.canvas.width = window.innerWidth;
        h = ctx.canvas.height = window.innerHeight;
        ctx.filter = `blur(${blur}px)`;
        };

        const drawWave = (n: number) => {
        nt += getSpeed();
        for (let i = 0; i < n; i++) {
            ctx.beginPath();
            ctx.lineWidth = waveWidth;
            ctx.strokeStyle = waveColors[i % waveColors.length];
            
            for (let x = 0; x < w; x += 5) {
            // 4. Replaced `var` with `const`
            const y = noise(x / 800, 0.3 * i, nt) * 100;
            ctx.lineTo(x, y + h * 0.5); 
            }
            ctx.stroke();
            ctx.closePath();
        }
        };

        const render = () => {
        ctx.fillStyle = backgroundFill;
        ctx.globalAlpha = waveOpacity;
        ctx.fillRect(0, 0, w, h);
        drawWave(5);
        animationId = requestAnimationFrame(render);
        };

        // Initialize
        resize();
        render();

        // 5. Use addEventListener instead of overwriting window.onresize
        window.addEventListener("resize", resize);

        return () => {
        window.removeEventListener("resize", resize);
        cancelAnimationFrame(animationId);
        };
        // 6. Included all required dependencies to satisfy exhaustive-deps rule
    }, [blur, speed, waveOpacity, waveWidth, backgroundFill, waveColors]);

    useEffect(() => {
        setIsSafari(
        typeof window !== "undefined" &&
            navigator.userAgent.includes("Safari") &&
            !navigator.userAgent.includes("Chrome")
        );
    }, []);

    return (
        <div
        className={cn(
            "h-screen flex flex-col items-center justify-center",
            containerClassName
        )}
        >
        <canvas
            className="absolute inset-0 z-0"
            ref={canvasRef}
            id="canvas"
            style={{
            ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
            }}
        ></canvas>
        <div className={cn("relative z-10", className)} {...props}>
            {children}
        </div>
        </div>
    );
};