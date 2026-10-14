import { SVGAttributes } from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            {...props}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="novaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4f46e5" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <linearGradient id="novaAccent" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
            </defs>
            <rect width="40" height="40" rx="10" fill="url(#novaGradient)" />
            {/* Modern shopping bag / storefront geometry */}
            <path
                d="M13 14V12C13 8.13401 16.134 5 20 5C23.866 5 27 8.13401 27 12V14"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
            />
            <path
                d="M10 14H30L28.2 33H11.8L10 14Z"
                fill="url(#novaAccent)"
                opacity="0.9"
            />
            <path
                d="M10 14H30L28.2 33H11.8L10 14Z"
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
            />
            {/* Sparkle / Nova star center */}
            <path
                d="M20 20L21.2 23.5L24.5 24.5L21.2 25.5L20 29L18.8 25.5L15.5 24.5L18.8 23.5L20 20Z"
                fill="white"
            />
        </svg>
    );
}
