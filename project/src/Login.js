import styles from "./Login.module.css";
import { useState } from "react";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import Input from "./Input"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import owl from "./img/owl.png";
import leftimg from "./img/loginleft.png";
import rightimg from "./img/loginright.png";
import logo from "./img/logo.png";
import { useSelector } from "react-redux";


/*
  해야되는거
  3. 시작버튼 누르면 api호출
 */
function Login() {
  const REGISTER_URL = "#";
  // const LOGIN_API_URL = "https://0284-211-63-140-94.jp.ngrok.io";
  const BASE_URL = useSelector((state) => state.BASE_URL);
  const [inputField, setInput] = useState({
    idInput: "",
    passwordInput: "",
  });

  const [activeBorder, setActiveBorder] = useState({
    idBorder: false,
    passwordBorder: false,
  });

  const { idInput, passwordInput } = inputField;

  const { idBorder, passwordBorder } = activeBorder;

  const token = "";
  let navigate = useNavigate();
  const handleLogin = () => {
    console.log(idInput, passwordInput)
    axios
      .post(`${BASE_URL}login/`, { username: idInput, password: passwordInput },{headers: { "Content-Type": "multipart/form-data"}})
      .then((data) => {
        if (data.status === 200) {
          let token = data.data.token;
          navigate('/home')

        } else {
          //잘못입력함ㅋ
        }
      })
      .catch(() => {
        //서버이상함ㅅㄱ
        alert('로그인 실패')
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={leftimg}></img>
      </div>

      <div className={styles.center}>
        <div className={styles.innercontainer}>
          <div className={styles.logoimg}>
            <div><img className={styles.caracter} src={owl}></img></div>
            <div><img className={styles.logo} src={logo}></img></div>
          </div>

          <div className={styles.아래}>
            <div className={styles.inputcontainer}>
              {/* <div className={styles.title}>
                <h2>엉박사</h2>
                <img src={logo}></img>
              </div> */}
              <div className={styles.idInput}>
                <Input
                  border={{
                    name: "idBorder",
                    field: idBorder,
                    state: activeBorder,
                    func: setActiveBorder,
                  }}
                  input={{
                    name: "idInput",
                    field: idInput,
                    state: inputField,
                    func: setInput,
                  }}
                  icon={faUser}
                  name="아이디"
                  type="text"
                />
              </div>

              <div className={styles.pwInput}>
                <Input
                  activeBorder={activeBorder}
                  border={{
                    name: "passwordBorder",
                    field: passwordBorder,
                    state: activeBorder,
                    func: setActiveBorder,
                  }}
                  input={{
                    name: "passwordInput",
                    field: passwordInput,
                    state: inputField,
                    func: setInput,
                  }}
                  icon={faLock}
                  name="비밀번호"
                  type="password"
                />
              </div>
              <div className={styles.btns}>
                <a href={REGISTER_URL} className={styles.register} onClick={()=>{navigate("/register")}}>
                  회원가입
                </a>
                <button className={styles.btn} onClick={() => handleLogin()}>
                  시작하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <img src={rightimg}></img>
      </div>
    </div>
  );
}

export default Login;
