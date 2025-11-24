import React from 'react';

const PitcherSelector = ({ pitchers, selectedPitcher, onSelectPitcher }) => {
  return (
    <div className="space-y-2">
      {pitchers.map((pitcher) => (
        <button
          key={pitcher.id || pitcher.name}
          onClick={() => onSelectPitcher(pitcher)}
          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
            selectedPitcher?.id === pitcher.id || selectedPitcher?.name === pitcher.name
              ? 'bg-baseball-green text-white shadow-md transform scale-105'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-medium">{pitcher.name}</span>
            {(selectedPitcher?.id === pitcher.id || selectedPitcher?.name === pitcher.name) && (
              <svg 
                className="w-5 h-5" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                  clipRule="evenodd" 
                />
              </svg>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default PitcherSelector;
