import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getIsLoading, getMessage } from 'redux/auth/auth-selector';
import { setGoogleAuth } from 'redux/auth/authSlice';
import Loader from 'shared/Loader/Loader';
import ModalSimple from 'shared/ModalSimple/ModalSimple';
import { ReactComponent as GoogleIcon } from '../../images/google.svg';
import { logIn, register } from '../../redux/auth/auth-operations';
import css from './AuthForm.module.css';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emptyInput, setEmptyInput] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [shortLengthPassword, setShortLengthPassword] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const message = useSelector(getMessage);
  const isLoading = useSelector(getIsLoading);

  useEffect(() => {
    const email = searchParams.get('email');
    const token = searchParams.get('token');
    const balance = searchParams.get('balance');

    if (email && token && balance) {
      dispatch(setGoogleAuth({ email, token, balance }));
      setSearchParams('', { replace: true });
    }
  }, [searchParams, dispatch, setSearchParams]);

    const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Email must be a valid')
      .required('Please fill in the email'),

    password: yup
      .string()
      .trim('The password cannot include leading and trailing spaces')
      .strict(true)
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .required('Please fill in the password'),
  });

  const checkValidData = () => {
    if (email === '') {
      setEmptyInput(true);
    }

    if (!email.includes('@')) {
      setInvalidEmail(true);
    }

    if (password.length < 8) {
      setShortLengthPassword(true);
    }
  };

  const handleChange = evt => {
    setEmptyInput(false);
    setShortLengthPassword(false);
    setInvalidEmail(false);

    switch (evt.target.name) {
      case 'email':
        setEmail(evt.target.value);
        break;

      case 'password':
        setPassword(evt.target.value);
        break;

      default:
        return;
    }
  };

  const fieldsValidation = async (credentials) => {
    const yupValid = await validationSchema.isValid(credentials);
    
    return yupValid
  }
  
  const handleLogin = async evt => {
    evt.preventDefault();
    checkValidData()
    const isValid = await fieldsValidation({ email, password })

    if (!isValid) {
      return
    }
      await dispatch(logIn({ email, password }));
      setIsModalActive(true);
  }

  const handleRegister = async () => {
    checkValidData();
    const isValid = await fieldsValidation({ email, password })

    if (!isValid) {
      return
    }
    await dispatch(register({ email, password }));
    setIsModalActive(true);
  };

  return (
    <>
      <ModalSimple active={isModalActive} setActive={setIsModalActive}>
        {message}
      </ModalSimple>
      <div className={css.form}>
        <p className={css.formTextGoogle}>
          You can log in with your Google Account:
        </p>
        <a
          href="https://kapusta-dvde.onrender.com/api/auth/google"
          className={css.googleBtn}
        >
          <GoogleIcon className={css.googleSvg} />
          Google
        </a>
        <p className={css.formText}>
          Or log in using an email and password, after registering:
        </p>
        <form className={css.formBox} autoComplete="on" onSubmit={handleLogin}>
          <label className={css.formLabel}>
            {emptyInput ? (
              <>
                <span>
                  <span className={css.spanLabel}>*</span>
                  Email:
                </span>
              </>
            ) : (
              'Email:'
            )}
            <input
              className={css.formInput}
              autoComplete="off"
              type="text"
              placeholder="your@email.com"
              value={email}
              name="email"
              onChange={handleChange}
            />
            <p className={css.errorMsg}>
              {emptyInput
                ? 'This is a required field'
                : invalidEmail && 'Email must contain the symbol "@"'}
            </p>
          </label>
          <label className={css.formLabel}>
            {shortLengthPassword ? (
              <>
                <span>
                  <span className={css.spanLabel}>*</span>
                  Password:
                </span>
              </>
            ) : (
              'Password:'
            )}
            <input
              className={css.formInput}
              autoComplete="off"
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={handleChange}
            />
            <p className={css.errorMsg}>
              {emptyInput
                ? 'This is a required field'
                : shortLengthPassword &&
                  'Password length must be at least 8 characters'}
            </p>
          </label>
          {isLoading ? (
            <Loader height="130" />
          ) : (
            <div className={css.authBtn}>
              <button onClick={handleLogin} className={css.btn} type="submit">
                Log in
              </button>
              <button
                className={css.btn}
                type="button"
                onClick={handleRegister}
              >
                Registration
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default AuthForm;
