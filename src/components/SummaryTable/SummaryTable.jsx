import css from './SummaryTable.module.css';

export const SummaryTable = ({ sum }) => {
  return (
    <ul className={css.list}>
      <li className={css.headerDiv}>
        <p className={css.headerP}>Summary</p>
      </li>
      {sum.map((m, idx) => (
        <li key={idx} className={css.container}>
          <p className={css.info}>{m.month}</p>
          <p className={css.info}>{m.sum}</p>
        </li>
      ))}
    </ul>
  );
};
