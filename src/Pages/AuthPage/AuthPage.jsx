import Background from 'components/Background/Background';
import styles from '../AuthPage/AuthPage.module.css';
import AuthForm from 'components/AuthForm/AuthForm';

const AuthPage = () => {
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

export default AuthPage;
