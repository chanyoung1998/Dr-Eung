/*eslint-disable */
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Nav, Modal, Row, Col, Button } from "react-bootstrap";
import styles from "./Activity.module.css";
import axios from "axios";
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
import submiticon from "./img/savesubmit.png";

import owl from "./img/owl.png";
import { useSelector } from "react-redux";

function Activity() {
  let param = useParams();
  let navigate = useNavigate();
  const title = param.title;
  const curchapter = Number(param.chapter);

  // let [clicked, setClicked] = useState(0);
  let clicked = 0;

  const [keywordinput, setKeyword] = useState("");
  const [reasoninput, setReason] = useState("");
  const [summaryinput, setSummary] = useState("");
  const [feelinginput, setFeeling] = useState("");

  // let keywordinput = "";
  // let reasoninput = "";
  // let summaryinput = "";
  // let feelinginput = "";

  const numbers = ["핵심 단어", "이유", "요약", "느낌"];
  const [questions, setQuestions] = useState({});

  const BASE_URL = useSelector((state) => state.BASE_URL);
  const [isLoading, setLoading] = useState(true);

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  const ref1_1 = useRef(null);
  const ref2_1 = useRef(null);
  const ref3_1 = useRef(null);
  const ref4_1 = useRef(null);

  const ref5 = useRef(null);
  const ref6 = useRef(null);
  let [popuptext, setPopuptext] = useState("");

  const [progress, setProgress] = useState(0);
  let [save, setSave] = useState([false, false, false, false]);

  useEffect(() => {
    axios
      .all([
        axios.get(`${BASE_URL}report/${title}/${curchapter}/activity/`, {
          headers: {
            Authorization: "Token 6ea207c7412c800ec623637b51877c483d2f2cdf",
          },
        }),
      ])
      .then(
        axios.spread((res) => {
          setQuestions(res.data);
          setKeyword(res.data.keyword_answer);
          setReason(res.data.reason_answer);
          setSummary(res.data.summary_answer);
          setFeeling(res.data.feeling_answer);
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
        <Nav
          id="bootstrap-overrides"
          justify
          variant="tabs"
          defaultActiveKey="0"
          style={{ border: "none", zIndex: "0" }}
        >
          {numbers.map(function (e, i) {
            return (
              <div>
                <Nav.Item id={styles.wrap}>
                  <Nav.Link
                    id={styles.navlink}
                    eventKey={i}
                    onClick={() => {
                      clicked = i;

                      ref1.current.classList.remove(`${styles.zindex}`);
                      ref2.current.classList.remove(`${styles.zindex}`);
                      ref3.current.classList.remove(`${styles.zindex}`);
                      ref4.current.classList.remove(`${styles.zindex}`);

                      ref1_1.current.classList.remove(`${styles.ondisplay}`);
                      ref2_1.current.classList.remove(`${styles.ondisplay}`);
                      ref3_1.current.classList.remove(`${styles.ondisplay}`);
                      ref4_1.current.classList.remove(`${styles.ondisplay}`);

                      if (clicked == 0) {
                        ref1.current.classList.add(`${styles.zindex}`);
                        ref1_1.current.classList.add(`${styles.ondisplay}`);
                        ref1.current.value = keywordinput;
                      } else if (clicked == 1) {
                        ref2.current.classList.add(`${styles.zindex}`);
                        ref2_1.current.classList.add(`${styles.ondisplay}`);
                        ref2.current.value = reasoninput;
                      } else if (clicked == 2) {
                        ref3.current.classList.add(`${styles.zindex}`);
                        ref3_1.current.classList.add(`${styles.ondisplay}`);
                        ref3.current.value = summaryinput;
                      } else if (clicked == 3) {
                        ref4.current.classList.add(`${styles.zindex}`);
                        ref4_1.current.classList.add(`${styles.ondisplay}`);
                        ref4.current.value = feelinginput;
                      }
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
          <div style={{ position: "relative" }}>
            <p
              align="left"
              ref={ref1_1}
              className={`${styles.q1} ${styles.ondisplay}`}
            >
              {questions.keyword}
            </p>
            <p align="left" ref={ref2_1} className={styles.q2}>
              {questions.reason}
            </p>
            <p align="left" ref={ref3_1} className={styles.q3}>
              {questions.summary}
            </p>
            <p align="left" ref={ref4_1} className={styles.q4}>
              {questions.feeling}
            </p>
          </div>
          <Row>
            <Col md={4} className={styles.owllayout}>
              <img src={owl} className={styles.owl} />
            </Col>
            <Col md={{ span: 4, offset: 4 }} className={styles.submitlayout}>
              <img
                src={submiticon}
                className={styles.submiticon}
                onClick={() => {
                  if (clicked == 0) {
                    if (ref1.current.value.length == 0) {
                      setPopuptext("핵심 단어를 입력해주세요!");

                      ref5.current.classList.add(`${styles.open}`);
                      ref6.current.classList.add(
                        `${styles.progressbaropenwrong}`
                      );

                      setTimeout(() => {
                        ref5.current.classList.remove(`${styles.open}`);
                        ref6.current.classList.remove(
                          `${styles.progressbaropenwrong}`
                        );
                      }, 3000);
                      return;
                    }

                    setKeyword(ref1.current.value);
                  } else if (clicked == 1) {
                    if (ref2.current.value.length <= 20) {
                      setPopuptext("글이 너무 짧아요!");

                      ref5.current.classList.add(`${styles.open}`);
                      ref6.current.classList.add(
                        `${styles.progressbaropenwrong}`
                      );

                      setTimeout(() => {
                        ref5.current.classList.remove(`${styles.open}`);
                        ref6.current.classList.remove(
                          `${styles.progressbaropenwrong}`
                        );
                      }, 3000);
                      return;
                    }
                    setReason(ref2.current.value);
                  } else if (clicked == 2) {
                    if (ref3.current.value.length <= 20) {
                      setPopuptext("글이 너무 짧아요!");

                      ref5.current.classList.add(`${styles.open}`);
                      ref6.current.classList.add(
                        `${styles.progressbaropenwrong}`
                      );

                      setTimeout(() => {
                        ref5.current.classList.remove(`${styles.open}`);
                        ref6.current.classList.remove(
                          `${styles.progressbaropenwrong}`
                        );
                      }, 3000);
                      return;
                    }
                    setSummary(ref3.current.value);
                  } else if (clicked == 3) {
                    if (ref4.current.value.length <= 20) {
                      setPopuptext("글이 너무 짧아요!");

                      ref5.current.classList.add(`${styles.open}`);
                      ref6.current.classList.add(
                        `${styles.progressbaropenwrong}`
                      );

                      setTimeout(() => {
                        ref5.current.classList.remove(`${styles.open}`);
                        ref6.current.classList.remove(
                          `${styles.progressbaropenwrong}`
                        );
                      }, 3000);
                      return;
                    }
                    setFeeling(ref4.current.value);
                  }

                  if (save[clicked] == false) {
                    setProgress(progress + 20);
                    let temp = [...save];
                    temp[clicked] = true;
                    setSave(temp);
                    
                  }
                }}
              />
            </Col>
          </Row>
          <div style={{ position: "relative" }}>
            <textarea
              id="textarea"
              ref={ref2}
              className={`${styles.writelayer} ${styles.note} ${styles.ta2}`}
              placeholder="왜 그렇게 생각했나요?"
              onChange={() => {
                clicked = 1;
              }}
              onFocus={() => {
                clicked = 1;
              }}
            ></textarea>
            <textarea
              id="textarea"
              ref={ref3}
              className={`${styles.writelayer} ${styles.note} ${styles.ta3}`}
              placeholder="이번 단원을 4~5문장으로 요약해보세요!"
              onChange={() => {
                clicked = 2;
              }}
              onFocus={() => {
                clicked = 2;
              }}
            ></textarea>
            <textarea
              id="textarea"
              ref={ref4}
              className={`${styles.writelayer} ${styles.note} ${styles.ta4}`}
              placeholder="이번 단원에서 느낀점을 적어보세요!"
              onChange={() => {
                clicked = 3;
              }}
              onFocus={() => {
                clicked = 3;
              }}
            ></textarea>
            <textarea
              id="textarea"
              ref={ref1}
              className={`${styles.writelayer} ${styles.note} ${styles.ta1}`}
              placeholder="이번 단원에서 가장 기억에 남는 단어는 무엇인지 적어보세요!"
              onChange={() => {
                clicked = 0;
              }}
              onFocus={() => {
                clicked = 0;
              }}
            >
              {keywordinput}
            </textarea>
          </div>
        </div>
      </div>

      <Button
        id={styles.ReadButton}
        size="lg"
        onClick={() => {
          if (progress == 80) {
            axios.post(
              `${BASE_URL}report/${title}/${curchapter}/activity/`,
              {
                keyword: keywordinput,
                reason: reasoninput,
                summary: summaryinput,
                feeling: feelinginput,
              },
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization:
                    "Token 6ea207c7412c800ec623637b51877c483d2f2cdf",
                },
              }
            );
            navigate(`/reading/${title}/${curchapter + 1}/1`);
          } else {
            setPopuptext("작성하지 않은 항목이 있어요!");

            ref5.current.classList.add(`${styles.open}`);
            ref6.current.classList.add(`${styles.progressbaropenwrong}`);

            setTimeout(() => {
              ref5.current.classList.remove(`${styles.open}`);
              ref6.current.classList.remove(`${styles.progressbaropenwrong}`);
            }, 3000);
            return;
          }
        }}
      >
        제출하기
      </Button>

      <div className={styles.backbutton}>
        <button
          onClick={() => {
            axios.post(
              `${BASE_URL}report/${title}/${curchapter}/activity/`,
              {
                keyword: keywordinput,
                reason: reasoninput,
                summary: summaryinput,
                feeling: feelinginput,
              },
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization:
                    "Token 6ea207c7412c800ec623637b51877c483d2f2cdf",
                },
              }
            );
            navigate("/home");
            // 마이페이지로 연결
          }}
        >
          돌아가기
        </button>
      </div>
      <Button id={styles.leftButton}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          size="6x"
          onClick={() => {
            setLoading(true);
            axios.post(
              `${BASE_URL}report/${title}/${curchapter}/activity/`,
              {
                keyword: keywordinput,
                reason: reasoninput,
                summary: summaryinput,
                feeling: feelinginput,
              },
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization:
                    "Token 6ea207c7412c800ec623637b51877c483d2f2cdf",
                },
              }
            );
            navigate(`/quiz/${title}/${curchapter}`);
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
      <div className={styles.ProgressContainer}>
        <ul>
          <div>{`${curchapter}단원 활동`}</div>
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
      <div className={styles.popup} ref={ref5}>
        <img src={owl} />
        <div className={styles.popuptext}>
          <p>{popuptext}</p>
        </div>
        <div className={styles.progressbar} ref={ref6}>
          <span className={styles.progress}></span>
        </div>
      </div>
    </>
  );
}

export default Activity;
