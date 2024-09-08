import { useState, useEffect } from "react";
import { AxiosExoplanets } from "./axios/Axios";
import "./App.css";

function App() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const fetchData = async () => {
    try {
      const response = await AxiosExoplanets.get();
      const data = response.data;
  
      console.log("Fetched data:", data);

      if (Array.isArray(data)) {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
        setPlanets(currentItems);
        setTotalItems(data.length);
      } else {
        console.error("Data format is not as expected:", data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > Math.ceil(totalItems / itemsPerPage)) return;
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (loading) return <p>Loading data...</p>;

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Host Name</th>
            <th>Discovery Method</th>
            <th>RA</th>
          </tr>
        </thead>
        <tbody>
          {planets.length > 0 ? (
            planets.map((planet, index) => (
              <tr key={index}>
                <td>{planet.pl_name || "N/A"}</td>
                <td>{planet.hostname || "N/A"}</td>
                <td>{planet.discoverymethod || "N/A"}</td>
                <td>{planet.ra || "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
  
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(totalPages).keys()].map((pageNumber) => (
          <button
            key={pageNumber + 1}
            onClick={() => handlePageChange(pageNumber + 1)}
            className={currentPage === pageNumber + 1 ? "active" : ""}
          >
            {pageNumber + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default App;