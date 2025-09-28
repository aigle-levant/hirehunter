import { ReactNode } from "react";

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-900 dark:bg-gray-100 flex flex-col">
      <header className="py-6 bg-blue-600 text-white text-center font-bold text-xl">
        Let&apos;s help you get started
      </header>
      <main className="flex-1 py-10 px-4">{children}</main>
      <footer className="py-4 text-center text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Hirehunter
      </footer>
    </div>
  );
}
