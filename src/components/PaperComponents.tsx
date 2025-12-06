import React, { type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

type PaperInputProps = InputHTMLAttributes<HTMLInputElement>;
export const paperBaseStyle =
  'border-4 border-gray-900 shadow-[6px_6px_0px_#1f2937] transition-all duration-150 ease-out';
const hoverLiftStyle =
  'hover:shadow-[10px_10px_0px_#1f2937] hover:-translate-x-1 hover:-translate-y-1';
const activePressStyle =
  'active:shadow-[2px_2px_0px_#1f2937] active:translate-x-1 active:translate-y-1';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PaperPage({ children, className = '' }: PageContainerProps) {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="w-full max-w-sm sm:max-w-2xl lg:max-w-xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
        <div className={`bg-white p-6 ${paperBaseStyle}`}>{children}</div>
      </div>
    </div>
  );
}

export const PaperCard: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return <div className={`p-6 md:p-8 ${paperBaseStyle} rounded-lg ${className}`}>{children}</div>;
};

interface PaperButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
}

export const PaperButton: React.FC<PaperButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  let colorStyles = '';
  switch (variant) {
    case 'primary':
      colorStyles = 'bg-blue-500 text-white hover:bg-blue-600';
      break;
    case 'secondary':
      colorStyles = 'bg-gray-200 text-gray-900 hover:bg-gray-300';
      break;
    case 'danger':
      colorStyles = 'bg-red-500 text-white hover:bg-red-600';
      break;
    case 'ghost':
      colorStyles = 'bg-transparent text-gray-900 hover:bg-gray-100';
      break;
  }

  const baseClasses = `
    inline-flex items-center justify-center 
    px-6 py-2 text-lg font-bold uppercase cursor-pointer 
    ${paperBaseStyle} ${hoverLiftStyle} ${activePressStyle} 
    rounded-md ${colorStyles} ${className}
  `;

  return (
    <button className={baseClasses} {...props}>
      {children}
    </button>
  );
};

export const PaperInput: React.FC<PaperInputProps> = ({ className = '', ...props }) => {
  const baseClasses = `
    w-full p1 sm:p-3 text-sm sm:text-lg 
    ${paperBaseStyle} rounded-md
    focus:shadow-none focus:outline-none focus:ring-4 focus:ring-blue-500/50 
    focus:translate-x-1 focus:translate-y-1
    ${className}
  `;

  return <input type="text" className={baseClasses} {...props} />;
};

interface PaperLinkProps extends LinkProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
}

export const PaperLink: React.FC<PaperLinkProps> = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  let colorStyles = '';

  switch (variant) {
    case 'primary':
      colorStyles = 'bg-blue-500 text-white hover:bg-blue-600';
      break;
    case 'secondary':
      colorStyles = 'bg-gray-200 text-gray-900 hover:bg-gray-300';
      break;
    case 'danger':
      colorStyles = 'bg-red-500 text-white hover:bg-red-600';
      break;
    case 'ghost':
      colorStyles = 'bg-transparent text-gray-900 hover:bg-gray-100';
      break;
  }

  const baseClasses = `
    inline-flex items-center justify-center 
    px-1 md:px-6 sm:px-4 py-1 sm:py-2 md:text-lg font-bold uppercase cursor-pointer 
    ${paperBaseStyle} ${hoverLiftStyle} ${activePressStyle} 
    rounded-md ${colorStyles} ${className}
    no-underline focus:outline-none focus:ring-4 focus:ring-blue-500/50
  `;

  return (
    <Link className={baseClasses} {...props}>
      {children}
    </Link>
  );
};

type PaperSelectBoxProps = InputHTMLAttributes<HTMLSelectElement> & {
  children: ReactNode;
};

export const PaperSelectBox: React.FC<PaperSelectBoxProps> = ({
  className = '',
  children,
  ...props
}) => {
  const baseClasses = `
    // Set explicit height to help wrapper match it
    h-14 
    appearance-none w-full p-3 text-lg cursor-pointer
    ${paperBaseStyle} rounded-md
    // Remove shadow on focus and use a colored ring for the 'focused' highlight
    focus:shadow-none focus:outline-none focus:ring-4 focus:ring-blue-500/50 
    // On focus, simulate a slight 'push down' effect
    focus:translate-x-1 focus:translate-y-1
    // Padding to make space for the custom arrow
    pr-10
    ${className}
  `;

  return (
    <select className={baseClasses} {...props}>
      {children}
    </select>
  );
};

export const PaperH1Title: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  const baseClasses = `
    text-4xl md:text-5xl font-bold mb-6 pb-2 
    border-b-4 border-gray-900 
    ${className}
  `;
  return <h1 className={baseClasses}>{children}</h1>;
};

export const PaperH2Title: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  const baseClasses = `
    text-3xl md:text-4xl font-bold mb-5 pb-1 
    border-b-4 border-gray-900 
    ${className}
  `;
  return <h2 className={baseClasses}>{children}</h2>;
};

export const PaperSubtitle: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  const baseClasses = `
    text-xl md:text-2xl font-semibold text-gray-700 mt-[-10px] mb-6
    ${className}
  `;
  return <p className={baseClasses}>{children}</p>;
};
