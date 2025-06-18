import { Navigate, Route, Routes } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import Smartphones from "./pages/Smartphones"
import Smartphone from "./pages/Smartphone"
import NotFound from "./pages/NotFound"
import Compara from "./pages/Compara"
import Homepage from "./pages/Homepage"
import { FavProvider } from "./context/FavContext"
import { GlobalProvider } from "./context/GlobalContext"

export default function App() {
  return (
    <GlobalProvider>
      <FavProvider>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Navigate to="/homepage" replace />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/smartphones" element={<Smartphones />} />
            <Route path="/smartphone/:id" element={<Smartphone />} />
            <Route path="/compare" element={<Compara />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </FavProvider>
    </GlobalProvider>
  )
}