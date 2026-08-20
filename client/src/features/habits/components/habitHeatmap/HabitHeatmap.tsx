import { memo, useMemo } from "react";
import {
  Chart,
  Tooltip,
  TimeScale,
  LinearScale,
  CategoryScale,
} from "chart.js";
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";
import { Chart as ReactChart } from "react-chartjs-2";
import type { HabitHeatmapProps } from "./interface";
import { DAY_MAP, options } from "./constants";
import { getLastYear } from "./utils";
import "chartjs-adapter-date-fns";

Chart.register(
  MatrixController,
  MatrixElement,
  Tooltip,
  TimeScale,
  LinearScale,
  CategoryScale,
);

const HabitHeatmap = ({ completions }: HabitHeatmapProps) => {
  const completionMap = useMemo(
    () => Object.fromEntries(completions.map((c) => [c.date, c.count])),
    [completions],
  );

  const days = getLastYear();

  const data = useMemo(
    () =>
      days.map((date) => {
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        return {
          x: date.getTime(),
          y: DAY_MAP[date.getDay()],
          v: completionMap[key] ?? 0,
        };
      }),
    [completionMap],
  );

  const chartData = {
    datasets: [
      {
        label: "Активность",
        data,
        backgroundColor(ctx: any) {
          const v = ctx.dataset.data[ctx.dataIndex]?.v ?? 0;
          if (v === 0) return "#262626";
          if (v === 1) return "#1a4a2e";
          if (v === 2) return "#2d6e42";
          return "#4caf70";
        },
        borderColor: "#1a1a1a",
        borderWidth: 2,
        width: ({ chart }: any) =>
          Math.max((chart.chartArea?.width ?? 0) / 53 - 2, 10),
        height: ({ chart }: any) =>
          Math.max((chart.chartArea?.height ?? 0) / 7 - 2, 10),
      },
    ],
  };

  return (
    <div
      style={{ height: "170px" }}
      role="img"
      aria-label="График активности за последний год"
    >
      <ReactChart type="matrix" data={chartData} options={options} />
    </div>
  );
};

export default memo(HabitHeatmap);
