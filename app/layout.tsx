import "./globals.css";
import Sidebar from "./components/Sidebar";

export const metadata = {
  title: "My Tasks",
  description: "Manage your tasks efficiently",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="bg-[#F7F7FB] text-[#1F1D2B] h-screen flex">
        <Sidebar />
        <div className="flex-1 h-full p-8 md:p-12">
          {children}
        </div>
      </body>
    </html>
  );
}
