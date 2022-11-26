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
import { useSelector,useDispatch } from "react-redux";
// import {changeMAXCHAPTERS} from "./store.js";


function Read() {
  let param = useParams();
  let title = param.title;
  let curchapter = Number(param.chapter);
  let curpage = Number(param.page);

  const BASE_URL = useSelector((state)=>state.BASE_URL);
  // const MAX_CHAPTERS = useSelector((state)=>state.MAX_CHAPTERS);
  let navigate = useNavigate();
  // let dispatch = useDispatch();
  let [LeftTexts, setLeftTexts] = useState([]);
  let [RightTexts, setRightTexts] = useState([]);
  let [totalpages, setTotalpages] = useState(0);
  let [totalchapters, setTotalchapters] = useState(0);

  const [isLoading,setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${BASE_URL}book/${title}/${curchapter}/?page=${curpage}`, {
        headers: {
          Authorization: "Token 6ea207c7412c800ec623637b51877c483d2f2cdf",
        },
      })
      .then((data) => {
        
        setLeftTexts(data.data.page);
        setTotalpages(data.data.pages);
        setTotalchapters(data.data.chapters);
        // dispatch(changeMAXCHAPTERS(data.data.chapters))
        
      })
      .catch((error)=>{
        navigate(`/writing/${title}`);
      });
    
      axios
      .get(`${BASE_URL}book/${title}/${curchapter}/?page=${curpage+1}`, {
        headers: {
          Authorization: "Token 6ea207c7412c800ec623637b51877c483d2f2cdf",
        },
      })
      .then((data) => {
        console.log(data.data);
        setRightTexts(data.data.page);
        setLoading(false);
      });


    return;
  }, [param]);

  const font_size = (screen.width / 100 * (20/15 ));
  
  if(isLoading){
    return(<div>Loading...</div>)
  }

  return (
    <div>
      <div id={styles.container}>
        <div id={styles.pageLayout}>
          <div className={styles.shadowLeft}>
            {<p align="left">{LeftTexts}</p>}
          </div>

          <div className={styles.shadowRight}>
          {<p align="left">{RightTexts}</p>}
          </div>
        </div>
      </div>
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
              navigate(`/reading/${title}/${curchapter}/${curpage - 2}`);
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
            if (curpage+2 <= totalpages) {
              navigate(`/reading/${title}/${curchapter}/${curpage + 2}`);
            } else {
              if (curchapter != totalchapters) {
                // navigate(`/reading/${title}/${curchapter + 1}/${1}`);
                navigate(`/quiz/${title}/${curchapter}`);
              } else {
                console.log("다 읽음!");
                navigate(`/quiz/${title}/${curchapter}`);
              }
            }
          }}
        />
      </Button>
      
    </div>
  );
}

export default Read;
