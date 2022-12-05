import styles from "./Register.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  faUser,
  faLock,
  faTag,
  faBullhorn,
  faSchool,
  faSchoolFlag,
} from "@fortawesome/free-solid-svg-icons";
import Input from "./Input";
import axios from "axios";
import leftimg from "./img/loginleft.png";
import rightimg from "./img/loginright.png";
import { useSelector } from "react-redux";

function Register() {
  // const LOGIN_URL = "#";
  // const REGISTER_API_URL = "http://3.38.215.109";
  const BASE_URL = useSelector((state) => state.BASE_URL);

  const [inputField, setInput] = useState({
    idInput: "",
    passwordInput: "",
    passwordCheckInput: "",
    nameInput: "",
    nicknameInput: "",
    schoolInput: "",
    introductionInput: "",
  });

  const [activeBorder, setActiveBorder] = useState({
    idBorder: false,
    passwordBorder: false,
    passwordCheckBorder: false,
    nameBorder: false,
    nicknameBoarder: false,
    schoolBorder: false,
    introductionBorder: false,
  });

  const {
    idInput,
    passwordInput,
    passwordCheckInput,
    nameInput,
    nicknameInput,
    schoolInput,
    introductionInput,
  } = inputField;

  const [page, setPage] = useState(1);
  const [idCheck, setIdCheck] = useState(false);

  let navigate = useNavigate()

  const handleRegister = () => {
    let clear = document.getElementsByTagName("input");

    if (page === 1) {
      if (!idInput) {
        alert("아이디를 입력하세요");
      } else if (!idCheck) {
        alert("아이디 중복체크를 해 주세요");
      } else if (!passwordInput) {
        alert("비밀번호를 입력하세요");
      } else if (!passwordCheckInput || passwordInput != passwordCheckInput) {
        alert("비밀번호가 일치하지 않습니다");
      } else if (!nameInput) {
        alert("이름을 입력하세요");
      } else {
        for (let i = 0; i < clear.length; i++) {
          clear[i].value = "";
        }
        setPage(2);
      }
    } else {
      axios
        .post(BASE_URL + "register/", {
          username: idInput,
          password: passwordInput,
          password2: passwordCheckInput,
          name: nameInput,
          nickname: nicknameInput,
          school: schoolInput,
          introduction: introductionInput,
        },  {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((data) => {
          console.log(data)
          if (data.status === 201) {
            for (let i = 0; i < clear.length; i++) {
              clear[i].value = "";
            }
            alert("회원가입에 성공했습니다!")
            navigate("/");
          } else {
            alert("이미 존재하는 회원입니다.");
          }
        })
        .catch(() => {
          alert("서버가 불안정합니다. 잠시후에 다시 시도 해주세요");
        });
    }
  };

  const handleIdCheck = () => {
    setIdCheck(true);
    axios
      .get(BASE_URL + "register/id?id=" + inputField.idInput)
      .then((data) => {
        console.log(data)
        if (!data.data) {
          alert("사용 가능한 아이디입니다.");
          setIdCheck(true);
        } else {
          alert("중복되는 아이디입니다.");          
        }
      })
      .catch(() => {
        alert("잘못된 요청입니다.");
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={leftimg}></img>
      </div>
      <div className={styles.innercontainer}>
        <div className={styles.inputcontainer}>
          <div className={styles.title}>
            <h2>회원가입</h2>
          </div>
          <div className={styles.tmp}>
            <div>
              <InputBox
                page={page}
                border={[activeBorder, setActiveBorder]}
                input={[inputField, setInput]}
                setIdCheck={setIdCheck}
                url={BASE_URL}
              />
              <div className={styles.btns}>
                <btn className={styles.btn} onClick={() => handleRegister()}>
                  {page === 1 ? "다음으로" : "가입하기"}
                </btn>
              </div>
            </div>
            <button
              onClick={() => (page === 1 ? handleIdCheck() : handleRegister())}
            >
              {page === 1 ? "중복체크" : "건너뛰기"}
            </button>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <img src={rightimg}></img>
      </div>
    </div>
  );
}

function InputBox(props) {
  let page = props.page;
  let activeBorder = props.border[0];
  let setActiveBorder = props.border[1];
  let inputField = props.input[0];
  let setInput = props.input[1];

  if (page === 1) {
    return (
      <div>
        <div className={styles.idInput}>
          <Input
            border={{
              name: "idBorder",
              field: activeBorder.idBorder,
              state: activeBorder,
              func: setActiveBorder,
            }}
            input={{
              name: "idInput",
              field: inputField.idInput,
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
            border={{
              name: "passwordBorder",
              field: activeBorder.passwordBorder,
              state: activeBorder,
              func: setActiveBorder,
            }}
            input={{
              name: "passwordInput",
              field: inputField.passwordInput,
              state: inputField,
              func: setInput,
            }}
            icon={faLock}
            name="비밀번호"
            type="password"
          />
        </div>

        <div className={styles.pwcheckInput}>
          <Input
            border={{
              name: "passwordCheckBorder",
              field: activeBorder.passwordCheckBorder,
              state: activeBorder,
              func: setActiveBorder,
            }}
            input={{
              name: "passwordCheckInput",
              field: inputField.passwordCheckInput,
              state: inputField,
              func: setInput,
            }}
            icon={faLock}
            name="비밀번호확인"
            type="password"
          />
        </div>

        <div className={styles.nameInput}>
          <Input
            border={{
              name: "nameBorder",
              field: activeBorder.nameBorder,
              state: activeBorder,
              func: setActiveBorder,
            }}
            input={{
              name: "nameInput",
              field: inputField.nameInput,
              state: inputField,
              func: setInput,
            }}
            icon={faUser}
            name="이름"
            type="text"
          />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className={styles.nicknameInput}>
          <Input
            border={{
              name: "nicknameBorder",
              field: activeBorder.nicknameBorder,
              state: activeBorder,
              func: setActiveBorder,
            }}
            input={{
              name: "nicknameInput",
              field: inputField.nicknameInput,
              state: inputField,
              func: setInput,
            }}
            icon={faTag}
            name="별명"
            type="text"
          />
        </div>

        <div className={styles.schoolInput}>
          <Input
            border={{
              name: "schoolBorder",
              field: activeBorder.schoolBorder,
              state: activeBorder,
              func: setActiveBorder,
            }}
            input={{
              name: "schoolInput",
              field: inputField.schoolInput,
              state: inputField,
              func: setInput,
            }}
            icon={faSchoolFlag}
            name="학교"
            type="text"
          />
        </div>

        <div className={styles.introductionInput}>
          <Input
            border={{
              name: "introductionBorder",
              field: activeBorder.introductionBorder,
              state: activeBorder,
              func: setActiveBorder,
            }}
            input={{
              name: "introductionInput",
              field: inputField.introductionInput,
              state: inputField,
              func: setInput,
            }}
            icon={faBullhorn}
            name="자기소개"
            type="textarea"
          />
        </div>
      </div>
    );
  }
}

export default Register;
