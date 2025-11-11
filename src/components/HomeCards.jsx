import { Link } from "wouter";
import logoMovies from "../images/FondoPelis.png";
import logoForum from "../images/FondoForo.png";
import logoDashboard from "../images/FondoDashboard.png";
const Card = ({ to, img, tag, title, excerpt }) => (
  <Link href={to} className="block">
    <div className="flex gap-6 bg-[#0d1b2d] p-4 rounded-xl items-start hover:shadow-xl transition-shadow">
      <img src={img} alt={title} className="w-36 h-28 object-cover rounded-lg shrink-0" />
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs bg-indigo-700 text-white px-2 py-1 rounded-full">{tag}</span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
        <p className="text-sm text-gray-300 mb-4">{excerpt}</p>

        <div className="mt-auto flex justify-end">
          <button className="px-3 py-1 bg-indigo-600 text-sm rounded hover:bg-indigo-500 transition">Más...</button>
        </div>
      </div>
    </div>
  </Link>
);

export default function HomeCards() {
  const cards = [
    {
      to: "/movies",
      img: logoMovies,
      tag: "Películas",
      title: "Explorá el catálogo de películas",
      excerpt: "Navegá por las últimas novedades, busca por género y guarda tus favoritas.",
      author: "Equipo Cinedex",
      role: "Catálogo",
    },
    {
      to: "/forum",
      img: logoForum,
      tag: "Foro",
      title: "Debatí sobre películas",
      excerpt: "Compartí reseñas, opiniones y discutí teorías con la comunidad.",
      author: "Equipo Cinedex",
      role: "Comunidad",
    },
    {
      to: "/Dashboard",
      img: logoDashboard,
      tag: "Dashboard",
      title: "Ranking de peliculas",
      excerpt: "Un ranking actualizado de las películas más populares según las puntuaciones de los usuarios.",
      author: "Equipo Cinedex",
      role: "Comunidad",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid gap-6">
        {cards.map((c) => (
          <Card key={c.title} {...c} />
        ))}
      </div>
    </section>
  );
}
