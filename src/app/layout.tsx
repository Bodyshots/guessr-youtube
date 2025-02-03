import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar/appsidebar";
import { ReduxProvider } from "@/redux/reduxprovider";
import PrivacyPop from '@/components/PrivacyPop/privacyPop';
import Footer from "@/components/Footer/footer";
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
            <AppSidebar />
            <PrivacyPop/>
            <SidebarTrigger className="text-white"/>
            {children}
            <Footer/>
          </SidebarProvider>
          </ReduxProvider>
        </body>
      </html>
  );
}
