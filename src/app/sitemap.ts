import type { MetadataRoute } from 'next';

import { getBaseUrl } from '@/utils/Helpers';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${getBaseUrl()}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    // App pages are noindex — excluded from sitemap intentionally.
  ];
}
