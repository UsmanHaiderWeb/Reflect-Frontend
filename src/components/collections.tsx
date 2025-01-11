"use client";

import { useState } from "react";
import CollectionPreview from "./collection-preview";
import CollectionForm from "@/components/collection-form";
import { collectionsInterface } from "@/data/types&Interfaces";
import { useSelector } from "react-redux";
import { StoreType } from "@/ReduxStore/Store";
import { userDataType } from "@/ReduxStore/Slices/userData.slice";

const Collections = () => {
  const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false);
  const userData = useSelector((state: StoreType) => state.userData) as userDataType;

  return (
    <section id="collections" className="space-y-6">
      <h2 className="text-3xl font-bold gradient-title">Collections</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Create New Collection Button */}
        <CollectionPreview
          isCreateNew={true}
          onCreateNew={() => setIsCollectionDialogOpen(true)}
        />

        {/* Unorganized Collection */}
          {/* <CollectionPreview
            name="Unorganized"
            entries={'entriesByCollection.unorganized'}
            isUnorganized={true}
          /> */}

        {/* User Collections */}
        {(userData as userDataType).collections?.map((collection: collectionsInterface, idx: number) => (
          <CollectionPreview
            key={`${idx}`}
            id={collection._id}
            collectionsName={collection.title}
            entries={collection.journalEntries}
            createdAt={collection.createdAt}
          />
        ))}

        <CollectionForm
          open={isCollectionDialogOpen}
          setOpen={setIsCollectionDialogOpen}
        />
      </div>
    </section>
  );
};

export default Collections;
