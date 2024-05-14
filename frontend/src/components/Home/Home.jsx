import { useEffect, useState } from "react";
import "./Home.css";
import Output from "./Output.jsx";

const Home = () => {
  const [currentApi, setCurrentApi] = useState("");
  const [data, setData] = useState("");

  const apiList = [
    { id: 1, name: "api_1" },
    { id: 2, name: "api_2" },
    { id: 3, name: "api_3" },
    { id: 4, name: "api_4" },
    { id: 5, name: "api_5" },
    { id: 6, name: "api_6" },
    { id: 7, name: "api_7" },
    { id: 8, name: "api_8" },
    { id: 9, name: "api_9" },
  ];

  useEffect(() => {
    console.log(currentApi);

    async function fetchApi() {
      await fetch(`http://localhost:8000/${currentApi}`)
        .then((res) => res.text())
        .then((data) => setData(data))
    }
    fetchApi();

  }, [setCurrentApi, currentApi]);

  return (
    <div className="home-container">
      <h1>List of APIs</h1>
      <div className="api-container">
        {apiList?.map((api) => (
          <button
            key={api.id}
            className="api-button"
            onClick={() => {
              setCurrentApi(api.name);
            }}
          >
            {api.name}
          </button>
        ))}
      </div>
      <Output data={data} />
    </div>
  );
};

export default Home;
