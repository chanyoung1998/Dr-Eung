/*eslint-disable */
import { useParams, useNavigate } from "react-router-dom";
import { Nav, Modal } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import styles from "./Writeform.module.css";

import axios from "axios";
import { useSelector } from "react-redux";
import owl from "./img/owl.png";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

function Writefrom() {
  const param = useParams();
  const formnum = param.formnum;
  const title = param.title;
  const BASE_URL = useSelector((state) => state.BASE_URL);
  // const TOKEN = useSelector((state) => state.TOKEN);
  
  const TOKEN = localStorage.getItem('TOKEN')
  console.log(TOKEN)
  const [progress, setProgress] = useState(60);
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.outercontainer}>
        {
          [
            <Form0
              title={title}
              BASE_URL={BASE_URL}
              progress={progress}
              setProgress={setProgress}
              TOKEN={TOKEN}
            />,
            <Form1
              title={title}
              BASE_URL={BASE_URL}
              progress={progress}
              setProgress={setProgress}
              TOKEN={TOKEN}
            />,
            <Form2
              title={title}
              BASE_URL={BASE_URL}
              progress={progress}
              setProgress={setProgress}
              TOKEN={TOKEN}
            />,
            <Form3
              title={title}
              BASE_URL={BASE_URL}
              progress={progress}
              setProgress={setProgress}
              TOKEN={TOKEN}
            />,
            <Form4
              title={title}
              BASE_URL={BASE_URL}
              progress={progress}
              setProgress={setProgress}
              TOKEN={TOKEN}
            />,
            <Form5
              title={title}
              BASE_URL={BASE_URL}
              progress={progress}
              setProgress={setProgress}
              TOKEN={TOKEN}
            />,
            <Form6
              title={title}
              BASE_URL={BASE_URL}
              progress={progress}
              setProgress={setProgress}
              TOKEN={TOKEN}
            />,
            <Form7
              title={title}
              BASE_URL={BASE_URL}
              progress={progress}
              setProgress={setProgress}
              TOKEN={TOKEN}
            />,
            <Form8
              title={title}
              BASE_URL={BASE_URL}
              progress={progress}
              setProgress={setProgress}
              TOKEN={TOKEN}
            />,
          ][formnum]
        }
        <div className={styles.backbutton}>
          <button
            onClick={() => {
              navigate("/home");
              // 마이페이지로 연결
            }}
          >
            돌아가기
          </button>
        </div>
        <div className={styles.ProgressContainer}>
          <ul>
            <div>독후감 작성</div>
            <li>
              <span
                className={`${styles.bar}`}
                style={{ width: `${progress}%` }}
              />
              <img
                className={styles.bar_img}
                src={owl}
                style={{ left: `${progress + 20}%` }}
              />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

function Form0({
  title,
  BASE_URL,
  progress,
  setProgress,
  setPopuptext,
  TOKEN,
}) {
  let navigate = useNavigate();
  const 질문 = [
    "감상문의 제목을 적어보세요!",
    "주인공 또는 작가의 마음을 유추할 수 있는 질문을 적어보고 이에 대한 자신의 생각을 적어보세요!",
    "주인공이 겪은 일을 나도 겪은 경험이 있나요?",
    "앞으로 펼쳐질 다양한 이야기를 상상해보세요!",
    "내가 만약 주인공이라면?",
    '이 책을 읽고 가장 인상 깊었던 장면, 가장 긴장이 되었던 장면 등 "가장"이라는 낱말을 붙여 질문을 만들어보세요! ',
    "책을 이제 소개하는 글을 적어볼까요?",
    "책에서 느낀점을 적어볼까요?",
  ];
  const 예시 = [
    "",
    "예시)만복이는 왜 장군의 떡집을 보고 그냥 지나쳤을까?",
    "예시)나도 만복이처럼 착한일을 한 경험이 있나?",
    "예시)장군이도 '장군이네 떡집' 덕분에 만복이처럼 좋은 친구가 될까?",
    "예시)내가 만복이라면 떡을 먹기위해 어떤 노력을 했을까?",
    "예시)이 책에서 가장 기억에 남는 장면은 무엇일까?",
    "",
    "앞에서 작성한 질문들을 다시 떠올려 보세요!",
  ];
  let [질문번호, set질문번호] = useState(0);
  let [작성내용, set작성내용] = useState({
    제목0: "",
    질문1: { 인터뷰1: "", 내용1: "" },
    질문2: { 인터뷰2: "", 내용2: "" },
    질문3: { 인터뷰3: "", 내용3: "" },
    질문4: { 인터뷰4: "", 내용4: "" },
    질문5: { 인터뷰5: "", 내용5: "" },
    질문6: "",
    질문7: "",
  });
  const ref = useRef(null);
  const ref2 = useRef(null);
  const finish = 8;

  return (
    <>
      <div className={styles.container}>
        <h3 align="left">{질문[질문번호]}</h3>
        {질문번호 == 0 ? (
          <textarea
            className={styles.notes2}
            placeholder={예시[질문번호]}
            onChange={(e) => {
              let temp = { ...작성내용 };
              temp[`제목${질문번호}`] = e.target.value;
              set작성내용(temp);
            }}
          ></textarea>
        ) : 질문번호 <= 5 && 질문번호 >= 1 ? (
          <>
            <textarea
              className={styles.notes2}
              placeholder={예시[질문번호]}
              onChange={(e) => {
                let temp = { ...작성내용 };
                temp[`질문${질문번호}`][`인터뷰${질문번호}`] = e.target.value;
                set작성내용(temp);
              }}
            ></textarea>
            <textarea
              className={styles.notes}
              placeholder="답변)"
              onChange={(e) => {
                let temp = { ...작성내용 };
                temp[`질문${질문번호}`][`내용${질문번호}`] = e.target.value;
                set작성내용(temp);
              }}
            ></textarea>
          </>
        ) : (
          <textarea
            className={styles.notes3}
            placeholder={예시[질문번호]}
            onChange={(e) => {
              let temp = { ...작성내용 };
              temp[`질문${질문번호}`] = e.target.value;
              set작성내용(temp);
            }}
          ></textarea>
        )}
      </div>
      <button
        className={styles.button}
        onClick={() => {
          let ta = document.getElementsByTagName("textarea");
          let totallength = 0;
          for (let i = 0; i < ta.length; i++) {
            totallength += ta.item(i).textLength;
          }
          if (totallength <= 10) {
            ref.current.classList.add(`${styles.open}`);
            ref2.current.classList.add(`${styles.progressbaropenwrong}`);

            setTimeout(() => {
              ref.current.classList.remove(`${styles.open}`);
              ref2.current.classList.remove(`${styles.progressbaropenwrong}`);
            }, 3000);
            return;
          }

          setProgress(progress + 20 / Object.keys(작성내용).length);
          if (finish == 질문번호 + 1) {
            console.log("제출");

            axios.post(
              `${BASE_URL}report/${title}/`,
              {
                original:
                  작성내용.제목0 +
                  "\n\n" +
                  작성내용.질문1.인터뷰1 +
                  "\n\n" +
                  작성내용.질문1.내용1 +
                  "\n\n" +
                  작성내용.질문2.인터뷰2 +
                  "\n\n" +
                  작성내용.질문2.내용2 +
                  "\n\n" +
                  작성내용.질문3.인터뷰3 +
                  "\n\n" +
                  작성내용.질문3.내용3 +
                  "\n\n" +
                  작성내용.질문4.인터뷰4 +
                  "\n\n" +
                  작성내용.질문4.내용4 +
                  "\n\n" +
                  작성내용.질문5.인터뷰5 +
                  "\n\n" +
                  작성내용.질문5.내용5 +
                  "\n\n" +
                  작성내용.질문6 +
                  "\n\n" +
                  작성내용.질문7,
                title: 작성내용.제목0,
                format: "0",
              },
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: TOKEN,
                },
              }
            );
            setTimeout(2000, navigate(`/feedback/${title}`));
          } else {
            let textareas = document.getElementsByTagName("textarea");
            if (질문번호 < 5 && 질문번호 >= 1) {
              textareas[0].value = "";
              textareas[1].value = "";
            } else {
              textareas[0].value = "";
            }
            set질문번호(질문번호 + 1);
          }
        }}
      >
        {finish == 질문번호 + 1 ? "제출하기!" : "다음으로!"}
      </button>
      <div className={styles.popup} ref={ref}>
        <img src={owl} />
        <div className={styles.popuptext}>
          <p>{"글을 조금 더 입력해주세요!"}</p>
        </div>
        <div className={styles.progressbar} ref={ref2}>
          <span className={styles.progress}></span>
        </div>
      </div>
    </>
  );
}

function Form1({ title, BASE_URL, progress, setProgress, TOKEN }) {
  let navigate = useNavigate();
  const 질문 = [
    "누구에게 편지를 쓸지 생각해보세요! 책속에 등장하는 인물뿐만 아니라 무생물이나 동물에게도 적용할 수 있어요!",
    "편지의 제목을 작성해 볼까요?",
    "본격적으로 편지를 작성해 볼까요? 솔직하게 대화를 나누어 보세요",
  ];
  const 예시 = [
    "예시)멋있는 OO에게 , 모든 것을 주었던 나무에게",
    "예시)아낌없이 주는 나무를 읽고",
    [
      "첫 인사로 시작해 보세요! 계절 인사도 좋아요.",
      "안부를 먼저 물어보는건 어때요?",
      "자기 소개와 근황에 대해 먼저 적어보는 건 어때요?",
      "끝 인사, 쓴 날짜, 쓴 사람도 잊지 말고 적어주세요!",
    ][getRandomInt(0, 4)],
  ];

  let [작성내용, set작성내용] = useState({
    질문0: "",
    질문1: "",
    질문2: "",
  });
  let [질문번호, set질문번호] = useState(0);
  const ref = useRef(null);
  const ref2 = useRef(null);
  const finish = 3;
  return (
    <>
      <div className={styles.container}>
        {질문번호 <= 1 ? (
          <>
            <h3 align="left">{질문[질문번호]}</h3>
            <textarea
              className={styles.notes2}
              placeholder={예시[질문번호]}
              onChange={(e) => {
                let temp = { ...작성내용 };
                temp[`질문${질문번호}`] = e.target.value;
                set작성내용(temp);
              }}
            ></textarea>
            <br />
          </>
        ) : (
          <>
            <h3 align="left">{질문[질문번호]}</h3>
            <textarea
              className={styles.notes3}
              placeholder={예시[질문번호]}
              onChange={(e) => {
                let temp = { ...작성내용 };
                temp[`질문${질문번호}`] = e.target.value;
                set작성내용(temp);
              }}
            ></textarea>
          </>
        )}
      </div>
      <button
        className={styles.button}
        onClick={() => {
          let ta = document.getElementsByTagName("textarea");
          let totallength = 0;
          for (let i = 0; i < ta.length; i++) {
            totallength += ta.item(i).textLength;
          }
          if (totallength <= 10) {
            ref.current.classList.add(`${styles.open}`);
            ref2.current.classList.add(`${styles.progressbaropenwrong}`);

            setTimeout(() => {
              ref.current.classList.remove(`${styles.open}`);
              ref2.current.classList.remove(`${styles.progressbaropenwrong}`);
            }, 3000);
            return;
          }
          setProgress(progress + 20 / Object.keys(작성내용).length);
          if (finish == 질문번호 + 1) {
            console.log("제출");

            axios.post(
              `${BASE_URL}report/${title}/`,
              {
                original:
                  작성내용.질문0 +
                  "\n\n" +
                  작성내용.질문1 +
                  "\n\n" +
                  작성내용.질문2,
                title: 작성내용.질문1,
                format: "1",
              },
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: TOKEN,
                },
              }
            );
            setTimeout(2000, navigate(`/feedback/${title}`));
          } else {
            let textareas = document.getElementsByTagName("textarea");
            textareas[0].value = "";
            set질문번호(질문번호 + 1);
          }
        }}
      >
        {finish == 질문번호 + 1 ? "제출하기!" : "다음으로!"}
      </button>
      <div className={styles.popup} ref={ref}>
        <img src={owl} />
        <div className={styles.popuptext}>
          <p>{"글을 조금 더 입력해주세요!"}</p>
        </div>
        <div className={styles.progressbar} ref={ref2}>
          <span className={styles.progress}></span>
        </div>
      </div>
    </>
  );
}
function Form2({ title, BASE_URL, progress, setProgress, TOKEN }) {
  let navigate = useNavigate();
  const 질문 = [
    ["감상문의 제목을 적어보세요!", "비교할 책 제목이 뭔가요?"],
    "먼저 간단하게 읽은 책에 대해 설명해 주세요!",
    "이제 비교를 해볼까요? 주제, 내용, 인물의 성격이나 행동을 비교해보세요!",
    "마지막으로 책을 읽고 나의 느낀 점이나 결심을 적어 주세요! ",
  ];
  const 예시 = ["", ""];

  let [작성내용, set작성내용] = useState({
    질문0: { 제목1: "", 제목2: "" },
    질문1: "",
    질문2: "",
    질문3: "",
  });
  const finish = 4;
  const ref = useRef(null);
  const ref2 = useRef(null);
  let [질문번호, set질문번호] = useState(0);
  return (
    <>
      <div className={styles.container}>
        {질문번호 == 0 ? (
          <>
            <h3 align="left">{질문[질문번호][0]}</h3>
            <textarea
              className={styles.notes2}
              placeholder={예시[0]}
              onChange={(e) => {
                let temp = { ...작성내용 };
                temp[`질문${질문번호}`]["제목1"] = e.target.value;
                set작성내용(temp);
              }}
            ></textarea>
            <h3 align="left">{질문[질문번호][1]}</h3>
            <textarea
              className={styles.notes2}
              placeholder={예시[1]}
              onChange={(e) => {
                let temp = { ...작성내용 };
                temp[`질문${질문번호}`]["제목2"] = e.target.value;
                set작성내용(temp);
              }}
            ></textarea>
          </>
        ) : (
          <>
            <h3 align="left">{질문[질문번호]}</h3>
            <textarea
              className={styles.notes}
              placeholder={예시[질문번호]}
              onChange={(e) => {
                let temp = { ...작성내용 };
                temp[`질문${질문번호}`] = e.target.value;
                set작성내용(temp);
              }}
            ></textarea>
          </>
        )}
      </div>
      <button
        className={styles.button}
        onClick={() => {
          let ta = document.getElementsByTagName("textarea");
          let totallength = 0;
          for (let i = 0; i < ta.length; i++) {
            totallength += ta.item(i).textLength;
          }
          if (totallength <= 10) {
            ref.current.classList.add(`${styles.open}`);
            ref2.current.classList.add(`${styles.progressbaropenwrong}`);

            setTimeout(() => {
              ref.current.classList.remove(`${styles.open}`);
              ref2.current.classList.remove(`${styles.progressbaropenwrong}`);
            }, 3000);
            return;
          }
          setProgress(progress + 20 / Object.keys(작성내용).length);
          if (finish == 질문번호 + 1) {
            console.log("제출");
            axios.post(
              `${BASE_URL}report/${title}/`,
              {
                original:
                  작성내용.질문0.제목1 +
                  "\n\n" +
                  작성내용.질문0.제목2 +
                  "\n\n" +
                  작성내용.질문1 +
                  "\n\n" +
                  작성내용.질문2 +
                  "\n\n" +
                  작성내용.질문3,
                title: 작성내용.질문0.제목1,
                format: "2",
              },
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: TOKEN,
                },
              }
            );
            setTimeout(2000, navigate(`/feedback/${title}`));
          } else {
            let textareas = document.getElementsByTagName("textarea");

            textareas[0].value = "";
            set질문번호(질문번호 + 1);
          }
        }}
      >
        {finish == 질문번호 + 1 ? "제출하기!" : "다음으로!"}
      </button>
      <div className={styles.popup} ref={ref}>
        <img src={owl} />
        <div className={styles.popuptext}>
          <p>{"글을 조금 더 입력해주세요!"}</p>
        </div>
        <div className={styles.progressbar} ref={ref2}>
          <span className={styles.progress}></span>
        </div>
      </div>
    </>
  );
}

function Form3({ title, BASE_URL, progress, setProgress, TOKEN }) {
  let navigate = useNavigate();
  const 질문 = [
    "책에서 인상 깊었던 구절이 있나요? 시의 제목을 생각해보세요!",
    "작품의 정경을 그려보며 나 스스로가 그 속에 동화된 기분을 느껴보세요!",
    ,
  ];
  const 예시 = [
    "예시)나쁜마음은 싫어-백설공주를 읽고",
    "등장 인물과 함께 어울려 대화를 나누는 모습을 상상해보면서 감정을 떠올려 보세요! ",
  ];

  let [작성내용, set작성내용] = useState({
    질문0: { 제목0: "", 내용0: "" },
  });
  const finish = 1;
  const ref = useRef(null);
  const ref2 = useRef(null);

  let [질문번호, set질문번호] = useState(0);
  return (
    <>
      <div className={styles.container} style={{ top: "60%" }}>
        <>
          <h3 align="left">{질문[0]}</h3>
          <textarea
            className={styles.notes2}
            placeholder={예시[0]}
            onChange={(e) => {
              let temp = { ...작성내용 };
              temp[`질문${질문번호}`]["제목0"] = e.target.value;
              set작성내용(temp);
            }}
          ></textarea>
          <h3 align="left">{질문[1]}</h3>
          <textarea
            className={styles.notes}
            placeholder={예시[1]}
            onChange={(e) => {
              let temp = { ...작성내용 };
              temp[`질문${질문번호}`]["내용0"] = e.target.value;
              set작성내용(temp);
            }}
          ></textarea>{" "}
        </>
      </div>
      <button
        className={styles.button}
        onClick={() => {
          let ta = document.getElementsByTagName("textarea");
          let totallength = 0;
          for (let i = 0; i < ta.length; i++) {
            totallength += ta.item(i).textLength;
          }
          if (totallength <= 10) {
            ref.current.classList.add(`${styles.open}`);
            ref2.current.classList.add(`${styles.progressbaropenwrong}`);

            setTimeout(() => {
              ref.current.classList.remove(`${styles.open}`);
              ref2.current.classList.remove(`${styles.progressbaropenwrong}`);
            }, 3000);
            return;
          }
          setProgress(progress + 20 / Object.keys(작성내용).length);
          if (finish == 질문번호 + 1) {
            console.log("제출");
            axios.post(
              `${BASE_URL}report/${title}/`,
              {
                original: 작성내용.질문0.제목0 + "\n\n" + 작성내용.질문0.내용0,
                title: 작성내용.질문0.제목0,
                format: "3",
              },
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: TOKEN,
                },
              }
            );
            setTimeout(2000, navigate(`/feedback/${title}`));
          } else {
            let textareas = document.getElementsByTagName("textarea");

            textareas[0].value = "";
            set질문번호(질문번호 + 1);
          }
        }}
      >
        {finish == 질문번호 + 1 ? "제출하기!" : "다음으로!"}
      </button>
      <div className={styles.popup} ref={ref}>
        <img src={owl} />
        <div className={styles.popuptext}>
          <p>{"글을 조금 더 입력해주세요!"}</p>
        </div>
        <div className={styles.progressbar} ref={ref2}>
          <span className={styles.progress}></span>
        </div>
      </div>
    </>
  );
}

function Form4({ title, BASE_URL, progress, setProgress, TOKEN }) {
  let navigate = useNavigate();
  const 질문 = [
    "비평문의 제목을 적어보세요!",
    "책을 읽고 새롭게 알게된 사실이나 생각의 변화가 있었나요?",
  ];
  const 예시 = [
    "예시)로미오와 줄리엣 작품과 작품해설을 읽고",
    "책을 읽으면서 동의하거나 그렇지 못한 내용이 있나요? 구체적인 근거와 함께 적어보세요!",
  ];

  let [작성내용, set작성내용] = useState({
    질문0: "",
    질문1: "",
  });
  const finish = 2;
  const ref = useRef(null);
  const ref2 = useRef(null);
  let [질문번호, set질문번호] = useState(0);
  return (
    <>
      <div className={styles.container}>
        <>
          {질문번호 == 0 ? (
            <>
              <h3 align="left">{질문[질문번호]}</h3>
              <textarea
                className={styles.notes2}
                placeholder={예시[질문번호]}
                onChange={(e) => {
                  let temp = { ...작성내용 };
                  temp[`질문${질문번호}`] = e.target.value;
                  set작성내용(temp);
                }}
              ></textarea>
            </>
          ) : (
            <>
              {" "}
              <h3 align="left">{질문[질문번호]}</h3>
              <textarea
                className={styles.notes}
                placeholder={예시[질문번호]}
                onChange={(e) => {
                  let temp = { ...작성내용 };
                  temp[`질문${질문번호}`] = e.target.value;
                  set작성내용(temp);
                }}
              ></textarea>
            </>
          )}
        </>
      </div>
      <button
        className={styles.button}
        onClick={() => {
          let ta = document.getElementsByTagName("textarea");
          let totallength = 0;
          for (let i = 0; i < ta.length; i++) {
            totallength += ta.item(i).textLength;
          }
          if (totallength <= 10) {
            ref.current.classList.add(`${styles.open}`);
            ref2.current.classList.add(`${styles.progressbaropenwrong}`);

            setTimeout(() => {
              ref.current.classList.remove(`${styles.open}`);
              ref2.current.classList.remove(`${styles.progressbaropenwrong}`);
            }, 3000);
            return;
          }
          setProgress(progress + 20 / Object.keys(작성내용).length);
          if (finish == 질문번호 + 1) {
            console.log("제출");
            axios.post(
              `${BASE_URL}report/${title}/`,
              {
                original: 작성내용.질문0 + "\n\n" + 작성내용.질문1,
                title: 작성내용.질문0,
                format: "4",
              },
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: TOKEN,
                },
              }
            );
            setTimeout(2000, navigate(`/feedback/${title}`));
          } else {
            let textareas = document.getElementsByTagName("textarea");

            textareas[0].value = "";
            set질문번호(질문번호 + 1);
          }
        }}
      >
        {finish == 질문번호 + 1 ? "제출하기!" : "다음으로!"}
      </button>
      <div className={styles.popup} ref={ref}>
        <img src={owl} />
        <div className={styles.popuptext}>
          <p>{"글을 조금 더 입력해주세요!"}</p>
        </div>
        <div className={styles.progressbar} ref={ref2}>
          <span className={styles.progress}></span>
        </div>
      </div>
    </>
  );
}

function Form5({ title, BASE_URL, progress, setProgress, TOKEN }) {
  let navigate = useNavigate();
  const 질문 = [
    "감상문의 제목을 적어보세요!",
    "자유롭게 독후감상문을 적어보세요!",
  ];
  const 예시 = ["", ""];
  let [작성내용, set작성내용] = useState({
    질문0: "",
    질문1: "",
  });
  const finish = 2;
  const ref = useRef(null);
  const ref2 = useRef(null);
  let [질문번호, set질문번호] = useState(0);
  return (
    <>
      <div className={styles.container}>
        <>
          {질문번호 == 0 ? (
            <>
              <h3 align="left">{질문[질문번호]}</h3>
              <textarea
                className={styles.notes2}
                placeholder={예시[질문번호]}
                onChange={(e) => {
                  let temp = { ...작성내용 };
                  temp[`질문${질문번호}`] = e.target.value;
                  set작성내용(temp);
                }}
              ></textarea>
            </>
          ) : (
            <>
              {" "}
              <h3 align="left">{질문[질문번호]}</h3>
              <textarea
                className={styles.notes}
                placeholder={예시[질문번호]}
                onChange={(e) => {
                  let temp = { ...작성내용 };
                  temp[`질문${질문번호}`] = e.target.value;
                  set작성내용(temp);
                }}
              ></textarea>
            </>
          )}
        </>
      </div>
      <button
        className={styles.button}
        onClick={() => {
          let ta = document.getElementsByTagName("textarea");
          let totallength = 0;
          for (let i = 0; i < ta.length; i++) {
            totallength += ta.item(i).textLength;
          }
          if (totallength <= 10) {
            ref.current.classList.add(`${styles.open}`);
            ref2.current.classList.add(`${styles.progressbaropenwrong}`);

            setTimeout(() => {
              ref.current.classList.remove(`${styles.open}`);
              ref2.current.classList.remove(`${styles.progressbaropenwrong}`);
            }, 3000);
            return;
          }
          setProgress(progress + 20 / Object.keys(작성내용).length);
          if (finish == 질문번호 + 1) {
            console.log("제출");
            // console.log(작성내용.질문0.split('\r\n').join("") + "\n\n" + 작성내용.질문1.split('\r\n').join(""))
            axios.post(
              `${BASE_URL}report/${title}/`,
              {
                original: 작성내용.질문0 + "\n\n" + 작성내용.질문1,
                title: 작성내용.질문0,
                format: "5",
              },
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: TOKEN,
                },
              }
            );
            setTimeout(() => {
              navigate(`/feedback/${title}`);
            }, 1000);
          } else {
            let textareas = document.getElementsByTagName("textarea");

            textareas[0].value = "";
            set질문번호(질문번호 + 1);
          }
        }}
      >
        {finish == 질문번호 + 1 ? "제출하기!" : "다음으로!"}
      </button>
      <div className={styles.popup} ref={ref}>
        <img src={owl} />
        <div className={styles.popuptext}>
          <p>{"글을 조금 더 입력해주세요!"}</p>
        </div>
        <div className={styles.progressbar} ref={ref2}>
          <span className={styles.progress}></span>
        </div>
      </div>
    </>
  );
}

function Form6({ title, BASE_URL, progress, setProgress, TOKEN }) {
  let navigate = useNavigate();
  const 질문 = [
    "감상문의 제목을 적어보세요!",
    "책을 선택하게 된 이유나 계기가 있나요? 그리고 책이 다루고 있는 내용에 대해 평소에 관심이 얼마나 있었나요?",

    "책을 읽고 새롭게 알게 된 사실과 느낀 점을 적어보세요! 혹은 가장 신기하거나 흥미롭게 읽은 부분과 그 이유에 대해 적어보세요!",
    "책을 다 읽고 난 후 깨닫거나 느낀 점에 대해 적어보세요! 그리고 더 알고 싶은 정보와 새롭게 생긴 궁금증이 있나요?",
  ];
  const 예시 = [
    "예시)안녕 달팽이를 읽고, 신비한 달팽이",
    [
      "책을 읽기 전에 책을 통해 알고 싶어 했던 정보가 있나요?",
      "도서의 표지나 제목을 보고 받은 느낌을 적어보세요!",
    ][getRandomInt(0, 2)],
    "책의 내용과 관련한 자신의 경험을 적어보는 건 어때요?",
    [
      "책을 읽은 후 앞으로의 태도 변화나 자신의 진로, 기대와 바람 등과 연결지어 적어보세요!",
      "책 전체에 대한 소감을 적어보는 건 어때요?",
    ][getRandomInt(0, 2)],
  ];

  let [작성내용, set작성내용] = useState({
    질문0: "",
    질문1: "",
    질문2: "",
    질문3: "",
  });
  const finish = 4;
  const ref = useRef(null);
  const ref2 = useRef(null);
  let [질문번호, set질문번호] = useState(0);

  return (
    <>
      <div className={styles.container}>
        {질문번호 == 0 ? (
          <>
            <h3 align="left">{질문[0]}</h3>
            <textarea
              className={styles.notes2}
              placeholder={예시[0]}
              onChange={(e) => {
                let temp = { ...작성내용 };
                temp[`질문${질문번호}`] = e.target.value;
                set작성내용(temp);
              }}
            ></textarea>
          </>
        ) : (
          <>
            <h3 align="left">{질문[질문번호]}</h3>
            <textarea
              className={styles.notes}
              placeholder={예시[질문번호]}
              onChange={(e) => {
                let temp = { ...작성내용 };
                temp[`질문${질문번호}`] = e.target.value;
                set작성내용(temp);
              }}
            ></textarea>
          </>
        )}
      </div>
      <button
        className={styles.button}
        onClick={() => {
          let ta = document.getElementsByTagName("textarea");
          let totallength = 0;
          for (let i = 0; i < ta.length; i++) {
            totallength += ta.item(i).textLength;
          }
          if (totallength <= 10) {
            ref.current.classList.add(`${styles.open}`);
            ref2.current.classList.add(`${styles.progressbaropenwrong}`);

            setTimeout(() => {
              ref.current.classList.remove(`${styles.open}`);
              ref2.current.classList.remove(`${styles.progressbaropenwrong}`);
            }, 3000);
            return;
          }
          setProgress(progress + 20 / Object.keys(작성내용).length);
          if (finish == 질문번호 + 1) {
            console.log("제출");
            axios.post(
              `${BASE_URL}report/${title}/`,
              {
                original:
                  작성내용.질문0 +
                  "\n\n" +
                  작성내용.질문1 +
                  "\n\n" +
                  작성내용.질문2 +
                  "\n\n" +
                  작성내용.질문3,
                title: 작성내용.질문0,
                format: "6",
              },
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: TOKEN,
                },
              }
            );
            setTimeout(2000, navigate(`/feedback/${title}`));
          } else {
            let textareas = document.getElementsByTagName("textarea");

            textareas[0].value = "";
            set질문번호(질문번호 + 1);
          }
        }}
      >
        {finish == 질문번호 + 1 ? "제출하기!" : "다음으로!"}
      </button>
      <div className={styles.popup} ref={ref}>
        <img src={owl} />
        <div className={styles.popuptext}>
          <p>{"글을 조금 더 입력해주세요!"}</p>
        </div>
        <div className={styles.progressbar} ref={ref2}>
          <span className={styles.progress}></span>
        </div>
      </div>
    </>
  );
}
function Form7({ title, BASE_URL, progress, setProgress, TOKEN }) {
  let navigate = useNavigate();
  const 질문 = [
    "감상문의 제목을 적어보세요!",
    "책의 줄거리를 적어볼까요? 중요한 내용이나 전체 줄거리를 요약해도 좋아요!",
    "책의 내용에 대한 나의 감상을 적어볼까요? 중요한 사건에 대한 나의 느낌을 적어도 좋아요!",
    "마지막으로 감동과 교훈적인 내용을 나에 대한 각오로 적어 볼까요?",
  ];
  const 예시 = ["", ""];

  let [작성내용, set작성내용] = useState({
    질문0: "",
    질문1: "",
    질문2: "",
    질문3: "",
  });
  const finish = 4;
  const ref = useRef(null);
  const ref2 = useRef(null);
  let [질문번호, set질문번호] = useState(0);
  return (
    <>
      <div className={styles.container}>
        {질문번호 == 0 ? (
          <>
            <h3 align="left">{질문[0]}</h3>
            <textarea
              className={styles.notes2}
              placeholder={예시[0]}
              onChange={(e) => {
                let temp = { ...작성내용 };
                temp[`질문${0}`] = e.target.value;
                set작성내용(temp);
              }}
            ></textarea>
          </>
        ) : (
          <>
            <h3 align="left">{질문[질문번호]}</h3>
            <textarea
              className={styles.notes}
              placeholder={예시[질문번호]}
              onChange={(e) => {
                let temp = { ...작성내용 };
                temp[`질문${질문번호}`] = e.target.value;
                set작성내용(temp);
              }}
            ></textarea>
          </>
        )}
      </div>
      <button
        className={styles.button}
        onClick={() => {
          let ta = document.getElementsByTagName("textarea");
          let totallength = 0;
          for (let i = 0; i < ta.length; i++) {
            totallength += ta.item(i).textLength;
          }
          if (totallength <= 10) {
            ref.current.classList.add(`${styles.open}`);
            ref2.current.classList.add(`${styles.progressbaropenwrong}`);

            setTimeout(() => {
              ref.current.classList.remove(`${styles.open}`);
              ref2.current.classList.remove(`${styles.progressbaropenwrong}`);
            }, 3000);
            return;
          }
          setProgress(progress + 20 / Object.keys(작성내용).length);
          if (finish == 질문번호 + 1) {
            console.log("제출");
            axios.post(
              `${BASE_URL}report/${title}/`,
              {
                original:
                  작성내용.질문0 +
                  "\n\n" +
                  작성내용.질문1 +
                  "\n\n" +
                  작성내용.질문2 +
                  "\n\n" +
                  작성내용.질문3,
                title: 작성내용.질문0,
                format: "7",
              },
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: TOKEN,
                },
              }
            );
            setTimeout(2000, navigate(`/feedback/${title}`));
          } else {
            let textareas = document.getElementsByTagName("textarea");

            textareas[0].value = "";
            set질문번호(질문번호 + 1);
          }
        }}
      >
        {finish == 질문번호 + 1 ? "제출하기!" : "다음으로!"}
      </button>
      <div className={styles.popup} ref={ref}>
        <img src={owl} />
        <div className={styles.popuptext}>
          <p>{"글을 조금 더 입력해주세요!"}</p>
        </div>
        <div className={styles.progressbar} ref={ref2}>
          <span className={styles.progress}></span>
        </div>
      </div>
    </>
  );
}

function Form8({ title, BASE_URL, progress, setProgress, TOKEN }) {
  let navigate = useNavigate();
  const 질문 = [
    "감상문의 제목을 적어보세요!",
    "무엇을 바꿔 쓸지 적어보고 이유도 적어보세요!",
    "바꾸기 전에 내용은 무엇인가요? 간략하게 줄거리도 적어주세요!",
    "바꾸기 후에 내용은 무엇인가요? ",
  ];
  const 예시 = [
    "예시)'다이고로야 고마워' 바꿔 쓰기",
    "이야기의 끝 부분~, 일이 일어난 시간이나 장소~, 작품 속에서 일어난 일~",
  ];
  let [작성내용, set작성내용] = useState({
    질문0: "",
    질문1: "",
    질문2: "",
    질문3: "",
  });
  const finish = 4;
  const ref = useRef(null);
  const ref2 = useRef(null);
  let [질문번호, set질문번호] = useState(0);
  return (
    <>
      <div className={styles.container}>
        {질문번호 == 0 ? (
          <>
            <h3 align="left">{질문[0]}</h3>
            <textarea
              className={styles.notes2}
              placeholder={예시[0]}
              onChange={(e) => {
                let temp = { ...작성내용 };
                temp[`질문${질문번호}`] = e.target.value;
                set작성내용(temp);
              }}
            ></textarea>
          </>
        ) : (
          <>
            <h3 align="left">{질문[질문번호]}</h3>
            <textarea
              className={styles.notes}
              placeholder={예시[질문번호]}
              onChange={(e) => {
                let temp = { ...작성내용 };
                temp[`질문${질문번호}`] = e.target.value;
                set작성내용(temp);
              }}
            ></textarea>
          </>
        )}
      </div>
      <button
        className={styles.button}
        onClick={() => {
          let ta = document.getElementsByTagName("textarea");
          let totallength = 0;
          for (let i = 0; i < ta.length; i++) {
            totallength += ta.item(i).textLength;
          }
          if (totallength <= 10) {
            ref.current.classList.add(`${styles.open}`);
            ref2.current.classList.add(`${styles.progressbaropenwrong}`);

            setTimeout(() => {
              ref.current.classList.remove(`${styles.open}`);
              ref2.current.classList.remove(`${styles.progressbaropenwrong}`);
            }, 3000);
            return;
          }
          setProgress(progress + 20 / Object.keys(작성내용).length);
          if (finish == 질문번호 + 1) {
            console.log("제출");
            axios.post(
              `${BASE_URL}report/${title}/`,
              {
                original:
                  작성내용.질문0 +
                  "\n\n" +
                  작성내용.질문1 +
                  "\n\n" +
                  작성내용.질문2 +
                  "\n\n" +
                  작성내용.질문3,
                title: 작성내용.질문0,
                format: "8",
              },
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: TOKEN,
                },
              }
            );
            setTimeout(2000, navigate(`/feedback/${title}`));
          } else {
            let textareas = document.getElementsByTagName("textarea");

            textareas[0].value = "";
            set질문번호(질문번호 + 1);
          }
        }}
      >
        {finish == 질문번호 + 1 ? "제출하기!" : "다음으로!"}
      </button>
      <div className={styles.popup} ref={ref}>
        <img src={owl} />
        <div className={styles.popuptext}>
          <p>{"글을 조금 더 입력해주세요!"}</p>
        </div>
        <div className={styles.progressbar} ref={ref2}>
          <span className={styles.progress}></span>
        </div>
      </div>
    </>
  );
}

export default Writefrom;
