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

const DAYS = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

const HabitHeatmap = ({ completions }: HabitHeatmapProps) => {
  const completionMap = Object.fromEntries(
    completions.map((c) => [c.date.split("T")[0], c.count]),
  );

  const days = getLastYear();

  const data = days.map((date) => {
    const key = date.toISOString().split("T")[0];
    return {
      x: key,
      y: DAYS[date.getDay()],
      v: completionMap[key] ?? 0,
    };
  });

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

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          title: (items: any) => items[0]?.raw?.x ?? "",
          label: (item: any) => `Выполнено: ${item.raw.v}`,
        },
      },
      legend: { display: false },
    },
    scales: {
      x: {
        type: "time",
        time: { unit: "month" },
        ticks: { color: "#555", font: { size: 11 } },
        grid: { display: false },
        border: { display: false },
      },
      y: {
        type: "category",
        labels: DAYS,
        ticks: { color: "#555", font: { size: 11 } },
        grid: { display: false },
        border: { display: false },
      },
    },
  };

  return (
    <div style={{ height: "170px" }}>
      <ReactChart type="matrix" data={chartData} options={options} />
    </div>
  );
};

export default HabitHeatmap;
