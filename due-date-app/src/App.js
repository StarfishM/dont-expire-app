import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import HelloWorldText from './HelloWorld';

export default class App extends Component {
    constructor(){
        super();
        this.state ={}
    }
    componentDidMount(){
        console.log("APP component mounted");
    }
    render() {
        return (
            <React.Fragment>
            <BrowserRouter>
            <HelloWorldText name="Merle" />
            </BrowserRouter>
            </React.Fragment>);
    }
}
