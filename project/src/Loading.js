import styles from "./Loading.module.css";
import bookloading from "./img/loading_book.gif";
import loading from "./img/loading.gif";

function Loading() {
    return(
    <div>
      <div className={styles.loadingpage}>
        <div className={styles.loading}>
          <img src={loading}/>
        </div>
        <div className={styles.loadingimg}>
          <img src={bookloading}/>
        </div>
      </div>
    </div>
    )
}

export default Loading