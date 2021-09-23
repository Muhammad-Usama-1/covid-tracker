import React, { useEffect, useState } from "react";
import "./../styles/LineGraph.css";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const LineGraph = ({ casesType }) => {
  useEffect(() => {
    getData();
  }, [casesType]);

  const [data, setData] = useState({});
  const buildChartData = (data, casesType) => {
    const chartData = [];
    let lastDataPoint;
    setData(data["cases"].forEach);
    console.log(data);
    for (let x in data[casesType]) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: x,
          y: data[casesType][x] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][x];
    }
    return chartData;
  };
  const getData = async () => {
    const resp = await fetch(
      `https://disease.sh/v3/covid-19/historical/all?lastdays=120`
    );
    const finalResponse = await resp.json();
    const result = buildChartData(finalResponse, casesType);
    setData(result);
    // console.log(result);
  };
  return (
    <div className="linegraph">
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                label: "# of Cases",
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
};

export default LineGraph;
