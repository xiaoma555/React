import React, { Component } from 'react';
import axios from 'axios'
import Img from './img/logo.png';
import Style from './css/public'
export default class App extends Component {
    render() {
        return (
            <div>
                <h3 className={Style.h3} >App组件！</h3>
                <img src={Img}/>
                <span className={Style.special} >hahahah </span>
                <span className={Style.one}>hahahah </span>
            </div>
        )
    }
    componentDidMount(){
        axios.get('/data').then(resolve=>{
            console.log(resolve.data);
        })
    }
}
