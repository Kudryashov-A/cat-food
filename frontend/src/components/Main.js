import React from 'react'
import Product from './Product.js'

const Main = (props) => {
  const { products } = props;
  return (
    <main>
      {products && products.map(product => (
        <Product product={product} key={product._id} />
      ))}
    </main>
  )
}

export default Main
