import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { LoginForm } from './login-form';

export default async function Page() {
  const result = await auth.api.getSession({
    headers: await headers(),
  });

  if (result?.session) redirect('/admin');

  return <LoginForm />;
}
