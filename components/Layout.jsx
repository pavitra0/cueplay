import Header from "./Header";
import Footer from "./Footer";
import Beams from "./Beams";

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Beams as full-page background */}
      <div className="fixed inset-0 -z-10">
        <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={12}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={25}
        />
      </div>

      {/* Foreground layout */}
      <div className="relative z-10 
       text-white px-6 py-10">
      
        <main className="flex-1 p-2">{children}</main>
      
      </div>
    </div>
  );
}
