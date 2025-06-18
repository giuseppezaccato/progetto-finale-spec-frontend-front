
function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
            <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
            <p className="text-2xl text-gray-700 mb-6">Pagina Non Trovata</p>
            <p className="text-lg text-gray-600 mb-8">
                Spiacenti, la pagina che stai cercando non esiste.
            </p>
            <Link to="/" className="btn btn-primary text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300">
                Torna alla Home
            </Link>
        </div>
    );
}

export default NotFound;