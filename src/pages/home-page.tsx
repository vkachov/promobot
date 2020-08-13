import React from "react";
import { useHistory, RouteComponentProps } from "react-router-dom";
import { VitrineController } from "../components/vitrine-controller/vitrine-controller";

interface MatchParams {
    count: string;
}

interface IHomePageRouterProps extends RouteComponentProps<MatchParams> {
}

export const HomePage = (props: IHomePageRouterProps) => {
    const history = useHistory();
    const count = parseInt(props.match.params.count) || 0; 

    const onItemClicked = (id: string) => {    
        history.push(`/product/${id}`);
    }

    return <VitrineController onClick={ onItemClicked } count={ count }/>;
};
