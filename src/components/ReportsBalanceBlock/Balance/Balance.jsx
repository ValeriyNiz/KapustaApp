import { useState } from 'react';

import CurrencyInput from 'shared/CurrencyInput/CurrencyInput';
import css from './Balance.module.css';

export default function Balance() {
  const [balance, setBalance] = useState('00.00');
  // console.log(balance);

  const handlerSubmit = () => {
    if (balance > 0) {
      alert(`balance: ${balance}`);
    }

    return;
  };

  const onChange = e => {
    setBalance(+e.target.value.split(' ').join('').slice(0, -3));
  };

  return (
    <div className={css.balance__wrapper_main}>
      <p className={css.balance__title}>Balance:</p>
      <div className={css.balance__wrapper_secondary}>
        <CurrencyInput type="text" value={balance} onChange={onChange} />
        <button
          className={css.balance__button}
          type="submit"
          onClick={handlerSubmit}
        >
          CONFIRM
        </button>
      </div>
    </div>
  );
}
