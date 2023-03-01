import css from './DateComponent.module.css';
import Sprite from '../../images/sprite.svg';
import ReactDatePicker from 'react-datepicker';
import { forwardRef } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

export const DateComponent = ({ date, setDate }) => {
  const CalendarBtn = forwardRef(({ value, onClick }, ref) => (
    <button onClick={onClick} ref={ref} className={css.datebutton}>
      <svg className={css.dateicon}>
        <use href={`${Sprite}#calendar`}></use>
      </svg>
      {value}
    </button>
  ));

  return (
    <div className={css.dateWrapper}>
      <ReactDatePicker
        dateFormat="yyyy.MM.dd"
        selected={date}
        onChange={date => {
          setDate(date);
        }}
        customInput={<CalendarBtn />}
      />
    </div>
  );
};
