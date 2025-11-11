import { useState, useEffect } from "react";
import { useParams } from "wouter";
import { movies } from "../data/movies";

export default function MovieDetail() {
  const { id } = useParams();
  const movie = movies.find((m) => String(m.id) === String(id));

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [saved, setSaved] = useState(false);

  // cargar puntuación existente
  useEffect(() => {
    try {
      const raw = localStorage.getItem("ratings");
      const obj = raw ? JSON.parse(raw) : {};
      if (movie && obj && obj[movie.id]) {
        setRating(obj[movie.id]);
      }
    } catch {
      // ignore
    }
  }, [movie]);

  // guardar puntuación cuando cambie
  useEffect(() => {
    try {
      if (!movie) return;
      const raw = localStorage.getItem("ratings");
      const obj = raw ? JSON.parse(raw) : {};
      obj[movie.id] = rating;
      localStorage.setItem("ratings", JSON.stringify(obj));
    } catch {
      // ignore
    }
  }, [rating, movie]);

  const handleSave = () => setSaved(true);

  return (
    <div className="min-h-screen bg-linear-to-r from-[#8A0030] via-[#4B0B3E] to-[#021E47] text-gray-100 flex flex-col items-center py-10 px-4">
      <div className="max-w-3xl w-full bg-gray-900 rounded-2xl shadow-2xl p-6 flex flex-col md:flex-row gap-6">
        {movie ? (
          <>
            <img
              src={movie.poster_path}
              alt={movie.title}
              className="w-full md:w-1/3 rounded-xl shadow-lg object-cover"
            />

            <div className="flex flex-col gap-4 w-full">
              <h1 className="text-3xl font-bold">{movie.title}</h1>
              <p className="text-gray-300">{movie.description}</p>

              <div className="mt-2">
                <p className="font-semibold mb-2">Tu puntuación:</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setRating(star)}
                      className={`cursor-pointer text-3xl transition ${
                        rating >= star ? "text-yellow-400" : "text-gray-500"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <p className="font-semibold mb-2">Dejá tu reseña:</p>
                <textarea
                  className="w-full bg-gray-800 p-3 rounded-lg text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-600"
                  rows="4"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Escribí tu opinión sobre la película..."
                />
              </div>

              <button
                onClick={handleSave}
                disabled={saved}
                className={`mt-4 py-2 px-4 rounded-lg font-semibold transition ${
                  saved
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-pink-700 hover:bg-pink-800 text-white"
                }`}
              >
                {saved ? "Guardada en tu lista" : "Guardar en mi lista"}
              </button>
            </div>
          </>
        ) : (
          <div className="w-full">
            <h2 className="text-2xl font-bold">Película no encontrada</h2>
            <p className="text-gray-400">No hay datos para la película con id «{id}».</p>
          </div>
        )}
      </div>
    </div>
  );
}
