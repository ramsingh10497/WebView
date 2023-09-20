import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "../components/Button";

const Home = ({ isAuthenticated }) => {
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated]);

  const onTryNowBtnClick = () => {
    router.push("/signin");
  };

  return (
    <>
      <div className={styles.header}></div>
      <div className={styles.banner}>
        <div className={styles.bannerTitle}>
          <h1 className={styles.bannerHead}>Enjoy free endless video calls</h1>
          <p className={styles.bannerLead}>
            webview is a high quality video calling app. It's free and works on
            the web.
          </p>
          <br />
          <Button title="Try Now" onClickHandler={onTryNowBtnClick} />
        </div>
      </div>

      <div className={styles.reminder}>
        <p>We are sure you will love us</p>
        <Button title="Try webview now" onClickHandler={onTryNowBtnClick} />
      </div>
    </>
  );
};

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(Home);
