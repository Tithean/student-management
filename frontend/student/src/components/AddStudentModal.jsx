import { useState } from 'react'
import { CLASSES, GENDERS } from '../config/students'

const EMPTY_FORM = { name: '', age: '', gender: '', dob: '', className: '' }

function AddStudentModal({ onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  const updateField = (field) => (event) => {
    setForm({ ...form, [field]: event.target.value })
  }

  const validate = () => {
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Name is required'
    if (!form.age) nextErrors.age = 'Age is required'
    else if (Number(form.age) <= 0) nextErrors.age = 'Age must be greater than 0'
    if (!form.gender) nextErrors.gender = 'Gender is required'
    if (!form.dob) nextErrors.dob = 'Date of birth is required'
    if (!form.className) nextErrors.className = 'Class is required'
    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    onSubmit({ ...form, name: form.name.trim(), age: Number(form.age) })
    setForm(EMPTY_FORM)
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <h2 className="modal-title">Add student</h2>
        <p className="modal-subtitle">Fill in the details to register a new student.</p>

        <form onSubmit={handleSubmit}>
          <label className="field">
            <span>Name</span>
            <input type="text" value={form.name} onChange={updateField('name')} />
          </label>
          {errors.name && <p className="error">{errors.name}</p>}

          <label className="field">
            <span>Age</span>
            <input type="number" min="1" value={form.age} onChange={updateField('age')} />
          </label>
          {errors.age && <p className="error">{errors.age}</p>}

          <label className="field">
            <span>Gender</span>
            <select value={form.gender} onChange={updateField('gender')}>
              <option value="">Select</option>
              {GENDERS.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </label>
          {errors.gender && <p className="error">{errors.gender}</p>}

          <label className="field">
            <span>Date of birth</span>
            <input type="date" value={form.dob} onChange={updateField('dob')} />
          </label>
          {errors.dob && <p className="error">{errors.dob}</p>}

          <label className="field">
            <span>Class</span>
            <select value={form.className} onChange={updateField('className')}>
              <option value="">Select</option>
              {CLASSES.map((className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </label>
          {errors.className && <p className="error">{errors.className}</p>}

          <div className="modal-actions">
            <button type="button" className="button secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="button">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddStudentModal
