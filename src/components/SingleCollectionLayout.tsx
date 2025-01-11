import { ReactNode, Suspense } from "react";
import SingleCollectionLoading from "./SingleCollectionLoading";

export default function SingleCollectionLayout({ children }: { children: ReactNode }) {
  return (
    <div className="px-4 py-8">
      <Suspense fallback={<SingleCollectionLoading />}>{children}</Suspense>
    </div>
  );
}
