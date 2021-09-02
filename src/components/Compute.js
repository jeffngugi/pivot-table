export const groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };
  
  export const computeSales = (data) => {
    const pivotData = groupBy(data, "category");
  
    const data2 = Object.keys(pivotData).map((category) => {
      const categoryTotal = {};
      const pivotBySub = groupBy(pivotData[category], "subCategory");
      const groupBstates = Object.keys(pivotBySub).map((sub) => {
        const groupByState = groupBy(pivotBySub[sub], "state");
        const stateTotals = {};
        Object.keys(groupByState).forEach((state) => {
          const total = Math.round(
            groupByState[state].reduce((a, b) => a + b.sales, 0)
          );
          categoryTotal[state] = categoryTotal[state]
            ? categoryTotal[state] + total
            : total;
          return (stateTotals[state] = total);
        });
        return { name: sub, ...stateTotals };
      });
      return {
        name: category,
        ...categoryTotal,
        subCategories: groupBstates,
      };
    });
    return data2;
  };
  
  export const getColumns = (data) => {
    let columns = [
      {
        title: "Category",
        dataKey: "name",
      },
      {
        title: "Subcategory",
        dataKey: "name",
      },
    ];
    const pivotData = groupBy(data, "state");
    Object.keys(pivotData).forEach((key) => {
      columns.push({ title: key, dataKey: key });
    });
  
    return columns;
  };