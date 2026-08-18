const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("../model/student.model");

const create = async (req, res) => {
  try {
    const newStudent = await createStudent(req.body);
    res.status(201).json({
      message: "Student added successfully!",
      data: newStudent,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const students = await getAllStudents();
    res.status(200).json({
      message: "Students retrieved successfully!",
      data: students,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const getById = async (req, res) => {
  try {
    const student = await getStudentById(req.params.id);
    if (!student) {
      return res.status(404).json({
        message: "Student not found!",
      });
    }
    res.status(200).json({
      message: "Student retrieved successfully!",
      data: student,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const updatedStudent = await updateStudent(req.params.id, req.body);
    if (!updatedStudent) {
      return res.status(404).json({
        message: "Student not found!",
      });
    }
    res.status(200).json({
      message: "Student updated successfully!",
      data: updatedStudent,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    const deletedStudent = await deleteStudent(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({
        message: "Student not found!",
      });
    }
    res.status(200).json({
      message: "Student deleted successfully!",
      data: deletedStudent,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
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
