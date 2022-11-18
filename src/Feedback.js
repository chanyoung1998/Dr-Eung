import styles from "./Feedback.module.css";
import { useState } from "react";
import axios from "axios";
import owl from "./img/owl.png";
import bookstack from "./img/bookstack.png"
import stamp from "./img/stamp.png"


function Feedback(){
    const ORIGINAL_URL = "http://df83-121-157-55-117.jp.ngrok.io"
    const book = "어린왕자"
    const FEEDBACK_URL = ORIGINAL_URL+"/report/"+book+"/feedback/";
    let original = "감상문 원본입니당";
    let correct = "맞춤법 교정해드림";
    let feedback = "피드백데스";

    // //퍼킹CORS
    // axios
    // .get(FEEDBACK_URL, {
    //     headers: {
    //         Authorization: "Token 5f5c38d1f80e9a6c552fead148937e1369959144"
    //     }
    // })
    // .then((data) => {
    // if (data.status === 200) {
    //     console.log("수-양");
    //     original = data.data.original;
    //     correct = data.data.correct;
    //     feedback = data.data.feedback;
    // } else {
    //     console.log("응ㅅㄱ");
    //     //잘못입력함ㅋ
    // }
    // })
    // .catch(() => {
    //     console.log("뭐양이건");
    // //서버이상함ㅅㄱ
    // });

    const [report, setReport] = useState(original);
    let [btn, setBtn] = useState("맞춤법 교정")

    function correctionHandler(){
        if(report == original){
            setReport(correct)
            setBtn("원본 보기")
        }
        else{
            setReport(original)
            setBtn("맞춤법 교정")
        }
    }

    return(
        <div className={styles.container}>
            <div className={styles.titlebar}>
                <div className={styles.titleleft}>
                    <div className={styles.titlebox}>
                        <div className={styles.title}>내 감상문</div>
                    </div>
                    <div className={styles.correctbtnbox}>
                        <button onClick={()=>correctionHandler()}>{btn}</button>
                    </div>
                </div>
                <div className={styles.titleright}>
                <button onClick={()=>{
                    // 마이페이지로 연결
                }}>돌아가기</button>
                </div>
            </div>

            <div className={styles.contents}>
                <div className={styles.report}>
                    <div className={styles.notes}>{report}</div>
                </div>
                <div className={styles.comment}>
                    <div className={styles.feedback}>
                        {feedback}
                        <img src={stamp}></img>
                    </div>
                    <div className={styles.images}>
                        <div className={styles.leftimg}>
                            <img src={bookstack}></img>
                        </div>
                        <div className={styles.rightimg}>
                            <img src={owl}></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )      
}

export default Feedback