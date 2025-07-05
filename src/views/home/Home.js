import { useEffect, useState } from "react"
import StatsOverview from "../../components/tools/StatsOverview"
import FinancialTable from "../../components/tools/FinancialTable"
import axiosClient from "../../utils/auth/axiosClient"
import { RefreshCw } from "lucide-react"

export default function Home() {
  const [data, setData] = useState([])
  const [hideDolar, setHideDolar] = useState(true)
  const [isLoading, setLoading] = useState(true)

  const getData = async () => {
    setLoading(true)

    try {
      const response = await axiosClient.get(`${process.env.REACT_APP_REINO_API}/ventas`);

      console.log(':D response:', response)
      setData(response.data);
    } catch (err) {
      console.error(err);
    }finally{
      setLoading(false)
    }

  };



  useEffect(() => {
    // console.log("[FRONTEND] Solicitando datos desde SAP HANA...")
    // console.log("[FRONTEND] URL de la API:", )

    getData()

  }, [])


  return (
    <div className="dashboard">

      <main className="dashboard-main">
        {/* <div className="dashboard-header">
          <div className="header-content">
            <h1>Panel Financiero</h1>
          </div>
        </div> */}

        <div className="dashboard-content">
          <StatsOverview data={data} isLoading={isLoading} hideDolar={hideDolar}/>

          <div>
            <div className="flex justify-between" style={{ marginBottom: '1.5rem', alignItems: 'center' }}>
              <div>
                <h2 className="font-bold">Ventas por Centro de Costo</h2>
              </div>

              <button className="refresh-button" onClick={getData}>
                <RefreshCw size={18}/>
                Actualizar
              </button>
            </div>

            {isLoading ? (
              <div className="loading-table">
                <div className="table-skeleton">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="skeleton-row">
                      <div className="skeleton-cell"></div>
                      <div className="skeleton-cell"></div>
                      <div className="skeleton-cell"></div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <FinancialTable data={data} />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}