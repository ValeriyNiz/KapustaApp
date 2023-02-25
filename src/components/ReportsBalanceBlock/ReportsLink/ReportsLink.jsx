import { MdOutlineBarChart } from 'react-icons/md';
import { Link } from 'react-router-dom';
import css from './ReportsLink.module.css';

export default function ReportsLink() {
  return (
    <div className={css.reportsLink__wrapper}>
      <Link className={css.reportsLink__title} to="reports">
        <span>Reports</span>
        <MdOutlineBarChart
          className={css.reportsLink__icon}
          size={24}
          color="#52555F"
        />
      </Link>
    </div>
  );
}
