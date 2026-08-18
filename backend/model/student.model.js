const pool = require("../config/db");

const createStudent = async (studentData) => {
  const { name, age, gender } = studentData;
  const queryText = `
    INSERT INTO student (name, age, gender) 
    VALUES ($1, $2, $3) 
    RETURNING *;
  `;
  const values = [name, age, gender];

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
  const { name, age, gender } = updateData;
  const queryText = `
    UPDATE student 
    SET name = COALESCE($2, name), 
        age = COALESCE($3, age), 
        gender = COALESCE($4, gender)
    WHERE id = $1
    RETURNING *;
  `;
  const values = [id, name, age, gender];
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
