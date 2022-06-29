import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Product = (props) => {
  const { product } = props
  const [selected, setSelected] = useState(false)
  const [description, setDescription] = useState('')

  let disabled = !product.stock_count

  useEffect(() => {
    if (selected && !disabled) {
      setDescription(product.description)
      document.querySelector('#product_' + product._id).classList.add('selected')
    }
    if (!selected && !disabled) {
      setDescription(<>Чего сидишь? Порадуй котэ, <Link to="#" onClick={() => setSelected(!selected)}> купи</Link></>)
      document.querySelector('#product_' + product._id).classList.remove('selected')
      document.querySelector('#product_' + product._id + ' .product__main__header').classList.remove('header_selected_hover')
      document.querySelector('#product_' + product._id + ' .product__main__header').textContent = product.header
    }
    if (disabled) {
      setDescription(<>Печалька, {product.taste} закончился</>)
      document.querySelector('#product_' + product._id).classList.add('disabled')
    }
  }, [selected])

  const mouseMoveHandler = (event) => {
    if (selected && event.type === 'mouseover' && event.target.className === 'product__main__mask') {
      document.querySelector('#product_' + product._id + ' .product__main__header').classList.add('header_selected_hover')
      document.querySelector('#product_' + product._id + ' .product__main__header').textContent = 'Котэ не одобряет?'
    }
    if (event.type === 'mouseout' && event.target.className === 'product__main__mask') {
      document.querySelector('#product_' + product._id + ' .product__main__header').classList.remove('header_selected_hover')
      document.querySelector('#product_' + product._id + ' .product__main__header').textContent = product.header
    }
  }

  const selectProductHandler = () => {
    if (!disabled) setSelected(!selected)
  }

  return (
    <>
      <div className="product" id={'product_' + product._id}>
        <div className="product__main" onClick={() => selectProductHandler()} onMouseOver={(event) => mouseMoveHandler(event)} onMouseOut={(event) => mouseMoveHandler(event)}>
          <div className="product__main__header">{product.header}</div>
          <h3>{product.brand}</h3>
          <h4>{product.taste}</h4>
          <div className="product__main__add">
            <div>
              <span>{product.portion_count}</span>
              {(product.portion_count % 10 === 1 && product.portion_count !== 11
                ? ' порция' : (product.portion_count >= 2 && product.portion_count <= 4) || ((product.portion_count % 10 === 2 || product.portion_count % 10 === 3 || product.portion_count % 10 === 4) && product.portion_count > 14)
                  ? ' порции' : ' порций')}
            </div>
            <div><span>{product.gift_count}</span> {product.gift_name} в подарок</div>
          </div>
          <div className="product__main__weight"><p>{product.weight}</p>кг</div>
          <div className="triangle"></div>
          <div className="product__main__mask"></div>
        </div>

        <div className="product__description">
          {description}
        </div>
      </div>
    </>
  )
}

export default Product
