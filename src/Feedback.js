import styles from "./Feedback.module.css";
import { useState } from "react";
import axios from "axios";
import owl from "./img/owl.png";


function Feedback(){
    return(
        <div className={styles.container}>
            <div className={styles.titlebar}>
                <div className={styles.titleleft}>
                    <div className={styles.titlebox}>
                        <div className={styles.title}>내 감상문</div>
                    </div>
                    <div className={styles.correctbtnbox}>
                        <button>맞춤법 교정</button>
                    </div>
                </div>
                <div className={styles.titleright}>
                <button>돌아가기</button>
                </div>
            </div>

            <div className={styles.contents}>
                <div className={styles.report}>
                    <div className={styles.notes}>감상문데스</div>
                </div>
                <div className={styles.comment}>
                    <div className={styles.feedback}>
                        피드백데스
                    </div>
                    <div className={styles.images}>
                        <div className={styles.leftimg}></div>
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