import React, {Component} from 'react';
import {Link} from 'react-router-dom'; 
import {Header} from '../components';
import './Sayings.css';

class CommentForm extends Component{
    render(){
        return this.props.comments.map((comment) => 
        <div className="comment">
            <div>{comment.content}</div>
            <div>{comment.date}</div>
        </div>)
    }
}

class SayingForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            comments : {}
        }
    }

    comment_btn_handler = (e) => {
        let url = '/api/comment/new'
        let options = {
            method : "post",
            headers : {
                'Content-type' : 'application/json'
            },
            body : JSON.stringify({
                saying_id : e.target.name,
                content : this.state.comments[e.target.name]
            })
        }
        
        fetch(url, options);    
    }

    comment_input_handler = (e)=>{
        this.setState(prevState=>({
            comments : {
                ...prevState.comments,
                [e.target.name] : e.target.value
            }
        }))
    }

    render(){
        return this.props.contents.map(content =>
            <div className="content_contatiner">
               <div className="saying">
                    {content.sentence}<br/>
                    {content.speaker.name !== "" && '-'+content.speaker.name+'-'}
                	{content.source !== "" && '<'+content.source+'>'}
               </div>
               {this.props.isLogined &&
                    <div className="comment_input" hidden={true}>
                        <input type="text" placeholder="자신만의 조언을 추가해주세요" name={content._id} onChange={this.comment_input_handler}/>
                        <button name={content._id} onClick={this.comment_btn_handler}>제출</button>
                    </div>
               }
               {content.comments.length !== 0 &&
                <CommentForm comments={content.comments}/>
               }
            </div>
        )
    }
}

class Sayings extends Component{
    constructor(props){
        super(props);
        this.state = {
            contents : []
        }
    }


    async componentDidMount(){
        let params = new URLSearchParams(this.props.location.search);
        let tags = params.getAll("tags");

        let contents = await fetch('/api/sayings?tags='+tags.join())
        .then(data=>{
            return data.json();
        })
        .then(content=>{
            return content;
        })
        
        this.setState(prevState => ({
            "contents" : [
                ...prevState.contents, ...contents
            ]
        }));

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
        return (
            <div>
                <Header/>
                <SayingForm isLogined={this.state.isLogined} contents={this.state.contents}/>
            </div>
        )
    }
}

export default Sayings;