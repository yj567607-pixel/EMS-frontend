db.employees.insertMany([
  {
    name: "John Doe",
    age: 30,
    employee_id: "E12345",
    department: "Engineering",
    position: "Software Engineer", 
    salary: 80000,
    full_time: true

  }
    ,{
    name: "Jane Smith",
    age: 28,
    employee_id: "E67890",
    department: "Marketing",
    position: "Marketing Specialist",
    salary: 70000,
    full_time: false
  },

  {
    name: "Alice Johnson",
    age: 35,
    employee_id: "E54321",  
    department: "Sales",
    position: "Sales Associate",
    salary: 60000,
    full_time: "part-time"
  },

  {
    name: "Bob Brown", 
    age: 40,
    employee_id: "E98765",
    department: "Human Resources",
    position: "HR Manager",
    salary: 90000,
    full_time: true
  },

  {
    name: "Charlie Davis",
    age: 32,
    employee_id: "E24680",
    department: "Finance",
    position: "Financial Analyst",
    salary: 75000,
    full_time: false
  }
])


//db.employee.find()
// db.employee.find({"salary": {"$gte": 60000}})


// db.aggregate([
//     {
//         $match: {
//             "department": "IT"
//         }
//     },{
//         $sort: {
//             "salary": -1
//         }
//     },{
//         $project: {
//             "name": 1,
//             "salary": 1,
//             "department": 1,
//             "totalsalary": {"$add": ["$salary", "$bonus"]}      
//         }
//     }
// ])


// db.employee.aggregate([

//     {
//         $group : {
//            "_id": "$null",
//         "totalSalary": {"$sum": {"$add": ["$salary", "$bonus"]}},
//         }
//     }
// ])


db.employee.find({"employee_id": "E12345"})

db.employee.getIndexes()
db.employee
