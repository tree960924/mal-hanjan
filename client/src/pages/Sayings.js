import React, {Component} from 'react';
import {Header} from '../components';
import './Sayings.css';

class CommentForm extends Component{
    comment_like_btn_handler = (e) =>{
        e.target.dataset.liked = !JSON.parse(e.target.dataset.liked);
    }

    render(){
        return this.props.comments.map((comment) => 
        <div className="comment">
            <div>{comment.content}</div>
            <div className="comment_sub">
                <div className="comment_date">{comment.date.match(/\d{4}-\d{2}-\d{2}/)}</div>
                <button className="comment_like_btn" data-liked="false" onClick={this.comment_like_btn_handler}/>
            </div>
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

    comment_btn_handler = async(e) => {
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
        
        let res = await fetch(url, options);
        let content = await res.json();
        this.props.contentChange(content, e.target.dataset.index*1);
        this.setState(({comments})=>({
            comments : {
                ...comments,
                [e.target.name] : ""
            }
        }));
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
        return this.props.contents.map((content, index) =>
            <div className="saying_contatiner">
               <div className="saying">
                    {content.sentence}<br/>
                    {content.speaker.name !== "" && '-'+content.speaker.name+'-'}
                	{content.source !== "" && '<'+content.source+'>'}
               </div>
               {this.props.isLogined &&
                    <div className="comment_input" hidden={true}>
                        <input type="text" value={this.state.comments[content._id]} placeholder="자신만의 조언을 추가해주세요" name={content._id} onChange={this.comment_input_handler}/>
                        <button name={content._id} data-index={index} onClick={this.comment_btn_handler}>게시</button>
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

    contentChange = (content, index)=>{
        console.log(index);
        console.log(index+1);
        this.setState(({contents})=>({
            "contents" : [
                ...contents.slice(0, index),
                {...content},
                ...contents.slice(index+1)
            ]
        }))
    }

    render(){
        return (
            <div id="saying_page">
                <Header/>
                <main>
                    <SayingForm isLogined={this.state.isLogined} contents={this.state.contents} contentChange={this.contentChange}/>
                </main>
            </div>
        )
    }
}

export default Sayings;