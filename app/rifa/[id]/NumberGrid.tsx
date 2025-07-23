
'use client';

interface NumberGridProps {
  totalNumbers: number;
  soldNumbers: number[];
  selectedNumbers: number[];
  onNumberSelect: (number: number) => void;
}

export default function NumberGrid({ 
  totalNumbers, 
  soldNumbers, 
  selectedNumbers, 
  onNumberSelect 
}: NumberGridProps) {
  const numbers = Array.from({ length: totalNumbers }, (_, i) => i + 1);

  const getNumberStatus = (number: number) => {
    if (soldNumbers.includes(number)) return 'sold';
    if (selectedNumbers.includes(number)) return 'selected';
    return 'available';
  };

  const getNumberStyle = (status: string) => {
    switch (status) {
      case 'sold':
        return 'bg-red-500/30 border-red-500/50 text-red-300 cursor-not-allowed';
      case 'selected':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500 border-yellow-400 text-black font-bold';
      case 'available':
      default:
        return 'bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50';
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-white/10 border border-white/30 rounded"></div>
            <span className="text-white/80">Disponible</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded"></div>
            <span className="text-white/80">Seleccionado</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500/30 border border-red-500/50 rounded"></div>
            <span className="text-white/80">Vendido</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-8 gap-2 max-h-96 overflow-y-auto">
        {numbers.map(number => {
          const status = getNumberStatus(number);
          const formattedNumber = number.toString().padStart(4, '0');
          
          return (
            <button
              key={number}
              onClick={() => status === 'available' || status === 'selected' ? onNumberSelect(number) : null}
              className={`aspect-square border rounded-lg flex items-center justify-center text-xs font-mono transition-all duration-200 ${getNumberStyle(status)}`}
              disabled={status === 'sold'}
            >
              {formattedNumber}
            </button>
          );
        })}
      </div>

      <div className="mt-4 text-center">
        <p className="text-white/60 text-sm">
          Números seleccionados: {selectedNumbers.length}
        </p>
      </div>
    </div>
  );
}
