


export function useDate() {


  const formatDate = (time) => {

    const date = time.toDate();
  
    let day = date.getDate();
    day = day.toString()
    day = day.padStart(2, "0");
  
    let month = (date.getMonth() + 1);
    month = month.toString()
    month = month.padStart(2, "0");
  
    const year = date.getFullYear()
  
    return `${day}/${month}/${year}`

  }

  return formatDate;

}