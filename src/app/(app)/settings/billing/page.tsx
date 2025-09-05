export default function BillingPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-6">Panel de facturación</h1>
      <div className="bg-white rounded-xl shadow-sm p-12 flex flex-col items-center max-w-4xl mx-auto">
        {/* Imagen de pago */}
        <svg width="160" height="120" viewBox="0 0 160 120" fill="none" className="mb-6">
          <rect x="20" y="30" width="120" height="60" rx="6" fill="#F3F4F6" />
          <rect x="30" y="40" width="100" height="40" rx="4" fill="#fff" stroke="#D1D5DB" />
          <rect x="40" y="55" width="40" height="8" rx="2" fill="#E5E7EB" />
          <rect x="90" y="55" width="20" height="8" rx="2" fill="#E5E7EB" />
          <rect x="60" y="45" width="40" height="6" rx="2" fill="#E0E7FF" />
          <rect x="70" y="70" width="20" height="6" rx="2" fill="#E5E7EB" />
          <rect x="60" y="35" width="40" height="10" rx="2" fill="#3B82F6" />
          <text x="80" y="43" textAnchor="middle" fontSize="12" fill="#fff" fontWeight="bold">PAYMENT</text>
          {/* Mano y tarjeta */}
          <rect x="85" y="60" width="30" height="18" rx="3" fill="#fff" stroke="#D1D5DB" />
          <rect x="95" y="65" width="10" height="6" rx="1" fill="#60A5FA" />
          <rect x="100" y="70" width="6" height="2" rx="1" fill="#E5E7EB" />
          <path d="M110 78 Q112 90 100 90 Q98 90 98 78" fill="#111827" />
        </svg>
        {/* Texto principal */}
        <h2 className="text-lg font-semibold text-center mb-1">Método de pago no añadido</h2>
        <p className="text-center text-muted-foreground mb-6">
          Se requiere un método de pago para administrar las suscripciones y la billetera de esta cuenta.
        </p>
        {/* Botón */}
        <button
          type="button"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg mb-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="2" y="7" width="20" height="10" rx="2" stroke="currentColor" />
            <path d="M2 11h20" stroke="currentColor" />
            <path d="M7 15h.01" stroke="currentColor" />
          </svg>
          Agregar método de pago
        </button>
        {/* Alerta */}
        <div className="relative bg-orange-50 border border-orange-200 rounded-lg p-4 max-w-xl w-full flex flex-col mt-2">
          <div className="flex items-center mb-2">
            <svg className="w-5 h-5 text-orange-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 9v2m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z" stroke="currentColor" />
            </svg>
            <span className="font-semibold text-orange-700">¡No agregue su propia tarjeta a las subcuentas!</span>
            <span className="ml-auto flex items-center text-xs text-orange-500 bg-orange-100 px-2 py-0.5 rounded-full">
              Sólo visible para ti
            </span>
          </div>
          <p className="text-orange-700 text-sm">
            Por favor, agregue la tarjeta de su cliente (subcuenta), no la suya, ya que esta se usará para facturar a su cliente en su nombre. Los fondos se depositarán en su cuenta.
          </p>
        </div>
      </div>
  </div>
  );
}