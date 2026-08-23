import type { Metadata } from 'next';

import { AuthForm } from '@/components/app/AuthForm';

export const metadata: Metadata = {
  title: 'Sign up — VidStack',
  description: 'Create your VidStack account.',
  robots: { index: false, follow: false },
};

export default function SignUpPage() {
  return <AuthForm mode="sign-up" />;
}
