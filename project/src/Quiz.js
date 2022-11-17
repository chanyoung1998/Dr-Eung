/*eslint-disable */
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Nav } from "react-bootstrap";
import styles from "./Quiz.module.css";
import axios from "axios";

function Quiz() {
  let param = useParams();
  const title = param.title;
  const currentChapter = param.chapter;

  return (
    <>
      <Multiple />
    </>
  );
}

export default Quiz;

function Multiple() {
  return (
    <>
      <div>
        <Nav
          id="bootstrap-overrides"
          justify
          variant="tabs"
          defaultActiveKey="1"
        >
          <div id={styles.wrap}>
          <Nav.Item>
            <Nav.Link id={styles.navlink} eventKey="1" onClick={() => {}}>
              <h1>일번 문제</h1>
            </Nav.Link>
          </Nav.Item>
          
          </div>
          <div id={styles.wrap}>
          <Nav.Item>
            <Nav.Link id={styles.navlink} eventKey="2" onClick={() => {}}>
              <h1>이번 문제</h1>
            </Nav.Link>
          </Nav.Item>
          
          </div>
         
        </Nav>
      </div>
      <div style={{background:"red"}}>
      as
      </div>
    </>
  );
}
