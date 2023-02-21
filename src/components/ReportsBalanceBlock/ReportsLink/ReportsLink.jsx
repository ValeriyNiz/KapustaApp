import { MdOutlineBarChart } from 'react-icons/md';
import css from './ReportsLink.module.css';

export default function ReportsLink() {
  return (
    <div className={css.reportsLink__wrapper}>
      <a href="/" className={css.reportsLink__title}>
        <span>Reports</span>
        <MdOutlineBarChart
          className={css.reportsLink__icon}
          size={24}
          color="#52555F"
        />
      </a>
    </div>
  );
}
