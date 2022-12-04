import { useNavigate, useParams } from "react-router-dom";
import styles from "./Bingo.module.css";
import { useState, useRef, useEffect, useMemo } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { parse } from "@fortawesome/fontawesome-svg-core";

function Bingo() {
  const BASE_URL = useSelector((state) => state.BASE_URL);
  const param = useParams();
  const title = param.title;
  const navigate = useNavigate();
  //   const title = "어린왕자";

  let [contentsCom, setContentsCom] = useState([]);
  let [rotateCom, setRotateCom] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  let computerSequence = [0, 1, 2, 3, 4, 5, 6, 7, 8].sort(
    () => Math.random() - 0.5
  );
  useEffect(() => {
    axios
      .get(`${BASE_URL}book/${title}/keywords?num=9`, {
        headers: {
          Authorization: "Token 6ea207c7412c800ec623637b51877c483d2f2cdf",
        },
      })
      .then((res) => {
        console.log(res.data);

        let temp = res.data.keywords;
        temp.sort(() => Math.random() - 0.5);
        setContentsCom(temp.slice(0, 9));
      });
  }, []);

  let [userKeyword, setUserKeyword] = useState([]);
  let [bingo, setBingo] = useState([]);
  let [start, setStart] = useState(false);
  let [finish, setFinish] = useState(0);

  let particles = [];
  const colors = ["#eb6383", "#fa9191", "#ffe9c5", "#b4f2e1"];
  const pop = () => {
    for (let i = 0; i < 50; i++) {
      const p = document.createElement("particule");
      p.x = window.innerWidth * 0.5;
      p.y = window.innerHeight + Math.random() * window.innerHeight * 0.3;
      p.vel = {
        x: (Math.random() - 0.5) * 10,
        y: Math.random() * -20 - 15,
      };
      p.mass = Math.random() * 0.2 + 0.8;
      particles.push(p);
      p.style.transform = `translate(${p.x}px, ${p.y}px)`;
      const size = Math.random() * 15 + 5;
      p.style.width = size + "px";
      p.style.height = size + "px";
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      document.body.appendChild(p);
    }
    render();
  };
  const render = () => {
    for (let i = particles.length - 1; i--; i > -1) {
      const p = particles[i];
      p.style.transform = `translate3d(${p.x}px, ${p.y}px, 1px)`;

      p.x += p.vel.x;
      p.y += p.vel.y;

      p.vel.y += 0.5 * p.mass;
      if (p.y > window.innerHeight * 2) {
        p.remove();
        particles.splice(i, 1);
      }
    }
    requestAnimationFrame(render);
  };

  return (
    <div className={styles.popbody}>
      <h1>엉박사와 함께하는 {title} 빙고</h1>
      <div className={styles.boardwrapper}>
        <BoardUser
          userKeyword={userKeyword}
          start={start}
          rotateCom={rotateCom}
          setRotateCom={setRotateCom}
          computerSequence={computerSequence}
          bingo={bingo}
          setBingo={setBingo}
          contentsCom={contentsCom}
          setFinish={setFinish}
        />
        <BoardComputer
          contents={contentsCom}
          rotate={rotateCom}
          setRotate={setRotateCom}
          start={start}
        />
      </div>

      {finish == 0 ? (
        <Input
          userKeyword={userKeyword}
          setUserKeyword={setUserKeyword}
          start={start}
          setStart={setStart}
          bingo={bingo}
        />
      ) : (
        <div><button className={styles.finishbutton} onClick={()=>{navigate('/home')}}>{finish == 1? '이겼습니다!' : '다음 기회에..'}</button>{pop()}</div>
      )}
    </div>
  );
}
export default Bingo;

function BoardComputer({ contents, rotate, setRotate, start }) {
  if (!start) {
    return <></>;
  }
  return (
    <div>
      <div className={styles.board}>
        {contents.map(function (e, i) {
          return (
            <>
              <div className={styles.flip}>
                {rotate[i] ? (
                  <div className={styles.cell}>
                    <div className={styles.front}>
                      <p>{e}</p>
                    </div>
                    <div className={styles.back}></div>
                  </div>
                ) : (
                  <div className={`${styles.cell} ${styles.rotate}`}>
                    <div className={styles.front}>
                      <p>{e}</p>
                    </div>
                    <div className={styles.back}></div>
                  </div>
                )}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
function BoardUser({
  userKeyword,
  start,
  rotateCom,
  setRotateCom,
  computerSequence,
  bingo,
  setBingo,
  contentsCom,
  setFinish,
}) {
  let [turn, setTurn] = useState(0);
  let [userclicked, setUserClicked] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  let userbingo = 0;
  for (let i = 0; i < 3; i++) {
    //가로 빙고
    if (
      userclicked[3 * i + 0] &
      userclicked[3 * i + 1] &
      userclicked[3 * i + 2]
    ) {
      userbingo += 1;
    }

    if (userclicked[0 + i] & userclicked[3 + i] & userclicked[6 + i]) {
      userbingo += 1;
    }
  }
  if (userclicked[0] & userclicked[4] & userclicked[8]) {
    userbingo += 1;
  }
  if (userclicked[2] & userclicked[4] & userclicked[6]) {
    userbingo += 1;
  }
  let computerbingo = 0;
  for (let i = 0; i < 3; i++) {
    //가로 빙고
    if (rotateCom[3 * i + 0] & rotateCom[3 * i + 1] & rotateCom[3 * i + 2]) {
      computerbingo += 1;
    }

    if (rotateCom[0 + i] & rotateCom[3 + i] & rotateCom[6 + i]) {
      computerbingo += 1;
    }
  }
  if (rotateCom[0] & rotateCom[4] & rotateCom[8]) {
    computerbingo += 1;
  }
  if (rotateCom[2] & rotateCom[4] & rotateCom[6]) {
    computerbingo += 1;
  }

  if (userbingo >= 3) {
    setFinish(1);
  } else if (computerbingo >= 3) {
    setFinish(2);
  }

  return (
    <div>
      <div className={styles.board}>
        {userKeyword.map(function (e, index) {
          return userclicked[index] == false ? (
            <div
              className={styles.usercell}
              onClick={() => {
                if (start) {
                  // turn : 0 사용자
                  if (turn % 2 == 0) {
                    if (!userclicked[index]) {
                      // 고른 단어를 저장하는 부분
                      let tempbingo = [...bingo];
                      tempbingo.push(e);
                      setBingo(tempbingo);

                      //유저가 고른 부분
                      let temp = [...userclicked];
                      temp[index] = true;
                      setUserClicked(temp);

                      //유저가 고른 단어가 컴퓨터 단어에 포함되나 확인
                      for (let i = 0; i < 9; i++) {
                        if (contentsCom[i] == e) {
                          let temp = [...rotateCom];
                          temp[i] = true;
                          setRotateCom(temp);
                        }
                      }

                      setTurn(turn + 1);
                    }
                  }
                }
              }}
            >
              <p>{e}</p>
            </div>
          ) : (
            <div id={styles.clicked} className={styles.usercell}>
              <p>{e}</p>
            </div>
          );
        })}
      </div>

      {start ? (
        <button
          className={styles.turnbutton}
          onClick={() => {
            if (turn % 2 == 1) {
              for (let i = 0; i < 9; i++) {
                let computer = computerSequence[i];
                if (!rotateCom[computer]) {
                  // 고른 단어를 저장하는 부분
                  let tempbingo = [...bingo];
                  tempbingo.push(contentsCom[computer]);
                  setBingo(tempbingo);
                  // 컴퓨터가 고르는 부분
                  let temp = [...rotateCom];
                  temp[computer] = true;
                  setRotateCom(temp);
                  setTurn(turn + 2);

                  // 컴퓨터가 고른 단어가 유저 단어에 포함되는지 확인
                  for (let i = 0; i < 9; i++) {
                    if (userKeyword[i] == contentsCom[computer]) {
                      let temp = [...userclicked];
                      temp[i] = true;
                      setUserClicked(temp);
                    }
                  }

                  // setTurn(turn+1);
                  break;
                }
              }
            }
            setTurn(turn + 1);
          }}
        >
          {turn % 2 == 0 ? "사용자" : "컴퓨터"}
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
function Input({ userKeyword, setUserKeyword, start, setStart, bingo }) {
  let ref = useRef(null);

  return (
    <>
      {start == false ? (
        <div>
          <div className={styles.inputwrapper}>
            <div className={styles.innerwrapper}>
              <div>
                <button
                  className={styles.inputbutton}
                  onClick={() => {
                    if (userKeyword.length < 9) {
                      let temp = [...userKeyword];
                      temp.push(ref.current.value);
                      setUserKeyword(temp);
                      ref.current.value = "";
                    }
                  }}
                >
                  단어 추가
                </button>
              </div>
              <div>
                <textarea
                  id="textarea"
                  ref={ref}
                  className={styles.note}
                  placeholder={
                    userKeyword.length != 9
                      ? "단어를 입력해주세요!"
                      : "시작하세요!"
                  }
                  style={{ fontSize: "2em" }}
                  readOnly={userKeyword.length == 9 ? true : false}
                  onKeyDown={(e) => {
                    if ((e.key == "Enter") & (userKeyword.length < 9)) {
                      for (let i = 0; i < userKeyword.length; i++) {
                        if (ref.current.value == userKeyword[i]) {
                          e.preventDefault();
                          ref.current.value = "";
                          ref.current.placeholder =
                            "중복된 단어입니다! 다시 입력해주세요!";

                          return;
                        }
                      }

                      let temp = [...userKeyword];
                      temp.push(ref.current.value);
                      e.preventDefault();
                      ref.current.placeholder = "단어를 입력해주세요!";
                      ref.current.value = "";
                      setUserKeyword(temp);
                    }
                  }}
                ></textarea>
              </div>
            </div>
          </div>
          <div className={styles.wordarea}>
            {userKeyword.map(function (e, i) {
              //   console.log(userKeyword);
              return (
                <div key={i} className={styles.word}>
                  <FontAwesomeIcon
                    className={styles.icon}
                    icon={faCircleXmark}
                    size="2x"
                    onClick={() => {
                      let temp = [...userKeyword];
                      temp.splice(temp.indexOf(userKeyword[i]), 1);
                      setUserKeyword(temp);
                    }}
                  />
                  <p>{e}</p>
                </div>
              );
            })}

            {userKeyword.length == 9 ? (
              <button
                className={styles.startbutton}
                onClick={() => {
                  setStart(true);
                }}
              >
                시작하기
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <div className={styles.wordarea}>
          {bingo.map(function (e, i) {
            // console.log(userKeyword);
            return (
              <div key={i} className={styles.word}>
                <p>{e}</p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
