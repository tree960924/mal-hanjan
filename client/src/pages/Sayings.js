import React, {Component} from 'react';
import {Link} from 'react-router-dom'; 
import './Sayings.css';

class Sayings extends Component{
    async componentDidMount(){
        let params = new URLSearchParams(this.props.location.search);
        let tags = params.getAll("tags");
        console.log(tags);

        let contents = await fetch('/api/sayings?tags='+tags.join())
        .then(data=>{
            return data.json();
        })
        .then(content=>{
            return content;
        })

        console.log(contents);

    }

    render(){
        return (
            <div>
                hello
            </div>
        )
    }
}

export default Sayings;