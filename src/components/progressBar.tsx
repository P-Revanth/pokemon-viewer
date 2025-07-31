import React from 'react';

const getStatColor = (statName: string): string => {
    switch (statName.toLowerCase()) {
        case 'hp': return 'bg-green-500'; 
        case 'attack': return 'bg-red-500'; 
        case 'defense': return 'bg-blue-500'; 
        case 'special-attack': return 'bg-orange-500'; 
        case 'special-defense': return 'bg-sky-500'; 
        case 'speed': return 'bg-purple-500'; 
        default: return 'bg-gray-400'; 
    }
};

interface ProgressBarProps {
    label: string; 
    value: number; 
    max?: number; 
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, value, max = 255 }) => {
    const percentage = Math.min((value / max) * 100, 100);

    const barColorClass = getStatColor(label);

    return (
        <div className="mb-3">
            <div className="flex justify-between items-center text-md font-semibold mb-1">
                <span className="capitalize text-white">{label}:</span>
                <span className="text-white">{value}</span>
            </div>
            <div className="w-full bg-gray-700 rounded h-5">
                <div
                    className={`${barColorClass} h-full rounded transition-all duration-500 ease-out`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;