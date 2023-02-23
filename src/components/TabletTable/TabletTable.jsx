import { useMemo } from 'react';
import { useTable } from 'react-table';
import css from './TabletTable.module.css';
import Sprite from '../../images/sprite.svg';

export const TabletTable = ({ data, choice }) => {
  const columns = useMemo(
    () => [
      { Header: 'Date', accessor: 'date' },
      { Header: 'Description', accessor: 'name' },
      { Header: 'Category', accessor: 'category' },
      { Header: 'Sum', accessor: 'value' },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <table {...getTableProps()} cellSpacing="0">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()} className={css.headRow}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell, idx) => {
                if (idx === 3) {
                  return (
                    <td {...cell.getCellProps()}>
                      <div className={css.deleteDiv}>
                        {choice === 'expenses' ? (
                          <span className={css.value}>
                            - {cell.render('Cell')}
                          </span>
                        ) : (
                          <span className={`${css.value} ${css.income}`}>
                            {cell.render('Cell')}
                          </span>
                        )}
                        <svg width="18" height="18" className={css.bin}>
                          <use href={`${Sprite}#bin`}></use>
                        </svg>
                      </div>
                    </td>
                  );
                }
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
