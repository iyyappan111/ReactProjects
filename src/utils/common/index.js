export const filterRowsBySearch = (data, searchText) => {
    return data.filter((row) =>
      Object.values(row).some((value) => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchText.toLowerCase());
        } else if (typeof value === 'number') {
          return value.toString().toLowerCase().includes(searchText.toLowerCase());
        }
        return false;
      })
    );
  };
  
