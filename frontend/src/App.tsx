import './App.css'
import { Outlet } from 'react-router'
import { Navbar } from './components/Navbar/Navbar'

function App() {

  return (
    <section>
      <Navbar />
      <main className="content">
        <Outlet />
      </main>
    </section>
  )
}

export default App
