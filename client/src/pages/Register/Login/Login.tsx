/* eslint-disable react/no-unescaped-entities */
import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { BlueButton, DefaultInput } from '../../../components';
import { ERROR_MSG_01, ERROR_MSG_03 } from '../../../constants';
import {
  changeSignupIsDone,
  loginUser,
  useAppDispatch,
  useAppSelector,
} from '../../../redux';
import { EMAIL_REGEX } from '../../../utils';
import { BottomIconSVG, Container, LoginCard, TextCard } from './style';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, user, isSignupDone } = useAppSelector(
    (state) => state.user
  );
  const [emailValue, setEmailValue] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/');
    }

    if (isSignupDone) {
      dispatch(changeSignupIsDone());
    }
  }, [user, navigate, dispatch, isSignupDone]);

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    if (EMAIL_REGEX.test(e.target.value)) {
      setEmailError(false);
    }
    setEmailValue(e.target.value);
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 7) {
      setPasswordError(false);
    }
    setPasswordValue(e.target.value);
  };

  const handleSubmit = () => {
    if (!EMAIL_REGEX.test(emailValue) || passwordValue.length < 8) {
      if (!EMAIL_REGEX.test(emailValue)) setEmailError(true);
      if (passwordValue.length < 8) setPasswordError(true);
      return;
    }
    dispatch(
      loginUser({
        email: emailValue,
        password: passwordValue,
      })
    );
  };

  return (
    <Container>
      <BottomIconSVG />
      <LoginCard>
        <DefaultInput
          label="Email"
          id="email"
          value={emailValue}
          isError={emailError}
          errorMsg={ERROR_MSG_01}
          onChange={handleChangeEmail}
        />
        <DefaultInput
          type="password"
          label="Password"
          id="password"
          value={passwordValue}
          isError={passwordError}
          errorMsg={ERROR_MSG_03}
          onChange={handleChangePassword}
        />
        <BlueButton
          width="100%"
          height="35px"
          onClick={handleSubmit}
          isPending={isLoading}
        >
          Log in
        </BlueButton>
      </LoginCard>
      <TextCard>
        <p>Don't have an account?</p>
        <Link to="/signup">
          <span>Sign up</span>
        </Link>
      </TextCard>
    </Container>
  );
};

export default Login;
