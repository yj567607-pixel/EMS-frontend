use("users")

db.students.insertMany([
  {
    name: "John Doe",
    age: 20,
    roll_number: "2734673",
    major: "Computer Science",
    section: "A",
    enrolled: false
  },
  {
    name: "Jane Smith",
    age: 22,
    roll_number: "2734674",
    major: "Mathematics",
    section: "B",
    enrolled: true
  },
  {
    name: "Alice Johnson",
    age: 19,
    roll_number: "2734675",
    major: "Physics",
    section: "C",
    enrolled: false
  },
  {
    name: "Alice Johnson",
    age: 19,
    roll_number: "2734675",
    major: "Physics",
    section: "C", 
    enrolled: false
  },
  {
    name: "Bob Brown",
    age: 21,
    roll_number: "2734676",
    major: "Chemistry",
    section: "A",
    enrolled: true
  }                   
])


// Read

//db.students.find({})
//db.students.find({ enrolled: true })    
db.students.find({ age: { $lte:20} })
db.students.find({ major: "Computer Science" }) 
db.students.find({ $or: [{ enrolled: true }, { age: { $lt: 21 } }] })


// Update 
db.students.updateOne({ roll_number: "2734673" }, { $set: { section: "A" } })
db.students.updateOne({ roll_number: "2734674" }, { $set: { enrolled: false } })

// Delete
db.students.deleteOne({ roll_number: "2734675" })  
db.students.deleteMany({ section: "C" })