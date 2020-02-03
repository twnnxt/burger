import React from 'react';

import classes from './Order.module.css'

const Order = props => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        )
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={ig.name}
        >{ig.name} ({ig.amount})</span>
    })

    ///////////

    const myIngredients = Object.keys(props.ingredients);
    const num = myIngredients.map(i => props.ingredients[i])
    const io = myIngredients.map(io => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={io}
        >
            {io} ({num[myIngredients.indexOf(io)]})
        </span>
    })


    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            {/* <p>Ingredients: {io}</p> */}
            <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
}


export default Order;