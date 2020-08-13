import { Observable } from "./observable";

export interface OrderItem {
    readonly index: number;
    readonly id: string;
    readonly count: number;
}

class OrderService {
    readonly orders = new Observable<OrderItem[]>([]);
    
    addItem(id: string) {
        let orders = this.orders.get();
        const changedOrder = orders.find((order) => { return order.id === id });
        const count = changedOrder ? changedOrder.count + 1 : 1;

        orders = orders.filter((order) => { return order.id !== id });
        const nextIndex = orders.length > 0 ? orders[orders.length - 1].index + 1 : 1;
        this._set([ ...orders, { id, count, index: changedOrder ? changedOrder.index : nextIndex }]);
    }

    removeItem(id: string) {
        let orders = this.orders.get();
        const changedOrder = orders.find((order) => { return order.id === id });

        if (!changedOrder) {
            return;
        }

        const count = changedOrder.count - 1;
        orders = orders.filter((order) => { return order.id !== id });
        this._set([ ...orders, { id, count, index: changedOrder.index } ]);
    }

    deleteItem(id: string) {
        let orders = this.orders.get();
        orders = orders.filter((order) => { return order.id !== id });
        this._set([ ...orders ]);
    }

    private _set(arr: OrderItem[]) {
        this.orders.set(arr.sort((a, b) => { return a.index - b.index }));
    }
}

export const orderService = new OrderService();
