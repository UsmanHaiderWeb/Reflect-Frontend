import { JournalEntryInterface } from "@/data/types&Interfaces";
import { differenceInDays, isAfter, isSameDay, subDays } from "date-fns";

export function filterJournalsForAnalytics (days: number, journalEntries: JournalEntryInterface[], userCreatedAt: string) {
    const now = new Date(); // Current date
    const cutoffDate = subDays(now, days); // Date 'days' ago
    
    let analyticData: any = {};

    // Filter pins that are after the cutoff date
    let filteredJournals = journalEntries.filter((journal: JournalEntryInterface) => {
        const journalCreationDate = new Date(parseInt(journal.createdAt));
        return isAfter(journalCreationDate, cutoffDate) || isSameDay(journalCreationDate, cutoffDate);
    });
    
    const userCreatedDate = new Date(parseInt(userCreatedAt));
    let userCreatedN_DaysAgo = differenceInDays(now, userCreatedDate)
    let objValueLength = (days <= userCreatedN_DaysAgo) ? days : userCreatedN_DaysAgo;
    
    for (let i = 0; i < (objValueLength == 0 ? 1 : objValueLength); i++) {
        filteredJournals.forEach((journal: JournalEntryInterface) => {
            const newDate = (i == 0 ? new Date() : subDays(now, i)); // Date 'days' ago
            const isCreatedSameOnDate = isSameDay(new Date(parseInt(journal.createdAt)), newDate)
            console.log("isCreatedSameOnDate: ", isCreatedSameOnDate);
            if(isCreatedSameOnDate) {
                analyticData[i] = {date: newDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), journalEntry: (analyticData[i]?.journalEntry ? analyticData[i]?.journalEntry + 1 : 1)};
            } else {
                if(analyticData[i]?.journalEntry == undefined){
                    analyticData[i] = {date: newDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), journalEntry: 0};
                }
            }
        })
    }

    let sortedAnalyticData: any = Object.values(analyticData);
    sortedAnalyticData = sortedAnalyticData.reverse();
    console.log("sortedAnalyticData: ", sortedAnalyticData);

    const isUserCreatedSameToday = isSameDay(userCreatedDate, now);
    const newDate = (objValueLength == 0 ? new Date() : subDays(now, objValueLength)); // Date 'days' ago
    
    return [{date: isUserCreatedSameToday ? '' : newDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), journalEntry: 0}, ...sortedAnalyticData];
}