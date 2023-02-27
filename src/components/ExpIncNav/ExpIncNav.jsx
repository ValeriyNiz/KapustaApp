import css from './ExpIncNav.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getChoice } from 'redux/report/report-selectors';
import { setChoice } from 'redux/report/report-operations';

export const ExpIncNav = () => {
  const choice = useSelector(getChoice);
  const dispatch = useDispatch();

  return (
    <div className={css.nav}>
      <button
        className={`${css.button} ${choice === 'expenses' ? css.active : ''}`}
        onClick={() => {
          if (choice !== 'expenses') {
            dispatch(setChoice('expenses'));
          }
        }}
        type="button"
      >
        Expenses
      </button>
      <button
        className={`${css.button} ${choice === 'income' ? css.active : ''}`}
        onClick={() => {
          if (choice !== 'income') {
            dispatch(setChoice('income'));
          }
        }}
        type="button"
      >
        Income
      </button>
    </div>
  );
};
