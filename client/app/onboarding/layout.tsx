import { ReactNode } from "react";

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-900 dark:bg-gray-100 flex flex-col">
      <header className="py-6 dark:bg-white bg-gray-900 text-white dark:text-black enter font-bold text-2xl font-basierCircle text-center">
        Let&apos;s help you get started
      </header>
      <main className="flex-1 py-10 px-4 dark:bg-white bg-gray-900 text-white dark:text-black">
        {children}
      </main>
      <footer className="py-4 text-center text-gray-400 dark:text-gray-500">
        © {new Date().getFullYear()} Hirehunter
      </footer>
    </div>
  );
}
