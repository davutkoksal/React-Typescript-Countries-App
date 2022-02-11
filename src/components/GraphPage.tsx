import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";

Chart.register(...registerables);
interface Language {
  code: string;
  name: string;
}
interface Country {
  name: string;
  code: string;
  capital: string;
  emojiU: string;
  languages: Language[];
}
interface Continent {
  code: string;
  name: string;
  countries: Country[];
}
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://countries.trevorblades.com",
});

const LIST_CONTINENTS = gql`
  {
    continents {
      name
      code
      countries {
        code
        name
        native
        capital
        currency
        emoji
        emojiU
        languages {
          code
          name
          rtl
          native
        }
      }
    }
  }
`;
const SecondPage = () => {
  const { data, loading, error } = useQuery(LIST_CONTINENTS, { client });

  const chartData = {
    data: {
      labels: data?.continents.map((country: Continent) => country.name),
      datasets: [
        {
          label: "Data",
          borderColor: "#fcc468",
          fill: true,
          backgroundColor: "#fcc468",
          hoverBorderColor: "#fcc468",
          borderWidth: 8,
          barPercentage: 0.4,
          data: data?.continents.map(
            (continent: Continent) => continent?.countries.length
          ),
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },

        tooltips: {
          tooltipFillColor: "rgba(0,0,0,0.5)",
          tooltipFontFamily:
            "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          tooltipFontSize: 14,
          tooltipFontStyle: "normal",
          tooltipFontColor: "#fff",
          tooltipTitleFontFamily:
            "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          tooltipTitleFontSize: 14,
          tooltipTitleFontStyle: "bold",
          tooltipTitleFontColor: "#fff",
          tooltipYPadding: 6,
          tooltipXPadding: 6,
          tooltipCaretSize: 8,
          tooltipCornerRadius: 6,
          tooltipXOffset: 10,
        },
      },
      scales: {
        y: {
          ticks: {
            color: "#9f9f9f",
            beginAtZero: true,
            maxTicksLimit: 5,
            padding: 10,
          },
          grid: {
            zeroLineColor: "transparent",
            display: true,
            drawBorder: false,
            color: "#9f9f9f",
          },
        },
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            padding: 10,
            color: "#9f9f9f",
          },
        },
      },
    },
  };
  return (
    <div className="content">
      <Bar data={chartData.data} options={chartData.options} />
    </div>
  );
};

export default SecondPage;
