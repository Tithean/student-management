import Sidebar from "./components/Sidebar";
import StatCards from "./components/StatCards";
import StudentTable from "./components/students/student_table/StudentTable.jsx";
import AddStudentModal from "./components/students/student_form/HandleStudentModal.jsx";
import PageHeader from "./components/PageHeader";
import LoadingState from "./components/LoadingState";
import { useStudents } from "./hooks/useStudents.jsx";
import StudentAction from "./components/students/student_action/StudentAction.jsx";

function App() {
  const {
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
  } = useStudents();

  return (
    <div className="flex min-h-screen bg-[#edf5ff] text-[#12304d]">
      <Sidebar active="students" />

      <main className="w-full flex-1 bg-[#f8fbff] px-5 py-6 md:px-10 md:py-8">
        <PageHeader />

        {error && (
          <p className="mb-5 rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <StudentAction
          search={search}
          onSearchChange={setSearch}
          onAddStudent={openAddModal}
        />

        {isLoading ? (
          <LoadingState />
        ) : (
          <StudentTable
            students={visibleStudents}
            onUpdate={openEditModal}
            onDelete={removeStudent}
            onAttendanceChange={recordAttendance}
          />
        )}

        <StatCards students={students} />
      </main>

      {isModalOpen && (
        <AddStudentModal
          key={editingStudent?.id ?? "new"}
          student={editingStudent}
          onClose={closeModal}
          onSubmit={editingStudent ? editStudent : addStudent}
        />
      )}
    </div>
  );
}

export default App;
