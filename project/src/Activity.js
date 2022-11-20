/*eslint-disable */
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Nav, Modal, Row, Col } from "react-bootstrap";
import styles from "./Activity.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faCircle as faCircleSolid, faSlash } from "@fortawesome/free-solid-svg-icons";
import leaf from "./img/leaf.png";
import branch from "./img/branch.png";
import bulb from "./img/bulb.png";
import submiticon from "./img/submit3.png";
import submiticon2 from "./img/submit2.png";
import owl from "./img/owl.png"
function Activity() {
  let param = useParams();
  const title = param.title;
  const currentChapter = param.chapter;

  return (
    <>
      <Multiple title={title} currentChapter={currentChapter} />
    </>
  );
}

export default Activity;

function Multiple({title,currentChapter}) {
  // tab
  let [clicked, setClicked] = useState(0);

  const numbers = ["Keyword", "Reason", "Summary","Feeling"];



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
            이번 단원에서 가장 기억에 남는 키워드는 무엇이냐 부엉?
          </p>
        </div>
        <Row>
          <Col md={4} className={styles.owllayout}>
            <img src={owl} className={styles.owl}/>
          </Col>
          <Col md={{ span: 4, offset: 4 }} className={styles.submitlayout}>
          <img src={submiticon} className={styles.submiticon} onClick={()=>{console.log('제출')}}/>
          </Col>
        </Row>

        <textarea className={`${styles.writelayer} ${styles.notes}`}>
   
          
        </textarea>
      </div>
    </div>
  );
}

