import React from "react";
import { Product } from "../../interfaces/product";
import './cart-item.scss'

export interface ICartItem extends Product {
    count: number;
}

export interface ICartItemProps extends ICartItem {
    onMinus: Function;
    onPlus: Function;
    onDelete: Function;
}

export class CartItem extends React.PureComponent<ICartItemProps> {
    render() {
        const { id, count, name, onMinus, onPlus, onDelete } = this.props;
        return (
            <div key={id} className="cart-item">
                <div className="item-name">{ name } - { id }</div>
                <div className="item-quantity">
                    <div className="quantity-button" onClick={() => { onMinus(id); }}>-</div>
                    <div className="item-count">{ count }</div>
                    <div className="quantity-button" onClick={() => { onPlus(id); }} >+</div>
                </div>
                <div className="delete-item-button" onClick={ () => { onDelete(id) }}>Удалить</div>
            </div>
        );
    }
}