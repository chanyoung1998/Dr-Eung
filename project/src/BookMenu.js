/*eslint-disable */
import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  Form,
  DropdownButton,
  Dropdown,
  Modal,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark as chekcedBookmark,
  faCheck,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmark } from "@fortawesome/free-regular-svg-icons";
import styles from "./BookMenu.module.css";
import InfiniteScroll from "react-infinite-scroller";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import owl from "./img/owl.png";
import { useBootstrapBreakpoints } from "react-bootstrap/esm/ThemeProvider";
function BookMenu() {
  let navigate = useNavigate();
  let [selectedIndex, setSelectedIndex] = useState(0);
  let [books, setBooks] = useState([]);
  let [reports, setReports] = useState([]);
  let [show, setShow] = useState(false);
  let [searchedbook, setSearchedbook] = useState({});
  let [next, setNext] = useState(null);
  const BASE_URL = useSelector((state) => state.BASE_URL);
  // const TOKEN = useSelector((state) => state.TOKEN);
  const TOKEN = localStorage.getItem("TOKEN");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .all([
        axios.get(`${BASE_URL}book/list/`, {
          headers: {
            Authorization: TOKEN,
          },
        }),
        axios.get(`${BASE_URL}report/list/`, {
          headers: {
            Authorization: TOKEN,
          },
        }),
      ])

      .then(
        axios.spread((res1, res2) => {
          setNext(res1.data.next);
          setBooks(res1.data.results);
          setReports(Object.values(res2.data));
          // console.log(res1.data.results);
          // console.log(res2.data);
          setLoading(false);
        })
      );
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <SearchResultModal show={show} setShow={setShow} book={searchedbook} />
      <Container style={{ marginTop: "5%" }}>
        <Row>
          <Col md={{ span: 3 }}>
            <div className={`${styles.speechBubble}`}>
              {books[selectedIndex].description}
            </div>
            <img src={owl} style={{ width: "100%", height: "60%" }} />
          </Col>
          <Col md={{ span: 6 }}>
            <div>
              <div>
                <Container style={{ marginBottom: "1%" }}>
                  <Row>
                    <Col
                      md={{ span: 1 }}
                      onClick={() => {
                        // console.log("cliced");
                      }}
                    >
                      <FontAwesomeIcon
                        className={styles.searchicon}
                        icon={faMagnifyingGlass}
                        size="2x"
                      />
                    </Col>
                    <Col md={{ span: 9 }} style={{ padding: "0px" }}>
                      <InputGroup
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            axios
                              .get(`${BASE_URL}book/${e.target.value}`, {
                                headers: {
                                  Authorization: TOKEN,
                                },
                              })
                              .then((res) => {
                                // console.log(res.data)
                                setSearchedbook(res.data);
                                setShow(true);
                              })
                              .catch(() => {
                                alert("찾는 결과가 없습니다.");
                              });
                          }
                        }}
                      >
                        <Form.Control
                          placeholder="책의 제목을 입력해주세요!"
                          aria-label="search"
                          aria-describedby="search"
                        />
                      </InputGroup>
                    </Col>
                    <Col md={{ span: 2 }} style={{ paddingLeft: "2px" }}>
                      <DropdownButton
                        id={styles.dropdownItemButton}
                        title="보여주기"
                      >
                        <Dropdown.Item
                          id={styles.itembutton}
                          style={{ fontSize: "15px" }}
                          as="button"
                          onClick={() => {
                            let newArray = [...books];

                            newArray.sort(function (a, b) {
                              var keyA = a.title;
                              var keyB = b.title;
                              if (keyA < keyB) return -1;
                              if (keyA > keyB) return 1;
                              return 0;
                            });
                            setBooks(newArray);
                          }}
                        >
                          제목순으로
                        </Dropdown.Item>

                        <Dropdown.Item
                          id={styles.itembutton}
                          style={{ fontSize: "15px" }}
                          as="button"
                          onClick={() => {
                            // console.log("책갈피만");
                            let temp = [...books];
                            let temp2 = [];

                            for (let i = 0; i < reports.length; i++) {
                              for (let j = 0; j < temp.length; j++) {
                                if (temp[j]["title"] == reports[i]["책 제목"]) {
                                  temp2.push(temp[j]);
                                  temp.splice(j, 1);
                                  break;
                                }
                              }
                            }
                            setBooks([...temp2, ...temp]);
                          }}
                        >
                          책갈피
                        </Dropdown.Item>
                        <Dropdown.Item
                          id={styles.itembutton}
                          style={{ fontSize: "15px" }}
                          as="button"
                          onClick={() => {
                            // console.log("완료만");
                            let temp = [...books];
                            let temp2 = [];

                            for (let i = 0; i < reports.length; i++) {
                              for (let j = 0; j < temp.length; j++) {
                                if (
                                  (temp[j]["title"] == reports[i]["책 제목"]) &
                                  reports[i].complete
                                ) {
                                  temp2.push(temp[j]);
                                  temp.splice(j, 1);
                                  break;
                                }
                              }
                            }
                            setBooks([...temp2, ...temp]);
                          }}
                        >
                          작성 완료
                        </Dropdown.Item>
                      </DropdownButton>
                    </Col>
                  </Row>
                </Container>

                <div
                  style={{
                    marginTop: "10px",
                    fontSize: "25px",
                    background: "#d57440",
                    borderRadius: "10px",
                  }}
                >
                  <Container>
                    <Row>
                      <Col md={{ span: 4 }} style={{ margin: "auto" }}>
                        제목
                      </Col>
                      <Col md={{ span: 4 }} style={{ margin: "auto" }}>
                        글쓴이
                      </Col>
                      <Col md={{ span: 2 }} style={{ margin: "auto" }}>
                        책갈피
                      </Col>
                      <Col md={{ span: 2 }} style={{ margin: "auto" }}>
                        완료
                      </Col>
                    </Row>
                  </Container>

                  <div className={styles.pane}>
                    <InfiniteScroll
                      pageStart={0}
                      loadMore={() => {
                        setTimeout(() => {
                          if (next != null) {
                
                            axios
                              .get(`${next.replace("http", "https")}`, {
                                headers: {
                                  Authorization: TOKEN,
                                },
                              })
                              .then((res) => {
                                
                                let temp = [...books, ...res.data.results];
                                setNext(res.data.next);
                                setBooks(temp);
                              });
                          }
                        }, 2000);
                      }}
                      hasMore={true || false}
                      useWindow={false}
                      loader={
                        <div key="loading" className="loader">
                          {next ? "책을 가져오고 있어요 ..." : ""}
                        </div>
                      }
                    >
                      <div
                        style={{
                          background: "#E1C591",
                          borderBottomLeftRadius: "10px",
                          borderBottomRightRadius: "10px",
                          padding: "5px",
                        }}
                      >
                        {books.map(function (book, index) {
                          return (
                            <div>
                              <Book
                                books={books}
                                book={book}
                                index={index}
                                setSelectedIndex={setSelectedIndex}
                                selectedIndex={selectedIndex}
                                setBooks={setBooks}
                                reports={reports}
                              />
                              <hr className={styles.bookhr} />
                            </div>
                          );
                        })}
                      </div>
                    </InfiniteScroll>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col md={{ span: 3 }}>
            <div className={styles.fixed1}>
              <StockedBook />
              <StockedBook />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 3 }}> </Col>
          <Col md={{ span: 6 }} align="right">
            <Button
              id={styles.ReadButton}
              style={{ marginTop: "3%" }}
              size="lg"
              onClick={() => {
                navigate(`/reading/${books[selectedIndex].title}/1/1`);
              }}
            >
              책 읽으러 가기
            </Button>
          </Col>
          <Col md={{ span: 3 }}></Col>
        </Row>
      </Container>
    </div>
  );
}

function Book({
  books,
  book,
  index,
  setSelectedIndex,
  selectedIndex,
  setBooks,
  reports,
}) {
  let selected = index == selectedIndex ? styles.selected : styles.nonSelected;

  let bookmark = faBookmark;
  let complete = false;
  let info = {};
  let [bookmarkmodalshow, setBookmarkmodalshow] = useState(false);

  for (let index = 0; index < reports.length; ++index) {
    if (reports[index]["책 제목"] == book["title"]) {
      info = reports[index]["info"];
      if (!reports[index]["complete"]) {
        bookmark = chekcedBookmark;
      } else {
        bookmark = chekcedBookmark;
        complete = true;
      }
      break;
    }
  }

  return (
    <div
      className={`${selected} ${styles.book}`}
      onClick={() => {
        setSelectedIndex(index);
      }}
      style={{
        margin: "10px 2px 0px 2px",
        padding: "10px",
        borderRadius: "10px",
        fontSize: "18px",
      }}
    >
      <Row>
        <Col md={{ span: 4 }} style={{ margin: "auto" }}>
          {book.title}
        </Col>
        <Col md={{ span: 4 }} style={{ margin: "auto" }}>
          {book.author}
        </Col>
        <Col md={{ span: 2 }} style={{ margin: "auto" }}>
          <Bookmarkmodal
            show={bookmarkmodalshow}
            setShow={setBookmarkmodalshow}
            bookmark={bookmark}
            book={book}
            info={info}
            complete={complete}
          />
          {bookmark == chekcedBookmark ? (
            <FontAwesomeIcon
              className={styles.bookmark}
              icon={bookmark}
              onClick={() => {
                setBookmarkmodalshow(true);
              }}
            />
          ) : (
            <FontAwesomeIcon icon={bookmark} />
          )}
        </Col>
        <Col md={{ span: 2 }} style={{ margin: "auto" }}>
          {complete == true ? <FontAwesomeIcon icon={faCheck} /> : ""}
        </Col>
      </Row>
    </div>
  );
}

function StockedBook() {
  return (
    <div className={styles.bg}>
      <div className={styles.book1}>
        <div className={styles.ribbon1}></div>
      </div>
      <div className={styles.book2}>
        <div className={styles.ribbonCut1}></div>
        <div className={styles.ribbonCut2}></div>
        <div className={styles.ribbonCut3}></div>
      </div>

      <div className={styles.book3}>
        <div className={styles.ribbon3}></div>
      </div>
      <div className={styles.book4}>
        <div className={styles.ribbonCut4}></div>
        <div className={styles.ribbonCut5}></div>
        <div className={styles.ribbonCut6}></div>
      </div>
      <div className={styles.book5}></div>
      <div className={styles.book6}>
        <div className={styles.ribbon6}></div>
      </div>
      <div className={styles.book7}>
        <div className={styles.ribbonCut7}></div>
        <div className={styles.ribbonCut8}></div>
        <div className={styles.ribbonCut9}></div>
      </div>
    </div>
  );
}

function SearchResultModal({ show, setShow, book }) {
  let navigate = useNavigate();
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
            <h2>{book["title"]} </h2>
            <h5>{book["author"]}</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#FFF7E9" }}>
          {book["description"]}
        </Modal.Body>
        <Modal.Footer>
          <Button
            id={styles.ReadButton}
            size="lg"
            onClick={() => {
              setShow(false);
              navigate(`/reading/${book["title"]}/1/1`);
            }}
          >
            책 읽으러 가기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function Bookmarkmodal({ show, setShow, bookmark, book, info, complete }) {
  let navigate = useNavigate();
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
            <h2>{book["title"]} </h2>
            <h5>{book["author"]}</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#FFF7E9" }}>
          {book["description"]}
        </Modal.Body>
        <Modal.Footer>
          <Button
            id={styles.ReadButton}
            // className={styles.bookmarkbutton}
            size="lg"
            onClick={() => {
              setShow(false);
              if (bookmark == chekcedBookmark) {
                if (complete) {
                  navigate(`/feedback/${book["title"]}`);
                }
                //읽는 중
                else if (info.state == 1) {
                  navigate(
                    `/reading/${book["title"]}/${info.current_chapter}/${info.current_page}`
                  );
                }
                //퀴즈
                else if (info.state == 2) {
                  navigate(`/quiz/${book["title"]}/${info.current_chapter}`);
                }
                //활동(단원별 내용 작성)
                else if (info.state == 3) {
                  navigate(
                    `/activity/${book["title"]}/${info.current_chapter}`
                  );
                }
                //독후감 작성(단원별 내용 작성)
                else if (info.state == 4) {
                  navigate(`/writing/${book["title"]}`);
                }
              }
            }}
          >
            최근 활동으로 바로가기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BookMenu;
