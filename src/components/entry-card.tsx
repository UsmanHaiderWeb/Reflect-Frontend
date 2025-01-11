import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Heart } from "lucide-react";
import { JournalEntryInterface } from "@/data/types&Interfaces";
import { Button } from "./ui/button";
import { getMoodObj } from "@/data/moods";
import DeleteJournal from "./DeleteJournal";

const EntryCard = ({ entry, collectionName, collectionId }: { entry: JournalEntryInterface, collectionName: string, collectionId: string }) => {
  const mood = getMoodObj(entry.mood);

  return (
    <Link to={`/journal/${entry._id}`}>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-grow-0">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{mood?.emoji}</span>
                <h3 className="font-semibold text-lg">{entry.title}</h3>
              </div>
              {/* <p className="text-gray-600 line-clamp-2">{ entry.createdAt }&nbsp;{ entry.createdAt }&nbsp;{ entry.createdAt }&nbsp;{ entry.createdAt }&nbsp;{ entry.createdAt }&nbsp;{ entry.createdAt }&nbsp;{ entry.createdAt }&nbsp;</p> */}
            </div>
            {/* dangerouslySetInnerHTML={{ __html: entry.description }} */}
            <time className="text-sm text-gray-500 flex-shrink-0">
              {format(new Date(parseInt(entry.createdAt)), "MMM d, yyyy")}
            </time>
          </div>
          <div className="mt-4 flex items-center justify-between gap-2">
            <span className="text-sm px-2 py-1 bg-orange-100 text-orange-800 rounded">
              {collectionName}
            </span>
            {/* <DeleteJournal entryId={entry._id} collectionId={collectionId} /> */}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EntryCard;
