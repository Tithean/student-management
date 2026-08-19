import { STUDENTS_URL } from '../config/api'

// Maps a record coming from the API into the shape used by the UI.
function fromApi(record) {
  return {
    id: record.id ?? record._id,
    name: record.name ?? '',
    age: record.age ?? '',
    gender: record.gender ?? '',
    dob: (record.dob ?? '').toString().slice(0, 10),
    className: record.className ?? record.class ?? '',
  }
}

// Maps the UI shape back into the payload the API expects.
function toApi(student) {
  return {
    name: student.name,
    age: Number(student.age),
    gender: student.gender,
    dob: student.dob,
    className: student.className,
  }
}

async function request(url, options) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  if (response.status === 204) return null
  return response.json()
}

function unwrap(payload) {
  if (Array.isArray(payload)) return payload
  return payload?.data ?? payload?.students ?? []
}

export async function fetchStudents() {
  const payload = await request(STUDENTS_URL)
  return unwrap(payload).map(fromApi)
}

export async function createStudent(student) {
  const payload = await request(STUDENTS_URL, {
    method: 'POST',
    body: JSON.stringify(toApi(student)),
  })
  return fromApi(payload?.data ?? payload ?? {})
}

export async function updateStudent(id, student) {
  const payload = await request(`${STUDENTS_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(toApi(student)),
  })
  return fromApi(payload?.data ?? payload ?? {})
}

export async function deleteStudent(id) {
  await request(`${STUDENTS_URL}/${id}`, { method: 'DELETE' })
}
