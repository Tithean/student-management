import SearchStudentByName from "./SearchStudentByName";
import AddStudent from "./AddStudentBtn";

export default function StudentAction({
  search,
  onSearchChange,
  onAddStudent,
}) {
  return (
    <section className="mb-4 flex items-center justify-between gap-3">
      <SearchStudentByName search={search} onSearchChange={onSearchChange} />
      <AddStudent onAddStudent={onAddStudent} />
    </section>
  );
}
