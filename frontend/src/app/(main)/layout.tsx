import type { Metadata } from 'next';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { AppSidebar } from "@/components/AppSidebar/appsidebar";
import { ReduxProvider } from "@/redux/reduxprovider";
import { SessionProvider } from '@/components/providers/SessionProvider';
import PrivacyPop from '@/components/PrivacyPop/privacyPop';
import { GeistMonoFont, RobotoFont, GothicFont, YouTubeSansFont, YouTubeSansDarkFont, } from "@/fonts";
import { getServerSession } from 'next-auth';
import { RootProvider } from 'fumadocs-ui/provider';
import '../globals.css';

export const metadata: Metadata = {
  title: "Guessr.yt"
};

export default async function MainLayout({ children }: { children: React.ReactNode; }) {
  const session = await getServerSession();

  return (
      <html lang="en">
        <body
          className={`${GeistMonoFont.variable} ${RobotoFont.variable} ${GothicFont.variable} ${YouTubeSansFont.variable} ${YouTubeSansDarkFont.variable} antialiased body_container`}
        >
          <RootProvider>
          <ReduxProvider>
          <SidebarProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <SessionProvider session={session}>
            <AppSidebar />
            <PrivacyPop/>
            <SidebarTrigger className="m-2 cursor-pointer"/>
            {children}
          </SessionProvider>
          </ThemeProvider>
          </SidebarProvider>
          </ReduxProvider>
          </RootProvider>
        </body>
      </html>
  );
}
