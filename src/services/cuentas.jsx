import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Cuentas = () => {
  const { name } = useParams(); // Obtener el nombre del banco de la URL
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetcAccountsDetails = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization:
            "Basic OTc1NjQyMGUtMWU2Zi00NTgxLTkxYjQtMmE3MjI1ZGY3OWNmOjV2elZlS0s1dV81RzRUZkBBQ0xZVmZzdFcjNGkwbm5Id3FFUTdGNUJ6YlAja3JzZDZ2Q1hDc1ItM2F2cl9jZzM=",
        },
      };

      try {

        
        const accountsResponse = await fetch(
          `https://sandbox.belvo.com/api/accounts/?institution=${name}`,
          options
        );
        const accountsData = await accountsResponse.json();
        setAccounts(accountsData.results || []);
      } catch (err) {
        setError("Error al cargar los detalles del banco");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetcAccountsDetails();
  }, [name]);

  if (loading) return <p>Cargando cuentas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mt-8">
      <h2 className="text-6xl text-wrap mb-4" >Cuentas asociadas</h2>
      <ul className="grid grid-cols-2 gap-3">
        {accounts.map((account) => (
          <li key={account.id} className="flex flex-col rounded border-2 border-black gap-2 p-2">
            <h2><strong>Cuenta:</strong> {account.name} <br /></h2>
            <h2><strong>Saldo:</strong> {account.balance.current}</h2>
            <Link to={`/cuenta/${account.id}/${account.link}`}>
              <button className="bg-gray-400 rounded p-1 hover:bg-slate-600">Ver transacciones</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cuentas;