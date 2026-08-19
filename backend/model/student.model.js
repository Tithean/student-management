const pool = require("../config/db");

const createStudent = async (studentData) => {
  const { name, gender, dob } = studentData;
  const queryText = `
    INSERT INTO student (id, name, gender, dob, attendence)
    SELECT GREATEST(COALESCE(MAX(id), 1000), 1000) + 1, $1, $2, $3, 0
    FROM student
    RETURNING *;
  `;
  const values = [name, gender, dob];

  const result = await pool.query(queryText, values);
  return result.rows[0];
};

const getAllStudents = async () => {
  const queryText = `
    SELECT * FROM student 
    ORDER BY id DESC;
  `;
  const result = await pool.query(queryText);
  return result.rows;
};

const getStudentById = async (id) => {
  const queryText = `
    SELECT * FROM student 
    WHERE id = $1;
  `;
  const values = [id];
  const result = await pool.query(queryText, values);
  return result.rows[0];
};

const updateStudent = async (id, updateData) => {
  const { name, gender, dob, attendence } = updateData;
  const queryText = `
    UPDATE student 
    SET name = COALESCE($2, name), 
        gender = COALESCE($3, gender),
        dob = COALESCE($4, dob),
        attendence = COALESCE($5, attendence)
    WHERE id = $1
    RETURNING *;
  `;
  const values = [id, name, gender, dob, attendence];
  const result = await pool.query(queryText, values);
  return result.rows[0];
};

const deleteStudent = async (id) => {
  const queryText = `
    DELETE FROM student 
    WHERE id = $1 
    RETURNING *;
  `;
  const values = [id];
  const result = await pool.query(queryText, values);
  return result.rows[0];
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
