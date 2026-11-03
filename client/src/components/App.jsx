import { Routes, Route } from 'react-router-dom'
import React, {Fragment} from 'react'
import Header from './Header'
import Pets from '../pages/Pets'

const App = () => (
  <Fragment>
    <Header />
    <div>
      <Routes>
        <Route path="/" element={<Pets />} />
      </Routes>
    </div>
  </Fragment>
)

export default App
