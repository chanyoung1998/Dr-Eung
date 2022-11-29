/*eslint-disable */
import { useState, Component, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faUserFriends,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import { Container, Row, Col, Button } from "react-bootstrap";

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
import { Navigate, useNavigate } from "react-router-dom";



function Mypage() {
  const BASE_URL = useSelector((state) => state.BASE_URL);

  let [profile, setProfile] = useState({});
  const [ability, setAbility] = useState([]);
  const [score1, setScore1] = useState([0, 0, 0, 0, 0]);
  const [genres, setGenres] = useState([]);
  const [score2, setScore2] = useState([0, 0, 0, 0, 0]);
  const [tier,setTier] = useState(0);
  const owlimg = [owl1,owl2,owl3,owl4,owl5,owl6][tier];
  let [activities, setActivities] = useState([
    {
      id: "어린왕자",
      date: "2022/10/13",
      time: "10:23",
      state: "21p 읽는중",
    },
  ]);
  const [isLoading,setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${BASE_URL}MyPage/`, {
        headers: {
          Authorization: "Token 6ea207c7412c800ec623637b51877c483d2f2cdf",
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
        setTier(data.data.tier)
        setLoading(false);
        
      });
  }, []);

  if (isLoading){
    return <div>Loading...</div>
  }

  
  return (
    <div className={styles.layout}>
      <div className={styles.innerLayout}>
        <div className={styles.innerinnerLayout} align="left">
          <Profile profile={profile} />

          <div style={{ margin: "30px auto 0" }}>
            <div className={styles.statuslayout} style={{ background: "none" }}>
              <div
                className={styles.graphArea}
                // style={{ background: "#FFE9A0" }}
              >
                <div className={styles.status}>
                  <CustomRadar data={score1} categories={ability} />
                </div>
              </div>
              <div
                className={styles.graphArea2}
                // style={{ background: "#E4E0CE" }}
              >
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
          <RecentActivity activities={activities}/>
        </div>
      </div>
      <div className={styles.owlcustomlayout}>
        {/* <img src={owlimg} className={styles.owlcustomimg} /> */}
        <div className={styles.owlcustomimg}></div>
        <div>
          <Button id={styles.ReadButton} style={{ marginTop: "3%" }} size="lg">
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
        {/* <div className={styles.imgAvatar}></div> */}

        <div className={styles.title}>{profile.nickname}</div>
        <div className={styles.title}>{profile.school}</div>

        <h2>{profile.name}</h2>

        <div className={styles.desc}>{profile.introduction}</div>
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

function RecentActivity({activities}) {
 
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
                {
                activities.map(function (activity, i) {
                  let bgColor = i % 2 == 0 ? "#FDEEDC" : "";
                  let curStatus = activity.state ? activity.state : '';
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
                  }else if(curStatus.includes("활동")){
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
                        <Col className={styles.activitystatus} md={{ span: 3 }} style={{ margin: "auto" }} onClick={()=>{
                          if(curStatus.includes("완료")){
                            navigate(`/feedback/${activity.id}`)
                          }
                          //읽는 중
                          else if(activity.info.state == 1){
                            navigate(`/reading/${activity.id}/${activity.info.current_chapter}/${activity.info.current_page}`)
                          }
                          //퀴즈
                          else if(activity.info.state == 2){
                            navigate(`/quiz/${activity.id}/${activity.info.current_chapter}`)
                          }
                          //활동(단원별 내용 작성)
                          else if(activity.info.state == 3){
                            navigate(`/activity/${activity.id}/${activity.info.current_chapter}`)
                          }
                          //독후감 작성(단원별 내용 작성)
                          else if(activity.info.state == 4){
                            navigate(`/writing/${activity.id}/form/${activity.info.format}`)
                          }
                        }}>
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

export default Mypage;
