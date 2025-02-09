const data = [
  {
    year: 2016,
    value: 300,
  },
  {
    year: 2017,
    value: 250,
  },
  {
    year: 2018,
    value: 230,
  },
  {
    year: 2019,
    value: 200,
  },
  {
    year: 2020,
    value: 170,
  },
];
const maxData = data.sort((a, b) => a.value + b.value).find((x) => x.value).value;
const heightChart = document.getElementById("chart-container");
heightChart.style.height = `${maxData + 40}px`;

data.map((x, i) => {
  let chart = document.getElementById(`chart${i + 1}`);
  chart.style.setProperty("--height-full", `${x.value}px`);
  let num = document.getElementById(`num${i + 1}`);
  num.textContent = x.year;
});
