import { useState } from "react"

export default function FinancialTable({ data }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" })

  const formatCurrency = (amount, currency) => {
    const isNegative = amount < 0
    const absAmount = Math.abs(amount)
    const formatted = new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }).format(absAmount)

    return { formatted, isNegative }
  }

  const handleSort = (key) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0

    const aValue = a[sortConfig.key]
    const bValue = b[sortConfig.key]

    if (typeof aValue === "string") {
      return sortConfig.direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue
  })

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    }

    return sortConfig.direction === "asc" ? (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ) : (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path d="M17 10L12 15L7 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="financial-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("SucursalCaja")}>
                <div className="th-content">
                  <span>Sucursal / Caja</span>
                  <div className="sort-icon">{getSortIcon("SucursalCaja")}</div>
                </div>
              </th>
              <th onClick={() => handleSort("TotalVentaHoy")}>
                <div className="th-content">
                  <span>Total ARS</span>
                  <div className="sort-icon">{getSortIcon("TotalVentaHoy")}</div>
                </div>
              </th>
              {/* <th onClick={() => handleSort("TotalUSD")}>
                <div className="th-content">
                  <span>Total USD</span>
                  <div className="sort-icon">{getSortIcon("TotalUSD")}</div>
                </div>
              </th> */}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => {
              const arsData = formatCurrency(row.TotalVentaHoy, "ARS")
              // const usdData = formatCurrency(row.TotalUSD, "USD")

              return (
                <tr key={index} className="table-row">
                  <td className="branch-cell">
                    <div className="branch-info">
                      <div className="branch-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M3 21H21M5 21V7L13 2L21 7V21M9 9V13M15 9V13"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span>{row.SucursalCaja}</span>
                    </div>
                  </td>
                  <td className={`amount-cell ${arsData.isNegative ? "negative" : "positive"}`}>
                    <div className="amount-wrapper">
                      <span className="currency-symbol">$</span>
                      <span className="amount">
                        {arsData.isNegative ? "-" : ""}
                        {arsData.formatted.replace("ARS", "").replace("$", "").replace("-", "").trim()}
                      </span>
                      <span className="currency-code">ARS</span>
                    </div>
                  </td>
                  {/* <td className={`amount-cell ${usdData.isNegative ? "negative" : "positive"}`}>
                    <div className="amount-wrapper">
                      <span className="currency-symbol">$</span>
                      <span className="amount">
                        {usdData.isNegative ? "-" : ""}
                        {usdData.formatted.replace("USD", "").replace("$", "").replace("-", "").trim()}
                      </span>
                      <span className="currency-code">USD</span>
                    </div>
                  </td> */}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
