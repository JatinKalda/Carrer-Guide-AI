import { Sidebar } from "@/components/layout/sidebar";
import { AiChatWidget } from "@/components/layout/ai-chat-widget";
import { AuthGuard } from "@/components/layout/auth-guard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background bg-grid-fade [background-size:24px_24px]">
        <Sidebar />
        <div className="lg:pl-[264px]">{children}</div>
        <AiChatWidget />
      </div>
    </AuthGuard>
  );
}
