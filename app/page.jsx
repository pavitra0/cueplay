// app/page.tsx

import BottomNav from "@/components/BottomNav";
import Layout from "../components/Layout";
import MovieSearch from "../components/Search";
import CategorySection from "@/components/CategorySection";

export default function HomePage() {
  return (
    <Layout>
      <div className="relative z-10 px-4  min-h-screen">
        {/* <div className="max-w-5xl mx-auto space-y-12"> */}
          {/* <CategorySection /> */}
          <MovieSearch />
          {/* <BottomNav /> */}
        {/* </div> */}
      </div>
    </Layout>
  );
}
