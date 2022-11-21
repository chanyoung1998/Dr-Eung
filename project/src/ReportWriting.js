/*eslint-disable */

import { useParams } from "react-router-dom";
import { Nav, Modal, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import styles from "./ReportWriting.module.css";
import { susa } from "susa-js";
import axios from "axios";
import {useSelector} from "react-redux";
function ReportWriting() {
  let param = useParams();
  let title = param.title;
  
  let 형식 = ['형식1','형식2','형식3','형식4','형식5','형식6'];
  let [형식번호,set형식번호] = useState(0);
  let [tab, setTab] = useState(1);
  let [show, setShow] = useState(false);
  let [chapters, setChapters] = useState([1, 2, 3, 4, 5]);
  let [data, setData] = useState([
    {
      original: "original",
      activities: {
        1: {
          keyword: ["키워드가 뭔가요", "양"],
          reason: ["왜요?", "그냥"],
          summary: ["요약ㄱ", "재밌다"],
          feeling: ["느낌점ㄱ", "굿"],
        },
      },
    },
  ]);


  const BASE_URL = useSelector((state)=>state.BASE_URL);
  useEffect(() => {
    axios
      .get(`${BASE_URL}report/${title}/`, {
        headers: {
          Authorization: "Token 6ea207c7412c800ec623637b51877c483d2f2cdf",
        },
      })
      .then((d) => {
        const totalchapters = Object.keys(d.data["activities"]).length;
        const newarray = Array.from({ length: totalchapters }, (v, i) => i + 1);
        setChapters(newarray);
        setData([d.data]);
      });
  }, []);



  return (
    <div className={styles.reportWritingLayout}>
      <ReportModal
        data={data}
        show={show}
        setTab={setTab}
        setShow={setShow}
        curChapter={tab}
      />
      <div className={styles.chapters}>
        <Nav className="flex-column" variant="tabs" defaultActiveKey="0">
          {chapters.map(function (element, index) {
            return (
              <Nav.Item>
                <Nav.Link
                  eventKey={index}
                  onClick={() => {
                    setTab(element);
                    setShow(true);
                  }}
                  style={{
                    color: "#B2B2B2",
                    borderRadius: "10px",
                    margin: "2px",
                  }}
                >
                  <h1>{susa(element)}</h1>
                </Nav.Link>
              </Nav.Item>
            );
          })}
        </Nav>
      </div>
      <div className={styles.innerLayout}>
        <div style={{margin:"auto"}}>
          {
            형식.map(function(e,i){
              return(
                i == 형식번호? <button className={`${styles.button} ${styles.clicked}`} onClick={()=>{set형식번호(i)}}>{e}</button> : <button className={styles.button} onClick={()=>{set형식번호(i)}}>{e}</button>
              )
            })
            
          }
          
        </div>
        <p align="left" className={styles.notes}>각 형식에 대한 예시를 보여주는 부분</p>
        {/* <textarea className={styles.notes} style={{borderColor:"white"} }></textarea> */}
      </div>
    </div>
  );
}

function ReportModal({ data, show, setShow, curChapter }) {
  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        dialogClassName={styles.mymodal}
      >
        <Modal.Header closeButton style={{ background: "#FFF7E9" }}>
          <Modal.Title>
            <h2>{susa(curChapter)} 번째</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#FFF7E9" }}>
          {["keyword", "reason", "summary", "feeling"].map(function (e) {
            return (
              <div style={{lineHeight:"90%"}}>
                <h3>질문. {data[0]["activities"][curChapter][e][0]}</h3>
                <br/>
                <h4 style={{ color:"gray"}}>답변. {data[0]["activities"][curChapter][e][1]}</h4>
                <hr />
              </div>
            );
          })}
        </Modal.Body>
        {/* <Modal.Footer>
            <Button onClick={()=>{setShow(false); setTab(curChapter+1); setShow(true)}}>다음 장</Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default ReportWriting;


function Form(){

  return(
    <>

    </>
  )
}