const Table = ({ data }) => {
  return (
    <>
      {data.map ? (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-400 text-white text-center">
              <th className="border border-gray-500 px-4 py-2">ID</th>
              <th className="border border-gray-500 px-4 py-2">
                Clima (DHT-11)
              </th>
              <th className="border border-gray-500 px-4 py-2">
                Clima (OpenWeatherMap)
              </th>
              <th className="border border-gray-500 px-4 py-2">
                Humedad del suelo
              </th>
              <th className="border border-gray-500 px-4 py-2">
                Humedad del aire
              </th>
              <th className="border border-gray-500 px-4 py-2">
                Nivel de batería
              </th>
              <th className="border border-gray-500 px-4 py-2">Brillo</th>
              <th className="border border-gray-500 px-4 py-2">Fecha</th>
              <th className="border border-gray-500 px-4 py-2">Hora</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className={`text-center ${
                  index % 2 !== 0 ? "bg-blue-100" : ""
                }`}
              >
                <td className="border border-gray-500 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-500 px-4 py-2">
                  {item.temperature}º C
                </td>
                <td className="border border-gray-500 px-4 py-2">
                  {item.weather}º C
                </td>
                <td className="border border-gray-500 px-4 py-2">
                  {item.soilMoisture}
                </td>
                <td className="border border-gray-500 px-4 py-2">
                  {item.airHumidity}%
                </td>
                <td className="border border-gray-500 px-4 py-2">
                  {item.batteryLevel}%
                </td>
                <td className="border border-gray-500 px-4 py-2">
                  {item.brightness}
                </td>
                <td className="border border-gray-500 px-4 py-2">
                  {new Date(item.time).toLocaleDateString("es-MX")}
                </td>
                <td className="border border-gray-500 px-4 py-2">
                  {new Date(item.time).toLocaleTimeString("es-MX")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <>Cargando...</>
      )}
    </>
  );
};

export default Table;
