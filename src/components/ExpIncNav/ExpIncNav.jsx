import css from './ExpIncNav.module.css';
import { useLocation, useNavigate } from 'react-router';

export const ExpIncNav = () => {
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
        }}
        type="button"
      >
        Expenses
      </button>
      <button
        className={`${css.button} ${isIncome ? css.active : ''}`}
        onClick={() => {
          navigateToTab('income');
        }}
        type="button"
      >
        Income
      </button>
    </div>
  );
};
