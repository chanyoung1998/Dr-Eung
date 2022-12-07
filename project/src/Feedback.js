import styles from "./Feedback.module.css";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import owl from "./img/owl.png";
import bookstack from "./img/bookstack.png";
import stamp from "./img/stamp.png";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading.js"
function Feedback() {
  let param = useParams();
  const book = param.title;
  //   let [contents,setContentes] = useState({});
  const [original, setOriginal] = useState("");
  // let [original_red2, setOriginalRed2] = useState("");
  const [correct, setCorrect] = useState("");
  const [feedback, setFeedback] = useState("");
  let [btn, setBtn] = useState(0);
  const navigate = useNavigate();
  const BASE_URL = useSelector((state) => state.BASE_URL);
  // const TOKEN = useSelector((state) => state.TOKEN);
  const TOKEN = localStorage.getItem('TOKEN')
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}report/${book}/feedback/`, {
        headers: {
          Authorization: TOKEN,
        },
      })
      .then((data) => {
        // setContentes(data.data.contents);
        setOriginal(data.data.contents.original);
        setCorrect(data.data.contents.correct);
        setFeedback(data.data.contents.feedback);
        setLoading(false);
      });
  }, []);

  const original_red2 = useMemo(() => {
    let originallen = original.length;
    let curoriginal = 0;
    let curcorrect = 0;
    let original_red = "";
    let original_red2 = "";

    while (curoriginal != originallen) {
      if (original.charAt(curoriginal) == correct.charAt(curcorrect)) {
        original_red += original.charAt(curoriginal);

        curoriginal += 1;
        curcorrect += 1;
      } else if (original.charAt(curoriginal) == " ") {
        //띄어쓰기 하지 말아야 하는데 한 경우
        curoriginal += 1;
        
        original_red += " <div>";
      } else if (correct.charAt(curcorrect) == " ") {
        //띄어쓰기 해야 하는데 안 한 경우
        curcorrect += 1;

        original_red += "<div>";
      } else {
        original_red += "<div>";
        original_red += original.charAt(curoriginal);

        curoriginal += 1;
        curcorrect += 1;
      }
    }
    let flag = false;
    let i = 0;
    for (; i < original_red.length; ) {
      if ((original_red.charAt(i) == "<") & (flag == false)) {
        i += 5;

        original_red2 += '<span style="color:red">';
        flag = true;
      } else if ((original_red.charAt(i) == "<") & (flag == true)) {
        i += 5;
      } else {
        if ((original_red.charAt(i) == " " | original_red.charAt(i) == "\n" ) & (flag == true)) {
          
          original_red2 += original_red.charAt(i)
          original_red2 += "</span>";
          i += 1;
          flag = false;
        } else {
          if (original_red.charAt(i) == "\n") {
            // 안되면 <br>넣기
            original_red2 += "";
          } else {
            original_red2 += original_red.charAt(i);
          }
          i += 1;
        }
      }
    }
    // console.log(original)
    // console.log(correct)
    // console.log(original_red2)

    return original_red2;
  });

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.titlebar}>
        <div className={styles.titleleft}>
          <div className={styles.titlebox}>
            <div className={styles.title}>내 감상문</div>
          </div>
          <div className={styles.correctbtnbox}>
            <button
              className={styles.button}
              onClick={() => {
                btn == 0 ? setBtn(1) : setBtn(0);
              }}
            >
              {btn == 1 ? "원본 보기" : "맞춤법 교정"}
            </button>
          </div>
        </div>
        <div className={styles.titleright}>
          <button
            className={styles.button}
            onClick={() => {
              navigate("/home");
              // 마이페이지로 연결
            }}
          >
            돌아가기
          </button>
        </div>
      </div>

      <div className={styles.contents}>
        <div className={styles.report} align="left">
          <div className={styles.note}>
            {btn == 0 ? (
              <span style={{wordBreak:"break-all"}} dangerouslySetInnerHTML={{ __html: original_red2 }}></span>
            ) : (
              correct
            )}
          </div>
        </div>
        <div className={styles.comment}>
          <div className={styles.feedback}>
            <div align="left">{feedback}</div>
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
  );
}

export default Feedback;
