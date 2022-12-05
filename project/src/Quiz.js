/*eslint-disable */
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Nav, Modal, Row, Col, Button } from "react-bootstrap";
import styles from "./Quiz.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faCircle as faCircleSolid,
  faSlash,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

import leaf from "./img/leaf.png";
import branch from "./img/branch.png";
import bulb from "./img/bulb.png";
import submiticon from "./img/submit3.png";
import owl from "./img/owl.png";

function Quiz() {
  const param = useParams();
  const title = param.title;
  const currentChapter = param.chapter;
  const [isLoading, setLoading] = useState(true);
  const ref = useRef(null);
  const ref2 = useRef(null);
  const [popup, setPopup] = useState(false);
  let [popuptext, setPopuptext] = useState("");
  // tab
  let [clicked, setClicked] = useState(0);
  // 클릭한 answer
  let [answerClicked, setAnswerClicked] = useState(0);
  let [imgShow, setImgShow] = useState([false, false, false, false, false]);
  // modal
  let [show, setShow] = useState(false);
  const numbers = ["일 번", "이 번", "삼 번", "사 번", "오 번"];
  let [hint, setHint] = useState("");
  // 실제 정답
  let [answer, setAnswer] = useState(null);
  let [wrongcount, setWrongcount] = useState(0);
  // 푼 정답 statew 저장
  let [answerstate, setAnswerstate] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  // 문제 풀면 activity로 이동하기 위함.
  let [questionCount, setQuestioncount] = useState(0);
  let navigate = useNavigate();
  if (questionCount == 5) {
    setTimeout(() => {
      navigate(`/activity/${title}/${currentChapter}/`);
    }, 3000);
  }

  const [progress, setProgress] = useState(0);

  const BASE_URL = useSelector((state) => state.BASE_URL);
  // const TOKEN = useSelector((state) => state.TOKEN);
  const TOKEN = localStorage.getItem('TOKEN')
  let [quizs, setQuizs] = useState([{}, {}, {}, {}, {}]);

  useEffect(() => {
    axios
      .all([
        axios.get(
          `${BASE_URL}quiz/${title}/${currentChapter}/?quiz_number=${1}`,
          {
            headers: {
              Authorization: TOKEN,
            },
          }
        ),
        axios.get(
          `${BASE_URL}quiz/${title}/${currentChapter}/?quiz_number=${2}`,
          {
            headers: {
              Authorization: TOKEN,
            },
          }
        ),
        axios.get(
          `${BASE_URL}quiz/${title}/${currentChapter}/?quiz_number=${3}`,
          {
            headers: {
              Authorization: TOKEN,
            },
          }
        ),
        axios.get(
          `${BASE_URL}quiz/${title}/${currentChapter}/?quiz_number=${4}`,
          {
            headers: {
              Authorization: TOKEN,
            },
          }
        ),
        axios.get(
          `${BASE_URL}quiz/${title}/${currentChapter}/?quiz_number=${5}`,
          {
            headers: {
              Authorization: TOKEN,
            },
          }
        ),
      ])

      .then(
        axios.spread((res1, res2, res3, res4, res5) => {
          // let temp = [res1.data, res2.data, res3.data, res4.data, res5.data];
          setQuizs([res1.data, res2.data, res3.data, res4.data, res5.data]);
          setLoading(false);
        })
      );
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.container}>
        <HintModal show={show} setShow={setShow} hint={hint} />
        <Nav
          id="bootstrap-overrides"
          justify
          variant="tabs"
          defaultActiveKey="0"
          style={{ border: "none", zIndex: "0" }}
        >
          {numbers.map(function (e, i) {
            let leftmove = [
              styles.leftmove0,
              styles.leftmove1,
              styles.leftmove2,
              styles.leftmove3,
              styles.leftmove4,
            ][i];
            let leftmoveZindex = [
              styles.leftmove0_2,
              styles.leftmove1_2,
              styles.leftmove2_2,
              styles.leftmove3_2,
              styles.leftmove4_2,
            ][i];

            let leftclass = clicked == i ? leftmoveZindex : leftmove;

            return (
              <div>
                <Nav.Item id={styles.wrap} className={leftclass}>
                  <Nav.Link
                    id={styles.navlink}
                    eventKey={i}
                    onClick={() => {
                      setClicked(i);
                      setAnswerClicked(0);
                      setImgShow([false, false, false, false, false]);
                      setShow(false);
                      setHint("");
                      setAnswer(null);
                      setWrongcount(0);
                    }}
                  >
                    <h1>{e}</h1>
                  </Nav.Link>
                </Nav.Item>
              </div>
            );
          })}
        </Nav>

        <div className={styles.content}>
          <div>
            <p align="left">{quizs[clicked].question}</p>
          </div>
          <Row>
            <Col md={4} className={styles.bulblayout}>
              <img
                src={bulb}
                className={styles.bulb}
                onClick={() => {
                  if (wrongcount >= 2) {
                    setShow(true);
                  }
                }}
                style={{ display: wrongcount >= 2 ? "" : "none" }}
              />
            </Col>
            <Col md={{ span: 4, offset: 4 }} className={styles.submitlayout}>
              <img
                src={submiticon}
                className={styles.submiticon}
                onClick={() => {
                  if (answer == null) {
                    axios
                      .put(
                        `${BASE_URL}quiz/${title}/${currentChapter}/?quiz_number=${
                          clicked + 1
                        }`,
                        { answer: answerClicked + 1 },
                        {
                          headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization:
                              TOKEN,
                          },
                        }
                      )
                      .then((res) => {
                        if (res.data == "정답입니다!") {
                          let temp = [...imgShow];
                          temp[answerClicked] = true;
                          setAnswer(answerClicked);
                          setImgShow(temp);
                          
                          setPopuptext("정답입니다. 잘 했어요!");
                          ref.current.classList.add(`${styles.open}`);
                          ref2.current.classList.add(
                            `${styles.progressbaropen}`
                          );

                          setTimeout(() => {
                            ref.current.classList.remove(`${styles.open}`);
                            ref2.current.classList.remove(
                              `${styles.progressbaropen}`
                            );
                          }, 3000);

                          if(answerstate[clicked] == false){
                            setProgress(progress + 16);
                            let temp = [...answerstate]
                            temp[clicked] = true
                            setAnswerstate(temp)
                            setQuestioncount(questionCount + 1);
                          }
                          
                        } else {
                          let temp = [...imgShow];
                          temp[answerClicked] = true;
                          setImgShow(temp);
                          setWrongcount(wrongcount + 1);
                          setHint(res.data.hint.join(" "));
                          setPopuptext("한번더 생각해보세요!");

                          ref.current.classList.add(`${styles.open}`);
                          ref2.current.classList.add(
                            `${styles.progressbaropenwrong}`
                          );

                          setTimeout(() => {
                            ref.current.classList.remove(`${styles.open}`);
                            ref2.current.classList.remove(
                              `${styles.progressbaropenwrong}`
                            );
                          }, 3000);
                        }
                      });
                  }
                }}
              />
            </Col>
          </Row>

          <div className={styles.choicelayer}>
            {[0, 1, 2, 3, 4].map(function (e, i) {
              const options = quizs[clicked].choice;

              return (
                <p
                  align="left"
                  onClick={() => {
                    setAnswerClicked(e);
                  }}
                >
                  <img
                    src={answer == e ? leaf : branch}
                    className={answer == e ? styles.leaf : styles.branch}
                    style={{ display: imgShow[e] == true ? "" : "none" }}
                  />
                  <FontAwesomeIcon
                    icon={answerClicked == e ? faCircleSolid : faCircle}
                    size="1x"
                  />
                  &nbsp;&nbsp;{options[e]}
                </p>
              );
            })}
          </div>
        </div>
        <Button id={styles.leftButton}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            size="6x"
            onClick={() => {
              setLoading(true);
              axios
                .get(`${BASE_URL}book/${title}/${currentChapter}/?page=1`, {
                  headers: {
                    Authorization:
                      TOKEN,
                  },
                })
                .then((data) => {
                  navigate(
                    `/reading/${title}/${currentChapter}/${data.data.pages}`
                  );
                });
            }}
          />
        </Button>
        <Button id={styles.rightButton}>
          <FontAwesomeIcon
            icon={faChevronRight}
            size="6x"
            onClick={() => {
              navigate(1);
            }}
          />
        </Button>
      </div>
      <div className={styles.backbutton}>
        <button
          className={styles.backbuttonbtn}
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
          <div>{`${currentChapter}단원 퀴즈`}</div>
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

      <div className={styles.popup} ref={ref}>
        <img src={owl} />
        <div className={styles.popuptext}>
          <p>{popuptext}</p>
        </div>
        <div className={styles.progressbar} ref={ref2}>
          <span className={styles.progress}></span>
        </div>
      </div>
    </>
  );
}

function HintModal({ show, setShow, hint }) {
  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        dialogClassName={styles.mymodal}
      >
        <Modal.Header closeButton style={{ background: "#FFF7E9" }}>
          <Modal.Title>힌트</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#FFF7E9" }}>
          <p>{hint}</p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Quiz;
