import css from './ExpIncNav.module.css';
import PropTypes from 'prop-types';

export const ExpIncNav = ({ setChoice, choice }) => {
  return (
    <div className={css.nav}>
      <button
        className={`${css.button} ${choice === 'expenses' ? css.active : ''}`}
        onClick={() => {
          if (choice !== 'expenses') {
            setChoice('expenses');
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
            setChoice('income');
          }
        }}
        type="button"
      >
        Income
      </button>
    </div>
  );
};

ExpIncNav.propTypes = {
  setChoice: PropTypes.func.isRequired,
  choice: PropTypes.string.isRequired,
};
