import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SideBar from './components/SideBar'
import ContentWrapper from './components/ContentWrapper'
import ProductDetail from './components/ProductDetail'


function App() {
  return (
    <div id="wrapper">
      <BrowserRouter>
        <SideBar />
        <Routes>
          <Route path="/" element={<ContentWrapper />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App
