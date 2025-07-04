export default function StatsOverview({ data, hideDolar, isLoading }) {
  if (isLoading) {
    return (
      <div className="stats-overview">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="stat-card loading">
            <div className="stat-skeleton">
              <div className="skeleton-icon"></div>
              <div className="skeleton-content">
                <div className="skeleton-title"></div>
                <div className="skeleton-value"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const totalARS = data.reduce((sum, item) => sum + item.TotalARS, 0)
  // const totalUSD = data.reduce((sum, item) => sum + item.TotalUSD, 0)
  const activeBranches = data.length
  // const negativeCount = data.filter((item) => item.TotalARS < 0 || item.TotalUSD < 0).length

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const stats = [
    {
      title: "Total ARS",
      value: formatCurrency(totalARS, "ARS"),
      icon: "💰",
      trend: totalARS >= 0 ? "positive" : "negative",
    },
    // {
    //   title: "Total USD",
    //   value: formatCurrency(totalUSD, "USD"),
    //   icon: "💵",
    //   trend: totalUSD >= 0 ? "positive" : "negative",
    // },
    {
      title: "Sucursales Activas",
      value: activeBranches.toString(),
      icon: "🏰",
      trend: "neutral",
    },
    // {
    //   title: "Alertas",
    //   value: negativeCount.toString(),
    //   icon: "⚠️",
    //   trend: negativeCount > 0 ? "warning" : "positive",
    // },
  ]

  // negativeCount representa la cantidad de sucursales (o ítems del array data)
  // que tienen un saldo negativo, 
  // ya sea en pesos (TotalARS) o en dólares (TotalUSD).

  return (
    <div className="stats-overview">
      {stats.map((stat, index) => (
        <div key={index} className={`stat-card ${stat.trend}`}>
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-content">
            <h3>{stat.title}</h3>
            <p>{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
