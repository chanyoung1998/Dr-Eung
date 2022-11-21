/*eslint-disable */
import { useState, useEffect} from "react";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  Form,
  DropdownButton,
  Dropdown,
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
import owl from './img/owl.png'
import { useNavigate} from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function BookMenu() {
  let navigate = useNavigate();
  let [selectedIndex, setSelectedIndex] = useState(0);
  let [books, setBooks] = useState([
    {
      title: "어린왕자",
      author: "생택쥐 베리",
      genre: "문학",
      check: false,
      complete: false,
    },
    {
      title: "셜록홈즈",
      author: "아서코난도일",
      genre: "소설",
      check: true,
      complete: false,
    },
    {
      title: "나는부자",
      author: "찬",
      genre: "수필",
      check: true,
      complete: false,
    },
    {
      title: "어린왕자",
      author: "생택쥐 베리",
      genre: "문학",
      check: false,
      complete: true,
    },
    {
      title: "셜록홈즈",
      author: "코난도일",
      genre: "소설",
      check: false,
      complete: true,
    },
    {
      title: "나는부자",
      author: "찬",
      genre: "수필",
      check: true,
      complete: false,
    },
    {
      title: "나는부자",
      author: "찬",
      genre: "수필",
      check: true,
      complete: false,
    },
    {
      title: "어린왕자",
      author: "생택쥐 베리",
      genre: "문학",
      check: false,
      complete: true,
    },
    {
      title: "셜록홈즈",
      author: "코난도일",
      genre: "소설",
      check: false,
      complete: true,
    },
    {
      title: "나는부자",
      author: "찬",
      genre: "수필",
      check: true,
      complete: false,
    },
    {
      title: "셜록홈즈",
      author: "코난도일",
      genre: "소설",
      check: false,
      complete: true,
    },
    {
      title: "나는부자",
      author: "찬",
      genre: "수필",
      check: true,
      complete: false,
    },
    {
      title: "나는부자",
      author: "찬",
      genre: "수필",
      check: true,
      complete: false,
    },
    {
      title: "어린왕자",
      author: "생택쥐 베리",
      genre: "문학",
      check: false,
      complete: true,
    },
    {
      title: "셜록홈즈",
      author: "코난도일",
      genre: "소설",
      check: false,
      complete: true,
    },
    {
      title: "나는부자",
      author: "찬",
      genre: "수필",
      check: true,
      complete: false,
    },
  ]);
  const BASE_URL = useSelector((state)=>state.BASE_URL);
  console.log(BASE_URL)
  useEffect(() => {
    axios
      .get(`${BASE_URL}book/list/`, {
        headers: {
          Authorization: "Token 6ea207c7412c800ec623637b51877c483d2f2cdf",
        },
      })
      .then((data) => {
        setBooks(data.data)
      });
  }, []);


  return (
    <div>


      <Container style={{ marginTop: "5%" }}>
        <Row>
          <Col md={{ span: 3 }}>
            <div className={`${styles.speechBubble} ${styles.fixed2}`}>{books[selectedIndex].description}</div>
            <img src={owl} style={{width:"100%" ,height:"60%"}}/>
          </Col>
          <Col md={{ span: 6 }}>
            <div>
              

              <div>
                <Container style={{ marginBottom: "1%" }}>
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
                      <InputGroup>
                        <Form.Control
                          placeholder="내 책 찾으러 가기"
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
                        {/* <Dropdown.ItemText>기준</Dropdown.ItemText> */}
                        <Dropdown.Item
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
                          as="button"
                          onClick={() => {
                            console.log("책갈피만");
                          }}
                        >
                          책갈피만
                        </Dropdown.Item>
                        <Dropdown.Item as="button">임시저장만</Dropdown.Item>
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
                        저장
                      </Col>
                    </Row>
                  </Container>

                  <div className={styles.pane}>
                    <InfiniteScroll
                      pageStart={0}
                      loadMore={() => {}}
                      hasMore={true || false}
                      useWindow={false}
                      loader={
                        <div key="loading" className="loader">
                          책을 가져오고 있어요 ...
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

          <Col  md={{ span: 3 }}>
            
          </Col>
        </Row>
        <Row>
          <Col md={{span:3}}> </Col>
          <Col md={{span:6}} align="right">
          <Button id={styles.ReadButton} style={{ marginTop:"3%"}} size="lg" onClick={()=>{navigate(`/reading/${books[selectedIndex].title}/1/1`)}}>책 읽으러 가기</Button>
          </Col>
          <Col md={{span:3}}></Col>
        
        </Row>
      </Container>

      <div className={styles.fixed1}>
        <StockedBook /><StockedBook />
      </div>
                            
      
    </div>
  );
}

export default BookMenu;

function Book({
  books,
  book,
  index,
  setSelectedIndex,
  selectedIndex,
  setBooks,
}) {
  let selected = index == selectedIndex ? styles.selected : styles.nonSelected;

  let [bookmark, setBookmark] = useState(
    book.check == true ? chekcedBookmark : faBookmark
  );
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
            <FontAwesomeIcon
              icon={bookmark}
              onClick={() => {
                let newArray = [...books];

                newArray[index].check == true
                  ? setBookmark(faBookmark)
                  : setBookmark(chekcedBookmark);
                newArray[index].check =
                  newArray[index].check == true ? false : true;
                setBooks(newArray);


              }}
            />
          </Col>
          <Col md={{ span: 2 }} style={{ margin: "auto" }}>
            {book.complete == true ? <FontAwesomeIcon icon={faCheck} /> : ""}
          </Col>
        </Row>
      
    </div>
  );
}

{
  /* <Col md={{span:2}} style={{margin:"auto"}}> <Button style={{margin:"5px" , padding:"5px" ,backgroundColor: '#E38B29', borderColor: '#0B0C10',color:'black'}}>책 읽기</Button>{' '}</Col> */
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
