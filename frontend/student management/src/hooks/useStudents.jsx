import { useEffect, useMemo, useState } from "react";
import {
  createStudent,
  deleteStudent,
  fetchStudents,
  updateStudent,
} from "../services/studentService";

export function useStudents() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetchStudents()
      .then((data) => {
        if (!cancelled) setStudents(data);
      })
      .catch(() => {
        if (!cancelled) {
          setError(
            "Could not load students. Is the backend running on port 8000?",
          );
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const visibleStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return students
      .filter((student) => !query || student.name.toLowerCase().includes(query))
      .sort(
        (firstStudent, secondStudent) =>
          Number(firstStudent.id) - Number(secondStudent.id),
      );
  }, [students, search]);

  const addStudent = async (student) => {
    try {
      const created = await createStudent(student);
      setStudents((current) => [created, ...current]);
      closeModal();
    } catch {
      setError("Could not save the student. Please try again.");
    }
  };

  const removeStudent = async (id) => {
    const previousStudents = students;
    setStudents((current) => current.filter((student) => student.id !== id));

    try {
      await deleteStudent(id);
      setError("");
    } catch {
      setStudents(previousStudents);
      setError("Could not delete the student. Please try again.");
    }
  };

  const recordAttendance = async (studentId, attendanceType) => {
    const student = students.find((item) => item.id === studentId);
    if (!student || !attendanceType) return;

    const updatedStudent = {
      ...student,
      [attendanceType]: Number(student[attendanceType] ?? 0) + 1,
    };

    if (attendanceType === "present") {
      try {
        await updateStudent(studentId, {
          ...student,
          attendence: updatedStudent.present,
        });
      } catch {
        setError("Could not save the present count. Please try again.");
        return;
      }
    }

    setStudents((current) =>
      current.map((item) => (item.id === studentId ? updatedStudent : item)),
    );
    setError("");
  };

  const editStudent = async (student) => {
    try {
      const updated = await updateStudent(student.id, student);
      setStudents((current) =>
        current.map((item) => (item.id === updated.id ? updated : item)),
      );
      closeModal();
    } catch {
      setError("Could not update the student. Please try again.");
    }
  };

  const openAddModal = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const openEditModal = (student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  function closeModal() {
    setEditingStudent(null);
    setIsModalOpen(false);
    setError("");
  }

  return {
    students,
    visibleStudents,
    isLoading,
    error,
    search,
    setSearch,
    isModalOpen,
    editingStudent,
    addStudent,
    removeStudent,
    editStudent,
    recordAttendance,
    openAddModal,
    openEditModal,
    closeModal,
  };
}
