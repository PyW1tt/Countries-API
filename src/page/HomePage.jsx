import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import { DebounceInput } from "react-debounce-input";

function HomePage() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const regions = [
    {
      name: "Europe",
    },
    {
      name: "Asia",
    },
    {
      name: "Africa",
    },
    {
      name: "Oceania",
    },
    {
      name: "Americas",
    },
    {
      name: "Antarctic",
    },
  ];
  async function getCountries() {
    try {
      setLoading(true);
      const result = await axios.get("https://restcountries.com/v3.1/all");
      setData(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function searchCountry() {
    try {
      setLoading(true);
      const result = await axios.get(
        `https://restcountries.com/v3.1/name/${search}`
      );
      setData(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function filterByRegion() {
    try {
      setLoading(true);
      const result = await axios.get(
        `https://restcountries.com/v3.1/region/${region}`
      );
      setData(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (region !== "") {
      filterByRegion();
    } else if (search !== "") {
      searchCountry();
    } else if (search === "") {
      getCountries();
    }
  }, [search, region]);

  return (
    <div className=" ">
      <nav className="bg-slate-700 text-center py-5 text-4xl font-bold text-white">
        Where in the world?
      </nav>
      <section className=" max-w-screen-2xl mx-auto px-5 ">
        <div className="mt-5 flex max-md:flex-col">
          <DebounceInput
            minLength={2}
            value={search}
            debounceTimeout={500}
            onChange={(e) => {
              setRegion("");
              setSearch(e.target.value);
            }}
            className="w-full bg-slate-600 rounded-sm px-5 py-2 border border-black"
            placeholder="Search for a country name"
          />
          <select
            className="w-[20%] bg-slate-600 rounded-sm px-5 py-2 border border-black ml-3 max-sm:w-full max-md:mt-3 max-md:ml-0"
            onChange={(e) => {
              setSearch("");
              setRegion(e.target.value);
            }}
          >
            {regions.map((region, index) => {
              return (
                <option key={index} value={region.name}>
                  {region.name}
                </option>
              );
            })}
          </select>
        </div>
        {loading ? (
          <div className="w-full h-full flex justify-center py-80">
            <ReactLoading
              type="spin"
              color="black"
              height={"10%"}
              width={"10%"}
            />
          </div>
        ) : (
          <div className="grid grid-cols-4 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 max-sm:mx-auto gap-y-4 gap-x-[2.95%] mt-5 h-full">
            {data.map((item, index) => {
              return (
                <div
                  key={index}
                  className="  w-[100%] h-full hover:cursor-pointer hover:opacity-70"
                  onClick={() => {
                    navigate(`/name/${item.name.common}`);
                  }}
                >
                  <img
                    src={item.flags.png}
                    alt="flags"
                    className="w-full h-52 rounded-t-md"
                  />
                  <div className="bg-slate-700 rounded-b-md p-5">
                    <p className="bg-slate-700">{item.name.common}</p>
                    <p className="bg-slate-700">Region : {item.region}</p>
                    <p className="bg-slate-700">Subregion : {item.subregion}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default HomePage;
