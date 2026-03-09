import React from 'react'

const Car = ({ data }) => {
  return (
    <li>
      <p>Brand : {data.brand}</p>
      <p>Model : {data.model}</p>
      {/* <p>Year : {data.year}</p> */}
      <p>Manufactured : {data.manufactured}</p>
      <p>Price : {data.price}</p>
    </li>
  )
}

export default Car
