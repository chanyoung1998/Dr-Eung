/*eslint-disable */
import './App.css';
import {useParams} from "react-router-dom";
import {useState,useEffect} from "react"
import {Nav} from 'react-bootstrap'
import Mypage from './Mypage.js'
import BookMenu from './BookMenu.js'
import ReportMenu from './ReportMenu.js'


function App() {

  let [tab,setTab] = useState(0);

  return (
    <div className="App">
      
    <Nav id="bootstrap-overrides" justify variant="tabs" defaultActiveKey="Mypage">
      <Nav.Item>
        <Nav.Link eventKey="Mypage" style={{ color:"black"}} onClick={()=>{setTab(0)}}><h1>내 정보</h1></Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="BookMenu" style={{color:"black"}} onClick={()=>{setTab(1)}}><h1>내 책장</h1></Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="ReportMenu" style={{color:"black"}} onClick={()=>{setTab(2)}}><h1>내 독후감</h1></Nav.Link>
      </Nav.Item>
      
    </Nav>
    
    <div>
    {
      [<Mypage/>,<BookMenu/>,<ReportMenu/>][tab]
    }
    </div>
    
      
    </div>
  );
}

export default App;





