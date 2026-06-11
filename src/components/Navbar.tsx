'use client'; 
import React, { useState, useEffect } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    
    // Naye states scroll track karne ke liye
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Agar current scroll pichle scroll se zyada hai, matlab user niche scroll kar raha hai
            // (currentScrollY > 50 lagaya hai taaki ekdum top par thoda buffer rahe)
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsVisible(false); // Navbar hide karo
            } else {
                setIsVisible(true);  // Navbar show karo
            }

            // Current position ko last position bana do next check ke liye
            setLastScrollY(currentScrollY);
        };

        // Scroll event listener add karna
        window.addEventListener("scroll", handleScroll);

        // Component unmount hone par listener clean karna zaroori hai
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    return (
        <div
            className={cn(
                "fixed inset-x-0 max-w-2xl mx-auto z-50 transition-all duration-300 ease-in-out",
                // Yahan hum dynamic classes laga rahe hain isVisible ke basis par
                isVisible ? "top-10 opacity-100" : "-top-24 opacity-0 pointer-events-none",
                className
            )}
        >
            <Menu setActive={setActive}>
                <Link href={"/"}>
                    <MenuItem setActive={setActive} active={active} item="Home"></MenuItem>
                </Link>
                <MenuItem
                    setActive={setActive} active={active} item="Our Courses"
                >
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/courses">All Courses</HoveredLink>
                        <HoveredLink href="/courses">
                            Basic Music Theory
                        </HoveredLink>
                        <HoveredLink href="/courses">
                            Advanced Composition
                        </HoveredLink>
                        <HoveredLink href="/courses">Songwriting</HoveredLink>
                        <HoveredLink href="/courses">
                            Music Production
                        </HoveredLink>
                    </div>
                </MenuItem>
                <Link href={"/contact"}>
                    <MenuItem setActive={setActive} active={active} item="Contact Us">
                    </MenuItem>
                </Link>
            </Menu>
        </div>
    )
}

export default Navbar;