import type { LocalePrefix } from 'node_modules/next-intl/dist/types/src/routing/types';

import { BILLING_INTERVAL, type PricingPlan } from '@/types/Subscription';

const localePrefix: LocalePrefix = 'as-needed';

// VidStack — All-in-One AI Video Automation Platform
export const AppConfig = {
  name: 'VidStack',
  locales: [
    {
      id: 'en',
      name: 'English',
    },
  ],
  defaultLocale: 'en',
  localePrefix,
};

export const AllLocales = AppConfig.locales.map(locale => locale.id);

export const PLAN_ID = {
  STARTER: 'starter',
  PRO: 'pro',
  CREATOR: 'creator',
} as const;

export const PricingPlanList: Record<string, PricingPlan> = {
  [PLAN_ID.STARTER]: {
    id: PLAN_ID.STARTER,
    price: 19,
    interval: BILLING_INTERVAL.MONTH,
    testPriceId: '',
    devPriceId: '',
    prodPriceId: '',
    features: {
      teamMember: 1,
      website: 20,
      storage: 1,
      transfer: 1,
    },
  },
  [PLAN_ID.PRO]: {
    id: PLAN_ID.PRO,
    price: 49,
    interval: BILLING_INTERVAL.MONTH,
    testPriceId: '',
    devPriceId: '',
    prodPriceId: '',
    features: {
      teamMember: 1,
      website: 50,
      storage: 3,
      transfer: 3,
    },
  },
  [PLAN_ID.CREATOR]: {
    id: PLAN_ID.CREATOR,
    price: 99,
    interval: BILLING_INTERVAL.MONTH,
    testPriceId: '',
    devPriceId: '',
    prodPriceId: '',
    features: {
      teamMember: 1,
      website: 100,
      storage: 4,
      transfer: 4,
    },
  },
};
