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
} from 'recharts';

// const daaaata = [
//   {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: 'Page D',
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: 'Page E',
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: 'Page F',
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

export const Report = () => {
  const { income } = data;
  const { categories } = income;

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

      <div className={css.wrapper}>
        <ResponsiveContainer width="100%" aspect={2}>
          <BarChart
            className={css.box}
            // width={700}
            // height={500}
            data={categories
              .find(item => item.category === 'Transport')
              .descriptions.sort((item1, item2) => item2.sum - item1.sum)}
            margin={{
              top: 20,
              right: 0,
              left: 0,
              bottom: 20,
            }}
          >
            <CartesianGrid
              vertical={false}
              horizontalPoints={[45, 90, 135, 180, 225, 270, 315, 360]}
            />
            <XAxis dataKey="description" padding={{ left: 20, right: 20 }} />

            {/* <Bar dataKey="description" fill="#FF751D" /> */}
            <Bar
              dataKey="sum"
              fill="#FF751D"
              maxBarSize={45}
              minPointSize={5}
              radius={[10, 10, 0, 0]}
            >
              <LabelList dataKey="sum" content={renderCustomizedLabel()} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
