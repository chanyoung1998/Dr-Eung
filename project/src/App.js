/*eslint-disable */
import "./App.css";
import { useNavigate,Outlet,useParams, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import Mypage from "./Mypage.js";
import BookMenu from "./BookMenu.js";
import ReportMenu from "./ReportMenu.js";
import Read from "./Read.js";
import ReportWriting from "./ReportWriting.js";
import Quiz from "./Quiz.js";
import Feedback from "./Feedback.js";
import Activity from "./Activity.js";
function App() {
  
  let navigate = useNavigate();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeElement/>} />
        <Route path="/reading/:title/:chapter/:page" element={<Read/>}/>
        <Route path="/writing/:title" element={<ReportWriting/>}/>
        <Route path="/quiz/:title/:chapter" element={<Quiz/>}/>
        <Route path="/activity/:title/:chapter" element={<Activity/>}/>
        <Route path="/feedback/:title" element={<Feedback/>}/>
      </Routes>
    </div>
  );
}

export default App;

function HomeElement() {
  let [tab, setTab] = useState(0);

  return (
    <div>
      <Nav
        id="bootstrap-overrides"
        justify
        variant="tabs"
        defaultActiveKey="Mypage"
      >
        <Nav.Item>
          <Nav.Link
            eventKey="Mypage"
            style={{ color: "#B2B2B2" }}
            onClick={() => {
              setTab(0);
            }}
          >
            <h1>내 정보</h1>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="BookMenu"
            style={{ color: "#B2B2B2" }}
            onClick={() => {
              setTab(1);
            }}
          >
            <h1>내 책장</h1>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="ReportMenu"
            style={{ color: "#B2B2B2" }}
            onClick={() => {
              setTab(2);
            }}
          >
            <h1>내 독후감</h1>
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div>{[<Mypage />, <BookMenu />, <ReportMenu />][tab]}</div>
    </div>
  );
}
