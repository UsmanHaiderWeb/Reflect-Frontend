"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation } from "@tanstack/react-query";
import { deleteJournalMutaion } from "@/lib/graphqlQueries";
import request from "graphql-request";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/ReduxStore/Store";
import { userDataActions } from "@/ReduxStore/Slices/userData.slice";
import ShowToast from "@/lib/ShowToast";

export default function DeleteJournal({ entryId, collectionId }: { entryId: string, collectionId: string }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const token = localStorage.getItem('reflectToken');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation({
    mutationKey: [`deleteJournal ${entryId}`],
    mutationFn: () => request('http://localhost:3000/graphql', deleteJournalMutaion, {
      token,
      collectionId,
      journalEntryId: entryId
    }),
    onError: () => ShowToast("Something went wrong.", 'error'),
    onSuccess: () => {
      ShowToast("The journal has been deleted successfuly.", 'success');
      dispatch(userDataActions.deleteJournalFromCollection({collectionId, journalEntryId: entryId}))
      setDeleteDialogOpen(false);
      navigate('/dashboard', {replace: true});
    },
  })

  const handleDelete = async () => {
    if(!isLoading) mutate();
  };

  return (
    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 size={18} />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            journal entry.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
