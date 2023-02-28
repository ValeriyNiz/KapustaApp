import css from './DateComponent.module.css';
import Sprite from '../../images/sprite.svg';
import ReactDatePicker from 'react-datepicker';
import { forwardRef } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

export const DateComponent = ({ date, setDate }) => {
  const CalendarBtn = forwardRef(({ value, onClick }, ref) => (
    <button onClick={onClick} ref={ref}>
      <svg width="20" height="20">
        <use href={`${Sprite}#calendar`}></use>
      </svg>
      {value}
    </button>
  ));

  return (
    <div className={css.dateDiv}>
      <ReactDatePicker
        dateFormat="dd.MM.yyyy"
        selected={date}
        onChange={date => {
          setDate(date);
        }}
        customInput={<CalendarBtn />}
      />
    </div>
  );
};
