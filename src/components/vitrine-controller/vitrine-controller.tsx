import { Component } from "react";
import { Product } from "../../interfaces/product";
import { productService } from "../../services/product-service";
import React from "react";
import { VitrineList } from "../vitrine-list/vintrine-list";
import { IVitrineItemProps } from "../vitrine-item/vintrine-item";

interface IVitrineControllerProps {
    count: number;
    onClick: Function
}

interface IVitrineControllerState {
    loading: boolean;
    items: IVitrineItemProps[];
    error: boolean;
}

export class VitrineController extends Component<IVitrineControllerProps, IVitrineControllerState> {
    constructor(props: IVitrineControllerProps){
        super(props);
        
        this.state = {
            loading: true,
            error: false,
            items: []
        };

        this._onItemClicked = this._onItemClicked.bind(this);
    }

    componentDidMount() {
        productService.all(true)
            .then((items: Product[]) => {
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
        const { count } = this.props;

        return loading ? 
            <div>{ error ? 'Не удалось загрузить список товаров' : 'Загрузка списка товаров'}</div> : 
            <VitrineList items={ count > items.length || count === 0 ? items : items.slice(0,count) } itemClicked={ this._onItemClicked }/>;
    }

    private _onItemClicked(id:string) {
        const { onClick } = this.props;
        onClick(id);
    }
}
