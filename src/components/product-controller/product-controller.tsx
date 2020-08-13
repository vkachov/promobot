import { Component } from "react";
import { productService, IProduct } from "../../services/product-service";
import React from "react";
import { IVitrineItemProps } from "../vitrine-item/vintrine-item";
import { ProductCard } from "../product-card/product-card";

interface IProductControllerProps {
    productId: string;
    onAddToCartClicked: Function;
}

interface IProductControllerState {
    loading: boolean;
    items: IVitrineItemProps[];
    error: boolean;
}

export class ProductController extends Component<IProductControllerProps, IProductControllerState> {
    constructor(props: IProductControllerProps){
        super(props);
        
        this.state = {
            loading: true,
            error: false,
            items: []
        };

        this._onAddToCartClicked = this._onAddToCartClicked.bind(this);
    }

    componentDidMount() {
        productService.all()
            .then((items: IProduct[]) => {
                this.setState({
                    loading: false,
                    items
                });
            })
            .catch(() => {
                this.setState({
                    error: true
                });
            });
    }

    render() {
        const { loading, items, error } = this.state;
        const { productId } = this.props;
        const product = items.find(item => item.id === productId) as IProduct;

        return loading ? 
            <div>{ error ? 'Не удалось загрузить информацию о товарое' : 'Загрузка информации о товаре'}</div> : 
            <ProductCard {...product} onAddToCartClicked={ this._onAddToCartClicked }/>;
    }

    private _onAddToCartClicked(id: string) {
        const { onAddToCartClicked } = this.props;
        onAddToCartClicked(id);
    }
}
