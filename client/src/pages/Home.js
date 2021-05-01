import React, {Component} from 'react';
import {Link} from 'react-router-dom'; 
import './Home.css';

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

class Tag_Select extends Component{
    constructor(props){
        super(props);
    }

    tag_select_handler = (e) => {
        this.props.tag_select_handler(e.target.name);
    }

    render(){
        return this.props.tag_list.map((tag_name, index) =>{
            return(<button className="tag" name={tag_name} data-selected={''+this.props.value[tag_name]} onClick={this.tag_select_handler}>{tag_name}</button>);
        });
    }
}

class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            selected_tag : {}
        };
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

    getSelectedTag = (tag_name) =>{
        if(this.state.selected_tag[tag_name]){
            this.setState(prev_state => ({
                selected_tag : {
                    ...prev_state.selected_tag,
                    [tag_name] : false
                }
            }))
        }
        else{
            this.setState(prev_state => ({
                selected_tag : {
                    ...prev_state.selected_tag,
                    [tag_name] : true
                }
            }))
        }
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
                    <div id="main_content">
                       <div id="main_title">
                        main title
                       </div>
                       <div id="sub_title">
                        sub title
                       </div>
                       <div id="tag_select">
                            <Tag_Select tag_list={["힘찬", "행복한", "열정 가득한", "무탈한"]} value={this.state.selected_tag} tag_select_handler={this.getSelectedTag}/>
                       </div>
                       <button id="start_btn">start!</button>
                    </div>
                </main>
            </div>
        )
    }
}

export default Home;