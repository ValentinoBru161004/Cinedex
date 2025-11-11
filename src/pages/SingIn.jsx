import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen text-white bg-linear-to-r from-[#7b002c] via-[#3b0a45] to-[#001b44] p-8">
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">Registrarse</h1>
      <form className="bg-gray-800 p-6 rounded-lg shadow-md w-80">
        <input
          type="text"
          placeholder="Mail "
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
          />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          />
          <input
          type="password"
          placeholder="Repita su Contraseña"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          />
        <button
          type="submit"
          className="w-full bg-[#7b002c] hover:bg-[#001b44] p-2 rounded"
          >
          Registrarse
        </button>
      </form>
    </div>
          </div>
  );
};

export default Login;