
import { Link, useLocation } from "wouter";
import logo from "../images/Cinedexlogo.png";

export default function Navbar() {
  const [location] = useLocation();

  const linkClass = (path) =>
    `px-4 py-2 rounded hover:bg-gray-700 transition ${
      location === path ? "bg-gray-800 font-bold" : ""
    }`;

  return (
    <nav className="bg-gray-900 border-b border-gray-700 p-4 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-2 select-none" style={{ textDecoration: 'none' }}>
        <img src={logo} alt="Cinedex Logo" className="h-8 w-8 object-contain" />
        <span className="text-xl font-semibold text-gray-200">Cinedex</span>
      </Link>
      <div className="flex gap-4">
        <Link href="/" className={linkClass("/")}>Inicio</Link>
        <Link href="/movies" className={linkClass("/movies")}>Películas</Link>
        <Link href="/admin" className={linkClass("/admin")}>Panel de control</Link>
        <Link href="/saved" className={linkClass("/saved")}>Ver mas tarde</Link>
        <Link href="/forum" className={linkClass("/forum")}>Foro</Link>
        <Link href="/add-movie" className={linkClass("/add-movie")}>Cargar</Link>
        <Link href="/singin" className={linkClass("/singin")}>Sing In</Link>
        <Link href="/login" className={linkClass("/login")}>Login</Link>
      </div>
    </nav>
  );
}