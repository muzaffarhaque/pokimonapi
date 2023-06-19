const groupBy = (items, criterion) => {
    const groups = {};
  
    // Group the items based on the criterion
    items.forEach((item) => {
      const key = criterion(item);
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
    });
  
    // Return the groups as an object
    return groups;
  };

export default groupBy;