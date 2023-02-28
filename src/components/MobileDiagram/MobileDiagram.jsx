// import { useState } from 'react';

import css from './MobileDiagram.module.css';

import { data } from './file';

import {
  BarChart,
  LabelList,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export const MobileDiagram = () => {
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
          x={x + width + 40}
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
      console.log(props);
      return (
        <text
          x={x + 30}
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
