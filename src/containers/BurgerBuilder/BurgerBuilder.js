import React, { Component } from 'react';
import { connect } from 'react-redux';

import Sup from '../../hoc/Sup/Sup';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-order';


class BurgerBuilder extends Component {
    state = {
        purchasing: false        
    }

    componentDidMount() {
        console.log(this.props);        
        this.props.onInitIngredients();
    }

    updatedPurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el > 0
            }, 0)
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchasedCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout')
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        };

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if (this.props.ings) {
            burger = (
                <Sup>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatedPurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price} />
                </Sup>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    price={this.props.price}
                    purchaseCanceled={this.purchasedCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler} />
            );
        }


        return (
            <Sup>
                <Modal show={this.state.purchasing} modalClosed={this.purchasedCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Sup>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
};

const mapDispatchTProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredient()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchTProps)(withErrorHandler(BurgerBuilder, axios));