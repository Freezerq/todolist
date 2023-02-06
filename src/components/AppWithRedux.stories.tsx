import React from 'react';
import {EditableSpan} from "./EditableSpan";
import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";
import AppWithRedux from "../AppWithRedux";



export default {
    title: 'AppWithRedux Component',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}




export const AppWithReduxExample = (props: any) => {
    return <AppWithRedux />

}