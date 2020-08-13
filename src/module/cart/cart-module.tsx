import React from "react";
import { useObservable } from "../../module/observable-hook";
import { orderService } from "../../module/order-service";
import { CartController } from "../../components/cart-controller/cart-controller";

export const CartModule = () => {
    const minOrderCount = 1;
    const orders = useObservable(orderService.orders);
    const changeCount = (id:string, value: number) => {
        if (value > 0) {
            orderService.addItem(id);
        } else {
            const order = orders.find(order => order.id === id);
            if (order && order.count > minOrderCount) {
                orderService.removeItem(id);
            }
        }        
    };

    const deleteOrder = (id:string) => {
        orderService.deleteItem(id);
    }

    return <CartController orders={ orders } onChangeCount={changeCount} onDelete={ deleteOrder }/>;
}
