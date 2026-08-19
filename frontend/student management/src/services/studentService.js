import { STUDENTS_URL } from "../config/api";

function fromApi(record) {
  return {
    id: record.id ?? record._id,
    name: record.name ?? "",
    gender: record.gender ?? "",
    dob: (record.dob ?? "").toString().slice(0, 10),
    late: Number(record.late ?? 0),
    present: Number(record.attendence ?? record.present ?? 0),
    absent: Number(record.absent ?? 0),
  };
}
function toApi(student) {
  const payload = {
    name: student.name,
    gender: student.gender,
    dob: student.dob,
  };

  if (student.attendence !== undefined) {
    payload.attendence = Number(student.attendence);
  }

  return payload;
}

async function request(url, options) {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

function unwrap(payload) {
  if (Array.isArray(payload)) return payload;
  return payload?.data ?? payload?.students ?? [];
}

export async function fetchStudents() {
  const payload = await request(STUDENTS_URL);
  return unwrap(payload).map(fromApi);
}

export async function createStudent(student) {
  const payload = await request(STUDENTS_URL, {
    method: "POST",
    body: JSON.stringify(toApi(student)),
  });
  return fromApi(payload?.data ?? payload ?? {});
}

export async function updateStudent(id, student) {
  const payload = await request(`${STUDENTS_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(toApi(student)),
  });
  return fromApi(payload?.data ?? payload ?? {});
}

export async function deleteStudent(id) {
  await request(`${STUDENTS_URL}/${id}`, { method: "DELETE" });
}
