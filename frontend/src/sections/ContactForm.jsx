import { useState } from 'react'
import Button from '../components/ui/Button'
import FloatingDropdown from '../components/ui/FloatingDropdown'
import { FloatingInput, FloatingTextarea } from '../components/ui/FloatingField'
import { useMagnetic } from '../hooks/useMagnetic'
import { contactFormFields, contactSection } from '../data/contact'
import { budgetRanges, projectTypes } from '../data/services'
import ContactSuccess from './ContactSuccess'

const projectTypeOptions = projectTypes.map((type) => ({ value: type, label: type }))
const budgetOptions = budgetRanges.map((range) => ({ value: range, label: range }))

export default function ContactForm({ onFieldFocus }) {
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const submitMagneticRef = useMagnetic({ strength: 0.35 })

  const validate = (formData) => {
    const next = {}
    if (!formData.get('name')?.trim()) next.name = 'Name is required'
    if (!formData.get('company')?.trim()) next.company = 'Company is required'
    if (!formData.get('email')?.trim()) {
      next.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.get('email'))) {
      next.email = 'Enter a valid email'
    }
    if (!formData.get('projectType')) next.projectType = 'Select a project type'
    if (!formData.get('budget')) next.budget = 'Select a budget range'
    if (!formData.get('message')?.trim()) next.message = 'Tell us about your project'
    return next
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const nextErrors = validate(formData)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return <ContactSuccess />
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate data-cursor="hide">
      <div className="grid gap-5 md:grid-cols-2">
        <FloatingInput
          id="name"
          name="name"
          label="Full Name"
          error={errors.name}
          onFocus={onFieldFocus}
        />
        <FloatingInput
          id="company"
          name="company"
          label="Brand / Company Name"
          error={errors.company}
          onFocus={onFieldFocus}
        />
      </div>

      <FloatingInput
        id="email"
        name="email"
        type="email"
        label="Email Address"
        error={errors.email}
        onFocus={onFieldFocus}
      />

      <div className="grid gap-5 md:grid-cols-2">
        <FloatingDropdown
          id="projectType"
          name="projectType"
          label={contactFormFields.projectTypeLabel}
          options={projectTypeOptions}
          error={errors.projectType}
          onFocus={onFieldFocus}
        />
        <FloatingDropdown
          id="budget"
          name="budget"
          label={contactFormFields.budgetLabel}
          options={budgetOptions}
          error={errors.budget}
          onFocus={onFieldFocus}
        />
      </div>

      <FloatingTextarea
        id="message"
        name="message"
        label={contactFormFields.messageLabel}
        error={errors.message}
        onFocus={onFieldFocus}
      />

      <div ref={submitMagneticRef} className="inline-block" data-contact-field>
        <Button type="submit" variant="primary" showArrow>
          {contactSection.submitLabel}
        </Button>
      </div>
    </form>
  )
}
