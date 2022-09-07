// Your code here
function createEmployeeRecord(details){
    let employee = {
        timeInEvents: [],
        timeOutEvents: []
    }
    employee.firstName = details[0];
    employee.familyName = details[1];
    employee.title = details[2];
    employee.payPerHour= details[3];
    return employee;
}
function createEmployeeRecords (employeeData) {
    return employeeData.map(data =>{
        return createEmployeeRecord(data)
    })
}

function createTimeInEvent (employee, dateStamp){
    let timeInEvent = {
        type: "TimeIn",
        hour: parseInt((dateStamp).split(" ")[1]),
        date: dateStamp.split(" ")[0]
      };
      employee.timeInEvents.push(timeInEvent);
      return employee;
    };
function createTimeOutEvent(employee, dateStamp){
    let timeOutEvent = {
        type: "TimeOut",
        hour: parseInt((dateStamp).split(" ")[1]),
        date: dateStamp.split(" ")[0]
      };
      employee.timeOutEvents.push(timeOutEvent);
      return employee;
    };
function hoursWorkedOnDate (employee, givenDate){
    let inEvent = employee.timeInEvents.find((event) =>{
        return event.date === givenDate
    })
    let outEvent = employee.timeOutEvents.find(event =>{
        return event.date === givenDate
    })
    return (outEvent.hour - inEvent.hour) / 100
}
function wagesEarnedOnDate(employee, givenDate){
    let grossWage = hoursWorkedOnDate(employee, givenDate)
        * employee.payPerHour
    return parseFloat(grossWage.toString())
}
function allWagesFor (employee){
    let eligibleDates = employee.timeInEvents.map(event =>{
        return event.date
    })
    let payableHours = eligibleDates.reduce((memo, date) =>{
        return memo + wagesEarnedOnDate(employee, date)
    }, 0)
    return payableHours
}
function calculatePayroll (employeeRecords){
    return employeeRecords.reduce((memo, record) =>{
        return memo + allWagesFor(record)
    }, 0)}