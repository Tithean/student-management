import { use, useEffect, useState } from "react";
import { api } from "./config/api";
import TableStudent from "./components/TableStudent";

function App() {
  const [studentData, setStudentData] = useState({
    name: "",
    age: 0,
    gender: "",
  });

  const fetchStudents = async () => {
    try {
      const response = await api.get("/students");
      console.log(response);
      setStudentData.response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      {studentData &&
        studentData.map((item) => (
          item.name, 
          item.age, 
          item.gender
        ))}
      <TableStudent />
    </div>
  );
}

export default App;
