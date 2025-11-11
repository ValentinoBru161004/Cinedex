import { Route, Switch } from "wouter";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Login from "./pages/Login";
import { lazy, Suspense } from "react";
import SavedMovies from "./pages/SavedMovies";
import Forum from "./pages/Forum";

const MovieDetail = lazy(() => import("./pages/MovieDetail"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const AddMovie = lazy(() => import("./pages/AddMovie"));

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-r from-[#870040] to-[#0D1B3D] text-white">
      <Navbar />

      <main className="flex-1">
        <Suspense fallback={<p className="p-4 text-center">Cargando...</p>}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/movies" component={Movies} />
            <Route path="/movies/:id" component={MovieDetail} />
            <Route path="/admin" component={AdminPanel} />
            <Route path="/add-movie" component={AddMovie} />
            <Route path="/saved" component={SavedMovies} />
            <Route path="/forum" component={Forum} />
          </Switch>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}