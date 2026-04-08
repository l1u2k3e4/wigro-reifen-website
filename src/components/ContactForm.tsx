// src/components/ContactForm.tsx
// Kontaktformular mit Validierung, Honeypot und DSGVO-Checkbox

import { useState, type FormEvent, type ChangeEvent } from 'react'
import { CheckCircle, AlertCircle, Send } from 'lucide-react'
import { COPY } from '@/data/content'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

interface FormState {
  name: string
  email: string
  telefon: string
  nachricht: string
  dsgvo: boolean
  honeypot: string
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

const INITIAL_STATE: FormState = {
  name: '',
  email: '',
  telefon: '',
  nachricht: '',
  dsgvo: false,
  honeypot: '',
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const felder = COPY.kontakt.formular.felder

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    setForm((prev) => ({
      ...prev,
      [name]: checked !== undefined ? checked : value,
    }))
    // Fehler beim Tippen entfernen
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {}

    if (!form.name.trim()) {
      newErrors.name = 'Bitte geben Sie Ihren Namen ein.'
    }
    if (!form.email.trim()) {
      newErrors.email = 'Bitte geben Sie Ihre E-Mail-Adresse ein.'
    } else if (!EMAIL_REGEX.test(form.email)) {
      newErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
    }
    if (!form.nachricht.trim()) {
      newErrors.nachricht = 'Bitte geben Sie Ihre Nachricht ein.'
    } else if (form.nachricht.trim().length < 10) {
      newErrors.nachricht = 'Die Nachricht ist zu kurz (mindestens 10 Zeichen).'
    }
    if (!form.dsgvo) {
      newErrors.dsgvo = 'Bitte stimmen Sie der Datenschutzerklärung zu.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Honeypot-Prüfung
    if (form.honeypot) return

    if (!validate()) return

    setStatus('submitting')

    try {
      const subject = encodeURIComponent('Neue Anfrage über die Website — WIGRO Reifen')
      const body = encodeURIComponent(
        `Name: ${form.name}\n` +
        `E-Mail: ${form.email}\n` +
        `Telefon: ${form.telefon || 'nicht angegeben'}\n\n` +
        `Nachricht:\n${form.nachricht}`
      )

      window.location.href = `mailto:info@wigro-reifen.de?subject=${subject}&body=${body}`

      await new Promise(resolve => setTimeout(resolve, 500))
      setStatus('success')
      setForm(INITIAL_STATE)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="callout flex items-start gap-3 p-6">
        <CheckCircle size={22} className="text-brand-success shrink-0 mt-0.5" aria-hidden />
        <div>
          <p className="font-semibold text-brand-heading text-sm">Nachricht gesendet!</p>
          <p className="text-sm text-brand-body mt-1">{COPY.kontakt.formular.erfolg}</p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="text-sm text-brand-accent underline mt-3 hover:no-underline"
          >
            Weitere Nachricht senden
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Honeypot — unsichtbar für Nutzer, sichtbar für Bots */}
      <input
        type="text"
        name="honeypot"
        value={form.honeypot}
        onChange={handleChange}
        tabIndex={-1}
        aria-hidden="true"
        className="sr-only"
        autoComplete="off"
      />

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-name" className="text-sm font-medium text-brand-heading">
          {felder.name.label} <span className="text-brand-accent" aria-label="Pflichtfeld">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder={felder.name.placeholder}
          autoComplete="name"
          className={cn(
            'h-11 px-4 rounded-btn border text-brand-body text-sm bg-brand-bg',
            'focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent',
            'placeholder:text-brand-muted transition-colors',
            errors.name ? 'border-red-400' : 'border-brand-border hover:border-brand-muted',
          )}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p id="contact-name-error" className="text-xs text-red-500 flex items-center gap-1 animate-fade-in" role="alert">
            <AlertCircle size={12} aria-hidden /> {errors.name}
          </p>
        )}
      </div>

      {/* E-Mail */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-email" className="text-sm font-medium text-brand-heading">
          {felder.email.label} <span className="text-brand-accent" aria-label="Pflichtfeld">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder={felder.email.placeholder}
          autoComplete="email"
          className={cn(
            'h-11 px-4 rounded-btn border text-brand-body text-sm bg-brand-bg',
            'focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent',
            'placeholder:text-brand-muted transition-colors',
            errors.email ? 'border-red-400' : 'border-brand-border hover:border-brand-muted',
          )}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p id="contact-email-error" className="text-xs text-red-500 flex items-center gap-1 animate-fade-in" role="alert">
            <AlertCircle size={12} aria-hidden /> {errors.email}
          </p>
        )}
      </div>

      {/* Telefon (optional) */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-telefon" className="text-sm font-medium text-brand-heading">
          {felder.telefon.label}
        </label>
        <input
          id="contact-telefon"
          type="tel"
          name="telefon"
          value={form.telefon}
          onChange={handleChange}
          placeholder={felder.telefon.placeholder}
          autoComplete="tel"
          className="h-11 px-4 rounded-btn border border-brand-border hover:border-brand-muted text-brand-body text-sm bg-brand-bg placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-colors"
        />
      </div>

      {/* Nachricht */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-nachricht" className="text-sm font-medium text-brand-heading">
          {felder.nachricht.label} <span className="text-brand-accent" aria-label="Pflichtfeld">*</span>
        </label>
        <textarea
          id="contact-nachricht"
          name="nachricht"
          value={form.nachricht}
          onChange={handleChange}
          placeholder={felder.nachricht.placeholder}
          rows={5}
          className={cn(
            'px-4 py-3 rounded-btn border text-brand-body text-sm bg-brand-bg resize-y',
            'focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent',
            'placeholder:text-brand-muted transition-colors',
            errors.nachricht ? 'border-red-400' : 'border-brand-border hover:border-brand-muted',
          )}
          aria-describedby={errors.nachricht ? 'contact-nachricht-error' : undefined}
          aria-invalid={!!errors.nachricht}
        />
        {errors.nachricht && (
          <p id="contact-nachricht-error" className="text-xs text-red-500 flex items-center gap-1 animate-fade-in" role="alert">
            <AlertCircle size={12} aria-hidden /> {errors.nachricht}
          </p>
        )}
      </div>

      {/* DSGVO-Checkbox */}
      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            name="dsgvo"
            checked={form.dsgvo}
            onChange={handleChange}
            className="mt-0.5 w-4 h-4 shrink-0 accent-brand-accent cursor-pointer"
            aria-describedby={errors.dsgvo ? 'contact-dsgvo-error' : undefined}
            aria-invalid={!!errors.dsgvo}
          />
          <span className="text-xs text-brand-muted leading-relaxed group-hover:text-brand-body transition-colors">
            {felder.dsgvo.split('Datenschutzerklärung')[0]}
            <Link to="/datenschutz" className="text-brand-accent underline hover:no-underline">
              Datenschutzerklärung
            </Link>
            {felder.dsgvo.split('Datenschutzerklärung')[1]}
          </span>
        </label>
        {errors.dsgvo && (
          <p id="contact-dsgvo-error" className="text-xs text-red-500 flex items-center gap-1 ml-7 animate-fade-in" role="alert">
            <AlertCircle size={12} aria-hidden /> {errors.dsgvo}
          </p>
        )}
      </div>

      {/* Error Feedback */}
      {status === 'error' && (
        <div className="flex items-start gap-2 p-3 rounded-badge bg-red-50 border border-red-200 animate-fade-in" role="alert">
          <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" aria-hidden />
          <p className="text-xs text-red-700">{COPY.kontakt.formular.fehler}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto disabled:opacity-60 disabled:pointer-events-none"
      >
        {status === 'submitting' ? (
          <>
            <span className="w-4 h-4 border-2 border-brand-white/40 border-t-brand-white rounded-full animate-spin" aria-hidden />
            <span>Wird gesendet…</span>
          </>
        ) : (
          <>
            <Send size={16} aria-hidden />
            <span>{COPY.kontakt.formular.absenden}</span>
          </>
        )}
      </button>
    </form>
  )
}
