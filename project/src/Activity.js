/*eslint-disable */
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Nav, Modal, Row, Col ,Button} from "react-bootstrap";
import styles from "./Activity.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faCircle as faCircleSolid,
  faSlash,
} from "@fortawesome/free-solid-svg-icons";
import leaf from "./img/leaf.png";
import branch from "./img/branch.png";
import bulb from "./img/bulb.png";
import submiticon from "./img/submit3.png";
import submiticon2 from "./img/submit2.png";
import owl from "./img/owl.png";
import { useSelector } from "react-redux";

function Activity() {
  let param = useParams();
  let navigate = useNavigate();
  const title = param.title;
  const curchapter = Number(param.chapter);

  let [clicked2, setClicked2] = useState(0);
  let clicked = 0;

  // const [keywordinput, setKeyword] = useState("");
  // const [reasoninput, setReason] = useState("");
  // const [summaryinput, setSummary] = useState("");
  // const [feelinginput, setFeeling] = useState("");

  let keywordinput = "";
  let reasoninput = "";
  let summaryinput = "";
  let feelinginput = "";

  const numbers = ["Keyword", "Reason", "Summary", "Feeling"];
  const [questions, setQuestions] = useState({});

  const BASE_URL = useSelector((state) => state.BASE_URL);
  const [isLoading, setLoading] = useState(true);

  const ref = useRef(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}report/${title}/${curchapter}/activity/`, {
        headers: {
          Authorization: "Token 6ea207c7412c800ec623637b51877c483d2f2cdf",
        },
      })
      .then((res) => {
      
        setQuestions(res.data);
        setLoading(false);
      })

  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
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
          ][i];
          let leftmoveZindex = [
            styles.leftmove0_2,
            styles.leftmove1_2,
            styles.leftmove2_2,
            styles.leftmove3_2,
          ][i];

          let leftclass = clicked == 3 ? leftmoveZindex : leftmove;

          return (
            <div>
              <Nav.Item id={styles.wrap} className={leftclass}>
                <Nav.Link
                  id={styles.navlink}
                  eventKey={i}
                  onClick={() => {
                    // setClicked2(i);
                    let temp = questions;
                    setQuestions({});
                    setQuestions(temp);
                    

                    clicked = i;
                    if (clicked == 0) {
                      ref.current.value = keywordinput;
                    } else if (clicked == 1) {
                      ref.current.value = reasoninput;
                    } else if (clicked == 2) {
                      ref.current.value = summaryinput;
                    } else if (clicked == 3) {
                      ref.current.value = feelinginput;
                    }
                    console.log(keywordinput);
                    console.log(reasoninput);
                    console.log(summaryinput);
                    console.log(feelinginput);
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
          {/* <p align="left">
            {clicked == 0
              ? questions.keyword
              : clicked == 1
              ? questions.reason
              : clicked == 2
              ? questions.summary
              : questions.feeling}
          </p> */}
          <Question questions={questions} index={clicked}/>
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
                  // setKeyword(ref.current.value);
                  keywordinput = ref.current.value;
                } else if (clicked == 1) {
                  // setReason(ref.current.value);
                  reasoninput = ref.current.value;
                } else if (clicked == 2) {
                  // setSummary(ref.current.value);
                  summaryinput = ref.current.value;
                } else if (clicked == 3) {
                  // setFeeling(ref.current.value);
                  feelinginput = ref.current.value;
                }
              }}
            />
          </Col>
        </Row>

        <textarea
          id="textarea"
          ref={ref}
          className={`${styles.writelayer} ${styles.note}`}
        ></textarea>
      </div>

      <Button
        id={styles.ReadButton}
        size="lg"
        onClick={() => {
          axios.post(
            `${BASE_URL}report/${title}/${curchapter}/activity/`,
            { keyword: keywordinput,
              reason :reasoninput,
              summary : summaryinput,
              feeling : feelinginput },
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Token 6ea207c7412c800ec623637b51877c483d2f2cdf",
              },
            }
          );
          navigate(`/reading/${title}/${curchapter + 1}/1`);
        }}
      >
        제출하기
      </Button>
    </div>
  );
}

function Question({questions,index}){
  
  const q = ['keyword','reason','summary','feeling'];
  console.log(questions[q[index]])
  return(<>
  
  <p>{questions[q[index]]}</p>
  
  </>)
}

export default Activity;
