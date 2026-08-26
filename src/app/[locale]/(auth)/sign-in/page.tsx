import type { Metadata } from 'next';

import { AuthForm } from '@/components/app/AuthForm';

export const metadata: Metadata = {
  title: 'Sign in — VidStack',
  description: 'Sign in to your VidStack account.',
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return <AuthForm mode="sign-in" />;
}
