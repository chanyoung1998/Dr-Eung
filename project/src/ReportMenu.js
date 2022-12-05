/*eslint-disable */
import { useState, useEffect } from "react";
import {
  Container,
  Col,
  Row,
  InputGroup,
  Form,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import styles from "./ReportMenu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import books from "./img/books.png";

function ReportMenu() {
  let [report, setReport] = useState([{}]);
  let [report_key,setReportKey] = useState([]);
  const BASE_URL = useSelector((state) => state.BASE_URL);
  // const TOKEN = useSelector((state) => state.TOKEN);
  const TOKEN = localStorage.getItem('TOKEN')

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${BASE_URL}report/list/`, {
        headers: {
          Authorization: TOKEN,
        },
      })
      .then((data) => {
        setReport(data.data);
        setReportKey(Object.keys(data.data))
        console.log(data.data)
        setLoading(false);
        
      });
  }, []);

  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <img src={books} className={styles.bookimg} />
      <Container style={{ width: "50%", marginTop: "5%" }}>
        <Row>
          <Col
            md={{ span: 1 }}
            onClick={() => {
              console.log("cliced");
            }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" />
          </Col>
          <Col md={{ span: 9 }} style={{ padding: "0px" }}>
            <InputGroup
              onKeyPress={(e) => {
                
                if (e.key === "Enter") {
                  //가장 정확한 검색 결과
                  for (let index = 0; index < report_key.length; ++index) {
                    if(e.target.value != '' & (report[report_key[index]]['책 제목'] == e.target.value || report[report_key[index]]['감상문 제목'] == e.target.value)){
                      console.log(report);
                      let temp = [...report_key];
                      temp.splice(temp.indexOf(report_key[index]),1);
                      temp.unshift(report_key[index])
                      setReportKey(temp);
                      e.defaultPrevented();
                      return
                    }            
                  } 
                    // 차선으로 비슷한 결과
                  for (let index = 0; index < report_key.length; ++index) {
                    if(e.target.value != '' & (report[report_key[index]]['책 제목'].includes(e.target.value)  || report[report_key[index]]['감상문 제목'].includes(e.target.value))){
                      console.log(report);
                      let temp = [...report_key];
                      temp.splice(temp.indexOf(report_key[index]),1);
                      temp.unshift(report_key[index])
                      setReportKey(temp);
                      e.defaultPrevented();
                      return
                    }            
                  } 

                  alert("찾는 결과가 없습니다.")
                }
              }}
            >
              <Form.Control
                placeholder="책 제목 혹은 감상문 제목을 입력해주세요!"
                aria-label="search"
                aria-describedby="search"
              />
            </InputGroup>
          </Col>
          <Col md={{ span: 2 }} style={{ paddingLeft: "2px" }}>
            <DropdownButton id={styles.dropdownItemButton} title="보여주기">
              {/* <Dropdown.ItemText>기준</Dropdown.ItemText> */}
              <Dropdown.Item
                id={styles.itembutton}
                style={{ fontSize: "15px" }}
                as="button"
                onClick={() => {
                  console.log("책갈피만");
                }}
              >
                제목순으로
              </Dropdown.Item>

              <Dropdown.Item
                id={styles.itembutton}
                style={{ fontSize: "15px" }}
                as="button"
                onClick={() => {
                  console.log("책갈피만");
                }}
              >
                책갈피
              </Dropdown.Item>
              <Dropdown.Item
                id={styles.itembutton}
                style={{ fontSize: "15px" }}
                as="button"
                onClick={() => {
                  console.log("책갈피만");
                }}
              >
                작성 완료
              </Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
      </Container>
      <div className={styles.scrollmenu}>
        {report_key.map(function (element, i) {
          return <Report index={i} report_indexed={report[element]} />;
        })}
      </div>
    </div>
  );
}

export default ReportMenu;

function Report({ index, report_indexed }) {
  const colors = [
    "#d6b5a3",
    "#E97777",
    "#BCEAD5",
    "#82CD47",
    "#9F73AB",
    "#7DE5ED",
  ];
  const endcolors = [
    "#AA8B56",
    "#E0144C",
    "#6D9886",
    "#379237",
    "#3F3B6C",
    "#5DA7DB",
  ];

  const fontcolors = [
    "#9c6a13",
    "#5b061c",
    "#0e8a56",
    "#0e670e",
    "#150d70",
    "#0b6fb7",
  ];
  const bgColor = colors[index % 6];
  const bColor = endcolors[index % 6];
  const fColor = fontcolors[index % 6];
  const title = report_indexed["책 제목"];
  let navigate = useNavigate();

  return (
    <div
      className={styles.book}
      onClick={() => {
        navigate(`/feedback/${title}`);
      }}
    >
      <div className={styles.back} style={{ background: `${bgColor}` }}></div>
      <div className={styles.page6}>
        <br />
        <br />
        <br />
        <br />
        <h4>감상문 보기</h4>
      </div>
      <div className={styles.page5}></div>
      <div className={styles.page4}></div>
      <div className={styles.page3}></div>
      <div className={styles.page2}></div>
      <div className={styles.page1}></div>
      <div
        className={styles.front}
        style={{
          background: `${bgColor}`,
          backgroundImage: `linear-gradient(to right,${bColor} 5px, ${bColor} 5px, transparent 7px)`,
          wordBreak:"break-all"
        }}
      >
        <p className={styles.title} style={{ color: `${fColor}` }}>
          <h3>{report_indexed["책 제목"]}</h3>
          <br />
          <h4>{report_indexed["감상문 제목"]}</h4>
        </p>
      </div>
    </div>
  );
}
