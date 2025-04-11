export const getEmptyCardMessage = (filterType) => {
  switch (filterType) {
    case "status":
      return `Oops! No stories found matching your search.`;
    
    case "date":
      return `No stories found in the given date range`;
    
    default:
      return `Start creating your first Travel Story! Click the 'Add' button to document your thoughts, ideas, and memories. Let's get started!"`;
  }
}