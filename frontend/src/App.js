import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/Header.js'
import Main from './components/Main.js'

function App() {

  const [products, setProducts] = useState()
  const baseUrl = process.env.NODE_ENV === 'development' ? "http://localhost:4444/" : window.location;
  const screenWidth = window.screen.width
  const bgGradient = "linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 5e-05) 49.88%, rgba(0, 0, 0, 0.5) 100%)"
  document.body.style.backgroundImage = screenWidth <= 1280
    ? bgGradient + ", url(" + baseUrl + "images/pattern.png)"
    : bgGradient + ", url(" + baseUrl + "images/pattern@2x.png)"

  useEffect(() => {
    axios.get(baseUrl + 'data').then(res => {
      setProducts(res.data)
    })
  }, [])

  return (
    <div className='flex-container'>
      <Header />
      <Main products={products} />
    </div>
  );
}

export default App
