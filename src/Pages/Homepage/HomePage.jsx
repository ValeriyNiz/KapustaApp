import Background from 'components/Background/Background';
import styles from '../HomePage/HomePage.module.css';
import AuthForm from 'components/AuthForm/AuthForm';

const HomePage = () => {
  return (
    <Background type="Primary">
      <div className={styles.container}>
        <div className={styles.title}></div>
        <AuthForm></AuthForm>
      </div>
      <div></div>
    </Background>
  );
};

export default HomePage;
