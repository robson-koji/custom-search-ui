/*
Cleanup only show label.
*/
export default function getFilterValueDisplay(filterValue) {
    filterValue = filterValue.split(';')
    filterValue = filterValue[filterValue.length - 1]

    filterValue = filterValue.split('|')
    filterValue = filterValue[filterValue.length - 1]


    if (filterValue === undefined || filterValue === null) return "";
    if (filterValue.hasOwnProperty("name")) return filterValue.name;    
    return String(filterValue);
  }