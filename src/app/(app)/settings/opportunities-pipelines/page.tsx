import React, { useState } from "react";

export default function OpportunitiesPipelinesPage() {
  const [tab, setTab] = useState<"opportunities" | "pipelines">("opportunities");
  const [allowDifferentOwners, setAllowDifferentOwners] = useState(true);
  const [autoOwnerToContact, setAutoOwnerToContact] = useState(true);
  const [autoContactToOwner, setAutoContactToOwner] = useState(true);

  return (
    <div className="p-6">
      {/* Título principal y tabs */}
      <div className="border-b flex items-center gap-8 mb-6">
        <span className="text-xl font-semibold py-4">Oportunidades y oportunidades</span>
        <div className="flex gap-2">
          <button
            className={`px-2 pb-2 border-b-2 ${
              tab === "opportunities"
                ? "border-blue-600 text-blue-600 font-medium"
                : "border-transparent text-gray-500"
            }`}
            onClick={() => setTab("opportunities")}
          >
            Oportunidades
          </button>
          <button
            className={`px-2 pb-2 border-b-2 ${
              tab === "pipelines"
                ? "border-blue-600 text-blue-600 font-medium"
                : "border-transparent text-gray-500"
            }`}
            onClick={() => setTab("pipelines")}
          >
            Tuberías
          </button>
        </div>
      </div>

      {/* Contenido de cada tab */}
      {tab === "opportunities" && (
        <div>
          <h1 className="text-2xl font-semibold mb-6">
            Personalizar la configuración de oportunidades
          </h1>
          <div className="bg-white rounded border shadow p-6 max-w-2xl">
            <div className="flex items-center mb-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowDifferentOwners}
                  onChange={() => setAllowDifferentOwners((v) => !v)}
                  className="peer sr-only"
                />
                <span
                  className={`w-11 h-6 flex items-center bg-gray-200 rounded-full p-1 duration-300 ease-in-out ${
                    allowDifferentOwners ? "bg-blue-600" : ""
                  }`}
                >
                  <span
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                      allowDifferentOwners ? "translate-x-5" : ""
                    }`}
                  />
                </span>
                <span className="ml-3 font-medium">
                  Permitir diferentes propietarios de Contactos y sus Oportunidades
                </span>
              </label>
            </div>
            <div className="ml-14 mb-2">
              <a href="#" className="text-blue-600 text-sm hover:underline">
                Más información sobre esta configuración.
              </a>
              <div className="text-xs text-gray-500 mt-1">
                Nota: Si la configuración está activada, los flujos de trabajo podrían dejar de asignar propietarios a las oportunidades.
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-4">
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={autoOwnerToContact}
                  onChange={() => setAutoOwnerToContact((v) => !v)}
                  className="accent-blue-600 mt-1"
                />
                <span>
                  <span className="font-medium">
                    Convertir automáticamente al propietario de la oportunidad en seguidor del contacto
                  </span>
                  <span className="ml-1 text-gray-400 cursor-pointer" title="Cuando se selecciona un nuevo propietario para una oportunidad, se agregará como seguidor del contacto de esa oportunidad.">
                    &#9432;
                  </span>
                  <div className="text-sm text-gray-500">
                    Cuando se selecciona un nuevo propietario para una oportunidad, se agregará como seguidor del contacto de esa oportunidad.
                  </div>
                </span>
              </label>
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={autoContactToOwner}
                  onChange={() => setAutoContactToOwner((v) => !v)}
                  className="accent-blue-600 mt-1"
                />
                <span>
                  <span className="font-medium">
                    Convertir automáticamente al propietario del contacto en seguidor de la oportunidad
                  </span>
                  <span className="ml-1 text-gray-400 cursor-pointer" title="Cuando se selecciona un nuevo propietario para un contacto, se agregará como seguidor a las oportunidades de ese contacto.">
                    &#9432;
                  </span>
                  <div className="text-sm text-gray-500">
                    Cuando se selecciona un nuevo propietario para un contacto, se agregará como seguidor a las oportunidades de ese contacto.
                  </div>
                </span>
              </label>
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded font-medium disabled:bg-blue-200"
                disabled
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {tab === "pipelines" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Tuberías</h2>
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded flex items-center gap-2">
              <span className="text-xl">+</span> Crear una nueva tubería
            </button>
          </div>
          <div className="text-center text-gray-500 mt-16">
            Crea tu primer pipeline.
          </div>
        </div>
      )}
    </div>
  );
}
