import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

function CountryName() {
  const [country, setCountry] = useState([]);
  const [loading, setLoading] = useState(false);
  const param = useParams();
  const navigate = useNavigate();

  async function getCountry() {
    try {
      setLoading(true);
      const result = await axios.get(
        `https://restcountries.com/v3.1/name/${param.name}`
      );
      setCountry(result.data);
      console.log(result.data[0]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    getCountry();
  }, []);

  return (
    <div className="bg-slate-800 w-screen h-screen px-6 pt-5">
      {loading ? (
        <div className="w-full h-full flex justify-center items-center ">
          <ReactLoading
            type="spin"
            color="black"
            height={"10%"}
            width={"10%"}
          />
        </div>
      ) : (
        country.map((item, index) => (
          <div
            key={index}
            className="flex h-full place-items-center justify-center "
          >
            <img src={item.flags.svg} alt="flag" className="w-[40%] h-[40%]" />

            <div className="ml-10 text-2xl w-fit max-sm:text-xs ">
              <p className="text-5xl font-bold mb-5 max-sm:mb-1  max-sm:text-xl">
                {" "}
                {item.name.common}
              </p>
              <p>
                <span className="font-bold">Population : </span>
                {item.population.toLocaleString()}
              </p>
              <p>
                <span className="font-bold">Region : </span> {item.region}
              </p>
              <p>
                <span className="font-bold">
                  <span className="font-bold">Language : </span>
                </span>
                {Object.values(item.languages).map(
                  (languages, index, array) => (
                    <span key={index}>
                      {languages}
                      {index < array.length - 1 && " , "}
                    </span>
                  )
                )}
              </p>
              <p>
                <span className="font-bold"> Currency : </span>
                {Object.values(item.currencies).map(
                  (currency) => currency.name
                )}
              </p>
              <p>
                <span className="font-bold">Region : </span>
                {item.region}
              </p>
              <p className="">
                <span className="font-bold ">Timezones : </span>
                {item.timezones[0]}
              </p>
              <button
                className="bg-slate-500 px-8 py-3 rounded-md font-bold mt-10 max-sm:mt-2"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Back
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default CountryName;
