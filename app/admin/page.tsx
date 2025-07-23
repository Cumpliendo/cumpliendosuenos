
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('rifas');
  const [showCreateRifa, setShowCreateRifa] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [notifications, setNotifications] = useState<string[]>([]);
  const [newRifa, setNewRifa] = useState({
    name: '',
    prize: '',
    ticketPrice: '',
    totalNumbers: '',
    endDate: '',
    description: '',
    prizeImage: ''
  });

  const [rifas] = useState([
    {
      id: 1,
      name: 'Rifa Premium #001',
      prize: 'BMW X3 2024',
      prizeValue: 50000,
      ticketPrice: 100,
      totalNumbers: 500,
      soldNumbers: 325,
      endDate: '2024-12-15',
      status: 'Activa',
      prizeImage: 'https://readdy.ai/api/search-image?query=Luxury%20red%20sports%20car%20BMW%20or%20Mercedes%20in%20showroom%2C%20professional%20car%20photography%2C%20glossy%20finish%2C%20premium%20vehicle%2C%20modern%20design%2C%20elegant%20lighting%2C%20showroom%20background%2C%20high-end%20automobile%2C%20sleek%20design%2C%20luxury%20lifestyle&width=200&height=120&seq=admin-car-001&orientation=landscape'
    },
    {
      id: 2,
      name: 'Rifa Express #002',
      prize: '$25,000 en efectivo',
      prizeValue: 25000,
      ticketPrice: 50,
      totalNumbers: 500,
      soldNumbers: 200,
      endDate: '2024-12-20',
      status: 'Activa',
      prizeImage: 'https://readdy.ai/api/search-image?query=Stack%20of%20cash%20money%20bills%2C%20dollars%20and%20pesos%2C%20financial%20prize%2C%20money%20reward%2C%20cash%20prize%20photography%2C%20green%20bills%2C%20professional%20money%20shot%2C%20wealth%20concept%2C%20prize%20money%2C%20financial%20reward&width=200&height=120&seq=admin-cash-002&orientation=landscape'
    }
  ]);

  useEffect(() => {
    const checkSalesAndNotify = () => {
      rifas.forEach(rifa => {
        const percentage = (rifa.soldNumbers / rifa.totalNumbers) * 100;

        if (percentage >= 25 && percentage < 26) {
          const message = `🎯 ${rifa.name} ha alcanzado el 25% de ventas (${rifa.soldNumbers}/${rifa.totalNumbers})`;
          setAlertMessage(message);
          setShowAlert(true);

          sendNotification('email', 'soporte@mirifa.com', message);
          sendNotification('whatsapp', '+525512345678', message);

          setTimeout(() => setShowAlert(false), 5000);
        }

        if (percentage >= 50 && percentage < 51) {
          const message = `🔥 ${rifa.name} ha alcanzado el 50% de ventas (${rifa.soldNumbers}/${rifa.totalNumbers})`;
          setAlertMessage(message);
          setShowAlert(true);
          sendNotification('email', 'soporte@mirifa.com', message);
          sendNotification('whatsapp', '+525512345678', message);
          setTimeout(() => setShowAlert(false), 5000);
        }

        if (percentage >= 75 && percentage < 76) {
          const message = `⚡ ${rifa.name} ha alcanzado el 75% de ventas (${rifa.soldNumbers}/${rifa.totalNumbers})`;
          setAlertMessage(message);
          setShowAlert(true);
          sendNotification('email', 'soporte@mirifa.com', message);
          sendNotification('whatsapp', '+525512345678', message);
          setTimeout(() => setShowAlert(false), 5000);
        }

        if (percentage >= 90 && percentage < 91) {
          const message = `🚀 ${rifa.name} casi agotada! 90% vendido (${rifa.soldNumbers}/${rifa.totalNumbers})`;
          setAlertMessage(message);
          setShowAlert(true);
          sendNotification('email', 'soporte@mirifa.com', message);
          sendNotification('whatsapp', '+525512345678', message);
          setTimeout(() => setShowAlert(false), 5000);
        }
      });
    };

    const interval = setInterval(checkSalesAndNotify, 10000);
    return () => clearInterval(interval);
  }, [rifas]);

  const sendNotification = (type: string, contact: string, message: string) => {
    const notification = `${new Date().toLocaleTimeString()}: Enviado por ${type} a ${contact} - ${message}`;
    setNotifications(prev => [notification, ...prev.slice(0, 9)]);
  };

  useEffect(() => {
    const simulatePurchases = () => {
      const purchases = [
        'Nueva compra: María González - 2 números - $200',
        'Nueva compra: Carlos Rodríguez - 3 números - $150',
        'Nueva compra: Ana López - 1 número - $100',
        'Nueva compra: José Martínez - 5 números - $500'
      ];

      const randomPurchase = purchases[Math.floor(Math.random() * purchases.length)];
      sendNotification('email', 'soporte@mirifa.com', randomPurchase);
      sendNotification('whatsapp', '+525512345678', randomPurchase);
    };

    const interval = setInterval(simulatePurchases, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleCreateRifa = () => {
    if (!newRifa.name || !newRifa.prize || !newRifa.ticketPrice || !newRifa.totalNumbers) {
      setAlertMessage('❌ Por favor completa todos los campos obligatorios');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    console.log('Nueva rifa creada:', newRifa);
    setShowCreateRifa(false);
    setNewRifa({
      name: '',
      prize: '',
      ticketPrice: '',
      totalNumbers: '',
      endDate: '',
      description: '',
      prizeImage: ''
    });

    const successMessage = '✅ Rifa creada exitosamente';
    setAlertMessage(successMessage);
    setShowAlert(true);

    sendNotification('email', 'soporte@mirifa.com', `Nueva rifa creada: ${newRifa.name}`);
    sendNotification('whatsapp', '+525512345678', `Nueva rifa creada: ${newRifa.name}`);

    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-800 to-yellow-700">
      {/* Header */}
      <div className="fixed top-0 w-full bg-black/20 backdrop-blur-md z-50 px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <i className="ri-arrow-left-line text-white"></i>
          </Link>
          <h1 className="text-white font-bold">Panel de Administración</h1>
          <div className="w-8 h-8"></div>
        </div>
      </div>

      {/* Alert Notification */}
      {showAlert && (
        <div className="fixed top-20 left-4 right-4 bg-gradient-to-r from-red-500 to-pink-600 text-white p-4 rounded-2xl shadow-2xl z-40 border border-white/20">
          <div className="flex items-center justify-between">
            <p className="font-bold text-sm">{alertMessage}</p>
            <button
              onClick={() => setShowAlert(false)}
              className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center"
            >
              <i className="ri-close-line text-white text-sm"></i>
            </button>
          </div>
        </div>
      )}

      <div className="pt-20 pb-6 px-4">
        {/* Contact Info Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-6">
          <h3 className="text-xl font-bold text-white mb-4 text-center">📞 Información de Contacto</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-white/10 rounded-xl p-3">
              <div className="flex items-center space-x-3">
                <i className="ri-mail-line text-red-400 text-xl"></i>
                <span className="text-white font-bold">Email Soporte</span>
              </div>
              <span className="text-white/80 text-sm">soporte@mirifa.com</span>
            </div>

            <div className="flex items-center justify-between bg-white/10 rounded-xl p-3">
              <div className="flex items-center space-x-3">
                <i className="ri-phone-line text-green-400 text-xl"></i>
                <span className="text-white font-bold">WhatsApp</span>
              </div>
              <span className="text-white/80 text-sm">+52 55 1234-5678</span>
            </div>

            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl p-3 border border-green-500/30">
              <p className="text-white/90 text-sm text-center">
                <strong>✅ Sistema activo:</strong> Todas las compras y actualizaciones se envían automáticamente
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
            <div className="text-center">
              <p className="text-white/60 text-sm">Rifas Activas</p>
              <p className="text-white font-bold text-2xl">2</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
            <div className="text-center">
              <p className="text-white/60 text-sm">Ventas Totales</p>
              <p className="text-white font-bold text-2xl">$52,500</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 mb-6 border border-white/20">
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => setActiveTab('rifas')}
              className={`py-3 rounded-xl font-bold text-xs ${
                activeTab === 'rifas'
                  ? 'bg-white text-gray-900'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Rifas
            </button>
            <button
              onClick={() => setActiveTab('ventas')}
              className={`py-3 rounded-xl font-bold text-xs ${
                activeTab === 'ventas'
                  ? 'bg-white text-gray-900'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Ventas
            </button>
            <button
              onClick={() => setActiveTab('sorteos')}
              className={`py-3 rounded-xl font-bold text-xs ${
                activeTab === 'sorteos'
                  ? 'bg-white text-gray-900'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Sorteos
            </button>
            <button
              onClick={() => setActiveTab('notificaciones')}
              className={`py-3 rounded-xl font-bold text-xs ${
                activeTab === 'notificaciones'
                  ? 'bg-white text-gray-900'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Alertas
            </button>
          </div>
        </div>

        {/* Notificaciones Tab */}
        {activeTab === 'notificaciones' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">Historial de Notificaciones</h2>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-bold mb-4">Notificaciones Automáticas Enviadas</h3>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <div key={index} className="bg-white/10 rounded-xl p-3 border-l-4 border-green-500">
                      <p className="text-white/90 text-sm">{notification}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-white/60 text-center py-8">No hay notificaciones aún</p>
                )}
              </div>

              <div className="mt-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-4 border border-blue-500/30">
                <div className="flex items-center space-x-2">
                  <i className="ri-notification-3-line text-blue-400"></i>
                  <p className="text-white/90 text-sm">
                    <strong>Sistema automático activo:</strong> Se envían notificaciones instantáneas por email y WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rifas Tab */}
        {activeTab === 'rifas' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Gestión de Rifas</h2>
              <button
                onClick={() => setShowCreateRifa(true)}
                className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-xl font-bold !rounded-button"
              >
                + Nueva Rifa
              </button>
            </div>

            <div className="space-y-4">
              {rifas.map(rifa => (
                <div key={rifa.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  {/* Prize Image */}
                  <div className="w-full h-32 mb-4 rounded-xl overflow-hidden">
                    <img
                      src={rifa.prizeImage}
                      alt={rifa.prize}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-white font-bold text-lg">{rifa.name}</h3>
                      <p className="text-white/60">Premio: {rifa.prize}</p>
                    </div>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                      {rifa.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-white/60 text-sm">Precio boleto</p>
                      <p className="text-white font-bold">${rifa.ticketPrice}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Vendidos</p>
                      <p className="text-white font-bold">{rifa.soldNumbers}/{rifa.totalNumbers}</p>
                    </div>
                  </div>

                  <div className="bg-white/20 rounded-full h-2 mb-4">
                    <div
                      className="bg-gradient-to-r from-red-500 to-pink-600 h-2 rounded-full"
                      style={{ width: `${(rifa.soldNumbers / rifa.totalNumbers) * 100}%` }}
                    ></div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-orange-500 text-white py-2 rounded-xl font-bold !rounded-button">
                      Editar
                    </button>
                    <button className="flex-1 bg-yellow-600 text-white py-2 rounded-xl font-bold !rounded-button">
                      Finalizar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ventas Tab */}
        {activeTab === 'ventas' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">Reporte de Ventas</h2>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-bold mb-4">Ventas Recientes</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <div>
                    <p className="text-white font-bold">María González</p>
                    <p className="text-white/60 text-sm">Rifa Premium #001 - Números: 0123, 0456</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">$200</p>
                    <p className="text-white/60 text-sm">Hace 2 horas</p>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <div>
                    <p className="text-white font-bold">Carlos Rodríguez</p>
                    <p className="text-white/60 text-sm">Rifa Express #002 - Números: 0089, 0234, 0567</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">$150</p>
                    <p className="text-white/60 text-sm">Hace 5 horas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sorteos Tab */}
        {activeTab === 'sorteos' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">Control de Sorteos</h2>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-bold mb-4">Próximos Sorteos</h3>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-bold">Rifa Premium #001</p>
                      <p className="text-white/60 text-sm">15 Dic 2024 - 8:00 PM</p>
                    </div>
                    <button className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-xl font-bold !rounded-button">
                      Realizar Sorteo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Rifa Modal */}
      {showCreateRifa && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
          <div className="w-full bg-white rounded-t-3xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Nueva Rifa</h2>
              <button
                onClick={() => setShowCreateRifa(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4" style={{ maxHeight: 'calc(90vh - 160px)' }}>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Nombre de la rifa *
                </label>
                <input
                  type="text"
                  value={newRifa.name}
                  onChange={(e) => setNewRifa((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Ej: Rifa Navideña #003"
                  className="w-full p-4 border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Descripción del premio *
                </label>
                <input
                  type="text"
                  value={newRifa.prize}
                  onChange={(e) => setNewRifa((prev) => ({ ...prev, prize: e.target.value }))}
                  placeholder="Ej: iPhone 15 Pro Max, Toyota Camry 2024, $50,000 en efectivo"
                  className="w-full p-4 border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  URL de la imagen del premio
                </label>
                <input
                  type="text"
                  value={newRifa.prizeImage}
                  onChange={(e) => setNewRifa((prev) => ({ ...prev, prizeImage: e.target.value }))}
                  placeholder="https://ejemplo.com/imagen-del-premio.jpg"
                  className="w-full p-4 border border-gray-300 rounded-xl"
                />
                <p className="text-gray-500 text-xs mt-1">Opcional: Agrega una foto del premio para mayor atractivo</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Precio por boleto *
                </label>
                <input
                  type="number"
                  value={newRifa.ticketPrice}
                  onChange={(e) => setNewRifa((prev) => ({ ...prev, ticketPrice: e.target.value }))}
                  placeholder="100"
                  className="w-full p-4 border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Total de números *
                </label>
                <input
                  type="number"
                  value={newRifa.totalNumbers}
                  onChange={(e) => setNewRifa((prev) => ({ ...prev, totalNumbers: e.target.value }))}
                  placeholder="500"
                  className="w-full p-4 border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Fecha del sorteo
                </label>
                <input
                  type="date"
                  value={newRifa.endDate}
                  onChange={(e) => setNewRifa((prev) => ({ ...prev, endDate: e.target.value }))}
                  className="w-full p-4 border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Descripción adicional
                </label>
                <textarea
                  value={newRifa.description}
                  onChange={(e) => setNewRifa((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Descripción detallada de la rifa..."
                  rows={3}
                  maxLength={500}
                  className="w-full p-4 border border-gray-300 rounded-xl resize-none"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200">
              <button
                onClick={handleCreateRifa}
                className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-4 rounded-2xl font-bold !rounded-button"
              >
                Crear Rifa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
