import { movies } from "../data/movies";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

export default function SavedMovies() {
  const [savedIds, setSavedIds] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem("savedMovies");
    setSavedIds(raw ? JSON.parse(raw) : []);
  }, []);

  function remove(id) {
    const next = savedIds.filter((s) => s !== id);
    setSavedIds(next);
    localStorage.setItem("savedMovies", JSON.stringify(next));
  }

  const savedList = movies.filter((m) => savedIds.includes(m.id));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Películas guardadas</h2>
      {savedList.length === 0 ? (
        <p className="text-gray-300">No tienes películas guardadas.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {savedList.map((m) => (
            <div key={m.id} className="max-w-sm mx-auto">
              <MovieCard movie={m} compact={true} disableLink={true}>
                <button
                  onClick={() => remove(m.id)}
                  className="px-3 py-1 bg-[#89023E] text-white rounded-md text-sm"
                >
                  Eliminar
                </button>
              </MovieCard>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
