/*eslint-disable */

import {
  useNavigate,
  Outlet,
  useParams,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Dropdown,DropdownButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Read.module.css";
import axios from "axios";


const BASE_URL = "https://a8d0-165-194-17-239.jp.ngrok.io";
function Read() {
  let param = useParams();
  let title = param.title;
  let curchapter = Number(param.chapter);
  let curpage = Number(param.page);


  let navigate = useNavigate();

  let [LeftTexts, setLeftTexts] = useState([]);
  let [totalpages, setTotalpages] = useState(0);
  let [totalchapters, setTotalchapters] = useState(0);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/book/${title}/${curchapter}/?page=${curpage}`, {
        headers: {
          Authorization: "Token 6ea207c7412c800ec623637b51877c483d2f2cdf",
        },
      })
      .then((data) => {
        console.log(data.data);
        setLeftTexts(data.data["page"]);
        setTotalpages(data.data["pages"]);
        setTotalchapters(data.data["chapters"]);
      });
    return;
  }, [Read, param]);

  return (
    <div>
      <DropdownButton id={styles.dropdownItemButton} title="엉박사 찬스">
        <Dropdown.Item
          as="button"
          onClick={() => {
     
          }}
        >
          사전 찾기
        </Dropdown.Item>

        <Dropdown.Item
          as="button"
          onClick={() => {
            
          }}
        >
          하이라이트
        </Dropdown.Item>
        <Dropdown.Item as="button">요약 보기</Dropdown.Item>
      </DropdownButton>
      <Button id={styles.leftButton}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          size="6x"
          onClick={() => {
            if (curpage != 1) {
              navigate(`/reading/${title}/${curchapter}/${curpage - 1}`);
            } else {
              if (curchapter != 1) {
                navigate(`/reading/${title}/${curchapter - 1}/1`);
              } else {
                console.log("처음!");
              }
            }
          }}
        />
      </Button>
      <Button id={styles.rightButton}>
        <FontAwesomeIcon
          icon={faChevronRight}
          size="6x"
          onClick={() => {
            if (curpage != totalpages) {
              navigate(`/reading/${title}/${curchapter}/${curpage + 1}`);
            } else {
              if (curchapter != totalchapters) {
                // navigate(`/reading/${title}/${curchapter + 1}/${1}`);
                navigate(`/quiz/${title}/${curchapter}`);
              } else {
                console.log("다 읽음!");
              }
            }
          }}
        />
      </Button>
      <div id={styles.container}>
        <div id={styles.pageLayout}>
          <div className={styles.shadowRight} style={{ padding: "5% 10%" }}>
            {<p align="left">{LeftTexts.join(" ")}</p>}
          </div>

          <div className={styles.shadowLeft} style={{ padding: "5% 10%" }}>
            {[
              " Outside of skeuomorphism, the idea actually was not very silly. Erin always had an appreciation towards print work. The thought of mimicking similar designs onto a web interface has always fascinated her. So, why not start with the classic print design of a novel?",
              "문장2",
              "문장3",
            ].map(function (e) {
              return <p align="left">{e}</p>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Read;
