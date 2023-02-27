import css from './ExpIncNav.module.css';
// import { useSelector } from 'react-redux';
// import { getChoice } from 'redux/report/report-selectors';
// import { setChoice } from 'redux/report/report-operations';
import { useLocation, useNavigate } from 'react-router';

export const ExpIncNav = () => {
  // const choice = useSelector(getChoice);
  // const dispatch = useDispatch();
  const location = useLocation();
  const isIncome = location.search.includes('income');

  const navigate = useNavigate();

  const navigateToTab = activeTab => {
    navigate(`?${activeTab}`);
  };

  return (
    <div className={css.nav}>
      <button
        className={`${css.button} ${!isIncome ? css.active : ''}`}
        onClick={() => {
          navigateToTab('expenses');
          // if (choice !== 'expenses') {
          //   dispatch(setChoice('expenses'));
          // }
        }}
        type="button"
      >
        Expenses
      </button>
      <button
        className={`${css.button} ${isIncome ? css.active : ''}`}
        onClick={() => {
          navigateToTab('income');
          // if (choice !== 'income') {
          //   dispatch(setChoice('income'));
          // }
        }}
        type="button"
      >
        Income
      </button>
    </div>
  );
};
