export const DAY_MAP: Record<number, string> = {
  1: "Пн",
  2: "Вт",
  3: "Ср",
  4: "Чт",
  5: "Пт",
  6: "Сб",
  0: "Вс",
};

export const options: any = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      callbacks: {
        title: (items: any) => {
          const ts = items[0]?.raw?.x;
          if (!ts) return "";
          const d = new Date(ts);
          return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
        },
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
      labels: ["Вс", "Сб", "Пт", "Чт", "Ср", "Вт", "Пн"],
      ticks: { color: "#555", font: { size: 11 } },
      grid: { display: false },
      border: { display: false },
    },
  },
};
