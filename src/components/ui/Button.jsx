import React from 'react';

const Button = ({ children, variant = 'primary', className = '', as: Component = 'button', ...props }) => {
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    ghost: 'bg-white text-slate-800 border border-slate-200 hover:border-indigo-200',
    subtle: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100',
  };

  return (
    <Component
      className={`inline-flex items-center justify-center px-4 py-2 rounded-lg font-semibold text-sm transition shadow-sm ${
        variants[variant]
      } ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;
