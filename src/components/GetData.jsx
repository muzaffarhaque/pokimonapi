import { useState, useEffect } from "react";
const useFetch = (url) => {
  const [data, setData] = useState([]);
  async function getdata() {
    const info = await fetch(url);
    const data = await info.json();
    setData(data);
  }

  useEffect(() => {
    getdata();
  }, [url]);

  return data.results;
};

export default useFetch;
