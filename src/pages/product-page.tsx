import React from "react";
import list from '../data/list.json';
import { RouteComponentProps } from "react-router-dom";
import { Product } from "../interfaces/product";
import { orderService } from "../module/order-service";
import { ProductController } from "../components/product-controller/product-controller";

interface MatchParams {
    id: string;
}

interface IProductPageRouterProps extends RouteComponentProps<MatchParams> {
}

export const ProductPage = (props: IProductPageRouterProps ) => {
    const items = list as Product[];
    const id = props.match.params.id;
    const product = items.find((item) => { return item.id === id });

    const addToCartClicked = (id: string) => {
        orderService.addItem(id);
    };

    return product ? 
        <ProductController productId={id } onAddToCartClicked={addToCartClicked }/>
        : 
        <div>Товар не найден</div>;
};
