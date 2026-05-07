import { Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav'
import PortfolioPage from './pages/PortfolioPage'
import WellnessPage from './pages/WellnessPage'
import EdTechPage from './pages/EdTechPage'
import OAuthPage from './pages/OAuthPage'

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/portfolio" replace />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/wellness" element={<WellnessPage />} />
          <Route path="/edtech" element={<EdTechPage />} />
          <Route path="/oauth" element={<OAuthPage />} />
        </Routes>
      </main>
    </div>
  )
}
