'use client'

import React from 'react'
import { HydrationSafeInput } from '../HydrationSafeInput/HydrationSafeInput'

export const CreateFirstUserView: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <div className="create-first-user-view">
      <h1>Create First User</h1>
      <form action="/api/users" className="form" method="POST" noValidate onSubmit={handleSubmit}>
        <div className="email-and-username">
          <div className="field-type">
            <HydrationSafeInput
              type="email"
              id="field-email"
              name="email"
              required
              autoComplete="off"
              placeholder="Email"
            />
          </div>
        </div>
        <div className="field-type">
          <HydrationSafeInput
            type="password"
            id="field-password"
            name="password"
            required
            autoComplete="off"
            placeholder="Password"
            aria-label="New Password"
          />
        </div>
        <div className="field-type">
          <HydrationSafeInput
            type="password"
            id="field-confirm-password"
            name="confirm-password"
            required
            autoComplete="off"
            placeholder="Confirm Password"
            aria-label="Confirm Password"
          />
        </div>
        <div className="field-type">
          <HydrationSafeInput type="text" id="field-name" name="name" placeholder="Name" />
        </div>
        <button type="submit">Create User</button>
      </form>
    </div>
  )
}
