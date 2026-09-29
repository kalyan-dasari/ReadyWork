-- Student registrations submitted by the website.
-- This is additive and does not replace any other tables in the database.
CREATE TABLE IF NOT EXISTS registrations (
  id TEXT PRIMARY KEY,
  device_id TEXT NOT NULL UNIQUE,
  submitted_at TIMESTAMPTZ NOT NULL,
  form_data JSONB NOT NULL
);

CREATE INDEX IF NOT EXISTS registrations_submitted_at_idx
  ON registrations (submitted_at DESC);

-- Convenient protected view for reviewing students in Neon SQL Editor.
CREATE OR REPLACE VIEW student_registrations AS
SELECT
  id,
  submitted_at,
  form_data->>'fullName' AS full_name,
  form_data->>'email' AS email,
  form_data->>'phone' AS phone,
  form_data->>'college' AS college,
  form_data->>'year' AS year,
  form_data->>'primarySkill' AS primary_skill,
  form_data->>'portfolioUrl' AS portfolio_url,
  form_data->'workInterests' AS work_interests,
  form_data->>'otherWorkInterest' AS other_work_interest,
  form_data->'experienceGoals' AS experience_goals,
  form_data->>'otherExperienceGoal' AS other_experience_goal,
  form_data->>'readinessLevel' AS readiness_level
FROM registrations;
