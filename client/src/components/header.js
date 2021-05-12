import {Component} from "react";
import {Link} from "react-router-dom";
import './header.css'

class Login_Info extends Component{
    constructor(props){
        super(props);
        this.state = {
            show : true
        }
    }

    dropdown_handler = (e) => {
        this.setState({show : !this.state.show})
    }

    dropdown_blur = (e) => {
        this.setState({show : true})
    }

    render(){
        if(this.props.isLogined){
            return <div className="dropdown">
                <button className="dropdown_btn" onClick={this.dropdown_handler} onBlur={this.dropdown_blur}>hello {this.props.user_name}</button>
                <div className="dropdown_menu" hidden={this.state.show}>
                    <a href="#">link1</a>
                    <a href="#">link2</a>
                    <a href="#">link3</a>
                </div>
            </div>;
        }
        else{
            return <div>
                <Link to='/login'>로그인</Link>
            </div>;
        }
    }
}

class Header extends Component{
    constructor(props){
        super(props);
        this.state={};
    }

    async componentDidMount(){
        await fetch('/api/isLogined')
        .then(data=>{
            return data.json()
        }).then(data=>{
            this.setState({isLogined : data.result, user_name : data.name});
        }).catch(err=>{
            console.log(err);
        })
    }

    render(){
        return(
            <div id="Header_wrap">
                <header>
                    <div id="App_name"><Link to='/'>말 한잔</Link></div>
                    {this.state.isLogined === true &&
                        <Login_Info isLogined={this.state.isLogined} user_name={this.state.user_name}/>
                    }
                    {this.state.isLogined === false &&
                        <Link to='/login'>로그인</Link>
                    }
                </header>
            </div>
        )
    }
}

export default Header;