import { useState } from 'react'
import './App.css'
import Layout from './components/Layout'
import Hero from './components/Hero'
import ContentForm from './components/ContentForm'



function App() {

  return (
    <>
      <Layout>
        <Hero/>
        <ContentForm />
      </Layout>

    </>
  )
}

export default App
