import React from "react";
import { useObservable } from "../../module/observable-hook";
import { orderService } from "../../module/order-service";
import { IProduct } from "../../services/product-service";
import './product-card.scss';

export interface IProductCardProps extends IProduct {
    onAddToCartClicked: Function
}

export const ProductCard = (props: IProductCardProps) => {
    const { name, price, description, onAddToCartClicked, id, active, cover } = props;
    const orders = useObservable(orderService.orders);
    const productInCart = orders.find(order => { return order.id === id && order.count > 0 });
    const renderAddToCartButton = active && !productInCart;
    
    return (
        <div className="product-card">
            <div style={{ "flexGrow": 1 }}>
                <div className="product-name">{ name }</div>
                <div className="product-description">{ description }</div>
            </div>
            <div>
                <div className="product-picture" style={{ backgroundImage: `url('/img/${cover}.jpg')` }}></div>
            </div>
            <div>
                <div className="product-price">{ price }</div>
                { renderAddToCartButton ? <div className="add-to-cart" onClick={ () => { onAddToCartClicked(id) } }>+ Добавить в корзину</div> : '' }
                { !active ? <div className="product-sold-out">Товара нет в наличии</div> : ''}
            </div>       
        </div>
    );
}
