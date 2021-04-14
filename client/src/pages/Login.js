import React, {Component} from 'react';
import {Link} from 'react-router-dom'; 
import './Login.css'

class Login extends Component{
    constructor(props){
        super(props);
        this.state ={
            id : '',
            pw : ''
        }
    }

    login_handle = async(e) => {
        e.preventDefault();
        
        let url = `/api/account/login`;
        let options = {
            method : "post",
            headers : {
                'Content-type' : 'application/json'
            },
            body : JSON.stringify({
                id : this.state.id,
                pw : this.state.pw,
            })
        }

        let result = await fetch(url, options);
        result = await result.text();
        if(result === 'success'){
            alert('로그인 성공');
            this.props.history.push('/');
        }
        else{
            alert('로그인 실패');
        }
    }

    change_handle = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }

    render(){
        return (
            <div id="login_wrap">
                <header>
                    <h1><Link to ='/'>말 한잔</Link></h1>
                </header>

                <main>
                    <form>
                        <label>
                            아이디 
                            <input type="text" name="id" value={this.state.id} onChange={this.change_handle}/>
                        </label>
                        <label>
                            패스워드 
                            <input type="password" name="pw" value={this.state.pw} onChange={this.change_handle}/>
                        </label>
                        <button onClick={this.login_handle}>
                            로그인
                        </button>
                    </form>
                </main>

                <footer>

                </footer>
            </div>
        );
    }
}

export default Login;