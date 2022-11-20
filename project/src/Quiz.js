/*eslint-disable */
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Nav, Modal, Row, Col } from "react-bootstrap";
import styles from "./Quiz.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faCircle as faCircleSolid, faSlash } from "@fortawesome/free-solid-svg-icons";
import leaf from "./img/leaf.png";
import branch from "./img/branch.png";
import bulb from "./img/bulb.png";
import submiticon from "./img/submit3.png";
import submiticon2 from "./img/submit2.png";
function Quiz() {
  let param = useParams();
  const title = param.title;
  const currentChapter = param.chapter;

  return (
    <>
      <Multiple title={title} currentChapter={currentChapter} />
    </>
  );
}

export default Quiz;

function Multiple({title,currentChapter}) {
  // tab
  let [clicked, setClicked] = useState(0);
  // answer
  let [answerClicked, setAnswer] = useState(0);
  let [imgShow,setImgShow] = useState([false,false,false,false,false])
  // modal
  let [show, setShow] = useState(false);
  const numbers = ["일 번", "이 번", "삼 번", "사 번", "오 번"];
  const questions = ["어린왕자가 상자 속의 양을 좋아하는 이유가 무엇일 까요?"];
  const options = [
    "뿔이 달린 숫양이라서",
    "양이 병들어서",
    "지나온 별에서 똑같은 양을 보아서",
    "어린왕자가 사는 곳이 아주 작아서",
    "상자속에 구렁이가 같이 있어서",
  ];
  // 예시 정답
  let answer = 2;
  let [wrongcount,setWrongcount] = useState(0);
  // 문제 풀면 activity로 이동하기 위함.
  let [questionCount,setQuestioncount] = useState(0);
  let navigate = useNavigate();
  if (questionCount == 5){
    navigate(`/activity/${title}/${currentChapter}/`)
  }

  return (
    <div className={styles.container}>

      <HintModal show={show} setShow={setShow} />
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
          <p align="left">
            어린왕자가 상자 속의 양을 좋아하는 이유가 무엇일 까요?
          </p>
        </div>
        <Row>
          <Col md={4} className={styles.bulblayout}>
            <img
              src={bulb}
              className={styles.bulb}
              onClick={() => {
                if(wrongcount >= 2){
                  setShow(true);
                }
              
              }}
              style={{display: wrongcount >= 2 ? '' : 'none'}}
            />
          </Col>
          <Col md={{ span: 4, offset: 4 }} className={styles.submitlayout}>
          <img src={submiticon} className={styles.submiticon} 
          onClick={()=>{
            if(answerClicked == answer){
              let temp = [...imgShow];
              temp[answerClicked] = true
              setImgShow(temp);
              setQuestioncount(questionCount+1);
            }
            else{
              let temp = [...imgShow];
              temp[answerClicked] = true
              setImgShow(temp);
              setWrongcount(wrongcount+1);
            }
          }}/>
          </Col>
        </Row>

        <div className={styles.choicelayer}>
          {[0, 1, 2, 3, 4].map(function (e, i) {
            return (
              <p
                align="left"
                onClick={() => {
                  setAnswer(e);
                }}
              >
                <img src={ answer == e ? leaf : branch} className={answer == e ? styles.leaf : styles.branch} style={{display: imgShow[e] == true ? '' : 'none'}}/>
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
    </div>
  );
}

function HintModal({ show, setShow }) {
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
          <p>
            이렇게 나는 속마음을 털어놓을 사람 하나 없이 홀로 지냈다. 육 년 전,
            내 비행기가 사하라Sahara 사막에서 고장 나기까지는 적어도 그랬다.
            비행기 엔진의 무언가가 부서졌는데, 기술자도 승객도 없었기 때문에 나
            혼자서 어려운 수리 작업을 할 수밖에 없었다. 나에게는 사느냐 죽느냐가
            걸린 문제였다. 남아 있는 거라고는 겨우 팔 일 동안 마실 수 있는 물이
            전부였다. 첫날 저녁, 나는 사람이 사는 데서 수천 마일이나 떨어진
            사막에서 잠들었다. 배가 난파되어 뗏목 하나에 의지하여 드넓은 바다
            한가운데를 표류하는 사람보다 더 고립된 처지였다. 그러니 동이 틀 무렵
            이상하고 작은 목소리가 나를 깨웠을 때 내가 얼마나 놀랐는지 상상하실
            수 있을 것이다. 그 목소리는 이렇게 말했다. “저…… 양 한 마리 그려줘!”
            “뭐라고?” “양 한 마리 그려줘…….” 나는 마치 벼락을 맞은 사람처럼 벌떡
            일어났다. 눈을 세게 비비고 주위를 잘 둘러보았다. 그랬더니 아주
            신기하게 생긴 작은 소년이 진지한 표정으로 나를 바라보고 있었다. 이
            그림은 나중에 내가 그린 그림 중에 가장 잘된 초상화다. 하지만 내
            그림은 물론 실제 모델의 매력을 반도 보여주지 못하고 있다. 그건 결코
            내 잘못이 아니다. 어른들 때문에 여섯 살 때 화가가 되겠다는 꿈을 접은
            뒤로 나는 보아 구렁이의 속이 보이지 않거나 보이는 그림을 그린 것
            말고는 그림 그리는 것을 전혀 배우지 않았기 때문이다. 나는 눈이
            휘둥그레져서 불쑥 나타난 이 소년을 뚫어지게 바라보았다. 내가 그때
            사람이 사는 땅에서 수천 마일이나 떨어진 곳에 있었다는 사실을 잊지
            마시길. 하지만 이 작은 소년은 길을 잃은 것 같지도 않았고, 지치거나
            배고프고 목이 마르고 무서워서 죽어가고 있는 것처럼 보이지도 않았다.
            아무리 봐도 소년은 사람이 사는 땅에서 수천 마일 떨어진 사막
            한가운데에서 길을 잃은 어린아이 같지는 않았다. 한참 만에 겨우 입을
            열 수 있게 되었을 때, 나는 소년에게 말했다. “그런데…… 넌 여기서 뭘
            하고 있니?”
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}
