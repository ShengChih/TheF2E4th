import { useState } from 'react'
import styled from 'styled-components';
import { Header } from '@components/Header'
import { SearchBanner } from '@components/SearchBanner'

function App() {
  return (
    <div className="App">
      <Header />
      <SearchBanner />
      <section className="city-card"></section>
      <section className="festival-card"></section>
      <section className="festival-card"></section>
      <footer></footer>
    </div>
  )
}

export default App
