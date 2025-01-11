import { journalDataQuery } from "@/lib/graphqlQueries";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import { Suspense } from "react";
import { Outlet, Params, useParams } from "react-router-dom";
import Loading from "./BarLoader";

const SingleJournalWrapper = () => {
    const { entryId } = useParams<Params>();
    const { data, refetch, isLoading }: any = useQuery({
        queryKey: ['journal Data', entryId],
        queryFn: () => request('http://localhost:3000/graphql', journalDataQuery, {journalEntryId: entryId}),
        staleTime: 10000,
        refetchOnWindowFocus: false
    })

    if(!data) return <Loading />

    return (
        <div className={!isLoading ? "block" : 'hidden'}>
            <Outlet context={{journalData: data.getJournalEntryData, refetch}} />
        </div>
    )
}

export default SingleJournalWrapper