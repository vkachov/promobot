import list from '../data/list.json';
import { Product } from '../interfaces/product';
import sampleSize from 'lodash.samplesize';
import random from 'lodash.random';

const randomItemsFromArray = (sourceArr: any[], min: number, max: number) => {
    return sampleSize(sourceArr, random(min, Math.min(sourceArr.length, max)));
};

export interface IProduct extends Product {
    active: boolean;
}

class ProductService {
    static MIN_LENGTH = 1;
    static MAX_LENGTH = 10;
    static DEFAULT_COVER = '52cf4552-f244-47f5-87d8-1e10e74e03e4';

    private _items: any[] = [];
    

    constructor() {
        const items = list || [];
        // формируем из исходного массива новый от 1 до 10
        const activeItems = randomItemsFromArray(items, ProductService.MIN_LENGTH, ProductService.MAX_LENGTH);
        // сохраняем весь массив товаров, но с флагом активный(есть в наличии) или нет 
        this._items = items.map(item => { return { ...item, cover: ProductService.DEFAULT_COVER, active: activeItems.find(i => i.id === item.id) }});
    }

    public get(id: string): Promise<Product> {
        const item = this._items.find( item => item.id === id);
        return item ? Promise.resolve(item) : Promise.reject();
    }

    public async all(active?: boolean) {
        //return Promise.reject();
        const items = active ? [...this._items.filter(i => i.active)] : [...this._items];
        return await Promise.resolve(items);
    }
}

export const productService = new ProductService();
