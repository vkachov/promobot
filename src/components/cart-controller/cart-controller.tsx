import React, { Component } from "react";
import CartWindow from '../cart-window/cart-window';
import { OrderItem } from "../../module/order-service";
import { Product } from "../../interfaces/product";
import { productService } from "../../services/product-service";

export interface ICartControllerProps {
    orders: OrderItem[];
    onChangeCount: Function;
    onDelete: Function;
}

export interface ICartControllerState {
    products: Product[];
    loading: boolean;
}

export class CartController extends Component<ICartControllerProps, ICartControllerState> {
    constructor(props: ICartControllerProps) {
        super(props);

        this.state = {
            products: [],
            loading: true
        };
    }

    componentDidMount() {
        productService.all()
            .then((items)=> {
                this.setState({
                    products: items,
                    loading: false
                });
            });
    }

    render() {
        const { products, loading } = this.state;
        const { orders, onChangeCount, onDelete } = this.props;
        const items = this._getItems(orders, products);

        return (loading ? '' : <CartWindow items={items} onChangeCount={ onChangeCount } onDelete={ onDelete }/> );
    }

    private _getItems(orders: OrderItem[], products: Product[]) {
        const cartItems = orders.map((order) => {
            const product = products.find((p) => { return p.id === order.id }) as Product;
            return {
                count: order.count,
                ...product
            };
        });
        return cartItems;
    }
}
