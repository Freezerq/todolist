import React from 'react';
import {EditableSpan} from "../components/EditableSpan/EditableSpan";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import App from "../app/App";



export default {
    title: 'App Component',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
}




export const AppWithReduxExample = (props: any) => {
    return <App />

}