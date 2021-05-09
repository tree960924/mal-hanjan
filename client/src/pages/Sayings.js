import React, {Component} from 'react';
import {Link} from 'react-router-dom'; 
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
                        <input type="text" placeholder="자신만의 조언을 추가해주세요"/>
                        <button>제출</button>
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
    }



    render(){
        let isLogined = false;
        return (
            <SayingForm isLogined={isLogined} contents={this.state.contents}/>
        )
    }
}

export default Sayings;