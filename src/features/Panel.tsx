export const Panel = () => {
  return (
    <section className="py-3 px-5 bg-gray-100 h-full">
      <div>
        <h2 className="font-sans text-sm text-neutral-500 font-semibold">
          PANEL GENERAL
        </h2>
        <h2 className="font-sans font-bold text-3xl">Presupuestos de obra</h2>
        <p className="text-neutral-400">Resumen de actividad · Julio 2026</p>
      </div>
      <div className="w-full">
        <table className="table-auto">
          <thead>
            <tr>
              <th>Song</th>
              <th>Artist</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
              <td>Malcolm Lockyer</td>
              <td>1961</td>
            </tr>
            <tr>
              <td>Witchy Woman</td>
              <td>The Eagles</td>
              <td>1972</td>
            </tr>
            <tr>
              <td>Shining Star</td>
              <td>Earth, Wind, and Fire</td>
              <td>1975</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};
