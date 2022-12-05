/*eslint-disable */
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faUserFriends } from "@fortawesome/free-solid-svg-icons";

import { Container, Row, Col, Button } from "react-bootstrap";
import { Nav, Modal } from "react-bootstrap";

import axios from "axios";
import { useSelector } from "react-redux";

import styles from "./Mypage.module.css";
import ApexCharts from "react-apexcharts";
import owl from "./img/owl.png";
import owl1 from "./img/owl1.png";
import owl2 from "./img/owl2.png";
import owl3 from "./img/owl3.png";
import owl4 from "./img/owl4.png";
import owl5 from "./img/owl5.png";
import owl6 from "./img/owl6.png";
import default_profile from "./img/profile.png";
import { useNavigate } from "react-router-dom";

import bg1 from "./img/bg1.png";
import bg2 from "./img/bg2.png";
import bg3 from "./img/bg3.png";
import bg4 from "./img/bg4.png";
import bg5 from "./img/bg5.png";
import bg6 from "./img/bg6.png";
import bg7 from "./img/bg7.png";

import eye1 from "./img/eye1.png";
import eye2 from "./img/eye2.png";

import owl2_eye1 from "./img/owl2_eye1.png";
import owl2_eye2 from "./img/owl2_eye2.png";

import noParts from "./img/defaultParts.png"
import noBg from "./img/defaultBg.png"

function Mypage() {
  const BASE_URL = useSelector((state) => state.BASE_URL);
  // const TOKEN = useSelector((state) => state.TOKEN);
  const TOKEN = localStorage.getItem('TOKEN')
  console.log(TOKEN)
  let [profile, setProfile] = useState({});
  const [ability, setAbility] = useState([]);
  const [score1, setScore1] = useState([0, 0, 0, 0, 0]);
  const [genres, setGenres] = useState([]);
  const [score2, setScore2] = useState([0, 0, 0, 0, 0]);
  const [tier, setTier] = useState(0);
  // const owlimg = [owl1, owl2, owl3, owl4, owl5, owl6][tier];

  const owlimg = {
    owl1: owl1,
    owl2: owl2,
    owl3: owl3,
    owl4: owl4,
    owl5: owl5,
    owl6: owl6,
    owl2_eye1: owl2_eye1,
    owl2_eye2: owl2_eye2,
  };

  let [activities, setActivities] = useState([
    {
      id: "어린왕자",
      date: "2022/10/13",
      time: "10:23",
      state: "21p 읽는중",
    },
  ]);
  const [isLoading, setLoading] = useState(true);

  const [show, setShow] = useState(false);
  const [bg, setBg] = useState(bg1);
  const [character, setCharacter] = useState("owl");
  const [currentParts, setCurrentParts] = useState("0");
  useEffect(() => {
    axios
      .get(`${BASE_URL}MyPage/`, {
        headers: {
          Authorization: TOKEN,
        },
      })
      .then((data) => {
        console.log(data.data);
        setProfile(data.data.profile);
        setAbility(Object.keys(data.data.score.ability));
        setScore1(Object.values(data.data.score.ability));
        setGenres(Object.keys(data.data.score.genres));
        setScore2(Object.values(data.data.score.genres));
        setActivities(data.data.activities.recent);
        setTier(data.data.tier);
        setCharacter("owl" + (tier + 1).toString());
        setBg(profile["bg"])
        setCurrentParts(profile["parts"])
        
        setLoading(false);
      });
  }, [tier]);

  console.log(bg)
  if(character == "owl2" && currentParts != "0"){
    setCharacter(character + "_eye" + currentParts)
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const p = document.getElementsByTagName("particule");
  for (let i = 0; i < p.length; i++) {
    p[i].remove();
  }
  return (
    <div className={styles.layout}>
      <DecorateModal
        show={show}
        setShow={setShow}
        bg={bg}
        setBg={setBg}
        character={character}
        setCharacter={setCharacter}
        currentParts={currentParts}
        setCurrentParts={setCurrentParts}
        TOKEN={TOKEN}
      />
      <div className={styles.innerLayout}>
        <div className={styles.innerinnerLayout} align="left">
          <Profile profile={profile} />

          <div style={{ margin: "30px auto 0" }}>
            <div className={styles.statuslayout} style={{ background: "none" }}>
              <div className={styles.graphArea}>
                <div className={styles.status}>
                  <CustomRadar data={score1} categories={ability} />
                </div>
              </div>
              <div className={styles.graphArea2}>
                <div className={styles.status}>
                  <div className={styles.status}>
                    <CustomRadar data={score2} categories={genres} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <RecentActivity activities={activities} />
        </div>
      </div>
      <div
        className={styles.owlcustomlayout}
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div
          className={styles.owlcustomimg}
          style={{ backgroundImage: `url(${owlimg[character]})` }}
        ></div>

        <div className={styles.btndiv}>
          <Button
            id={styles.ReadButton}
            style={{ marginTop: "3%" }}
            size="lg"
            onClick={() => setShow(true)}
          >
            꾸미러 가기
          </Button>
        </div>
      </div>
    </div>
  );
}

function Profile({ profile }) {
  return (
    <div style={{ margin: "30px auto 0" }}>
      {/* <h2>자기소개</h2> */}
      <div className={styles.card}>
        <div className={styles.title}>{profile.nickname}</div>
        <div className={styles.title}>{profile.school}</div>
        <div className={styles.profilebox}>
          <div className={styles.namebox}>
            <h2>{profile.name}</h2>
            <div className={styles.desc}>{profile.introduction}</div>
          </div>
          <div className={styles.imgbox}></div>
        </div>
        <div className={styles.actions}>
          <button className={styles.button}>
            <FontAwesomeIcon icon={faHeart} />
          </button>
          <button className={styles.button}>
            <FontAwesomeIcon icon={faUserFriends} />
          </button>
        </div>
      </div>
    </div>
  );
}

function RecentActivity({ activities }) {
  let navigate = useNavigate();
  return (
    <div className={styles.recentactivity}>
      <Col md={{ span: 12 }}>
        <div
          style={{
            marginLeft: "5%",
            marginRight: "5%",
            // background: "#d57440",
            borderRadius: "10px",
          }}
        >
          <Container>
            <Row style={{ height: "7vh", fontSize: "20px" }}>
              <Col md={{ span: 4 }} style={{ margin: "auto" }}>
                제목
              </Col>
              <Col md={{ span: 2 }} style={{ margin: "auto" }}>
                날짜
              </Col>
              <Col md={{ span: 3 }} style={{ margin: "auto" }}>
                시간
              </Col>
              <Col md={{ span: 3 }} style={{ margin: "auto" }}>
                상태
              </Col>
            </Row>
          </Container>

          <Container>
            <Col>
              <div
                style={{
                  // background: "#E1C591",
                  borderEndEndRadius: "10px",
                }}
              >
                {activities.map(function (activity, i) {
                  let bgColor = i % 2 == 0 ? "#FDEEDC" : "";
                  let curStatus = activity.state ? activity.state : "";
                  let curStatusBg = "";
                  let curStatusfc = "";
                  if (curStatus.includes("읽는")) {
                    curStatusBg = "#E3C770";
                    curStatusfc = "#285430";
                  } else if (curStatus.includes("퀴즈")) {
                    curStatusBg = "#FECD70";
                    curStatusfc = "#00FFD1";
                  } else if (curStatus.includes("완료")) {
                    curStatusBg = "#FFAE6D";
                    curStatusfc = "#00D7FF";
                  } else if (curStatus.includes("활동")) {
                    curStatusBg = "#F6AE99";
                    curStatusfc = "#00D7FF";
                  }
                  // 독후감 작성
                  else {
                    curStatusBg = "#F3E0B5";
                    curStatusfc = "#C70A80";
                  }

                  return (
                    <div>
                      <Row
                        style={{
                          height: "7vh",
                          background: `${bgColor}`,
                          borderRadius: "20px",
                        }}
                      >
                        <Col md={{ span: 4 }} style={{ margin: "auto" }}>
                          {activity.id}
                        </Col>
                        <Col md={{ span: 2 }} style={{ margin: "auto" }}>
                          {activity.date}
                        </Col>
                        <Col md={{ span: 3 }} style={{ margin: "auto" }}>
                          {activity.time}
                        </Col>
                        <Col
                          className={styles.activitystatus}
                          md={{ span: 3 }}
                          style={{ margin: "auto" }}
                          onClick={() => {
                            if (curStatus.includes("완료")) {
                              navigate(`/feedback/${activity.id}`);
                            }
                            //읽는 중
                            else if (activity.info.state == 1) {
                              navigate(
                                `/reading/${activity.id}/${activity.info.current_chapter}/${activity.info.current_page}`
                              );
                            }
                            //퀴즈
                            else if (activity.info.state == 2) {
                              navigate(
                                `/quiz/${activity.id}/${activity.info.current_chapter}`
                              );
                            }
                            //활동(단원별 내용 작성)
                            else if (activity.info.state == 3) {
                              navigate(
                                `/activity/${activity.id}/${activity.info.current_chapter}`
                              );
                            }
                            //독후감 작성(단원별 내용 작성)
                            else if (activity.info.state == 4) {
                              navigate(
                                `/writing/${activity.id}/form/${activity.info.format}`
                              );
                            }
                          }}
                        >
                          <div
                            style={{
                              // color: `${curStatusfc}`,
                              background: `${curStatusBg}`,
                              borderRadius: "30px",
                              margin: "5%",
                            }}
                          >
                            {activity.state}
                          </div>
                        </Col>
                      </Row>
                    </div>
                  );
                })}
              </div>
            </Col>
          </Container>
        </div>
      </Col>
    </div>
  );
}

function CustomRadar(props) {
  let state = {
    series: [
      {
        name: "장르",
        data: props.data,
      },
    ],

    options: {
      chart: {
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },

      title: {
        // show: true,
        // text: '장르',
        // align: 'center'
      },
      fill: {
        opacity: 0.8,
        colors: ["#733C3C"],
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["#733C3C"],
        dashArray: 0,
      },
      markers: {
        colors: "#3C2317",
      },
      plotOptions: {
        radar: {
          polygons: {
            strokeColors: "#B7C4CF",
            fill: {
              // colors: ['#f8f8f8', '#fff']
            },
          },
        },
      },
      yaxis: {
        show: true,
        min: 0,
        max: 100,
        tickAmount: 4,
      },
      xaxis: {
        categories: props.categories,
        labels: {
          show: true,
          style: {
            colors: ["#3C2317", "#3C2317", "#3C2317", "#3C2317", "#3C2317"],
            fontSize: "15px",
          },
        },
      },

      chart: {
        toolbar: {
          show: false,
        },
        fontFamily: "Miwonfont",
      },
    },
  };
  const width = document.documentElement.clientWidth / 6;
  return (
    <ApexCharts
      options={state.options}
      series={state.series}
      type="radar"
      //전체 넓이의 1/5
      width={width}
      height={width}
    />
  );
}

function DecorateModal({show, setShow, bg, setBg, character, setCharacter, currentParts, setCurrentParts,TOKEN}){
  const BASE_URL = useSelector((state) => state.BASE_URL);
  const [tab, setTab] = useState(0);
  useEffect(() => {
    axios
    .put(`${BASE_URL}updateImg/`, { bg: bg, acc: currentParts }, {
      headers: { 
        "Content-Type": "multipart/form-data",
        Authorization: TOKEN
      }}).then((data)=>{
        console.log(data) 
      })
  }, [bg, currentParts]);

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        dialogClassName={styles.mymodal}
      >
        <Modal.Header
          closeButton
          style={{
            background: "#FFF7E9",
            display: "grid",
            gridTemplateColumns: "1fr 0.1fr",
          }}
        >
          <Nav
            id="bootstrap-overrides"
            justify
            variant="tabs"
            defaultActiveKey="Background"
            style={{ background: "#FFF7E9" }}
          >
            <Nav.Item>
              <Nav.Link
                eventKey="Background"
                style={{ color: "#B2B2B2" }}
                onClick={() => {
                  setTab(0);
                }}
              >
                <h1>배경</h1>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="Parts"
                style={{ color: "#B2B2B2" }}
                onClick={() => {
                  setTab(1);
                }}
              >
                <h1>악세사리</h1>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Modal.Header>

        <Modal.Body style={{ background: "#FFF7E9" }}>
          {tab === 0 ? (
            <BackGround bg={bg} setBg={setBg} setShow={setShow} />
          ) : (
            <Parts
              character={character}
              setCharacter={setCharacter}
              setShow={setShow}
              currentParts={currentParts}
              setCurrentParts={setCurrentParts}
              setTab={setTab}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

function BackGround({bg, setBg, setShow}){
  const bgs = [noBg, bg1, bg2, bg3, bg4, bg5, bg6, bg7]
  const n = Math.ceil(bgs.length / 4);

  const [selected, setSelected] = useState(
    bgs.map((i) => {
      if (i == bg) return true;
      else return false;
    })
  );

  const handleSelected = (key) => {
    const copy = [...selected];

    if (!copy[key]) {
      copy.fill(false);
    }

    copy[key] = !copy[key];
    setSelected(copy);
  };

  const handleSubmit = () => {
    if(selected.indexOf(true) == 0){
      setBg()
    } else {
      setBg(bgs[selected.indexOf(true)])
    }
    setShow(false)
  }

  return (
    <>
      <Container className={styles.table} sytle={{ overflowY: "scroll" }}>
        {Array.from({ length: n }).map(function (_, i) {
          return (
            <div className={styles.row}>
              {[0, 1, 2, 3].map(function (j) {
                if (bgs.length > 4 * i + j) {
                  return (
                    <div className={styles.cell}>
                      <img
                        src={bgs[4 * i + j]}
                        className={selected[4 * i + j] ? styles.selected : ""}
                        onClick={() => {
                          handleSelected(4 * i + j);
                        }}
                      />
                    </div>
                  );
                } else {
                  return <div />;
                }
              })}
            </div>
          );
        })}
      </Container>
      <Button
        id={styles.ReadButton}
        style={{ marginTop: "3%" }}
        size="lg"
        onClick={() => {
          handleSubmit();
        }}
      >
        적용하기
      </Button>
    </>
  );
}

function Parts({character, setCharacter, setShow, currentParts, setCurrentParts, setTab}){
  const parts = [noParts, eye1, eye2]
  const n = Math.ceil(parts.length / 4);

  const [selected, setSelected] = useState(parts.map((i)=>{if(i == parts[currentParts]) return true; else return false;}))

  const handleSelected = (key) => {
    const copy = [...selected]

    if(!copy[key]){
      copy.fill(false)
    }

    copy[key] = !copy[key]
    setSelected(copy)
  }

  const handleSubmit = () => {
    setCurrentParts(selected.indexOf(true))
    
    if(selected.indexOf(true) != 0){
      if(character.includes("eye")){
        let num = (character.indexOf("eye") + 3)
        setCharacter(character.substr(0, num) + (selected.indexOf(true)).toString() + character.substr(num + 1))
      } else {
        setCharacter(character + "_eye" + (selected.indexOf(true)).toString())
      }
    } else {
      setCharacter(character.substr(0,4))
    }


    setTab(0)
    setShow(false)
  }
  
  return(
    <>
      <Container className={styles.table} sytle={{overflowY:"scroll"}}>
      {Array.from({length:n}).map(function(_,i){
        return(
          <div className={styles.row}>
              {[0,1,2,3].map(function(j){
                if(parts.length > 4*i+j){
                  return(
                    <div className={styles.cell}>
                      <img 
                      src={parts[4*i+j]} className={selected[4*i+j] ? `${styles.selected} ${styles.parts}` : styles.parts }
                      onClick={()=>{handleSelected(4*i+j)}}/>
                    </div>
                  );
                } else{return(<div />);}
              })}
        </div>
        );
      })}
      </Container>
      <Button 
            id={styles.ReadButton} 
            style={{ marginTop: "3%" }} 
            size="lg" 
            onClick={()=>{handleSubmit()}}>
            적용하기
          </Button>
    </>
  );
}

export default Mypage;
