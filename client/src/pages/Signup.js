import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Signup.css';

class Err_msg extends Component{
    constructor(props){
        super(props);
    }

    render(){
        if(this.props.err === undefined){
            return false;
        }
        else{
            return (
                <div className="err_msg">{this.props.err}</div>
            )
        }
    }
}

class Signup extends Component{
    constructor(props){
        super(props);

        this.state = {
            id : '',
            pw : '',
            pw_check : '',
            name : '',
            year : '',
            month : '',
            day : '',
            gender : '',
            email : '',
            err : {}
        }
    }

    change_handle = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }

    signup_handle = (e) => {
        e.preventDefault();
        alert(
            'id : '+this.state.id+'\n'+
            'pw : '+this.state.pw+'\n'+
            'pw_check : '+this.state.pw_check+'\n'+
            'name : '+this.state.name+'\n'+
            'birth : '+this.state.year+'.'+this.state.month+'.'+this.state.day+'\n'+
            'gender : '+this.state.gender+'\n'+
            'email : '+this.state.email+'\n'
        );

        
    }

    blur_handle = (e) => {
        let passwordRules = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
        let emailRules = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if(e.target.value === ''){//비어있는 경우
            this.setState(prevState => ({
                err : {
                    ...prevState.err,
                    [e.target.name] : "필수 요소 입니다."
                }
            }));
        }
        else if(e.target.name === 'pw' && !passwordRules.test(e.target.value)){//비밀번호 패턴이 맞지 않는 경우
            this.setState(prevState => ({
                err : {
                    ...prevState.err,
                    [e.target.name] : "형식이 맞지 않습니다."
                }
            }));
        }
        else if(e.target.name === 'pw_check' && this.state.pw !== this.state.pw_check){//비밀번호 패턴이 맞지 않는 경우
            this.setState(prevState => ({
                err : {
                    ...prevState.err,
                    [e.target.name] : "위의 비밀번호와 맞지 않습니다."
                }
            }));
        }
        else if(e.target.name === 'email' && !emailRules.test(e.target.value)){//이메일 패턴이 맞지 않는 경우
            this.setState(prevState => ({
                err : {
                    ...prevState.err,
                    [e.target.name] : "올바른 이메일 형식이 아닙니다."
                }
            }));
        }
        else{//모든 조건 통과
            this.setState(prevState => ({
                err : {
                    ...prevState.err,
                    [e.target.name] : false
                }
            }));
        }
    }

    render(){
        return (
            <div id="signup_wrap">
                <header>
                    <h1><Link to ='/'>말 한잔</Link></h1>
                </header>

                <main>
                    <form>
                        <label>
                            아이디 
                            <input type="text" name ="id" value={this.state.id} onChange={this.change_handle} onBlur={this.blur_handle}/>
                            <Err_msg err={this.state.err.id}/>
                        </label>
                        <label>
                            패스워드 
                            <input type="password" name="pw" value={this.state.pw} onChange={this.change_handle} onBlur={this.blur_handle}/>
                            <Err_msg err={this.state.err.pw}/>
                        </label>
                        <label>
                            패스워드 확인 
                            <input type="password" name="pw_check" value={this.state.pw_check} onChange={this.change_handle} onBlur={this.blur_handle}/>
                            <Err_msg err={this.state.err.pw_check}/>
                        </label>
                        <label>
                            이름 
                            <input type="text" name="name" value={this.state.name} onChange={this.change_handle} onBlur={this.blur_handle}/>
                            <Err_msg err={this.state.err.name}/>
                        </label>
                        <label>
                            성별 
                            <select name="gender" value={this.state.gender} onChange={this.change_handle}>
                                <option value=''>성별을 선택해주세요</option>
                                <option value="male">남자</option>
                                <option value="female">여자</option>
                            </select>
                        </label>
                        <label>
                            생년월일 
                            <div>
                                <input type="text" name="year" placeholder="년" value={this.state.year} onChange={this.change_handle}/>
                                <input type="text" name="month" placeholder="월" value={this.state.month} onChange={this.change_handle}/>
                                <input type="text" name="day" placeholder="일" value={this.state.day} onChange={this.change_handle}/>
                            </div>
                        </label>
                        <label>
                            이메일 
                            <input type="text" name="email" value={this.state.email} onChange={this.change_handle} onBlur={this.blur_handle}/>
                            <Err_msg err={this.state.err.email}/>
                        </label>
                        <button onClick={this.signup_handle}>
                            회원가입
                        </button>
                    </form>
                </main>

                <footer>

                </footer>
            </div>
        );
    }
}


export default Signup;