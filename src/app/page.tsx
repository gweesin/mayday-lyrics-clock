// import Image from "next/image";
import Clock from "./components/Clock";
// Placeholder imports for theme and language switchers
// import ThemeToggle from "./components/ThemeToggle";
// import LanguageSwitcher from "./components/LanguageSwitcher";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground transition-colors duration-300">
      {/* Header with theme and language switchers */}
      <header className="w-full flex justify-between items-center p-4 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold" aria-label="Mayday Clock">Mayday Clock</h1>
        <div className="flex gap-2">
          {/* <ThemeToggle /> */}
          {/* <LanguageSwitcher /> */}
        </div>
      </header>
      {/* Main clock area */}
      <main className="flex-1 flex flex-col items-center justify-center w-full px-2">
        <Clock />
      </main>
      {/* Footer */}
      <footer className="w-full text-center p-4 text-xs opacity-70">
        {/* i18n: Copyright © Mayday Clock. All rights reserved. */}
        Copyright © Mayday Clock. All rights reserved.
      </footer>
    </div>
  );
}
