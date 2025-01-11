import { JournalEntryInterface } from "@/data/types&Interfaces";
import JournalEntryPage from "@/pages/createJournal"
import { useOutletContext } from "react-router-dom";

const SingleJournalEditPageWrapper = () => {
  const { journalData, refetch } = useOutletContext<{journalData: JournalEntryInterface, refetch: any}>();

  if(!journalData) return <></>

  return (
    <JournalEntryPage journalData={journalData} refetchJournalData={refetch} isEditable={true} />
  )
}

export default SingleJournalEditPageWrapper