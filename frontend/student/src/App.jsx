import { useEffect, useMemo, useState } from 'react'
import AddStudentModal from './components/AddStudentModal'
import Sidebar from './components/Sidebar'
import StatCards from './components/StatCards'
import StudentTable from './components/StudentTable'
import { CLASSES, PAGE_DESCRIPTION, PAGE_TITLE } from './config/students'
import { createStudent, deleteStudent, fetchStudents } from './services/studentService'

function App() {
  const [students, setStudents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [classFilter, setClassFilter] = useState('')

  useEffect(() => {
    let cancelled = false

    fetchStudents()
      .then((data) => {
        if (!cancelled) setStudents(data)
      })
      .catch(() => {
        if (!cancelled) setError('Could not load students. Is the backend running on port 8000?')
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const visibleStudents = useMemo(() => {
    const query = search.trim().toLowerCase()
    return students.filter((student) => {
      const matchesQuery = !query || student.name.toLowerCase().includes(query)
      const matchesClass = !classFilter || student.className === classFilter
      return matchesQuery && matchesClass
    })
  }, [students, search, classFilter])

  const addStudent = async (student) => {
    try {
      const created = await createStudent(student)
      setStudents((current) => [...current, created.id ? created : { ...student, id: Date.now() }])
      setIsModalOpen(false)
      setError('')
    } catch {
      setError('Could not save the student. Please try again.')
    }
  }

  const removeStudent = async (id) => {
    const previous = students
    setStudents((current) => current.filter((student) => student.id !== id))
    try {
      await deleteStudent(id)
    } catch {
      setStudents(previous)
      setError('Could not delete the student. Please try again.')
    }
  }

  return (
    <div className="layout">
      <Sidebar active="students" />

      <main className="content">
        <header className="topbar">
          <div>
            <h1 className="page-title">{PAGE_TITLE}</h1>
            <p className="page-description">{PAGE_DESCRIPTION}</p>
          </div>
          <button type="button" className="button" onClick={() => setIsModalOpen(true)}>
            + Add student
          </button>
        </header>

        {error && <p className="alert">{error}</p>}

        <StatCards students={students} />

        <section className="toolbar">
          <input
            type="search"
            className="search-input"
            placeholder="Search students by name..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <select
            className="filter-select"
            value={classFilter}
            onChange={(event) => setClassFilter(event.target.value)}
          >
            <option value="">All classes</option>
            {CLASSES.map((className) => (
              <option key={className} value={className}>
                {className}
              </option>
            ))}
          </select>
        </section>

        {isLoading ? (
          <div className="card loading">Loading students...</div>
        ) : (
          <StudentTable students={visibleStudents} onDelete={removeStudent} />
        )}
      </main>

      {isModalOpen && (
        <AddStudentModal onClose={() => setIsModalOpen(false)} onSubmit={addStudent} />
      )}
    </div>
  )
}

export default App
