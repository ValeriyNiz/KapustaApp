import PropTypes from 'prop-types';
import css from './Tooltip.module.css';

export default function Tooltip({ active, setActive, children }) {
  return (
    <div
      className={
        active ? `${css.tooltip__box} ${css.active}` : `${css.tooltip__box}`
      }
      onClick={() => setActive(false)}
    >
      <div
        className={
          active
            ? `${css.tooltip__arrow} ${css.active}`
            : `${css.tooltip__arrow}`
        }
        onClick={() => setActive(false)}
      ></div>
      {children}
    </div>
  );
}

Tooltip.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};