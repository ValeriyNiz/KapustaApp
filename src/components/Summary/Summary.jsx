import Sprite from '../../images/currentPeriod.svg';
import css from '../../components/Summary/Summary.module.css';

export const Summary = () => {
  return (
    <div className={css.container}>
      <div className={css.backDiv}>
        <button>
          <svg width={18} height={12}>
            <use href={`${Sprite}#icon-arrow-back`}></use>
          </svg>
        </button>
        <p className={css.arrowDesc}>Main Page</p>
      </div>
      <div className={css.reversing}>
        <div className={css.balanceDiv}>
          <p className={css.balanceTitle}>Balance:</p>
          <div className={css.totalBalanceSumDiv}>
            {/* <span className={css.totalBalanceSum}>55000 UAH</span> */}
            <input className={css.totalBalanceSum} value="50000" />
            <span className={css.totalBalanceSum}>UAH</span>
          </div>
          <button className={css.totalBalanceConfirmDiv}>
            <span className={css.totalBalanceConfirm}>confirm</span>
          </button>
        </div>
        <div className={css.titleDiv}>
          <p className={css.currentTitle}>Current period:</p>
          <div className={css.dateDiv}>
            <button>
              <svg width={10} height={10} className={css.leftArrow}>
                <use href={`${Sprite}#icon-arrow-left`}></use>
              </svg>
            </button>
            <p className={css.date}>NOVEMBER 2019</p>
            <button>
              <svg width={10} height={10} className={css.rightArrow}>
                <use href={`${Sprite}#icon-arrow-right`}></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
