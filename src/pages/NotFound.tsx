import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-xl flex-col items-center gap-4 px-6 py-24 text-center">
      <h1 className="text-3xl font-bold">Página no encontrada</h1>
      <p className="text-gray-600">
        Esta sección no está disponible en la demo pública.
      </p>
      <Link to="/" className="underline">
        Volver al inicio
      </Link>
    </main>
  );
}
