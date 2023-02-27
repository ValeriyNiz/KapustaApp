// import { useState } from 'react';

import css from './Diagram.module.css';

import { data } from './file';

import {
  BarChart,
  LabelList,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export const Diagram = () => {
  const { income } = data;
  const { categories } = income;

  const a = categories
    .find(item => item.category === 'Products')
    .descriptions.sort((item1, item2) => item2.sum - item1.sum);

  const renderCustomizedLabelSum = () => {
    return props => {
      const { x, y, width, value } = props;

      return (
        <text
          x={x + width + 50}
          y={y + 15}
          fill="#000000"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {`${value} UAH`}
        </text>
      );
    };
  };

  const renderCustomizedLabelDescription = () => {
    return props => {
      const { x, y, width, value } = props;

      return (
        <text
          x={x + width / 8}
          y={y - 15}
          fill="#000000"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {value}
        </text>
      );
    };
  };

  return (
    <div className={css.container}>
      {/* horizontal diagram */}
      {/* <div className={css.wrapperBar}>
        <ResponsiveContainer width="100%" aspect={2}>
          <BarChart
            className={css.barChart}
            data={a}
            layout={'horizontal'}
            margin={{
              top: 40,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="description"
              axisLine={false}
              tickLine={false}
              padding={{ left: 20, right: 20 }}
            />
            <YAxis hide={true} tickCount={8} />

            <Bar
              dataKey="sum"
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
        </ResponsiveContainer> */}
      {/* </div> */}

      {/* vertikal diagram */}
      <div className={css.wrapperBarMobile}>
        <ResponsiveContainer minHeight={600} width="100%">
          <BarChart
            className={css.barChart}
            data={a}
            layout="vertical"
            margin={{ top: 40, right: 0, left: 0, bottom: 0 }}
          >
            <YAxis
              dataKey="description"
              type="category"
              axisLine={false}
              tickLine={false}
              hide
              // tick={{ stroke: 'red', strokeWidth: 2 }}
            />
            <XAxis hide type="number" tickLine={false} />
            <Bar dataKey="sum" maxBarSize={30} radius={[0, 50, 50, 0]}>
              {/* // isAnimationActive={false} */}
              <LabelList dataKey="sum" content={renderCustomizedLabelSum()} />
              <LabelList
                dataKey="description"
                content={renderCustomizedLabelDescription()}
              />

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
