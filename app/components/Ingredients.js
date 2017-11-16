import React from 'react'
import { get as _get, isNumber as _isNumber } from 'lodash'

const Ingredients = ({ ingredients, qty }) => {

  return (
    <div>
      <ul>
        <li><mark>ingredients</mark></li>
        {
          (ingredients || []).map((ingredient, i) => {
            let quantity = _get(qty, ingredient.toLowerCase(), '')

            quantity = (_isNumber(quantity)) ? `${quantity} x ` : quantity
            return <li key={`${ingredient}-${i}`} >{ quantity }{ ingredient }</li>
          })
        }
      </ul>
    </div>  
  )  
}



export default Ingredients