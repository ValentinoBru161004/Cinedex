import { useState, useEffect } from "react";

export default function AdminPanel() {
  const [usersCount, setUsersCount] = useState(0);
  const [moviesCount, setMoviesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulacion de llamada a la API
    setTimeout(() => {
      setUsersCount(128);
      setMoviesCount(56);
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-xl">
        Cargando datos del panel...
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white bg-linear-to-r from-[#7b002c] via-[#3b0a45] to-[#001b44] p-8">
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-2xl p-6 text-center shadow-lg">
          <h2 className="text-lg text-gray-300">Usuarios registrados</h2>
          <p className="text-4xl font-bold mt-2">{usersCount}</p>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 text-center shadow-lg">
          <h2 className="text-lg text-gray-300">Películas cargadas</h2>
          <p className="text-4xl font-bold mt-2">{moviesCount}</p>
        </div>
      </div>

      <div className="mt-10 bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-3">Actividad reciente</h2>
        <ul className="list-disc list-inside text-gray-400 space-y-2">
          <li>Nuevo usuario registrado: @cineFan23</li>
          <li>Película agregada: “Dune: Parte Dos”</li>
          <li>Película eliminada: “Matrix Revolutions”</li>
        </ul>
      </div>
    </div>
    </div>
  );
}