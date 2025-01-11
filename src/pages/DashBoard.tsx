'use server'

import Collections from "@/components/collections";
import MoodAnalytics from "@/components/mood-analytics";


const DashBoard = () => {
  return (
    <div className="px-4 py-8 space-y-8">
      <section className="space-y-4">
        <MoodAnalytics />
      </section>
      <Collections />
    </div>
  );
};

export default DashBoard
