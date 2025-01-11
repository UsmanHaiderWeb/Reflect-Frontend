import { collectionsInterface } from "@/data/types&Interfaces";
import { JournalFilters } from "./journal-filters";
import SingleCollectionLayout from "@/components/SingleCollectionLayout";
import { Params, useParams } from "react-router-dom";
import DeleteCollectionDialog from "@/components/delete-collection";
import EditCollectionDialog from "@/components/EditCollectionDialog";

export default function SingleCollectionPage({collectionData}: {collectionData: collectionsInterface | undefined}) {
  const { collectionId } = useParams<Params>();

  return (
    <SingleCollectionLayout>
      <div className="space-y-6">
        <div className="flex justify-between flex-wrap gap-y-3">
          <div className="flex justify-between flex-col">
            <h1 className="text-4xl font-bold gradient-title">
              {collectionId === "unorganized"
                ? "Unorganized Entries"
                : collectionData?.title || "Collection"}
            </h1>
            <p className="text-[14px] font-extralight pl-1 lg:w-[650px] md:w-[450px] md:line-clamp-2 sm:line-clamp-3">{collectionData?.description}</p>
          </div>
          <div className="flex justify-between gap-x-2">
          {collectionData && (<>
            <DeleteCollectionDialog collection={collectionData}/>
            <EditCollectionDialog collection={collectionData}/>
          </>)}
          </div>
        </div>

        {/* Client-side Filters Component */}
        {collectionData?.journalEntries &&
          <JournalFilters entries={collectionData?.journalEntries} collectionName={collectionData.title} collectionId={collectionData._id} />
        }
      </div>
    </SingleCollectionLayout>
  );
}
