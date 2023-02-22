import { useState } from 'react';

import CurrencyInput from 'shared/CurrencyInput/CurrencyInput';
import Tooltip from 'shared/Tooltip/Tooltip';
import css from './Balance.module.css';

export default function Balance() {
  const [balance, setBalance] = useState(null);
  const [isSent, setIsSent] = useState(false);
  console.log(balance);
  console.log(isSent);

  const handlerSubmit = (e) => {
    e.preventDefault();
    
    if (balance > 0) {
      alert(`balance: ${balance}`);
      setIsSent(true)
    }

    return;
  };

  const onChange = e => {
    setBalance(+e.target.value.split(' ').join('').slice(0, -3));
    setIsSent(false)
  };

  return (
    <div className={css.balance__wrapper_main}>
      <p className={css.balance__title}>Balance:</p>
      <form
        onSubmit={handlerSubmit}
        className={css.balance__wrapper_secondary}
      >
        <CurrencyInput type="text" value={balance} onChange={onChange} placeholder="00.00 UAH"/>
        {!(balance > 0) && (
          <Tooltip>
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
          disabled={!balance || isSent }
        >
          CONFIRM
        </button>
      </form>
    </div>
  );
}
