import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Signup.css';

class Err_msg extends Component{
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
            birth : '',
            gender : '',
            email : '',
            err : {}
        }
    }

    change_handle = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }

    signup_handle = async(e) => {
        e.preventDefault();
        
        let err_msg = '';
        const field_name = {
            id : '아이디',
            pw : '비밀번호',
            pw_check : '비밀번호 확인',
            name : '이름',
            birth : '생일',
            gender : '성별',
            email : '이메일'
        }

        for(let field in field_name){
            if(this.state.err[field]){
                err_msg += (this.state.err[field]+' - ' + field_name[field] + '\n');
            }
            else if(this.state.err[field] === undefined){
                err_msg += ('아직 입력되지 않았습니다. - ' + field_name[field] + '\n');
            }
        }

        if(err_msg !== ''){
            alert(err_msg);
            return;    
        }

        // 모든 필드 입력됨, pw형식 맞춰짐, pw 재확인 통과, 이메일 형식 맞음 보장
        let url = "/api/account/new"
        let options = {
            method : "post",
            headers : {
                'Content-type' : 'application/json'
            },
            body : JSON.stringify({
                id : this.state.id,
                pw : this.state.pw,
                name : this.state.name,
                birth : this.state.birth,
                gender : this.state.gender,
                email : this.state.email
            })
        }

        let response = await fetch(url, options);
        console.log(response);

        if(response.ok){
            let data = await response.json();
            if(data.result === 'succes'){
                alert('회원가입에 성공하였습니다.');
                this.props.history.push('/login');

            }
            else if(data.result === 'fail'){
                alert('회원가입에 실패하였습니다.');
                
            }
        }
        else{
            alert("HTTP error : " + response.status);
        }
    }

    blur_handle = async(e) => {
        let passwordRules = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
        let emailRules = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        
        let target_name = e.target.name;
        // if(target_name === "year" || target_name === "month" || target_name === "day"){
        //     target_name = "birth";
        // }
        
        if(e.target.value === ''){//비어있는 경우
            this.setState(prevState => ({
                err : {
                    ...prevState.err,
                    [target_name] : "필수 요소 입니다."
                }
            }));
        }

        else if(e.target.name === 'id'){
            let response = await fetch(`/api/account/${e.target.value}/exist`);
            let result = await response.text();
            let err = false;
            if(result === 'true'){
                err = '이미 존재하는 아이디입니다.'
            }
            this.setState(prevState => ({
                err : {
                    ...prevState.err,
                    [target_name] : err
                }
            }));
        }

        else if(e.target.name === 'pw' && !passwordRules.test(e.target.value)){//비밀번호 패턴이 맞지 않는 경우
            this.setState(prevState => ({
                err : {
                    ...prevState.err,
                    [target_name] : "형식이 맞지 않습니다."
                }
            }));
        }
        else if(e.target.name === 'pw_check' && this.state.pw !== this.state.pw_check){//비밀번호 패턴이 맞지 않는 경우
            this.setState(prevState => ({
                err : {
                    ...prevState.err,
                    [target_name] : "위의 비밀번호와 맞지 않습니다."
                }
            }));
        }
        else if(e.target.name === 'email' && !emailRules.test(e.target.value)){//이메일 패턴이 맞지 않는 경우
            this.setState(prevState => ({
                err : {
                    ...prevState.err,
                    [target_name] : "올바른 이메일 형식이 아닙니다."
                }
            }));
        }
        else{//모든 조건 통과
            this.setState(prevState => ({
                err : {
                    ...prevState.err,
                    [target_name] : false
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
                            <input type="password" name="pw" value={this.state.pw} placeholder="8~16자, 영문,숫자,특수문자 포함" onChange={this.change_handle} onBlur={this.blur_handle}/>
                            <Err_msg err={this.state.err.pw}/>
                        </label>
                        
                        <label>
                            패스워드 확인 
                            <input type="password" name="pw_check" value={this.state.pw_check} placeholder="8~16자, 영문,숫자,특수문자 포함" onChange={this.change_handle} onBlur={this.blur_handle}/>
                            <Err_msg err={this.state.err.pw_check}/>
                        </label>
                        
                        <label>
                            이름 
                            <input type="text" name="name" value={this.state.name} onChange={this.change_handle} onBlur={this.blur_handle}/>
                            <Err_msg err={this.state.err.name}/>
                        </label>
                        
                        <label>
                            성별 
                            <select name="gender" value={this.state.gender} onChange={this.change_handle} onBlur={this.blur_handle}>
                                <option value=''>성별을 선택해주세요</option>
                                <option value="male">남자</option>
                                <option value="female">여자</option>
                            </select>
                            <Err_msg err={this.state.err.gender}/>
                        </label>
                        
                        <label>
                            생년월일
                            <input type="date" name="birth" value={this.state.bitrh} onChange={this.change_handle} onBlur={this.blur_handle}/> 
                            {/* <div>
                                <input type="number" name="year" placeholder="년" value={this.state.year} onChange={this.change_handle} onBlur={this.blur_handle}/>
                                <input type="number" name="month" placeholder="월" value={this.state.month} onChange={this.change_handle} onBlur={this.blur_handle}/>
                                <input type="number" name="day" placeholder="일" value={this.state.day} onChange={this.change_handle} onBlur={this.blur_handle}/>
                            </div> */}
                            <Err_msg err={this.state.err.birth}/>
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