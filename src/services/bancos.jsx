import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BankList = () => {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanks = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization:
            "Basic OTc1NjQyMGUtMWU2Zi00NTgxLTkxYjQtMmE3MjI1ZGY3OWNmOjV2elZlS0s1dV81RzRUZkBBQ0xZVmZzdFcjNGkwbm5Id3FFUTdGNUJ6YlAja3JzZDZ2Q1hDc1ItM2F2cl9jZzM=",
        },
      };

      try {
        const response = await fetch(
          "https://sandbox.belvo.com/api/institutions/?page_size=100",
          options
        );
        const data = await response.json();
        setBanks(data.results || []); // Si no hay resultados, se asigna un arreglo vacío
      } catch (err) {
        setError("Error al cargar los bancos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanks();
  }, []);

  if (loading) return <p>Cargando bancos...</p>;
  if (error) return <p>{error}</p>;

  // Filtrar por los bancos que se quieren mostrar
  const filteredBanks = banks.filter((bank) =>
    [
      "erebor_br_retail",
      "gotham_br_business",
      "gringotts_br_retail",
      "erebor_co_retail",
      "erebor_mx_retail",
      "gringotts_co_retail",
    ].includes(bank.name)
  );

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <h1 className="text-6xl text-wrap mb-4" >Lista de Bancos</h1>
      <ul className="grid grid-cols-3 gap-3 justify-center items-center">
        {filteredBanks.map((bank) => (
          
          <li key={bank.id} className="flex m-3 rounded-md border-2 border-black hover:bg-slate-400">
            <Link to={`/bank/${bank.name}`}>
            <div>
              <strong>{bank.display_name}</strong> - País: {bank.country_code}
            </div>
            {bank.logo && (
              <img
                src={bank.logo}
                alt={`${bank.display_name} logo`}
                style={{ width: "300px", height: "auto", margin: "10px 0" }}
              />
            )}
            </Link>
          </li>
          
        ))}
      </ul>
    </div>
  );
};

export default BankList;
