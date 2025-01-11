'use server'

import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { JournalEntryInterface } from "@/data/types&Interfaces";
import DeleteJournal from "@/components/DeleteJournal";
import { getMoodObj } from "@/data/moods";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

export default function SingleJournal({ journalData }: {journalData: JournalEntryInterface}) {
  const mood = getMoodObj(journalData.mood);

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-5xl font-bold gradient-title">
                {journalData.title}
              </h1>
            </div>
            <p className="text-gray-500">
              Created: {format(new Date(parseInt(journalData.createdAt)), "PPP")}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <DeleteJournal entryId={journalData._id} collectionId={journalData.collection._id} />
            <Link to={`/journal/${journalData._id}/edit`}><Button variant='journal'><Edit /> Edit Journal</Button></Link>
          </div>
        </div>

        {/* Tags Section */}
        <div className="flex flex-wrap gap-2">
          {journalData.collection && (
            <Link to={`/collection/${journalData.collection._id}`}>
              <span className="text-sm px-4 py-1.5 bg-orange-100 text-orange-800 rounded">Collection: Usman Haider</span>
            </Link>
          )}
          <Badge
            variant="outline"
            style={{
              backgroundColor: `var(--${mood?.color}-50)`,
              color: `var(--${mood?.color}-700)`,
              borderColor: `var(--${mood?.color}-200)`,
            }}
          >
            Feeling {mood?.label}
          </Badge>
        </div>
      </div>

      <hr />

      {/* Content Section */}
      <div className="ql-snow">
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: journalData.content }}
        />
      </div>

      {/* Footer */}
      <div className="text-sm text-gray-500 pt-4 border-t">
        Last updated {format(new Date(parseInt(journalData.updatedAt)), "PPP 'at' p")}
      </div>
    </div>
  );
}
