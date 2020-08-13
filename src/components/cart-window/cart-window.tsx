import React, { Component } from "react";
import Popup from "reactjs-popup";
import './cart-window.scss';
import { CartItem, ICartItem } from "../cart-item/cart-item";
 
export interface ICartProps {
    items: ICartItem[];
    onChangeCount: Function;
    onDelete: Function;
}

export default class CartWindow extends Component<ICartProps> {
  render() {
      const { items, onChangeCount, onDelete } = this.props;
      return (
        <Popup trigger={<div className="cart-trigger">{ items.length > 0 ? ` (${items.length}) ` : ''  }</div>} modal contentStyle={{ width: "800px" }}>
            {close => (
                <div className="modal">
                    <div className="close" onClick={close}>&times;</div>
                    <div className="header">Корзина товаров</div>
                    <div className="cart-body">
                        { Array.isArray(items) && items.length ? items.map((item) => { 
                            return <CartItem 
                                    key={ item.id } 
                                    {...item } 
                                    onMinus={ (id: string)=> { onChangeCount(id, -1)}} 
                                    onPlus={ (id: string)=> { onChangeCount(id, 1) }} 
                                    onDelete={ (id: string)=> { onDelete(id) }} 
                                    />
                        }) : 'Корзина пуста' }
                    </div>
                </div>
            )}
        </Popup>  
      );
  }
}
