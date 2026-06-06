"use client";
import React from "react";
import Image from "next/image"; // Import the Next.js Image component
import { StickyScroll } from "./ui/sticky-scroll-reveal";
// Removed the unused ST import to clean up warnings

// Import the image directly
import journeyImage from "@/utils/images/journey.png"; // Adjust this path if using relative paths like "../utils/images/journey.png"
import collaborativeImage from "@/utils/images/collaborative.png"; 
import evolvingImage from "@/utils/images/evolving.png"; 
import advanceImage from "@/utils/images/advance.png"; 

const musicSchoolContent = [
    {
    title: 'Discover Your Sound with Us: A Personal Journey in Music Mastery',
    description:
        'Embark on a musical journey thats uniquely yours. Our personalized instruction adapts to your individual needs, setting the stage for unparalleled growth and creativity. At our music school, your aspirations meet our dedicated support, creating a harmonious path to mastery.',
    content: (
        <div className="flex h-full w-full items-center justify-center text-white">
            <Image
                src={journeyImage} // Use the imported image object
                className="h-full w-full object-cover"
                alt="Personal Journey"
                // width and height are not strictly required here if you import a local image, 
                // but if you keep the standard <img> tag, keep them. Next/Image infers size from the import.
            />
        </div>
    ),
    },
    {
    title: 'Live Feedback & Engagement',
    description:
        'Immerse yourself in an interactive learning experience where feedback is immediate, just like real-time changes in a collaborative project. This approach enhances your understanding and mastery of music concepts and performance techniques.',
    content: (
        <div className="flex h-full w-full items-center justify-center text-white">
            <Image
                src={collaborativeImage} // Use the imported image object
                className="h-full w-full object-cover"
                alt="Live Feedback & Engagement"
            />
        </div>
    ),
    },
    {
    title: 'Cutting-Edge Curriculum',
    description:
        'Our curriculum is continuously updated to include the latest music education trends and technologies, ensuring you’re always learning with the most current and effective methods. Say goodbye to outdated materials and welcome an education that evolves with the industry.',
    content: (
        <div className="flex h-full w-full items-center justify-center text-white">
            <Image
                src={evolvingImage} // Use the imported image object
                className="h-full w-full object-cover"
                alt="Cutting-Edge Curriculum"
            />
        </div>
    ),
    },
    {
    title: 'Limitless Learning Opportunities',
    description:
        'With our expansive resource library and dynamic course offerings, you’ll never find yourself without something new to explore. Our platform provides continuous opportunities for growth, ensuring your musical skills are always advancing.',
    content: (
        <div className="flex h-full w-full items-center justify-center text-white">
            <Image
                src={advanceImage} // Use the imported image object
                className="h-full w-full object-cover"
                alt="Limitless Learning Opportunities"
            />
        </div>
    ),
    },
];

function WhyChooseUs() {
return (
    <div>
        <StickyScroll content={musicSchoolContent} />
    </div>
)
}

export default WhyChooseUs;