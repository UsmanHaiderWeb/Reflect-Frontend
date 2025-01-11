import SingleJournal from '@/pages/SingleJournal'
import { useOutletContext } from 'react-router-dom'
import { JournalEntryInterface } from '@/data/types&Interfaces'

const SingleJournalShowPage = () => {
  const { journalData } = useOutletContext<{journalData: JournalEntryInterface}>();

  return (
    <SingleJournal journalData={journalData} />
  )
}

export default SingleJournalShowPage