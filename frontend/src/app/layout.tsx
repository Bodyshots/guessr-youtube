import type { ReactNode } from 'react';
import { RootProvider } from 'fumadocs-ui/provider/next';
import './globals.css';
import { GeistMonoFont, RobotoFont, GothicFont, YouTubeSansFont, YouTubeSansDarkFont, } from "@/fonts";

export const metadata = {
  title: 'Guessr.yt',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistMonoFont.variable} ${RobotoFont.variable} ${GothicFont.variable} ${YouTubeSansFont.variable} ${YouTubeSansDarkFont.variable} antialiased body_container`}
      >
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
