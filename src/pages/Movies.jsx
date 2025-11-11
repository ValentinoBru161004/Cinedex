import MovieCard from "../components/MovieCard";
import { movies } from "../data/movies";

export default function Movies() {
  return (
    <div className="min-h-screen text-white bg-linear-to-r from-[#7b002c] via-[#3b0a45] to-[#001b44] p-8">
      <div className="text-center p-10">

      <h1 className="text-4xl text-gray-00 p-2 font-bold mb-10">
        CATALOGO DE PELICULAS
      </h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}