export function compareToDate(startDate,endDate){
    let _startDate = new Date(startDate);
    let _endDate = new Date(endDate);
    return _startDate < _endDate;
}