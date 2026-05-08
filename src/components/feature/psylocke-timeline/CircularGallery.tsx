"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
    motion,
    useMotionValue,
    animate,
    PanInfo,
    useSpring,
} from "framer-motion";
import { ComicIssue } from "@/lib/psylocke-timeline";

interface CircularGalleryProps {
    items: ComicIssue[];
    renderItem: (item: ComicIssue, index: number, isActive: boolean) => React.ReactNode;
    getItemKey: (item: ComicIssue) => string | number;
    onItemClick?: (item: ComicIssue, index: number) => void;
    bend?: number;
    textColor?: string;
    borderRadius?: number;
}

export default function CircularGallery({
    items,
    renderItem,
    getItemKey,
    onItemClick,
    bend = 3,
    textColor = "#ffffff",
    borderRadius = 0.05,
}: CircularGalleryProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);

    // Angle state
    const angle = useMotionValue(0);
    const smoothAngle = useSpring(angle, { damping: 20, stiffness: 100 });
    const [activeIndex, setActiveIndex] = useState(0);

    // Configuration
    const itemWidth = 360;
    const gap = 20;
    // Calculate radius based on circumference to fit all items
    const circumference = items.length * (itemWidth + gap);
    const radius = Math.max(circumference / (2 * Math.PI), 400); // Minimum radius to look good
    const anglePerItem = 360 / items.length;

    useEffect(() => {
        if (containerRef.current) {
            setContainerWidth(containerRef.current.offsetWidth);
        }

        const handleResize = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleDragEnd = (
        _: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ) => {
        const velocity = info.velocity.x;
        const currentAngle = angle.get();

        // Estimate where the drag would end based on velocity (inertia)
        // Adjust multiplier to control "friction"
        const estimatedEndAngle = currentAngle + velocity * 0.2;

        // Snap to the nearest item index
        // The angle for index i is: -i * anglePerItem (negative because dragging left rotates positive/clockwise?)
        // Let's verify rotation direction. Dragging left (negative x) should rotate counter-clockwise (negative angle)?
        // Actually, usually dragging left moves content left, which means the "camera" rotates right, or the object rotates left.

        // For simplicity:
        // Index 0 is at 0 degrees.
        // Index 1 is at -anglePerItem degrees (to the right).
        // So target angle = -index * anglePerItem.

        const targetIndex = Math.round(-estimatedEndAngle / anglePerItem);
        const targetAngle = -targetIndex * anglePerItem;

        animate(angle, targetAngle, {
            type: "spring",
            stiffness: 50,
            damping: 20,
        });

        // Normalize index
        const normalizedIndex = ((targetIndex % items.length) + items.length) % items.length;
        setActiveIndex(normalizedIndex);
    };

    const handleItemClick = useCallback((item: ComicIssue, index: number) => {
        if (index === activeIndex) {
            // Already active -> Trigger click (open drawer)
            onItemClick?.(item, index);
        } else {
            // Not active -> Rotate to it
            const targetAngle = -index * anglePerItem;
            animate(angle, targetAngle, { duration: 0.6, ease: [0.32, 0.72, 0, 1] });
            setActiveIndex(index);
        }
    }, [angle, anglePerItem, onItemClick, activeIndex]);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[600px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
            style={{
                perspective: "1000px",
                touchAction: "none"
            }}
        >
            {/* The rotating cylinder */}
            <motion.div
                style={{
                    rotateY: smoothAngle,
                    z: -radius, // Push center back so front items are at Z=0
                    transformStyle: "preserve-3d",
                    width: 0,
                    height: 0,
                    position: "absolute"
                }}
                className="flex items-center justify-center"
            >
                {items.map((item, index) => {
                    const itemAngle = index * anglePerItem;
                    // Does this item face the viewer at rotation 0?
                    // At index 0, itemAngle 0. rotateY(0). translateZ. It's in front.

                    return (
                        <motion.div
                            key={getItemKey(item)}
                            className="absolute flex items-center justify-center"
                            style={{
                                transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                                // Important: we need to counter-rotate if we want 2D elements always facing camera?
                                // No, for a 3D ring, they should face the center (default behavior of rotateY + translateZ)
                                transformStyle: "preserve-3d",
                                // backfaceVisibility: "hidden", 
                            }}
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent drag start if clicking item?
                                handleItemClick(item, index);
                            }}
                        >
                            <div
                                className={`relative transition-all duration-300 ${index === activeIndex ? "scale-110 z-10" : "scale-90 opacity-60 hover:opacity-100"
                                    }`}
                            >
                                {renderItem(item, index, index === activeIndex)}
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Invisible drag overlay */}
            <motion.div
                className="absolute inset-0 z-20"
                drag="x"
                dragElastic={0.001} // Low elasticity
                dragConstraints={{ left: -10000, right: 10000 }}
                style={{ cursor: "grab" }}
                onDrag={(e, info) => {
                    // Manually update rotation based on drag
                    // Dragging 1px = X degrees
                    const rotationFactor = 0.5;
                    const newAngle = angle.get() + info.delta.x * rotationFactor;
                    angle.set(newAngle);
                }}
                onDragEnd={handleDragEnd}
            />

        </div>
    );
}
