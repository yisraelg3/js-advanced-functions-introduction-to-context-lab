// Your code here
function createEmployeeRecord (stringStringStringNumberArr) {
    //const employee = {firstName:'', familyName:'', title:'', payPerHour:0,timeInEvents:'', timeOutevents:''}
    const employee = {}
    employee.firstName = stringStringStringNumberArr[0]
    employee.familyName = stringStringStringNumberArr[1]
    employee.title = stringStringStringNumberArr[2]
    employee.payPerHour = stringStringStringNumberArr[3]
    employee.timeInEvents = []
    employee.timeOutEvents = []
    // let i = 0
    // for (value in employee) {
    //     employee[value] = stringStringStringNumberArr[i] || []
    //     i++
    // }
    return employee
}

function createEmployeeRecords (arrOfArr) {
    const records = []
    arrOfArr.map((elementArr) => {
        records.push(createEmployeeRecord(elementArr))
    })
    return records
}

function createTimeInEvent (employeeObj, dateStamp) {
    debugger
    employeeObj.timeInEvents.push({type: "TimeIn", hour : parseInt(dateStamp.slice(11)), date : dateStamp.slice(0,10)})
    return employeeObj
}

function createTimeOutEvent (employeeObj, dateStamp) {
    employeeObj.timeOutEvents.push({type: "TimeOut", hour : parseInt(dateStamp.slice(11)), date : dateStamp.slice(0,10)})
    return employeeObj
}

function hoursWorkedOnDate (employeeObj, dateStamp) {
    const currentDateTimeInArr = employeeObj.timeInEvents.filter((element) => {
        return element.date === dateStamp.slice(0,10)
    })

    const currentDateTimeOutArr = employeeObj.timeOutEvents.filter((element) => {
        return element.date === dateStamp.slice(0,10)
    })

    let i=0    
    const hoursWorkedArr = currentDateTimeInArr.map((element) => {
        i++ 
        return (currentDateTimeOutArr[i-1].hour - element.hour) / 100
        })
    const hoursWorkedInt = hoursWorkedArr.reduce((accum, element) => parseInt(element) + accum, 0)
    return hoursWorkedInt
}

function wagesEarnedOnDate(employeeObj, dateStamp) {
    const amountOwed = hoursWorkedOnDate(employeeObj, dateStamp) * employeeObj.payPerHour
    return amountOwed
}

function allWagesFor (employeeObj) {
    const dates = employeeObj.timeInEvents.map((element) => {
        return element.date
    })
    const totalPerEmployeeArr = dates.map(element => {
        return wagesEarnedOnDate(employeeObj, element)
    })

    const totalPerEmployeeInt = totalPerEmployeeArr.reduce((accum, totalPerEmployeeElement) => totalPerEmployeeElement + accum, 0)
    return totalPerEmployeeInt
}

function findEmployeeByFirstName(srcArray,firstName) {
    const firstNameArr = srcArray.map(element => element.firstName)
    debugger
    return firstNameArr.find(element => element === firstName)
}

function calculatePayroll(srcArray) {
    const wagesArray = srcArray.map(element => allWagesFor(element))
    return wagesArray.reduce((accum, wageElement) => wageElement + accum, 0)
}