
'use client';

import { useState } from 'react';
import Link from 'next/link';
import NumberGrid from './NumberGrid';
import PaymentModal from './PaymentModal';

interface RifaDetailProps {
  rifaId: string;
}

export default function RifaDetail({ rifaId }: RifaDetailProps) {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [spinnerNumbers, setSpinnerNumbers] = useState<number[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);

  const rifaData = {
    '1': {
      name: 'Rifa Premium #001',
      prize: 'BMW X3 2024',
      prizeValue: 50000,
      ticketPrice: 100,
      totalNumbers: 500,
      soldNumbers: 325,
      endDate: '15 Dic 2024',
      description: 'Increíble SUV de lujo para el ganador afortunado',
      prizeImage: 'https://readdy.ai/api/search-image?query=Luxury%20red%20sports%20car%20BMW%20or%20Mercedes%20in%20showroom%2C%20professional%20car%20photography%2C%20glossy%20finish%2C%20premium%20vehicle%2C%20modern%20design%2C%20elegant%20lighting%2C%20showroom%20background%2C%20high-end%20automobile%2C%20sleek%20design%2C%20luxury%20lifestyle&width=350&height=200&seq=detail-car-001&orientation=landscape'
    },
    '2': {
      name: 'Rifa Express #002',
      prize: '$25,000 en efectivo',
      prizeValue: 25000,
      ticketPrice: 50,
      totalNumbers: 500,
      soldNumbers: 200,
      endDate: '20 Dic 2024',
      description: 'Gran cantidad en efectivo para cumplir tus sueños',
      prizeImage: 'https://readdy.ai/api/search-image?query=Stack%20of%20cash%20money%20bills%2C%20dollars%20and%20pesos%2C%20financial%20prize%2C%20money%20reward%2C%20cash%20prize%20photography%2C%20green%20bills%2C%20professional%20money%20shot%2C%20wealth%20concept%2C%20prize%20money%2C%20financial%20reward&width=350&height=200&seq=detail-cash-002&orientation=landscape'
    }
  };

  const rifa = rifaData[rifaId as keyof typeof rifaData] || rifaData['1'];

  const handleNumberSelect = (number: number) => {
    setSelectedNumbers(prev => 
      prev.includes(number) 
        ? prev.filter(n => n !== number)
        : [...prev, number]
    );
  };

  const handlePurchase = () => {
    if (selectedNumbers.length > 0) {
      setShowPayment(true);
    }
  };

  const generateRandomNumbers = (quantity: number) => {
    const soldNumbers = [45, 123, 234, 345, 456, 12, 89, 156, 289, 367];
    const availableNumbers = Array.from({ length: rifa.totalNumbers }, (_, i) => i + 1)
      .filter(num => !soldNumbers.includes(num));
    
    const randomNumbers = [];
    const shuffled = [...availableNumbers].sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < Math.min(quantity, shuffled.length); i++) {
      randomNumbers.push(shuffled[i]);
    }
    
    return randomNumbers.sort((a, b) => a - b);
  };

  const startSpinner = (quantity: number) => {
    setShowSpinner(true);
    setIsSpinning(true);
    setSpinnerNumbers([]);
    
    // Simular la ruleta girando
    const spinDuration = 3000; // 3 segundos
    const intervalTime = 100;
    const totalSteps = spinDuration / intervalTime;
    let currentStep = 0;
    
    const spinInterval = setInterval(() => {
      // Generar números aleatorios para mostrar durante el giro
      const tempNumbers = [];
      for (let i = 0; i < quantity; i++) {
        tempNumbers.push(Math.floor(Math.random() * rifa.totalNumbers) + 1);
      }
      setSpinnerNumbers(tempNumbers);
      
      currentStep++;
      
      if (currentStep >= totalSteps) {
        clearInterval(spinInterval);
        setIsSpinning(false);
        
        // Generar los números finales
        const finalNumbers = generateRandomNumbers(quantity);
        setSpinnerNumbers(finalNumbers);
        
        // Después de 2 segundos, aplicar la selección
        setTimeout(() => {
          setSelectedNumbers(finalNumbers);
          setShowSpinner(false);
        }, 2000);
      }
    }, intervalTime);
  };

  const handleQuantitySelection = (quantity: number) => {
    setShowQuantitySelector(false);
    startSpinner(quantity);
  };

  const totalAmount = selectedNumbers.length * rifa.ticketPrice;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-800 to-yellow-700">
      {/* Header */}
      <div className="fixed top-0 w-full bg-black/20 backdrop-blur-md z-50 px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <i className="ri-arrow-left-line text-white"></i>
          </Link>
          <h1 className="text-white font-bold">{rifa.name}</h1>
          <div className="w-8 h-8"></div>
        </div>
      </div>

      <div className="pt-20 pb-24 px-4">
        {/* Prize Image */}
        <div className="w-full h-48 mb-6 rounded-2xl overflow-hidden">
          <img 
            src={rifa.prizeImage}
            alt={rifa.prize}
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Rifa Info */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-6">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-white mb-2">Premio Principal</h2>
            <p className="text-3xl font-bold text-red-300">{rifa.prize}</p>
            <p className="text-white/80 mt-2">{rifa.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <p className="text-white/60 text-sm">Precio por número</p>
              <p className="text-white font-bold text-xl">${rifa.ticketPrice}</p>
            </div>
            <div className="text-center">
              <p className="text-white/60 text-sm">Sorteo</p>
              <p className="text-white font-bold text-xl">{rifa.endDate}</p>
            </div>
          </div>

          <div className="bg-white/20 rounded-full h-3 mb-2">
            <div 
              className="bg-gradient-to-r from-red-500 to-pink-600 h-3 rounded-full" 
              style={{width: `${(rifa.soldNumbers / rifa.totalNumbers) * 100}%`}}
            ></div>
          </div>
          <p className="text-white/80 text-center">
            {rifa.soldNumbers} de {rifa.totalNumbers} números vendidos
          </p>
        </div>

        {/* Selected Numbers Summary */}
        {selectedNumbers.length > 0 && (
          <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Números seleccionados</p>
                <p className="text-white font-bold text-lg">{selectedNumbers.length}</p>
              </div>
              <div className="text-right">
                <p className="text-white/80 text-sm">Total a pagar</p>
                <p className="text-white font-bold text-lg">${totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}

        {/* Number Grid */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-4">Selecciona tus números de la suerte</h3>
          <NumberGrid
            totalNumbers={rifa.totalNumbers}
            soldNumbers={[45, 123, 234, 345, 456, 12, 89, 156, 289, 367]}
            selectedNumbers={selectedNumbers}
            onNumberSelect={handleNumberSelect}
          />
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => setShowQuantitySelector(true)}
            className="w-full bg-white/20 backdrop-blur-md border border-white/30 text-white py-4 rounded-2xl font-bold !rounded-button"
          >
            🎰 Ruleta de la Suerte - Números Aleatorios
          </button>

          <button
            onClick={handlePurchase}
            disabled={selectedNumbers.length === 0}
            className={`w-full py-4 rounded-2xl font-bold text-lg !rounded-button ${
              selectedNumbers.length > 0
                ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
                : 'bg-gray-500 text-gray-300 cursor-not-allowed'
            }`}
          >
            {selectedNumbers.length > 0 
              ? `Comprar por $${totalAmount.toLocaleString()}`
              : 'Selecciona números para comprar'
            }
          </button>
        </div>
      </div>

      {/* Quantity Selector Modal */}
      {showQuantitySelector && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">🎲 Ruleta de la Suerte</h3>
              <p className="text-gray-600">¿Cuántos números quieres que la ruleta seleccione?</p>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[1, 3, 5, 10, 15, 20].map(qty => (
                <button
                  key={qty}
                  onClick={() => handleQuantitySelection(qty)}
                  className="bg-gradient-to-r from-red-500 to-pink-600 text-white py-4 rounded-2xl font-bold text-lg !rounded-button hover:from-red-600 hover:to-pink-700 transform hover:scale-105 transition-all"
                >
                  {qty}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setShowQuantitySelector(false)}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-2xl font-bold !rounded-button"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Spinner Modal */}
      {showSpinner && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-8 text-center">
            <div className="mb-6">
              <div className="w-32 h-32 mx-auto mb-4 relative">
                <div className={`w-full h-full border-8 border-gradient-to-r from-red-500 to-pink-600 rounded-full ${isSpinning ? 'animate-spin' : ''}`}>
                  <div className="w-full h-full bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center">
                    <i className="ri-coin-line text-white text-4xl"></i>
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {isSpinning ? '🎰 Girando la Ruleta...' : '🎉 ¡Números Ganadores!'}
              </h3>
              
              {spinnerNumbers.length > 0 && (
                <div className="bg-gradient-to-r from-red-100 to-pink-100 rounded-2xl p-4 mb-4">
                  <p className="text-gray-600 text-sm mb-2">Tus números de la suerte:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {spinnerNumbers.map((num, index) => (
                      <span
                        key={index}
                        className={`px-3 py-2 rounded-full font-bold text-white text-lg ${
                          isSpinning 
                            ? 'bg-gray-400 animate-pulse' 
                            : 'bg-gradient-to-r from-red-500 to-pink-600'
                        }`}
                      >
                        {num.toString().padStart(4, '0')}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {isSpinning && (
                <p className="text-gray-500 text-sm animate-pulse">
                  La suerte está decidiendo tus números...
                </p>
              )}
              
              {!isSpinning && spinnerNumbers.length > 0 && (
                <p className="text-green-600 font-bold">
                  ¡Números seleccionados! Se aplicarán automáticamente
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPayment && (
        <PaymentModal
          selectedNumbers={selectedNumbers}
          totalAmount={totalAmount}
          rifaName={rifa.name}
          onClose={() => setShowPayment(false)}
        />
      )}
    </div>
  );
}
