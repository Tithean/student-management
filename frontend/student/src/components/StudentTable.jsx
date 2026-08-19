function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}

function StudentTable({ students, onDelete }) {
  return (
    <div className="card table-card">
      <table className="student-table">
        <thead>
          <tr>
            <th>NO</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Class</th>
            <th aria-label="actions" />
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td className="empty-row" colSpan={7}>
                No students found. Click &quot;Add student&quot; to create one.
              </td>
            </tr>
          ) : (
            students.map((student, index) => (
              <tr key={student.id}>
                <td className="muted">{String(index + 1).padStart(2, '0')}</td>
                <td>
                  <div className="cell-user">
                    <span className="avatar small">{initials(student.name)}</span>
                    <span>{student.name}</span>
                  </div>
                </td>
                <td>{student.age}</td>
                <td>
                  <span className={`badge ${(student.gender || '').toLowerCase()}`}>
                    {student.gender}
                  </span>
                </td>
                <td className="muted">{student.dob}</td>
                <td>
                  <span className="badge class">{student.className}</span>
                </td>
                <td>
                  <button
                    type="button"
                    className="icon-button"
                    title="Delete student"
                    onClick={() => onDelete(student.id)}
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default StudentTable
