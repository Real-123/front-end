import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'EduManage ERP',
  description: 'A minimal student dashboard hackathon project.',
  openGraph: {
    title: 'EduManage ERP',
    description: 'A minimal student dashboard hackathon project.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EduManage ERP',
    description: 'A minimal student dashboard hackathon project.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
