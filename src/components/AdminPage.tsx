import React, { useState } from 'react';
import { ArrowLeft, LogIn, RefreshCw } from 'lucide-react';
import { ApplicationRecord } from '../types';

type AdminRegistration = {
  id: string;
  submitted_at: string;
  form_data: ApplicationRecord;
};

const ADMIN_ENDPOINT = '/.netlify/functions/registrations-admin';

export const AdminPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useState<string | null>(null);
  const [registrations, setRegistrations] = useState<AdminRegistration[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const loadRegistrations = async (credentials: string) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(ADMIN_ENDPOINT, {
        headers: { authorization: `Basic ${credentials}` },
      });
      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error('Admin service is not deployed yet. Redeploy the latest Netlify build and try again.');
      }

      const result = (await response.json()) as {
        registrations?: AdminRegistration[];
        error?: string;
      };

      if (!response.ok) throw new Error(result.error || 'Unable to load registrations.');
      setAuth(credentials);
      setRegistrations(result.registrations || []);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Unable to load registrations.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    void loadRegistrations(btoa(`${username}:${password}`));
  };

  const handleRefresh = () => {
    if (auth) void loadRegistrations(auth);
  };

  if (!auth) {
    return (
      <main className="min-h-screen bg-[#FAFAF9] px-4 py-10 text-[#141413] sm:px-6">
        <div className="mx-auto max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <a href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900">
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </a>
          <h1 className="text-2xl font-extrabold tracking-tight">Student registrations</h1>
          <p className="mt-2 text-sm text-neutral-500">Sign in to view submitted applications.</p>
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <label className="block text-sm font-semibold">
              Username
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="mt-1.5 w-full rounded-lg border border-neutral-300 px-3 py-2.5 font-normal outline-none focus:border-neutral-900"
                autoComplete="username"
              />
            </label>
            <label className="block text-sm font-semibold">
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-1.5 w-full rounded-lg border border-neutral-300 px-3 py-2.5 font-normal outline-none focus:border-neutral-900"
                autoComplete="current-password"
              />
            </label>
            {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            <button type="submit" disabled={isLoading} className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#141413] px-4 py-3 text-sm font-bold text-white disabled:opacity-60">
              <LogIn className="h-4 w-4" />
              {isLoading ? 'Checking...' : 'Sign in'}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAF9] px-4 py-8 text-[#141413] sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <a href="/" className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900">
              <ArrowLeft className="h-4 w-4" />
              Back to site
            </a>
            <h1 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">Student registrations</h1>
            <p className="mt-1 text-sm text-neutral-500">{registrations.length} most recent registrations</p>
          </div>
          <button onClick={handleRefresh} disabled={isLoading} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold disabled:opacity-60">
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200 bg-white shadow-sm">
          <table className="min-w-[900px] w-full border-collapse text-left text-sm">
            <thead className="bg-neutral-100 text-xs uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="px-4 py-3">Submitted</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">College</th>
                <th className="px-4 py-3">Year</th>
                <th className="px-4 py-3">Skill</th>
                <th className="px-4 py-3">Portfolio</th>
                <th className="px-4 py-3">Work interests</th>
                <th className="px-4 py-3">Goals</th>
                <th className="px-4 py-3">Readiness</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {registrations.map((registration) => {
                const student = registration.form_data;
                return (
                  <tr key={registration.id} className="align-top">
                    <td className="whitespace-nowrap px-4 py-3 text-neutral-500">{new Date(registration.submitted_at).toLocaleString()}</td>
                    <td className="px-4 py-3 font-semibold">{student.fullName}</td>
                    <td className="px-4 py-3">{student.email}</td>
                    <td className="px-4 py-3">{student.phone}</td>
                    <td className="px-4 py-3">{student.college}</td>
                    <td className="whitespace-nowrap px-4 py-3">{student.year}</td>
                    <td className="px-4 py-3">{student.primarySkill}</td>
                    <td className="max-w-56 break-all px-4 py-3">
                      {student.portfolioUrl ? (
                        <a className="text-blue-700 underline" href={student.portfolioUrl} target="_blank" rel="noreferrer">
                          {student.portfolioUrl}
                        </a>
                      ) : '—'}
                    </td>
                    <td className="max-w-56 px-4 py-3">{student.workInterests.join(', ')}</td>
                    <td className="max-w-56 px-4 py-3">{student.experienceGoals.join(', ')}</td>
                    <td className="whitespace-nowrap px-4 py-3">{student.readinessLevel.replace(/_/g, ' ')}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {registrations.length === 0 && <p className="p-8 text-center text-sm text-neutral-500">No registrations found.</p>}
        </div>
      </div>
    </main>
  );
};
