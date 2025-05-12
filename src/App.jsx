import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import ProductGrid from './components/ProductGrid'
import ProteinProduct from './components/ProteinProduct'
function App() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />
      <Hero />
      <ProductGrid />
      <ProteinProduct/>
      <Footer/>
    </div>
  )
}

export default App
