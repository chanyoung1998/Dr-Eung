/*eslint-disable */

import { useParams, Outlet, useNavigate } from "react-router-dom";
import { Nav, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import styles from "./ReportWriting.module.css";

import axios from "axios";
import { useSelector } from "react-redux";
function ReportWriting() {
  let param = useParams();
  let title = param.title;

  let 형식 = [
    "나와의 인터뷰",
    "편지 형식",
    "비교하기",
    "시 형식",
    "비평문 형식",
    "자유형식",
    "정보 전달",
    <div style={{ lineHeight: "1.2em" }}>
      줄거리
      <br />
      느낀점
      <br />
      각오
    </div>,
    "바꿔 쓰기",
  ];
  let [형식번호, set형식번호] = useState(0);
  let [formshow, setFormShow] = useState(false);

  let [tab, setTab] = useState(1);
  let [show, setShow] = useState(false);
  let [chapters, setChapters] = useState([]);

  let [data, setData] = useState([
    {
      original: "original",
      activities: {
        1: {
          keyword: ["키워드가 뭔가요", "양"],
          reason: ["왜요?", "그냥"],
          summary: ["요약ㄱ", "재밌다"],
          feeling: ["느낌점ㄱ", "굿"],
        },
      },
    },
  ]);
  const [isLoading, setLoading] = useState(true);
  const BASE_URL = useSelector((state) => state.BASE_URL);
  const navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get(`${BASE_URL}report/${title}/`, {
        headers: {
          Authorization: "Token 6ea207c7412c800ec623637b51877c483d2f2cdf",
        },
      })
      .then((d) => {
        const totalchapters = Object.keys(d.data["activities"]).length;
        const newarray = Array.from({ length: totalchapters }, (v, i) => i + 1);
        // const newarray = chapters.slice(0,totalchapters);
        setChapters(newarray);
        setData([d.data]);
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div >
      <div className={styles.backbutton}>
        <button className={styles.backbuttonbtn}
          onClick={() => {
            navigate("/home");
            // 마이페이지로 연결
          }}
        >
          돌아가기
        </button>
      </div>
      <div className={styles.reportWritingLayout}>
        <ReportModal
          data={data}
          show={show}
          setTab={setTab}
          setShow={setShow}
          curChapter={tab}
          tabname={
            [
              "첫 번째 단원",
              "두 번째 단원",
              "세 번째 단원",
              "네 번째 단원",
              "다섯 번째 단원",
              "열 번째 단원",
              "열한 번째 단원",
              "열두 번째 단원",
              "열세 번째 단원",
              "열네 번째 단원",
              "열다섯 번째 단원",
              "열여섯 번째 단원",
              "열일곱 번째 단원",
              "열여덟 번째 단원",
              "열아홉 번째 단원",
            ][tab - 1]
          }
        />
        <FormExampleModal
          show={formshow}
          setFormShow={setFormShow}
          formnum={형식번호}
          형식={형식}
          title={title}
        />

        <div className={styles.chapters}>
          <Nav className="flex-column" variant="tabs" defaultActiveKey="0">
            {chapters.map(function (element, index) {
              const tabname = [
                "첫 번째 단원",
                "두 번째 단원",
                "세 번째 단원",
                "네 번째 단원",
                "다섯 번째 단원",
                "열 번째 단원",
                "열한 번째 단원",
                "열두 번째 단원",
                "열세 번째 단원",
                "열네 번째 단원",
                "열다섯 번째 단원",
                "열여섯 번째 단원",
                "열일곱 번째 단원",
                "열여덟 번째 단원",
                "열아홉 번째 단원",
              ];
              return (
                <Nav.Item>
                  <Nav.Link
                    eventKey={index}
                    onClick={() => {
                      setTab(element);
                      setShow(true);
                    }}
                    style={{
                      color: "#B2B2B2",
                      borderRadius: "10px",
                      margin: "2px",
                    }}
                  >
                    <h5>{tabname[index]}</h5>
                  </Nav.Link>
                </Nav.Item>
              );
            })}
          </Nav>
        </div>
        {Object.keys(param).includes("formnum") | window.location.href.includes("bingo") ? (
          <Outlet></Outlet>
        ) : (
          <div className={styles.innerLayout}>
            <h1 style={{ paddingTop: "50px" }}>독후감 형식을 한번 골라봐!</h1>
            <div className={styles.formsLayout}>
              {형식.map(function (e, i) {
                return i == 형식번호 ? (
                  <button
                    className={`${styles.buttonform} ${styles.clicked} ${
                      styles.btn
                    }${i + 1}`}
                    onClick={() => {
                      set형식번호(i);
                      setFormShow(true);
                    }}
                  >
                    {e}
                  </button>
                ) : (
                  <button
                    className={`${styles.buttonform} ${styles.btn}${i + 1}`}
                    onClick={() => {
                      set형식번호(i);
                      setFormShow(true);
                    }}
                  >
                    {e}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ReportModal({ data, show, setShow, curChapter, tabname }) {
  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        dialogClassName={styles.mymodal}
      >
        <Modal.Header closeButton style={{ background: "#FFF7E9" }}>
          <Modal.Title>
            <h2>{tabname}</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#FFF7E9" }}>
          {["keyword", "reason", "summary", "feeling"].map(function (e) {
            return (
              <div style={{ lineHeight: "90%" }}>
                <h3>질문. {data[0]["activities"][curChapter][e][0]}</h3>
                <br />
                <h4 style={{ color: "gray" }}>
                  답변. {data[0]["activities"][curChapter][e][1]}
                </h4>
                <hr />
              </div>
            );
          })}
        </Modal.Body>
      </Modal>
    </>
  );
}

function FormExampleModal({ show, setFormShow, formnum, 형식, title }) {
  let navigate = useNavigate();
  return (
    <>
      <Modal
        show={show}
        onHide={() => setFormShow(false)}
        centered
        dialogClassName={styles.mymodal}
      >
        <Modal.Header closeButton style={{ background: "#FFF7E9" }}>
          <Modal.Title>
            <h2>{형식[formnum]} </h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#FFF7E9" }}>
          {예시[formnum]}
        </Modal.Body>
        <Modal.Footer>
          <button
            className={styles.buttonmodal}
            onClick={() => {
              setFormShow(false);
              navigate(`/writing/${title}/form/${formnum}`);
            }}
          >
            작성하기
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReportWriting;

const 예시 = [
  <>
    <h3>예시) 만복이네 떡집</h3>
    <p align="left">
      OO는 왜 질문: <strong style={{ color: "#009EFF" }}>만복이는 왜</strong>{" "}
      장군의 떡집을 보고 그냥 지나쳤을까?
      <br />
      답변: 장군이에게도 착해질 기회를 주고 싶어서 그냥 지나친 것 같아.
      <br />
      <br />
      경험 질문: <strong style={{ color: "#009EFF" }}>
        나도 만복이처럼
      </strong>{" "}
      친구들에게 나쁜 말을 한{" "}
      <strong style={{ color: "#009EFF" }}>경험이 있나?</strong>
      <br />
      답변: 친구에게 '이 바보야'라고 해서 싸운 경험이 있어. 앞으로는 만복이가
      변한 것처럼 나도 친구들에게 고운 말을 쓰고 싶어.
      <br />
      <br />
      예상 질문: 장군이도 '장군이네 떡집' 덕분에 만복이처럼 좋은 친구가 될까?
      <br />
      답변: 그럴 것 같아. 만복이도 옆에서 도와주면서 친구들과 사이좋게 지낼 것
      같아
      <br />
      <br />
      라면 질문: <strong style={{ color: "#009EFF" }}>
        내가 만복이라면
      </strong>{" "}
      어떤 떡을 먹기 위해 노력했을까?
      <br />
      답변: 나는 재미있는 이야기가 몽글몽글 떠오르는 무지개떡을 먹고 싶어.
      친구들에게 재미있는 이야기를 해 주면 계속 웃어서 모두가 행복할 것 같아.
      <br />
      <br />
      가장 질문: 이 책을 읽고 나서{" "}
      <strong style={{ color: "#009EFF" }}>가장</strong> 인상 깊었던 장면은
      무엇이야?
      <br />
      답변: 만복이가 떡집을 발견하고 제일 처음 들어갔을 때가 기억이 나. 왜냐면
      나도 신비한 떡집이 있었으면 좋겠다고 부러운 마음이 들었기 때문이야.
    </p>
  </>,

  <>
    <h3>예시)광개토 대왕 전기</h3>
    <h3>
      <strong style={{ color: "#009EFF" }}>광개토 대왕님께</strong>
    </h3>
    <h4>-광개토 대왕을 읽고-</h4>
    <p>
      &nbsp;광개토 대왕님,안녕하십니까?
      <br />
      요즘 우리가 살고 있는 나라는 장마철이라 비가 많이 내리고
      있습니다.&nbsp;그리고 비 때문에 사람들이 죽고,실종되고,많은 피해를 입고
      있습니다.&nbsp;하루 빨리 장마가 끝났으면 좋겠습니다.
      <br />
      &nbsp;저는 대왕님 덕분에 잘 지내고 있습니다.&nbsp;요즘은 건강한 아이로
      무럭무럭 자라고 있답니다.&nbsp;우리 가족도 잘 있습니다.&nbsp;엄마,아빠 두
      분 모두 직장을 잘 다니셔서 돈을 벌어오십니다.
      <br />
      &nbsp;저는 서울에 있는 마천초등학교 3학년에 다니고 있는
      이경선입니다.&nbsp;요즘 여름 방학을 해서 신나고 즐겁게 지내고
      있습니다.&nbsp;그리고 학교를 가지 않아서 아빠 쉬는 날이면 놀러를 많이
      갑니다.&nbsp;왜냐하면 엄마는 이모들이랑 식당을 하고 계시기 때문입니다.
      <br />
      &nbsp;광개토 대왕님,저는 대왕님께서 용기와 지혜로 고구려를 잘
      다스리고,넓은 땅을 얻는 것에 감동을 받았습니다.어떻게 그렇게 훌륭한 임금이
      되었습니까? 저는 대왕님의 용기와 용맹함,지혜 등을 본받았습니다.그런데
      &nbsp;저는 용기가 부족한 어린이입니다.&nbsp;그래서 수업 시간에 친구들
      앞에서 발표를 못합니다.&nbsp;이제 대왕님의 용기를 배웠기 때문에 자신 있게
      용기를 가지고 발표도 잘하겠습니다.
      <br />
      &nbsp;그리고 대왕님께서 지혜로 전쟁에 이기고,백성들을 사랑하여 나라를 잘
      다스리고 평화롭게 만드는 것에도 감동을 받았답니다.어떻게 싸움을 잘
      하셨는지 궁금합니다.그런 지혜는 어디서 얻었습니까? 저는 아직 어린 아이라서
      전쟁이 무섭고 두렵습니다.그리고 저는 아이들과 싸움을 하면 항상 지고 울는
      아이가 됩니다.저도 대왕님처럼 지혜로운 사람이 되고 싶습니다.대왕님처럼
      용기와 지혜를 키우겠습니다.
      <br />
      &nbsp; 정말 감사합니다.앞으로 훌륭한 사람이 되도록 노력하는 모습을 지켜봐
      주시고,격려해 주시길 바랍니다.
      <br />
      &nbsp;그럼,이만 편지를 줄입니다.안녕히 계세요.다음에 또 책에서 만나면
      좋겠습니다.
    </p>
  </>,
  <>
    <h3>예시)나의 라임오렌지 나무</h3>
    <h3 style={{ color: "#009EFF" }}>장난꾸러기 제제</h3>
    <p>
      이 이야기는 순수한 마음을 자진 어린이 제제와 뽀르뚜까 아저씨와의 우정에
      대한 이야기다. 브라질에 사는 제제라는 아이는 집안이 너무 가난하다.
      장난꾸러기지만 깊은 생각을 하는 제제를 이해해 주는 친구가 없자 제제는
      오렌지 나무와 상상으로 이야기한다. 그 뒤 제제를 이해해 주는 뽀르뚜까
      아저씨를 만나지만 아저씨는 교통 사고로 죽고 만다. 그 후 제제는 다시 슬픔에
      잠긴다는 이야기다.{" "}
      <strong style={{ color: "#009EFF" }}>
        나는 이 책을 통해서 「빨강 머리 앤」이 생각났다.
      </strong>{" "}
      왜냐하면 「빨강 머리 앤」의 앤처럼 제제도 주근깨 있고 나무나 꽃들에게 말을
      걸어 자신의 마음을 이야기하는 상상력 뛰어난 아이이기 때문이다. 또 제제는
      앤처럼 고아는 아니지만 집안 형편이 어렵다는 것도 비슷하다. <br />
      <br />
      나는 제제가 뽀르뚜까 아저씨와 우정을 맺을 수 있었던 것은 뽀르뚜까 아저씨가
      제제보다 더한 순수함과 천진스러움을 갖고 있어서 라고 생각한다. 어른들은
      아이들의 행동을 이해해 주기 보다는 먼저 야단을 치는 것이 보통인데 뽀르뚜까
      아저씨는 다르다. 뽀르뚜까 아저씨 같은 어른이 있다는 사실은 나에게도
      흥미로웠다. 나도 제제처럼 어른 친구가 있었으면 한다. 그런데 요즘 어른들은
      너무 우리 아이들을 깔보는 것 같다. 만약 내가 어른이라면 아이들을 잘
      대해주고 깔보지 않겠다.
      <br />
      <br />
      내가 이책에 나오는 오렌지 나무였다면 제제가 아파하는 마음을 이해해 주고
      싶다. 제제는 때리는 아빠, 누나 등등을 이해하고 있다. 그리고 제제의
      천진스러움은 누구에게 전해졌는지 정말 모르겠다. 만약 내가 제제라면 집이
      싫어 가출했을 것 같다. 또 이 책이 지금까지 유명한 것은 아이와 어른사이에
      우정이 맺어질 수 있다는 것을 알려주었기 때문이라고 생각한다. 그리고, 내게
      동생이 있다면 제제처럼 잘 돌봐주겠다. 아쉬운 것이 있다면 제제가 철이 드는
      모습을 좀 더 보여 주었으면 좋겠다는 것이다. 아마 제제도 앤처럼 공부를 잘
      해서 어린이들의 마음을 알아주는 훌륭한 선생님이 되었을 것이다.
    </p>
  </>,
  <>
    <p>
      시는 자기의 감정을 충분히 알맞게 표현할 수 있는 단어를 찾아 작은 단어에
      많은 뜻이 들어가게 쓰는거랍니다.
    </p>
    <h3>예시) 백설 공주</h3>
    <h3>
      <strong style={{ color: "#009EFF" }}>
        나쁜 마음은 싫어 - '백설 공주'를 읽고
      </strong>
    </h3>
    <p>
      나쁜 마음은 싫어 독이 든 사과 <br />
      천사처럼 독이 든 빗<br /> 맑고 아름다운 마음만 가졌으면, 정말 무서운
      사람의 마음
      <br /> 엄마가 돌아가셨을 때 <br />
      그러나 넌 어려서 몰랐겠지 착한 난쟁이, <br />
      착한 백설 공주야 산새들 얼마나 아름다운가? <br />난 슬퍼서 울었단다.
      계모는 다 그럴까? 마음이 착하면 복을 받나 봐 <br /> 왜 널 그렇게도
      행복하게 살게 된 백설 공주,
      <br /> 미워하고 죽이려 했을까? 잊지 못할 백설 공주
    </p>
  </>,
  <>
    <p>
      비평문은 좀 더 적극적인 의견과 주장을 펼칠 수 있어요! 그렇지만 비방과
      비평은 다르다는 거! 주장을 뒷받침하는 근거가 필요해요.
    </p>
    <h3>예시)로미오와 줄리엣</h3>
    <h3>
      <strong style={{ color: "#009EFF" }}>지독한 비극 작가 셰익스피어</strong>
    </h3>
    <h4>-로미오와 줄리엣 작품과 작품해설을 읽고</h4>
    <p>
      16세기와 17세기, 문화 부흥기 르네상스 시대에 활동한 많은예술가들이 있다.
      그 중에는 극작가란 예술가들도 있다. 당시 영국에서는 매우 유명한 극작가가
      극장가를 누비고 있었다. 그가 바로 셰익스피어다. 셰익스피어는 가세가 기울어
      런던의 극장에서 허드레 일꾼을 하다가 30세 무렵이 되어 극작가로서
      승승장구할 수 있게 되었다. 그리고 1600년에서 1606년 사이 그는 자신의
      최대의 걸작 4대 비극을 쓰게 된다. 그 중에서도 세계적으로 널리 읽히고, 많은
      사람들의 심금을 울렸던 작품이'로미오와 줄리엣'이다. <br />
      <br />
      나는 여태까지 로미오와 줄리엣을 2번 읽어 보았다. 그리고 이번 독서 신문을
      준비하면서 한 번 더 읽어 보았다. 여느 비극이 그렇듯이 '로미오와 줄리엣'은
      독자로 하여금 ‘다르게 했다면 더 잘 되었을텐데...’하는 안타까움을 많이
      준다. 작품 해설에서는 이것이 진정으로 아름다운 연인의 비극을 만들 수
      있다고 말하고 있다.
      <strong style={{ color: "#009EFF" }}>
        {" "}
        하지만 나는 아무리 비극이라고 해도 로미오와 줄리엣처럼 억지스럽게
        비극적이고 우연적인 상황을 남발한 것은 내용 전개를 부자연스럽게하고
        설득력을 잃는다고 생각한다.
      </strong>
      <br />
      <br />
      로미오와 줄리엣이 모두 죽음을 택하게 된 데에는 로미오가 결투장에
      때맞추어가게 된 것, 그가 무조건 싸움을 말리게 된 것, 신부의 사자가
      페스트로 발이 묶인 것, 신부의 발목이 몇 번이나 걸려 줄리엣의 무덤에 늦게
      도착한 것 등이 이에 해당하는 내용 전개들이다. 이것들은 사전에 아무런
      복선이나 동기가 있지 않았고, 작가의 의도에 따른 진행을 위한 작가 자신
      마음대로의 설정이다. 만약 작가가 좀 더 심혈을 기울이고 준비를 한 다음
      완벽한 내용 전개로 필연적 상황을 만들 수 있었다면 '로미오와 줄리엣'은 더욱
      완벽하고, 설득력있는 작품이 될 수 있었을 것이다. 결국 로미오와 줄리엣은
      이들을 갈라놓으려는 지독한 비극작가 셰익스피어에 의해 비극적 결말을 맞게
      된 것이다.
    </p>
  </>,
  "자유롭게 적어보세요!",
  <>
    <p>
      짜임새 있게 정보 전달을 하기 위해서는 글이 서론-본론-결론으로 잘 짜여져야
      해요! 그래야 내용이 잘 이어지고 엮어질 수 있어요!
    </p>
    <h3>예시)안녕 달팽이야!</h3>
    <h3>
      <strong style={{ color: "#009EFF" }}>내 친구 달팽이 이야기</strong>
    </h3>
    <h4>-안녕 달팽이야!를 읽고-</h4>
    <p>
      도서관에서 무슨 책을 읽을지 고민하다가, 문득 책에 달린 날개 모양이
      특이하고 그림이 예쁜 이 책에 관심이 가서 읽게 되었다. 표지만 보았을 때,
      그냥 쉽게 읽는 그림책인 줄 알았는데 보기 보다 달팽이의 특징을 자세하게
      소개하고 있는 알찬 정보책이었다. <br />
      <br />
      비 오는 날에 달팽이를 쉽게 발견할 수 있다는 사실은 평소에도 알고 있었다.
      그런데 달팽이는 피부로도 숨을 쉬기 때문에 피부가 촉촉해야 한다는 사실은
      몰랐다. 그래서 비가 오는 날이나 밤에 활동해서 자주 볼 수 있는 것이라는
      사실은 처음 알았다. <br />
      <br />이 책을 읽으면서 궁금한 점이 하나 생겼다. 민달팽이는 숨을 들이쉬며
      숨구멍이 넓어지고 내쉬면 작아진다고 했다. 숨구멍이 얼마까지 넓어질 수
      있는지 궁금해졌다. 도서관에서 달팽이 책들ㅇ르 좀 더 빌려 보아야겠다. 비
      오는 날에 달팽이를 직접 관찰해 볼 수 있으면 더 좋겠다.
    </p>
  </>,

  <>
    <h3>예시)최고의 서재</h3>
    <h3 style={{ color: "#009EFF" }}>삶과 학문이 숨 쉬는 공간, 서재</h3>
    <p>
      &nbsp;나는 본래 책과 관련된 단어만 보아도 사족을 못 쓰게 된다. 게다가 이
      책에서는 나를 ‘최고의 서재 공모’의 심사위원으로 삼는다는 제목도 그렇고
      나도 모르게 책을 집어 들어 읽게 될 수밖에 없었다.
      <br />
      <br />
      &nbsp;
      <strong style={{ color: "#009EFF" }}>
        책장을 넘기며 최종 후보 여덟 사람, 정약전, 홍대용, 정조, 정약용, 박지원,
        황상, 김정희 등의 책장을 만나게 되었다.
      </strong>{" "}
      재미있는 사실은 이들이 모두 얽히고설킨 관계라는 것이다. 다들 친구, 형제,
      스승과 제자, 왕과 신하의 관계로 이어져 있었다.
      <br />
      <br />
      &nbsp;후보 서재가 소개될 때마다 그곳에 앉아 서재 주인의 이야기를 듣는 것
      같았다. 장이 넘어감에 따라 바다의 소리가 들려오는 서재, 하늘을 담은 서재,
      세상을 담은 서재 등 정말 각양각색의 서재들을 만날 수 있었다. 여덟 명의
      서재 모두 ‘책 향기가 나며 서재 주인의 깊은 뜻이 담겨 있는가’ 하는 심사
      기준에 완벽히 부합하여 최고를 가린다는 것이 정말 어려워 보였다.
      <br />
      <br />
      &nbsp;이들에게 그들의 서재는 서재 그 이상의 의미를 가지고 있었던 것 같다.
      서재는 그들이 힘든 시간을 이겨 내는 것을 돕기도 하였으며, 친구들의 우정을
      떠올려 주고 마음을 지켜 주는 장소, 세상을 만나는 문이었다. 한마디로 그들의
      서재는 그들의 삶과 학문이 숨 쉬는, 자기 자신을 그대로 담은 공간이었던
      것이다.
      <br />
      <br />
      &nbsp;이런 서재들을 보니 나의 서재에도 이름을 붙여 보고 싶어졌다. 내가
      나의 서재에 담고 싶은 뜻을 넣어서 말이다. 책에 길이 있다는 뜻으로 책 ‘서’
      자에 길 ‘도’ 자를 써서 서도재라 하면 어떨까.{" "}
      <strong style={{ color: "#009EFF" }}>
        나는 앞으로 책에서 길을 찾고 책이 보여 주는 길로 걸어가고 싶다.
      </strong>
    </p>
  </>,
  <>
    <h3>예시)다이고로야 고마워</h3>
    <h3>
      <strong style={{ color: "#009EFF" }}>
        '다이고로야 고마워' 바꿔 쓰기
      </strong>
    </h3>

    <p>
      이 책은 내가 너무나도 좋아하는 책이고 감동적인 부분이 많아서 나의 마음을
      적시는 책입니다. 그리고 이 책은 나에게 생명이 얼마나 소중하고 얼마나
      아름다운지를 알게 해 주는 책이었습니다. 그러나 끝은 중증장애를 가지고 있는
      이 원숭이가 폐렴으로 죽는 불행으로 끝나기 때문에 해피엔딩으로 바꾸어
      보았습니다.
    </p>

    <h5 style={{ color: "#009EFF" }}>제시된 이야기</h5>
    <p>
      일본의 한 사진작가에 의해 지어진 책입니다. 이 사진 작가는 일반적인
      풍경보다는 여러 사회 현상을 돌아다니면서 사진을 찍다가 원숭이에게 기형이
      있다는 사실을 알고 그에 대한 사진 찍기에 몰두하게 되었습니다. 그러다가
      가사덤불상태로 버려져 있던 중증장애를 가진 원숭이를 집으로 데리고 와서
      키우게 됩니다. 그리고 그는 이 원숭이에게 어미 원숭이가 없어도 튼튼하게
      살아가라는 바람을 담아 '다이고로'라는 이름을 지어 주었습니다. 처음에는
      밤새 엉엉 울기만 하다가 차츰차츰 기운을 차리게 되어 집안의 막내로서 생활을
      하게 되었습니다. <br />
      <br />
      그러던 어느날 음식을 1m 가까이 띄워놓고 다이고로에게 오라고 손짓을 하며
      이름을 부르자 기어오는 것이었습니다. 또 한번 가족들을 놀라게 하였습니다.
      크나큰 장애를 극복하고 기는 모습!! 설날이 되자 막내 마호가 선물로 인형을
      받았는데 다이고로는 그 인형이 좋아 빼앗으려고 안달을 했습니다. 마호는 그
      인형을 빼앗기자 마자 울음을 터뜨렸는데 그 때 다이고로가 그 인형을 안고
      일어선 것이었습니다. 팔과 다리가 없어 중증 장애를 가지고 있던 다이고로가
      드디어 일어서게 된 것입니다. 그리고 다이고로는 사람처럼 희노애락의
      감정까지도 풍부하게 되었습니다. 기쁠 때, 슬플 때, 화가 났을 때 하는 몸짓,
      표정도 다양하게 되었습니다. 그렇게 다이고로의 성장하는 모습을 보며
      가족들은 아름답게 생활해 나갔습니다. 그러던 어느 날 다이고로가 낑낑대며
      울기 시작했습니다. 그 원숭이가 2살이 되던 해였습니다. 동물병원에서 지어준
      약도 먹지 않으면서 계속 울기만 하였습니다.
      <br />
      <br />
    </p>

    <h5 style={{ color: "#009EFF" }}>내가 바꾼 부분</h5>
    <p>
      놀란 가족들은 당장 다이고로를 병원에 입원시켰습니다. 그리고 23시간의 긴
      수술에 들어갔습니다. 가족들은 너무 놀라 당황한 나머지 잠도 설치면서
      다이고로를 걱정해 주었습니다. 드디어 수술은 끝나고, 수술은 성공적으로
      이루어졌습니다. 그리고 다시 원래대로 생활할 수 있게 되었습니다. 어느덧
      다이고로가 사람의 어린아이 몸만큼 자라자 다이고로는 동물원에 보내졌습니다.
      지금의 모습은 여러 사람들이 구경을 오고 다이고로의 장애를 극복한 모습은
      TV에도 나오면서 다이고로는 인기 스타가 되기 시작했습니다. 다이고로의
      가족들도 동물원에 오면서 다이고로를 자주 만났습니다. <br />
      <br />
      이렇게 다이고로는 사람들 사이에서도 자신의 여러 묘기를 보여주기
      시작했습니다. 그러면서 사람들에게 생명의 아름다움과 장애의 극복, 생명의
      소중함들을 마음속에 조금씩 새겨주었습니다. 어느덧 다이고로는 나이가 들어
      78세가 되었고 동물원에서 조용히 눈을 감았습니다. 가족들과 여러 사람들은
      모두 다함께 다이고로의 장례를 치러주었습니다. 그 후 다이고로의 가족들은
      장애인들을 위한 시설을 많이 세우고 어려운 사람들을 도와주었습니다. 그리고
      그 곳에 하나씩 다이고로의 사진도 담아두었습니다. 항상 사람들을 위해서
      그렇게 봉사하며 살게 되었습니다. 물론 다이고로를 잊지 않고 마음 속 한
      구석에 담아 두었습니다.
    </p>
  </>,
];
