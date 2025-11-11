import React from "react";
import HomeCards from "../components/HomeCards";

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-[#89023E] to-[#031D44] w-full min-h-screen flex flex-col items-center">
      <div className="text-center p-10 max-w-4xl">
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <div
            aria-hidden
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '140%',
              height: '60%',
              background: '#89023E',
              filter: 'blur(40px)',
              opacity: 0.35,
              borderRadius: '40%',
              zIndex: -1,
            }}
          />
          <h1 className="text-4xl text-white p-2 font-bold mb-10">BIENVENIDOS A CINEDEX</h1>
        </div>
        <p className="text-gray-300 font-semibold">Explorá, calificá y descubrí nuevas películas.</p>
      </div>

      <HomeCards />
    </div>
  );
};

export default Home;