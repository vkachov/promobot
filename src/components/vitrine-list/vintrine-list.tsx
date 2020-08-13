import React from "react";
import { VitrineItem, IVitrineItemProps } from "../vitrine-item/vintrine-item";
import './vitrine-list.scss';

export interface IVitrineListProps {
    items: IVitrineItemProps[],
    itemClicked: Function
}

export const VitrineList = (props: IVitrineListProps) => {
    const { items, itemClicked } = props;
    const _onItemClicked = (id: number) => {
        itemClicked(id);
    }
    
    return (
        <div className={"vitrine-list " + (items.length > 1 ? '' : 'single-item')}>
            { items.map(item => {
               return <VitrineItem key={ item.id } { ...item } onClick={ _onItemClicked }/>
            })}
        </div>
    );
}
