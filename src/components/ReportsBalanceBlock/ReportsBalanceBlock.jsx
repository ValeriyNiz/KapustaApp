import Balance from 'components/ReportsBalanceBlock/Balance/Balance';
import ReportsLink from 'components/ReportsBalanceBlock/ReportsLink/ReportsLink';
import css from './ReportsBalanceBlock.module.css';

export default function ReportsBalanceBlock() {
  return (
    <div className={css.wrapper}>
      <ReportsLink />
      <Balance />
    </div>
  );
}
