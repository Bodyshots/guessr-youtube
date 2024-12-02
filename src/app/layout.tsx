import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar/appsidebar";
import { ReduxProvider } from "@/redux/reduxprovider";
import { Roboto } from 'next/font/google'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Guessr - YouTube Edition"
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${roboto.className} antialiased body_container`}
        >
          <ReduxProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger className="text-white"/>
            {children}
          </SidebarProvider>
          </ReduxProvider>
        </body>
      </html>
  );
}
