import StudentData from "./StudentData";

const HEADINGS = [
  "ID",
  "Name",
  "Gender",
  "Date of Birth",
  "Attendance",
  "Late",
  "Present",
  "Absent",
  "Status",
  "Actions",
];

function StudentTable({ students, onUpdate, onDelete, onAttendanceChange }) {
  return (
    <div className="overflow-x-auto border border-[#dfeaf9] bg-white shadow-[0_10px_30px_rgba(13,63,116,0.08)]">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {HEADINGS.map((heading) => (
              <th
                key={heading}
                className="border-b border-[#dfeaf9] bg-[#12304d] px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-[0.6px] text-[#edf6ff]"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td className="px-5 py-8 text-center text-[#5d6e8c]" colSpan={10}>
                No students found. Click &quot;Add student&quot; to create one.
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <StudentData
                key={student.id}
                student={student}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onAttendanceChange={onAttendanceChange}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
