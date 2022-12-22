/*eslint-disable */

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Dropdown, DropdownButton, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Read.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import bookloading from "./img/loading_book.gif";
import loading from "./img/loading.gif";
import Loading from "./Loading";

function Read() {
  let param = useParams();
  let title = param.title;
  let curchapter = Number(param.chapter);
  let curpage = Number(param.page);

  const BASE_URL = useSelector((state) => state.BASE_URL);
  // const TOKEN = useSelector((state) => state.TOKEN);
  const TOKEN = localStorage.getItem("TOKEN");
  let navigate = useNavigate();

  let [LeftTexts, setLeftTexts] = useState([]);
  let [RightTexts, setRightTexts] = useState([]);
  let [totalpages, setTotalpages] = useState(0);
  let [totalchapters, setTotalchapters] = useState(0);

  let [dictdata, setDictdata] = useState([]);
  let [show, setShow] = useState(false);
  const [isLoading, setLoading] = useState(true);

  let [totalTexts, setTotalTexts] = useState("");
  let [currentLocation, setCurrentLocation] = useState(1);
  let [numOfPapers, setNumofPapers] = useState(0);
  let [maxLocation, setMaxLocation] = useState(numOfPapers + 1);
  let [range, setRange] = useState([]);
  // let currentLocation = 1;
  // let numOfPapers = 3;
  // let maxLocation = numOfPapers + 1;

  const SIZEOFPAGE = 300;
  useEffect(() => {
    axios
      .get(`${BASE_URL}book/${title}/${curchapter}/`, {
        headers: {
          Authorization: TOKEN,
        },
      })
      .then((res) => {
        console.log(res.data);
        setTotalTexts(res.data.page);
        setTotalpages(res.data.pages);
        setTotalchapters(res.data.chapters);
        console.log(Math.ceil(res.data.page.length / SIZEOFPAGE));
        setNumofPapers(Math.ceil(res.data.page.length / SIZEOFPAGE / 2));
        setMaxLocation(Math.ceil(res.data.page.length / SIZEOFPAGE / 2) + 1);
        let temp = [];
        for (
          let i = 1;
          i <= Math.ceil(Math.ceil(res.data.page.length / SIZEOFPAGE) / 2);
          i++
        ) {
          temp.push(i);
        }
        setRange(temp);
        let papers = document.getElementsByName("paper");

        for (let i = 0; i < papers.length; i++) {
          papers[i].style.zIndex = papers.length - i;
        }
        setLoading(false);
      })
      .catch((error) => {
        navigate(`/writing/${title}`);
      });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(`${BASE_URL}book/${title}/${curchapter}/?page=${curpage}`, {
  //       headers: {
  //         Authorization: "Token 6ea207c7412c800ec623637b51877c483d2f2cdf",
  //       },
  //     })
  //     .then((data) => {
  //       console.log(data.data);
  //       setLeftTexts(data.data.page);
  //       setTotalpages(data.data.pages);
  //       setTotalchapters(data.data.chapters);
  //     })
  //     .catch((error) => {
  //       navigate(`/writing/${title}`);
  //     });

  //   axios
  //     .get(`${BASE_URL}book/${title}/${curchapter}/?page=${curpage + 1}`, {
  //       headers: {
  //         Authorization: TOKEN,
  //       },
  //     })
  //     .then((data) => {
  //       console.log(data.data);
  //       setRightTexts(data.data.page);
  //       setLoading(false);
  //     });

  // }, [param]);

  if (isLoading) {
    return <Loading />;
  }

  const bookcontents = LeftTexts + RightTexts;

  return (
    <div>
      {/* <div id="readingwrapper">
        <div id="readingcontainer">
          <section className="open-book">
            <header>
              <h6>&nbsp;</h6>
              <h6>{title}</h6>
            </header>
            <article>
              <span>{LeftTexts}</span>
              <span>{RightTexts}</span>
            </article>

            <footer>
              <ol id="page-numbers">
                <li>{`${curchapter}-${curpage}`}</li>
                <li>{`${curchapter}-${curpage + 1}`}</li>
              </ol>
            </footer>
          </section>
        </div>
      </div> */}
      <div id={styles.book} className={styles.book}>
        {range.map(function (e, i) {
          let p = `p${e}`;
          let b = `b${e}`;
          let f = `f${e}`;
          return (
            <div  className={styles.paper} name="paper">
              <div className={styles.front}>
                <div id={styles[f]} className={styles.frontContent}>
                  {/* <h1>Front {e}</h1> */}
                  <div>
                    {/* 380자 */}
                    {totalTexts.slice(
                      SIZEOFPAGE * 2 * i,
                      SIZEOFPAGE * 2 * i + SIZEOFPAGE
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.back}>
                <div id={styles[b]} className={styles.backContent}>
                  {/* <h1>Back {e}</h1> */}
                  {totalTexts.slice(
                    SIZEOFPAGE * 2 * i + SIZEOFPAGE,
                    SIZEOFPAGE * 2 * i + SIZEOFPAGE * 2
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Button id={styles.leftButton}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          size="6x"
          onClick={() => {
            let paper = document.getElementsByName("paper");
            if (currentLocation > 1) {
              paper[currentLocation - 2].classList.remove(styles.flipped);
              setTimeout(() => {
                paper[currentLocation - 2].style.zIndex =
                  maxLocation - (currentLocation - 1);
                setCurrentLocation(currentLocation - 1);
              }, 100);

              // currentLocation--;
            }
          }}
        />
      </Button>
      <Button id={styles.rightButton}>
        <FontAwesomeIcon
          icon={faChevronRight}
          size="6x"
          onClick={() => {
            let paper = document.getElementsByName("paper");

            if (currentLocation < maxLocation) {
              paper[currentLocation - 1].classList.add(styles.flipped);
              setTimeout(() => {
                paper[currentLocation - 1].style.zIndex = currentLocation;
                setCurrentLocation(currentLocation + 1);
              }, 100);

              // currentLocation++;
            } else {
              navigate(`/quiz/${title}/${curchapter}`);
            }
          }}
        />
      </Button>

      <DictionaryModal show={show} setShow={setShow} dictdata={dictdata} />
      <DropdownButton id={styles.dropdownItemButton} title="엉박사 찬스">
        <Dropdown.Item
          id={styles.itembutton}
          as="button"
          onClick={() => {
            let selectedObj = window.getSelection();
            let selected = "";
            selected = selectedObj.getRangeAt(0).toString();

            axios
              .get(`${BASE_URL}book/dictionary?word=${selected}`, {
                headers: {
                  Authorization: TOKEN,
                },
              })
              .then((res) => {
                setDictdata(res.data.item);
                setShow(true);
              });
          }}
        >
          사전 찾기
        </Dropdown.Item>

        <Dropdown.Item id={styles.itembutton} as="button">
          요약 보기
        </Dropdown.Item>
        <Dropdown.Item
          id={styles.itembutton}
          as="button"
          onClick={() => {
            navigate("/home");
          }}
        >
          돌아가기
        </Dropdown.Item>
      </DropdownButton>
      {/* <Button id={styles.leftButton}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          size="6x"
          onClick={() => {
            if (curpage != 1) {
              setLoading(true);
              navigate(`/reading/${title}/${curchapter}/${curpage - 2}`);
            } else {
              if (curchapter != 1) {
                setLoading(true);
                if (curpage == 1) {
                  axios
                    .get(
                      `${BASE_URL}book/${title}/${curchapter}/?page=${
                        curpage - 1
                      }`,
                      {
                        headers: {
                          Authorization: TOKEN,
                        },
                      }
                    )
                    .then((data) => {
                      navigate(
                        `/reading/${title}/${curchapter - 1}/${data.data.pages}`
                      );
                    });
                } else {
                  navigate(`/reading/${title}/${curchapter - 1}/1`);
                }
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
            if (curpage + 2 <= totalpages) {
              setLoading(true);
              navigate(`/reading/${title}/${curchapter}/${curpage + 2}`);
            } else {
              if (curchapter != totalchapters) {
                setLoading(true);
                // navigate(`/reading/${title}/${curchapter + 1}/${1}`);
                navigate(`/quiz/${title}/${curchapter}`);
              } else {
                console.log("다 읽음!");
                navigate(`/quiz/${title}/${curchapter}`);
              }
            }
          }}
        />
      </Button> */}
    </div>
  );
}

function DictionaryModal({ show, setShow, dictdata }) {
  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        dialogClassName={styles.mymodal}
      >
        <Modal.Body style={{ background: "#FFF7E9" }}>
          <div className={styles.dictdiv}>
            <ol data-list-style-type="ko">
              {dictdata.map(function (data, index) {
                let datatitle = data.word;
                let datacontent = data.sense.definition;
                let link = data.sense.link;
                let type = data.sense.type;
                let pos = data.pos;
                console.log(datatitle);
                console.log(datacontent);
                return (
                  <li className={styles.dictli} key={index}>
                    <a href={link}>{datatitle}</a>
                    <span style={{ fontSize: "0.8em" }}>{` 「${pos}」`}</span>
                    <br></br>
                    <span className={styles.dictul}>{datacontent}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Read;
