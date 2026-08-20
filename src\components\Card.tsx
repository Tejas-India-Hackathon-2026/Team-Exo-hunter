import React from 'react';

interface CardProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string;
  glass?: boolean;
  hoverEffect?: boolean;
  borderColor?: 'default' | 'indigo' | 'sky';
  className?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  icon,
  badge,
  glass = true,
  hoverEffect = true,
  borderColor = 'default',
  className = '',
  children,
  footer,
}) => {
  
  // Neon glow border maps based on module classifications (indigo for Student, sky for Campus)
  const borderStyles = {
    default: 'border-slate-800/60 hover:border-indigo-500/30',
    indigo: 'border-indigo-500/20 hover:border-indigo-500/40 shadow-indigo-500/5',
    sky: 'border-sky-500/20 hover:border-sky-500/40 shadow-sky-500/5',
  };

  // Assembling card layer visual classes with dark-glass filter
  const cardClasses = [
    'rounded-xl border transition-all duration-300 flex flex-col p-6',
    glass 
      ? 'bg-slate-900/45 backdrop-blur-md shadow-lg shadow-black/30' 
      : 'bg-slate-900 border-slate-800 shadow-lg shadow-black/30',
    borderStyles[borderColor],
    hoverEffect 
      ? 'hover:shadow-xl hover:-translate-y-1' 
      : '',
    className
  ].join(' ');

  return (
    <div className={cardClasses}>
      <div className="flex-1">
        {/* Header containing icon and badge */}
        {(icon || badge) && (
          <div className="flex items-center justify-between mb-4">
            {icon && (
              <div className={`p-2.5 rounded-lg flex items-center justify-center ${
                borderColor === 'sky' 
                  ? 'bg-sky-500/10 text-sky-400' 
                  : 'bg-indigo-500/10 text-indigo-400'
              }`}>
                {icon}
              </div>
            )}
            {badge && (
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                borderColor === 'sky' 
                  ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' 
                  : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
              }`}>
                {badge}
              </span>
            )}
          </div>
        )}

        {/* Title */}
        {title && (
          <h3 className="text-lg font-bold text-white mb-2 leading-snug">
            {title}
          </h3>
        )}

        {/* Description */}
        {description && (
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            {description}
          </p>
        )}

        {/* Main Content */}
        {children}
      </div>

      {/* Optional Footer */}
      {footer && (
        <div className="mt-4 pt-4 border-t border-slate-800/50 flex items-center justify-between text-xs">
          {footer}
        </div>
      )}
    </div>
  );
};
