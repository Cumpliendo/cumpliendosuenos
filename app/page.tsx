
'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-800 to-yellow-700">
      {/* Header */}
      <div className="fixed top-0 w-full bg-black/20 backdrop-blur-md z-50 px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-white font-pacifico text-xl">MiRifa</h1>
          <div className="flex items-center space-x-4">
            <Link href="/admin" className="text-white/80 hover:text-white text-sm">
              Admin
            </Link>
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center">
              <i className="ri-user-line text-white text-sm"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 pb-6 px-4">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            🎰 Tu Plataforma de Rifas
          </h2>
          <p className="text-white/80 text-lg mb-6">
            Compra tu número de la suerte y gana increíbles premios
          </p>
          <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-6 mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">Premio Actual</h3>
            <p className="text-4xl font-bold text-white">$50,000</p>
            <p className="text-white/90">Próximo sorteo: 15 Dic 2024</p>
          </div>
        </div>

        {/* Active Raffles */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">Rifas Activas</h3>
          <div className="space-y-4">
            <Link href="/rifa/1" className="block">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 overflow-hidden relative">
                {/* Premio Image */}
                <div className="w-full h-40 mb-4 rounded-xl overflow-hidden">
                  <img 
                    src="https://readdy.ai/api/search-image?query=Luxury%20red%20sports%20car%20BMW%20or%20Mercedes%20in%20showroom%2C%20professional%20car%20photography%2C%20glossy%20finish%2C%20premium%20vehicle%2C%20modern%20design%2C%20elegant%20lighting%2C%20showroom%20background%2C%20high-end%20automobile%2C%20sleek%20design%2C%20luxury%20lifestyle&width=350&height=200&seq=prize-car-001&orientation=landscape"
                    alt="Premio Carro"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-bold text-white">Rifa Premium #001</h4>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">Activa</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-white/60 text-sm">Premio</p>
                    <p className="text-white font-bold">BMW X3 2024</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Precio boleto</p>
                    <p className="text-white font-bold">$100</p>
                  </div>
                </div>
                <div className="bg-white/20 rounded-full h-2 mb-2">
                  <div className="bg-gradient-to-r from-red-500 to-pink-600 h-2 rounded-full" style={{width: '65%'}}></div>
                </div>
                <p className="text-white/80 text-sm">325 de 500 números vendidos</p>
              </div>
            </Link>

            <Link href="/rifa/2" className="block">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 overflow-hidden relative">
                {/* Premio Image */}
                <div className="w-full h-40 mb-4 rounded-xl overflow-hidden">
                  <img 
                    src="https://readdy.ai/api/search-image?query=Stack%20of%20cash%20money%20bills%2C%20dollars%20and%20pesos%2C%20financial%20prize%2C%20money%20reward%2C%20cash%20prize%20photography%2C%20green%20bills%2C%20professional%20money%20shot%2C%20wealth%20concept%2C%20prize%20money%2C%20financial%20reward&width=350&height=200&seq=prize-cash-002&orientation=landscape"
                    alt="Premio Efectivo"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-bold text-white">Rifa Express #002</h4>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">Activa</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-white/60 text-sm">Premio</p>
                    <p className="text-white font-bold">$25,000</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Precio boleto</p>
                    <p className="text-white font-bold">$50</p>
                  </div>
                </div>
                <div className="bg-white/20 rounded-full h-2 mb-2">
                  <div className="bg-gradient-to-r from-red-500 to-pink-600 h-2 rounded-full" style={{width: '40%'}}></div>
                </div>
                <p className="text-white/80 text-sm">200 de 500 números vendidos</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Link href="/mis-rifas" className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-6 text-center !rounded-button">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-ticket-2-line text-white text-xl"></i>
            </div>
            <p className="text-white font-bold">Mis Rifas</p>
          </Link>
          <Link href="/ganadores" className="bg-gradient-to-r from-orange-500 to-yellow-600 rounded-2xl p-6 text-center !rounded-button">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-trophy-line text-white text-xl"></i>
            </div>
            <p className="text-white font-bold">Ganadores</p>
          </Link>
        </div>

        {/* Recent Winners */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">Ganadores Recientes</h3>
          <div className="space-y-3">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center">
                    <i className="ri-user-line text-white"></i>
                  </div>
                  <div>
                    <p className="text-white font-bold">María G.</p>
                    <p className="text-white/60 text-sm">Número 0247</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">Toyota Corolla</p>
                  <p className="text-white/60 text-sm">Hace 2 días</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center">
                    <i className="ri-user-line text-white"></i>
                  </div>
                  <div>
                    <p className="text-white font-bold">Carlos R.</p>
                    <p className="text-white/60 text-sm">Número 1892</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">$5,000</p>
                  <p className="text-white/60 text-sm">Hace 5 días</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Features */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-8">
          <h3 className="text-xl font-bold text-white mb-4 text-center">🔒 Compra Segura</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="ri-shield-check-line text-red-400 text-xl"></i>
              </div>
              <p className="text-white/80 text-xs">SSL Seguro</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="ri-bank-card-line text-orange-400 text-xl"></i>
              </div>
              <p className="text-white/80 text-xs">Pago Seguro</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="ri-verified-badge-line text-yellow-400 text-xl"></i>
              </div>
              <p className="text-white/80 text-xs">Verificado</p>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-8">
          <h3 className="text-xl font-bold text-white mb-4 text-center">💬 Soporte 24/7</h3>
          <div className="space-y-3">
            <a href="mailto:soporte@mirifa.com" className="flex items-center space-x-3 bg-white/10 rounded-xl p-4">
              <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                <i className="ri-mail-line text-red-400"></i>
              </div>
              <div>
                <p className="text-white font-bold">Email</p>
                <p className="text-white/70 text-sm">soporte@mirifa.com</p>
              </div>
            </a>
            
            <a href="tel:+525512345678" className="flex items-center space-x-3 bg-white/10 rounded-xl p-4">
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                <i className="ri-phone-line text-green-400"></i>
              </div>
              <div>
                <p className="text-white font-bold">WhatsApp</p>
                <p className="text-white/70 text-sm">+52 55 1234-5678</p>
              </div>
            </a>
            
            <a href="https://wa.me/525512345678" className="flex items-center space-x-3 bg-white/10 rounded-xl p-4">
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                <i className="ri-customer-service-2-line text-blue-400"></i>
              </div>
              <div>
                <p className="text-white font-bold">Chat en Vivo</p>
                <p className="text-white/70 text-sm">Respuesta inmediata</p>
              </div>
            </a>
          </div>
          
          <div className="mt-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl p-4 border border-green-500/30">
            <div className="flex items-center space-x-2">
              <i className="ri-information-line text-green-400"></i>
              <p className="text-white/90 text-sm">
                <strong>Actualizaciones automáticas:</strong> Recibe notificaciones de compras y cambios de rifas por email y WhatsApp
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <Link href="/rifa/1" className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl !rounded-button">
        <i className="ri-add-line text-white text-2xl"></i>
      </Link>
    </div>
  );
}
