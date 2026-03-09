import React, { useEffect, useState } from 'react'
import Car from './components/Car'

const App = () => {
  const [cars, setCars] = useState([])
  useEffect(() => {
    fetch('/api/v1/cars/')
      .then(res => res.json())
      .then(data => setCars(data.data))
  }, [])
  return (
    <div>
      <h3>Welcome to Cars Store !!</h3>
      <ul>
        {cars.map((car) =>
          <Car key={car.id} data={car} />
        )}
      </ul>
    </div>
  )
}

export default App