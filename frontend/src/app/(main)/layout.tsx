import type { Metadata } from 'next';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { AppSidebar } from "@/components/AppSidebar/appsidebar";
import { ReduxProvider } from "@/providers/ReduxProvider";
import { SessionProvider } from '@/components/providers/SessionProvider';
import PrivacyPop from '@/components/PrivacyPop/privacyPop';
import { getServerSession } from 'next-auth';
import { Toaster } from '@/components/ui/sonner';
import ReactQueryProvider from '@/providers/QueryProvider';

export const metadata: Metadata = {
  title: "Guessr.yt"
};

export default async function MainLayout({ children }: { children: React.ReactNode; }) {
  const session = await getServerSession();

  return (
    <>
      <ReactQueryProvider>
        <ReduxProvider>
          <SidebarProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SessionProvider session={session}>
                <Toaster />
                <AppSidebar />
                <PrivacyPop />
                <SidebarTrigger className="m-2 z-50 cursor-pointer" />
                {children}
              </SessionProvider>
            </ThemeProvider>
          </SidebarProvider>
        </ReduxProvider>
      </ReactQueryProvider>
    </>
  );
}
