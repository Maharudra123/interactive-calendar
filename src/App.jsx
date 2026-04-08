import { useState } from "react";
import InteractiveCalendar from "./components/InteractiveCalendar";

function App() {
  // NEW: We moved the theme state UP to the main app wrapper!
  const [theme, setTheme] = useState("light");

  return (
    <div
      className="w-full flex flex-col items-center p-4 md:p-8 min-h-screen relative overflow-hidden transition-colors duration-500"
      style={{
        // NEW: The entire page background now perfectly matches the active theme!
        backgroundColor: theme === "light" ? "#f5f0e8" : "#1a1510",
        color: theme === "light" ? "#1a1208" : "#f0e8d8",
      }}
    >
      {/* Decorative background blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="z-10 w-full max-w-5xl flex flex-col items-center mt-4 md:mt-12">
        <h1 className="text-4xl md:text-5xl font-black mb-4 text-center tracking-tight transition-colors duration-500">
          Plan Your Next Adventure
        </h1>

        <p className="mb-12 text-center max-w-xl text-lg leading-relaxed opacity-70 transition-colors duration-500">
          Select your desired departure and return dates below. Use the
          integrated notebook to draft your packing list and daily itinerary.
        </p>

        {/* NEW: We pass the theme down as props so they share the same brain */}
        <InteractiveCalendar theme={theme} setTheme={setTheme} />
      </div>
    </div>
  );
}

export default App;
