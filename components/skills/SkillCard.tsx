import Image from "next/image";
import { useEffect, useState } from 'react';
import { FastAverageColor } from 'fast-average-color';
import { skill } from "@/types/main";
import { useTheme } from "next-themes";

const Skill = ({ name, image, url }: skill & { url?: string }) => {
    const { theme } = useTheme();
    const [bgColor, setBgColor] = useState("");

    useEffect(() => {
        new FastAverageColor().getColorAsync(image)
            .then(color => {
                const rgba = color.rgb.split(')');
                setBgColor(rgba[0] + ',0.07)');
            })
            .catch(e => {
                console.log(e);
            });
    }, [image]);

    const handleTextClick = () => {
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div className="flex flex-col justify-center items-center gap-2">
            <div 
                title={name} 
                style={{ backgroundColor: bgColor }}
                className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-gray-100 dark:bg-grey-800 flex items-center justify-center"
            >
                <Image 
                    alt={name} 
                    width={100} 
                    height={100} 
                    className={`h-12 w-12 md:h-14 md:w-14 object-contain ${
                        theme === 'dark' && 
                        (name === "GitHub" || name === "Vercel" || name === "NextJS" || name === "ExpressJS" ? 'invert' : 'invert-0')
                    }`} 
                    src={image} 
                />
            </div>
            
            <p 
                className={`text-sm md:text-base text-center hyphens-auto ${
                    url ? 'cursor-pointer hover:text-blue-500 dark:hover:text-blue-400 underline' : ''
                }`}
                onClick={handleTextClick}
            >
                {name}
            </p>
        </div>
    );
};

export default Skill;