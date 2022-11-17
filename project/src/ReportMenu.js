/*eslint-disable */
import {useState} from "react";
import { Container, Col,Row ,InputGroup,Form,Dropdown,DropdownButton} from "react-bootstrap";
import styles from './ReportMenu.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

function ReportMenu(){
  let [report,setReport] = useState([])
    return(
    <div>

        <Container style={{width:"50%", marginTop:"5%"}}>
          <Row>
            <Col md={{span:1}} onClick={()=>{console.log("cliced")}}><FontAwesomeIcon icon={faMagnifyingGlass} size='2x'/>
            </Col>
            <Col md={{span:9}} style={{padding:"0px"}}>
                <InputGroup>
                    <Form.Control
                    placeholder="내 감상문 찾으러 가기"
                    aria-label="search"
                    aria-describedby="search"
                    />
                </InputGroup>
            </Col>
            <Col md={{span:2 }} style={{paddingLeft:"2px"}}>
              <DropdownButton id={styles.dropdownItemButton} title="보여주기" >
                  {/* <Dropdown.ItemText>기준</Dropdown.ItemText> */}
                  <Dropdown.Item as="button" onClick={()=>{ 

                  }}>제목순으로</Dropdown.Item>
                  
                  <Dropdown.Item as="button" onClick={()=>{
                  }}>책갈피만</Dropdown.Item>
                  <Dropdown.Item as="button" onClick={()=>{

                  }}>임시저장만</Dropdown.Item>
              </DropdownButton> 
          </Col>
          </Row>
        </Container>
        <div className={styles.scrollmenu}>
        {
          [1,2,3,4,5,6].map(function(element,i){
            return(
              <Report index={i} />
            ) 
            
          })
        }
      

    </div>
    </div>
    
    )
  }



export default ReportMenu;



function Report({index}){

  let colors = ['#d6b5a3','#E97777','#BCEAD5','#82CD47','#9F73AB','#7DE5ED'];
  let endcolors =['#AA8B56','#E0144C','#6D9886','#379237','#3F3B6C','#5DA7DB']
  let bgColor = colors[index%6];
  let bColor = endcolors[index%6];

  return(
  
  <div className={styles.book} onClick={()=>{console.log("clicked")}}>
    <div className={styles.back} style ={{background:`${bgColor}`}}></div>
    <div className={styles.page6}>책읽으러가기</div>
    <div className={styles.page5}></div>
    <div className={styles.page4}></div>
    <div className={styles.page3}></div>
    <div className={styles.page2}></div>
    <div className={styles.page1}></div>
    <div className={styles.front} style ={{background:`${bgColor}`, backgroundImage: `linear-gradient(to right,${bColor} 5px, ${bColor} 5px, transparent 7px)`}}><p className={styles.title}>어린왕자를 읽고 감자별을 생각하며</p></div>
  </div>
    

  )
}
