const monthMapping = {
    "Jan": "01",
    "Feb": "02",
    "Mar": "03",
    "Apr": "04",
    "May": "05",
    "Jun": "06",
    "Jul": "07",
    "Aug": "08",
    "Sep": "09",
    "Oct": "10",
    "Nov": "11",
    "Dec": "12"
};
function convertToDate(dateStr) {
    const [day, month, year] = dateStr.split(" ");
    const formattedDay = day.padStart(2, "0"); // Ensures day is two digits
    const formattedMonth = monthMapping[month]; // Converts month to MM
    const formattedDate = `20${year}-${formattedMonth}-${formattedDay}`; // Format as YYYY-MM-DD
    return new Date(formattedDate); // Create a JavaScript Date object
}

module.exports = convertToDate;