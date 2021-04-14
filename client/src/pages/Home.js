import React, {Component} from 'react';
import {Link} from 'react-router-dom'; 
import './Home.css';

class Login_Info extends Component{
    render(){
        if(this.props.isLogined){
            return <div>
                hello {this.props.user_name}
            </div>;
        }
        else{
            return <div>
                <Link to='/login'>로그인</Link>
            </div>;
        }
    }
}

class Home extends Component{
    constructor(props){
        super(props);
        this.state={};
    }

    componentDidMount(){
        fetch('/api/isLogined')
        .then(data=>{
            return data.json()
        }).then(data=>{
            this.setState({isLogined : data.result, user_name : data.name});
        }).catch(err=>{
            console.log(err);
        })
    }

    render(){
        return (
            <div id="Home_wrap">
                <div id="Header_wrap">
                    <header>
                        <div id="App_name"><Link to='/'>말 한잔</Link></div>
                        <Login_Info isLogined={this.state.isLogined} user_name={this.state.user_name}/>
                    </header>
                </div>
                <main>

                </main>
                <footer>

                </footer>
            </div>
        )
    }
}

export default Home;