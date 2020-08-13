import { Component } from "react"
import React from "react";
import './vitrin-item.scss';
import { Product } from "../../interfaces/product";

export interface IVitrineItemProps extends Product {
    onClick?: Function;
}

export class VitrineItem extends Component<IVitrineItemProps> {
    render() {
        const { name, onClick, id, price, cover } = this.props;
        return (
            <div className="vitrine-item" onClick={onClick ? ()=> onClick(id) : undefined }>
                <div className="item-name">{ name }</div>
                <div className="product-price">{ price }</div>
                <div className="item-picture" style={{ backgroundImage: `url('/img/${cover}.jpg')` }}></div>
            </div>
        );
    }
}
