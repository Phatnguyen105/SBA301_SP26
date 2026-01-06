import './App.css'
import Header from './Components/Header'
import Footer from './Components/Footer'

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-fill py-4">
        <div className="container text-center">
          <h1>WELCOME TO MY WEBSITE</h1>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App