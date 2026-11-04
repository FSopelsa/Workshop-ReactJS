import Footer from './components/Footer'
import Header from './components/Header'
import Newsletter from './components/Newsletter'
import ProductList from './components/ProductList'
import Sidebar from './components/Sidebar'
import { products } from './data/products'

export default function App() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <Sidebar />
          <ProductList title="Recommended for you" products={products} />
        </div>
      </main>
      <Newsletter />
      <Footer />
    </>
  )
}
