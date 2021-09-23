import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import "./App.css";
import InfoBox from "./components/InfoBox";
import LineGraph from "./components/LineGraph";
import Map from "./components/Map";
import Table from "./components/Table";
import numeral from "numeral";

import "leaflet/dist/leaflet.css";
function App() {
  const pretyStats = (stats) =>
    stats ? `+${numeral(stats).format("0.0a")}` : "+0";
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countryTable, setCountryTable] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.476 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesTypes] = useState("cases");
  const worlwideInfo = async () => {
    let result = await fetch(`https://disease.sh/v3/covid-19/all`);
    result = await result.json();
    setCountryInfo(result);
  };
  useEffect(() => {
    worlwideInfo();
  }, []);

  const getCountries = async () => {
    try {
      let result = await fetch(`https://disease.sh/v3/covid-19/countries`);
      const data = await result.json();
      result = data.map((cur) => ({
        name: cur.country,
        value: cur?.countryInfo?.iso2,
      }));
      setCountries(result);
      setCountryTable(data);
      setMapCountries(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCountries();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
    const url =
      countryCode === "worldwide"
        ? `https://disease.sh/v3/covid-19/all`
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    let result = await fetch(url);
    result = await result.json();
    setCountryInfo(result);
    setMapCenter([result?.countryInfo?.lat, result?.countryInfo?.long]);
    setMapZoom(3);
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid-19 Tracker</h1>

          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide" disabled>
                worldwide
              </MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            isRed
            active={casesType === "cases"}
            onClick={(e) => setCasesTypes("cases")}
            title="Coronavirus cases"
            cases={pretyStats(countryInfo?.todayCases)}
            total={pretyStats(countryInfo?.cases)}
          />

          <InfoBox
            active={casesType === "recovered"}
            onClick={(e) => setCasesTypes("recovered")}
            title="Recovered"
            cases={pretyStats(countryInfo?.todayRecovered)}
            total={pretyStats(countryInfo?.recovered)}
          />
          <InfoBox
            isRed
            active={casesType === "deaths"}
            onClick={(e) => setCasesTypes("deaths")}
            title="Death"
            cases={pretyStats(countryInfo?.todayDeaths)}
            total={pretyStats(countryInfo?.deaths)}
          />
        </div>
        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
          setMapCenter={setMapCenter}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by countries</h3>
          <Table countryTable={countryTable}></Table>
          <h3>World new {casesType ?? ""}</h3>
          <LineGraph casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
