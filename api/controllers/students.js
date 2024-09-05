const Student = require("../models/students");
const moment = require("moment")

const getStudents = async (req, res) => {
  const students = await Student.find().lean();

  if (!students?.length) {
    return res.status(400).json({ message: "No students found" });
  }

  res.json(students);
};

const getStudent = async (req, res) => {
  const studentId = req.params;

  const student = await Student.findById(studentId).exec();

  if (!student) {
    return res.status(400).json({ message: "No student found" });
  }

  res.json(student);
};

const createNewStudents = async (req, res) => {
  const { name, grade, contact, address } = req.body;

  // Confirm data
  if (!name || !grade) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate student
  const duplicate = await Student.findOne({ name })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate student" });
  }

  const studentObject = { name, grade, contact, address };

  // Create and store new user
  const student = await Student.create(studentObject);

  if (student) {
    res.status(201).json({ message: `New student ${name} was created` });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
};

const studentRecord = async (req, res) => {
  const { grade, month } = req.query;

  const startDate = new Date(`${month}-01`);
  const endDate = new Date(
    new Date(startDate).setMonth(startDate.getMonth() + 1)
  );

  const students = await Student.find({ grade: grade });

  if (students.length === 0) {
    return res
      .status(404)
      .json({ message: "No students found with the given criteria" });
  }

  // Filter attendance records within the specified month for each student
  const filteredStudents = students.map((student) => {
    const filteredAttendance = student.attendance.filter(
      (att) => att.date >= startDate && att.date < endDate
    );

    return {
      ...student.toObject(),
      attendance: filteredAttendance,
    };
  });

  res.json(filteredStudents);
};

const attendance = async (req, res) => {
  const { id } = req.params;
  const { dateMonthDay, isPresent } = req.body;

  if (!dateMonthDay) {
    return res.status(400).json({ message: "Please provide date" });
  }

  // Find the student by ID
  const student = await Student.findById(id);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  // Convert dateMonthDay string to a Date object
  const compareDate = new Date(dateMonthDay);

  // Check if attendance for the day exists
  const attendanceRecord = student.attendance.find(
    (record) => new Date(record.date).getTime() === compareDate.getTime()
  );

  if (attendanceRecord) {
    // Update the existing record
    attendanceRecord.isPresent = isPresent;
  } else {
    // Add a new attendance record
    student.attendance.push({ date: compareDate, isPresent });
  }

  // Save the student record
  await student.save();

  res.json(student);
};

const attendanceLast7days = async (req, res) => {
  const { date } = req.query;
  const startDate = moment(date).subtract(6, "days").startOf("day");
  const endDate = moment(date).endOf("day");

  const attendanceData = await Student.aggregate([
    {
      $unwind: "$attendance",
    },
    {
      $match: {
        "attendance.date": {
          $gte: startDate.toDate(),
          $lte: endDate.toDate(),
        },
      },
    },
    {
      $project: {
        date: "$attendance.date",
        isPresent: "$attendance.isPresent",
      },
    },
  ]);

  res.json(attendanceData);
};

const updateStudent = async (req, res) => {};

const deleteAttendance = async (req, res) => {
  const { id } = req.params;

  const { date } = req.body; // The date should be passed in the request body

  const student = await Student.findOneAndUpdate(
    { _id: id },
    { $pull: { attendance: { date: new Date(date) } } }, // Pull the attendance entry with the matching date
    { new: true } // Return the updated document
  );

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json({ message: "Attendance entry deleted successfully", student });
};

const deleteStudents = async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Student ID Required" });
  }

  // Does the student exist to delete?
  const student = await Student.findById(id).exec();

  if (!student) {
    return res.status(400).json({ message: "student not found" });
  }

  const result = await student.deleteOne();

  const reply = `student name ${result.name} with ID ${result._id} deleted`;

  res.json(reply);
};

module.exports = {
  createNewStudents,
  getStudents,
  getStudent,
  studentRecord,
  attendanceLast7days,
  attendance,
  updateStudent,
  deleteAttendance,
  deleteStudents,
};
