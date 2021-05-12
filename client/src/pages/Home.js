import React, {Component} from 'react';
import {Link} from 'react-router-dom'; 
import {Header} from '../components';
import './Home.css';


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

    start_btn_handler = (e)=>{
        e.preventDefault();
        let tags = [...Object.entries(this.state.selected_tag)].map(([tagName, boolean])=>{
            if (boolean) return tagName;
        })
        this.props.history.push('/sayings?tags='+tags.join());
        
    }

    render(){
        return (
            <div id="Home_wrap">
                <Header/>
                <main>
                    <div id="main_content">
                       <div id="main_title">
                        main title
                       </div>
                       <div id="sub_title">
                        sub title
                       </div>
                       <div id="tag_select">
                            <Tag_Select tag_list={["힘찬", "행복한", "열정 가득한", "무탈한", "희망", "의지"]} value={this.state.selected_tag} tag_select_handler={this.getSelectedTag}/>
                       </div>
                       <button id="start_btn" onClick={this.start_btn_handler}>start!</button>
                    </div>
                </main>
            </div>
        )
    }
}

export default Home;