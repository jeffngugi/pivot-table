import "./Table.css";
import { computeSales, getColumns } from "./Compute";
// import { salesdata } from "./data";

const columns = [
  {
    title: "Category",
    dataKey: "name",
  },
  {
    title: "Subcategory",
    dataKey: "name",
  },
  {
    title: "Arkansas",
    dataKey: "Arkansas",
  },
  {
    title: "Arkansas",
    dataKey: "Arkansas",
  },
  {
    title: "Colorado",
    dataKey: "Colorado",
  },
];

const TableView = ({salesdata}) => {
  // const { data, columns } = props;
  const data = computeSales(salesdata);
  const columns = getColumns(salesdata);
  console.log(columns);

  const RenderColums = () => {
    return (
      <tr>
        {columns.map((column) => (
          <th key={column?.dataKey}>{column.title}</th>
        ))}
      </tr>
    );
  };

  const renderRows = (tableColumns, tableRow) => {
    return tableColumns
      .slice(1)
      .map((column, index) => <td>{tableRow[column.dataKey]}</td>);
  };

  return (
    <div className="table-view">
      <table>
        <thead>
          <tr>
            {" "}
            <td className="top-head" colSpan={2}>
              Products
            </td>
            <td className="top-head" colSpan={columns.length - 2}>
              States
            </td>
          </tr>
          <RenderColums />
        </thead>
        <tbody>
          {data.map((category) => (
            <>
              {category.subCategories.map((subCat, index) => (
                <>
                  <tr key={index}>
                    {index === 0 && (
                      <td rowSpan={category.subCategories.length}>
                        {category.name}
                      </td>
                    )}
                    {renderRows(columns, subCat)}
                  </tr>
                </>
              ))}
              <tr className="total-col">
                <td colSpan={2}>{`${category.name} total`}</td>
                {columns.slice(2).map((column, index) => (
                  <td>{category[column.dataKey]}</td>
                ))}
              </tr>
            </>
          ))}
        </tbody>
      </table>{" "}
    </div>
  );
};

export default TableView;