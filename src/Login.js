import './Login.css';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

/*
  해야되는거
  3. 시작버튼 누르면 api호출
 */
function Login() {
  const REGISTER_URL = "#"
  const LOGIN_API_URL = "https://890a-121-157-55-117.jp.ngrok.io"

  const [inputField, setInput] = useState({
    idInput: "",
    passwordInput: "",
  })

  const [activeBorder, setActiveBorder] = useState({
    idBorder: false,
    passwordBorder : false,
  });
  

  const { idInput, passwordInput } = inputField;

  const { idBorder, passwordBorder} = activeBorder;

  const token = "";

  const handleInput = (field, input) => {
    setInput({
      ...inputField,
      [field]: input,
    });
  };

  const handleFocusBorder = border => {
    setActiveBorder({
      ...activeBorder,
      [border]: true,
    });
  };

  const handleBlurBorder = (border, field) => {
    if(!field){
      setActiveBorder({
        ...activeBorder,
        [border]: false,
      });
    }
  };

  const handleLogin = () => {
    axios.post(LOGIN_API_URL, {username: idInput, password: passwordInput})
    .then((data)=>{
      if(data.status === 200){
        token = data.data.token
        //마이페이지로ㄱㄱ
      }
      else{
        //잘못입력함ㅋ
      }
    })
    .catch(()=>{
      //서버이상함ㅅㄱ
    })
  }

  return (
    <div className="container">

      <div className='left'>
        <img src="img/loginleft.png"></img>
      </div>

      <div className="login-content">

        <form>

          <div className='img-div'>
            <img src="img/dr_eung.png" />
          </div>
          
          <h2 className="title">엉박사</h2>

          <div className={ idBorder ? "input-div one focus" : "input-div one"}>
            <FontAwesomeIcon icon={faUser} className='i'/>
            <div className="div">
              <h5>아이디</h5>
              <input 
                type="text" 
                className="input"
                onChange={(e) => handleInput('idInput', e.target.value)}
                onFocus={() => handleFocusBorder('idBorder')}
                onBlur={(e) => handleBlurBorder('idBorder', e.target.value)}
              />
            </div>
          </div>

          <div className={ passwordBorder ? "input-div pass focus" : "input-div pass"}>
            <FontAwesomeIcon icon={faLock} className='i'/>
            <div className="div">
              <h5>비밀번호</h5>
                <input 
                  type="password" 
                  className="input"
                  onChange={(e) => handleInput('passwordInput', e.target.value)}
                  onFocus={() => handleFocusBorder('passwordBorder')}
                  onBlur={(e) => handleBlurBorder('passwordBorder', e.target.value)}
                />
            </div>
          </div>

          <a href={ REGISTER_URL }>회원가입</a>
          <input 
            type="submit" 
            className="btn" 
            value="시작하기" 
            style={{fontFamily:'Miwonfont', letterSpacing: '3px'}}
            onClick={()=>handleLogin()} />
        </form>
      </div>

      <div className='right'>
        <img src="img/loginright.png"></img>
      </div>

    </div>
  );
}

export default Login;