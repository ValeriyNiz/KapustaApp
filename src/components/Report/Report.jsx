import css from './Report.module.css';
// import css from './Recharts.module.css';

import Sprite from '../../images/currentPeriod.svg';
import { chooseIcon } from './chooseIcon';
import { data } from './file';

import {
  BarChart,
  LabelList,
  Bar,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export const Report = () => {
  const { income } = data;
  const { categories } = income;

  const a = categories
    .find(item => item.category === 'Products')
    .descriptions.sort((item1, item2) => item2.sum - item1.sum);

  const renderCustomizedLabel = () => {
    return props => {
      const { x, y, width, value } = props;

      return (
        <text
          x={x + width / 2}
          y={y - 20}
          fill="#000000"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {`${value} UAH`}
        </text>
      );
    };
  };

  categories.map(cat => console.log(cat.category));
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.titleContainer}>
          <button>
            <svg width={10} height={10} className={css.leftArrow}>
              <use href={`${Sprite}#icon-arrow-left`}></use>
            </svg>
          </button>
          <p className={css.header}>Expenses</p>
          <button>
            <svg width={10} height={10} className={css.leftArrow}>
              <use href={`${Sprite}#icon-arrow-right`}></use>
            </svg>
          </button>
        </div>
        <ul className={css.list}>
          {categories.map(category => (
            <li className={css.item}>
              <p className={css.sum}>{category.sum}</p>
              <div className={css.backGround}>
                <svg className={css.icon} width={55} height={56}>
                  <use href={chooseIcon(category.category)}></use>
                </svg>
              </div>
              <p className={css.category}>{category.category}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className={css.wrapperBar}>
        <ResponsiveContainer width="100%" aspect={2}>
          <BarChart
            className={css.box}
            // width={700}
            // height={500}
            data={a}
            margin={{
              top: 40,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid
              vertical={false}
              // x={0}
              // horizontalPoints={[
              //   '0%',
              //   '10%',
              //   '20%',
              //   '30%',
              //   '40%',
              //   '50%',
              //   '60%',
              //   '70%',
              //   '80%',
              //   '90%',
              //   '100%',
              // ]}
            />
            <XAxis
              dataKey="description"
              axisLine={false}
              tickLine={false}
              padding={{ left: 20, right: 20 }}
            />

            {/* <Bar dataKey="description" fill="#FF751D" /> */}
            <Bar
              dataKey="sum"
              // fill="#FF751D"
              maxBarSize={60}
              minPointSize={5}
              radius={[10, 10, 0, 0]}
            >
              <LabelList dataKey="sum" content={renderCustomizedLabel()} />
              {a.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index % 3 === 0 ? '#FF751D' : '#FFDAC0'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// '#FF751D',
// '#FFDAC0',
