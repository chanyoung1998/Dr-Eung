/*eslint-disable */
import { useState, Component, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faUserFriends,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import {
  Container,
  Row,
  Col,
  InputGroup,
  Form,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import styles from "./Mypage.module.css";

import ApexCharts from "react-apexcharts";

function Mypage() {
  let [ability, setAbility] = useState(0);

  return (
    <div className={styles.layout}>
      <div className={styles.innerLayout}>
        <div className={styles.innerinnerLayput}>
          <Profile />

          <div style={{margin: "30px auto 0" }}>
            {ability === 0 ? (
              <div>
                <div
                  className={styles.graphArea}
                  style={{ background: "#FFE9A0" }}
                >
                  <div className={styles.status}>
                    <CustomRadar
                      data={[90, 80, 30, 20,50]}
                      categories={["소설", "자기개발", "수필", "경제","모라"]}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.status}>
                <div
                  className={styles.graphArea2}
                  style={{ background: "#E4E0CE" }}
                >
                  <div className={styles.imgAvatar2}></div>
                  <div className={styles.status}>
                    <CustomRadar
                      data={[90, 80, 30, 20]}
                      categories={["독해력", "어휘력", "내용", "문법", ,]}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Mypage;

function Profile() {
  return (
    <div style={{ margin: "30px auto 0" }}>
      {/* <h2>자기소개</h2> */}
      <div className={styles.card} >
        <div className={styles.imgAvatar}></div>
        <div className={styles.cardText}>
          <div className={styles.titleTotal}>
            <div className={styles.title}>척척박사</div>

            <div>
              <h2>정찬영</h2>

              <div className={styles.desc}>
                Morgan has collected ants since they were six years old and now
                has many dozen ants but none in their pants.
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
        </div>
      </div>
    </div>
  );
}

function RecentActivity() {
  let [activities, setActivities] = useState([
    {
      title: "어린왕자",
      date: "2022/10/13",
      time: "10:23",
      status: "21p 읽는중",
    },
    {
      title: "걱정을 걸어 두는 나무",
      date: "2022/10/12",
      time: "10:23",
      status: "감상문 작성 완료",
    },
    {
      title: "다리 위의 집",
      date: "2022/10/11",
      time: "10:23",
      status: "퀴즈 푸는 중",
    },
    {
      title: "다리 위의 집",
      date: "2022/10/11",
      time: "10:23",
      status: "퀴즈 푸는 중",
    },
    {
      title: "헤리포터와 불의잔",
      date: "2022/09/11",
      time: "10:23",
      status: "120p 읽는 중",
    },
  ]);

  return (
    <div>
      <Col md={{ span: 12 }}>
        <div
          style={{
            marginLeft: "5%",
            marginRight: "5%",
            fontSize: "25px",
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
                  let bgColor = i % 2 == 0 ? "#E4E0CE" : "";
                  let curStatus = activity.status;
                  let curStatusBg = "";
                  let curStatusfc = "";
                  if (curStatus.includes("읽는중")) {
                    curStatusBg = "rgba(253, 253, 189,0.5)";
                    curStatusfc = "#FFD36E";
                  } else if (curStatus.includes("퀴즈")) {
                    curStatusBg = "rgba(200, 255, 212,0.5)";
                    curStatusfc = "#00FFD1";
                  } else if (curStatus.includes("완료")) {
                    curStatusBg = "rgba(184, 232, 252,0.5)";
                    curStatusfc = "#00D7FF";
                  } else {
                    curStatusBg = "rgba(177, 175, 255,0.5)";
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
                          {activity.title}
                        </Col>
                        <Col md={{ span: 2 }} style={{ margin: "auto" }}>
                          {activity.date}
                        </Col>
                        <Col md={{ span: 3 }} style={{ margin: "auto" }}>
                          {activity.time}
                        </Col>
                        <Col md={{ span: 3 }} style={{ margin: "auto" }}>
                          <div
                            style={{
                              color: `${curStatusfc}`,
                              background: `${curStatusBg}`,
                              borderRadius: "30px",
                              margin: "5%",
                            }}
                          >
                            {activity.status}
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

  return (
    <ApexCharts
      options={state.options}
      series={state.series}
      type="radar"
      width={300}
      height={300}
    />
  );
}

// <div
// className={styles.tabArea}
// onClick={() => {
//   setAbility(0);
// }}
// ></div>
// <div
// className={styles.tabArea2}
// style={{ background: "#E4E0CE" }}
// ></div>
