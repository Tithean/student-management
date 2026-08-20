import { useState } from "react";

export function useStudentModal() {
  const [editingStudent, setEditingStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openAddModal = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const openEditModal = (student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingStudent(null);
    setIsModalOpen(false);
  };

  return {
    editingStudent,
    isModalOpen,
    openAddModal,
    openEditModal,
    closeModal,
  };
}
