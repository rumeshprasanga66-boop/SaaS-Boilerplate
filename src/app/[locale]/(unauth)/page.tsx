import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { BackToTop } from '@/components/motion/BackToTop';
import { Preloader } from '@/components/motion/Preloader';
import { CaptionStyles } from '@/templates/CaptionStyles';
import { ClipAnythingPrompt } from '@/templates/ClipAnythingPrompt';
import { CreditUsage } from '@/templates/CreditUsage';
import { CTA } from '@/templates/CTA';
import { FAQ } from '@/templates/FAQ';
import { Features } from '@/templates/Features';
import { Footer } from '@/templates/Footer';
import { Hero } from '@/templates/Hero';
import { HowItWorks } from '@/templates/HowItWorks';
import { LogoMarquee } from '@/templates/LogoMarquee';
import { Navbar } from '@/templates/Navbar';
import { Pricing } from '@/templates/Pricing';
import { Testimonials } from '@/templates/Testimonials';
import { TranscriptEditor } from '@/templates/TranscriptEditor';
import { TrustBar } from '@/templates/TrustBar';
import { VideoDemo } from '@/templates/VideoDemo';
import { ViralityScore } from '@/templates/ViralityScore';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Index',
  });

  const title = t('meta_title');
  const description = t('meta_description');
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://vidstack.app';

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords: [
      'AI video generator',
      'video to shorts',
      'AI clipping tool',
      'auto captions',
      'TikTok video maker',
      'YouTube Shorts automation',
      'repurpose podcast to clips',
      'AI video editor',
    ],
    alternates: { canonical: '/' },
    robots: { index: true, follow: true },
    openGraph: {
      type: 'website',
      url: baseUrl,
      siteName: 'VidStack',
      title,
      description,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'VidStack — AI Video Automation Platform' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  };
}

const IndexPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://vidstack.app';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'VidStack',
    'applicationCategory': 'MultimediaApplication',
    'operatingSystem': 'Web',
    'url': baseUrl,
    'description': 'All-in-one AI video automation platform. Turn scripts into shorts, long videos into clips, and auto-publish to TikTok, YouTube, and Instagram.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'ratingCount': '2400',
    },
  };

  return (
    <div id="landing-root" className="theme-dark landing-page min-h-screen antialiased">
      <script
        type="application/ld+json"

        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Preloader />
      <Navbar />
      <Hero />
      <TrustBar />
      <LogoMarquee />
      <HowItWorks />
      <ClipAnythingPrompt />
      <ViralityScore />
      <Features />
      <TranscriptEditor />
      <CaptionStyles />
      <VideoDemo />
      <Pricing />
      <CreditUsage />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default IndexPage;
