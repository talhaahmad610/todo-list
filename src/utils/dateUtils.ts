export const formatDate = (date: Date): string => {
  // Create a new date object to avoid modifying the original
  const dateObj = new Date(date);
  
  // Format options
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric'
  };
  
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  
  // Reset hours to compare just the dates
  today.setHours(0, 0, 0, 0);
  tomorrow.setHours(0, 0, 0, 0);
  dateObj.setHours(0, 0, 0, 0);
  
  if (dateObj.getTime() === today.getTime()) {
    return 'Today';
  } else if (dateObj.getTime() === tomorrow.getTime()) {
    return 'Tomorrow';
  } else {
    // Check if it's in the current year
    if (dateObj.getFullYear() === today.getFullYear()) {
      return dateObj.toLocaleDateString(undefined, options);
    } else {
      // Include year for dates not in the current year
      return dateObj.toLocaleDateString(undefined, {
        ...options,
        year: 'numeric'
      });
    }
  }
};