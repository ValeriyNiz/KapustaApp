import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBalance } from 'redux/auth/auth-operations';
import { getBalance } from 'redux/auth/auth-selector';

import CurrencyInput from 'shared/CurrencyInput/CurrencyInput';
import Tooltip from 'shared/Tooltip/Tooltip';
import css from './Balance.module.css';

export default function Balance() {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState('00.00');
  const balanceRedux = useSelector(getBalance);
  // console.log('balanceRedux', balanceRedux);
  // console.log('inputValue ', inputValue);

  const [isSent, setIsSent] = useState(false);
  const [isShowTooltip, setIsShowTooltip] = useState(true);

  const handlerSubmit = async e => {
    e.preventDefault();
    await dispatch(setBalance({ balance: inputValue }));
    setIsSent(true);
    setInputValue('00.00');
  };

  const onChange = e => {
    setInputValue(+e.target.value.split(' ').join('').slice(0, -3));
    setIsSent(false);
  };

  return (
    <div className={css.balance__wrapper_main}>
      <p className={css.balance__title}>Balance:</p>
      <form
        onSubmit={handlerSubmit}
        className={css.balance__wrapper_secondary}
        autoComplete="off"
      >
        <CurrencyInput
          type="text"
          name="balance"
          value={balanceRedux ?? inputValue}
          onChange={onChange}
          placeholder={balanceRedux ? `${balanceRedux} UAH` : '00.00 UAH'}
        />
        {balanceRedux === null && (
          <Tooltip active={isShowTooltip} setActive={setIsShowTooltip}>
            <p>
              Hello! To get started, enter the current balance of your account!
            </p>
            <p style={{ marginTop: 18, fontSize: 12, lineHeight: '16px' }}>
              You can't spend money until you have it :)
            </p>
          </Tooltip>
        )}
        <button
          className={css.balance__button}
          type="submit"
          disabled={!inputValue || isSent}
        >
          CONFIRM
        </button>
      </form>
    </div>
  );
}
