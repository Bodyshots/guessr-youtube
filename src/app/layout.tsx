import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { AppSidebar } from "@/components/AppSidebar/appsidebar";
import { ReduxProvider } from "@/redux/reduxprovider";
import PrivacyPop from '@/components/PrivacyPop/privacyPop';
import { GeistMonoFont, RobotoFont, GothicFont, YouTubeSansFont, YouTubeSansDarkFont, } from "@/fonts";

export const metadata: Metadata = {
  title: "Guessr - YouTube Edition"
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
      <html lang="en">
        <body
          className={`${GeistMonoFont.variable} ${RobotoFont.variable} ${GothicFont.variable} ${YouTubeSansFont.variable} ${YouTubeSansDarkFont.variable} antialiased body_container`}
        >
          <ReduxProvider>
          <SidebarProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AppSidebar />
            <PrivacyPop/>
            <SidebarTrigger className="m-1 mt-3"/>
            {children}
          </ThemeProvider>
          </SidebarProvider>
          </ReduxProvider>
        </body>
      </html>
  );
}
