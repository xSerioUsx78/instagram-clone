import styles from "../styles/authLoading.module.css";

const AuthLoading = () => {
  return (
    <div className={styles.loadingWrapper}>
      <img
        src={require("../assets/instagram-loading.JPG")}
        alt="loadingimage"
      />
    </div>
  );
};

export default AuthLoading;
