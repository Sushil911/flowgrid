import React from 'react';

const Ruler: React.FC = () => {
  // Generate markings
  const marks = Array.from({ length: 100 }, (_, i) => i * 10);

  return (
    <div className="fixed right-0 top-0 bottom-0 w-12 border-l border-white/10 flex flex-col items-end py-20 bg-brand-dark/50 backdrop-blur-sm z-40 select-none pointer-events-none hidden md:flex">
      {marks.map((mark) => (
        <div key={mark} className="relative w-full h-[20px] flex items-center justify-end pr-2">
          {mark % 100 === 0 ? (
            <>
              <span className="text-[9px] text-white/30 absolute right-4 font-mono rotate-90 origin-right translate-x-2">
                {mark}
              </span>
              <div className="w-3 h-[1px] bg-white/30" />
            </>
          ) : mark % 50 === 0 ? (
            <div className="w-2 h-[1px] bg-white/20" />
          ) : (
            <div className="w-1 h-[1px] bg-white/10" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Ruler;