const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("../model/student.model");

const isValidId = (id) => /^\d+$/.test(id);

const create = async (req, res) => {
  try {
    const { name, gender, dob } = req.body;
    if (!name || !gender || !dob) {
      return res.status(400).json({
        message: "name, gender, and dob are required.",
      });
    }
    const newStudent = await createStudent(req.body);
    return res.status(201).json({
      message: "Student added successfully!",
      data: newStudent,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const students = await getAllStudents();
    return res.status(200).json({
      message: "Students retrieved successfully!",
      data: students,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getById = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Student id must be a number." });
    }
    const student = await getStudentById(req.params.id);
    if (!student) {
      return res.status(404).json({
        message: "Student not found!",
      });
    }
    return res.status(200).json({
      message: "Student retrieved successfully!",
      data: student,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Student id must be a number." });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ message: "At least one field is required." });
    }

    const updatedStudent = await updateStudent(req.params.id, req.body);
    if (!updatedStudent) {
      return res.status(404).json({
        message: "Student not found!",
      });
    }
    return res.status(200).json({
      message: "Student updated successfully!",
      data: updatedStudent,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Student id must be a number." });
    }

    const deletedStudent = await deleteStudent(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({
        message: "Student not found!",
      });
    }
    return res.status(200).json({
      message: "Student deleted successfully!",
      data: deletedStudent,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
