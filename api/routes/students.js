const router = require("express").Router();
const verifyJWT = require("../middleware/verifyJwt");
const students = require("../controllers/students");

router.route("/new-student").post(verifyJWT, students.createNewStudents);

router.route("/get-all-student").get(students.getStudents);

router.route("/get-a-student/:id").get(verifyJWT, students.getStudent);

// Fetch a student based on the provided month,
router.route("/students-record").get(students.studentRecord);

// Add a new attendance record for the student with the specified ID
router.route("/attendance/:id/attendance").put(students.attendance);

router
  .route("/attendance/last7days")
  .get(students.attendanceLast7days);

// Delete attendance record for the student with the specified ID
router
  .route("/delete-attendance/:id")
  .delete(students.deleteAttendance);

router.route("/update-students").put(verifyJWT, students.updateStudent);

//only admin
router.route("/delete-student").delete(verifyJWT, students.deleteStudents);

module.exports = router;
