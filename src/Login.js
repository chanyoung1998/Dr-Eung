import styles from "./Login.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import owl from './img/owl.png'
import leftimg from './img/loginleft.png'
import rightimg from './img/loginright.png'

/*
  해야되는거
  3. 시작버튼 누르면 api호출
 */
function Login() {
  const REGISTER_URL = "#";
  const LOGIN_API_URL = "https://0284-211-63-140-94.jp.ngrok.io";

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

  const handleInput = (field, input) => {
    setInput({
      ...inputField,
      [field]: input,
    });
  };

  const handleFocusBorder = (border) => {
    setActiveBorder({
      ...activeBorder,
      [border]: true,
    });
  };

  const handleBlurBorder = (border, field) => {
    if (!field) {
      setActiveBorder({
        ...activeBorder,
        [border]: false,
      });
    }
  };

  const handleLogin = () => {
    axios
      .post(LOGIN_API_URL, { username: idInput, password: passwordInput })
      .then((data) => {
        if (data.status === 200) {
          let token = data.data.token;
          //마이페이지로ㄱㄱ
        } else {
          //잘못입력함ㅋ
        }
      })
      .catch(() => {
        //서버이상함ㅅㄱ
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={leftimg}></img>
      </div>

      <div className={styles.center}>
        <div className={styles.innercontainer}>
          <div
            className={styles.logoimg}
          >
            <img src={owl}></img>
          </div>

          <div className={styles.아래}>
            <div className={styles.inputcontainer}>
              <div className={styles.title}>
                <h2>엉박사</h2>
              </div>
              <div className={styles.idInput}>
                <div
                  className={
                    idBorder
                      ? `${styles.inputdiv} ${styles.one} ${styles.focus}`
                      : `${styles.inputdiv} ${styles.one} `
                  }
                >
                  <FontAwesomeIcon icon={faUser} className={styles.i} />
                  <div className={styles.div}>
                    <h5>아이디</h5>
                    <input
                      type="text"
                      onChange={(e) => handleInput("idInput", e.target.value)}
                      onFocus={() => handleFocusBorder("idBorder")}
                      onBlur={(e) =>
                        handleBlurBorder("idBorder", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className={styles.pwInput}>
                <div
                  className={
                    passwordBorder
                      ? `${styles.inputdiv} ${styles.pass} ${styles.focus}`
                      : `${styles.inputdiv} ${styles.pass} `
                  }
                >
                  <FontAwesomeIcon icon={faLock} className={styles.i} />
                  <div className={styles.div}>
                    <h5>비밀번호</h5>
                    <input
                      type="password"
                      onChange={(e) =>
                        handleInput("passwordInput", e.target.value)
                      }
                      onFocus={() => handleFocusBorder("passwordBorder")}
                      onBlur={(e) =>
                        handleBlurBorder("passwordBorder", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className={styles.btns}>
                <a href={REGISTER_URL} className={styles.register}>
                  회원가입
                </a>
                <btn className={styles.btn} onClick={() => handleLogin()}>
                  시작하기
                </btn>
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
