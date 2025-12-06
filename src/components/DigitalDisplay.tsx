import React from 'react';

interface DigitalDisplayProps {
  value: number;
  label: string;
}

export const DigitalDisplay: React.FC<DigitalDisplayProps> = ({ value, label }) => {
  const formattedValue = String(value).padStart(3, '0'); // Ensures 3 digits (e.g., 007)

  const displayClasses = `
    border-4 border-gray-900 bg-gray-900 text-lime-400 font-mono 
    text-2xl sm:text-3xl px-3 py-1 shadow-[2px_2px_0px_#6b7280] rounded-sm
  `;

  return (
    <div className="flex flex-col items-center">
      <div className={displayClasses}>{formattedValue}</div>
      <span className="text-xs font-semibold uppercase mt-1">{label}</span>
    </div>
  );
};
