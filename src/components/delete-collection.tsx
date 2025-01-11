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
import { collectionsInterface } from "@/data/types&Interfaces";
import { useMutation } from "@tanstack/react-query";
import request from "graphql-request";
import { deleteCollectionMutaion } from "@/lib/graphqlQueries";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/ReduxStore/Store";
import { userDataActions } from "@/ReduxStore/Slices/userData.slice";
import { useNavigate } from "react-router-dom";
import ShowToast from "@/lib/ShowToast";

export default function DeleteCollectionDialog({ collection }: { collection: collectionsInterface }) {
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem('reflectToken');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation({
    mutationKey: ['deleteCollection', collection._id],
    mutationFn: () => request('http://localhost:3000/graphql', deleteCollectionMutaion, {
      token,
      collectionId: collection._id
    }),
    onError: () => ShowToast("Something went wrong. Please try again.", 'error'),
    onSuccess: (data: any) => {
      console.log("Result deleting collection: ", data);
      dispatch(userDataActions.deleteCollection({collectionId: collection._id}))
      ShowToast("Successfuly deleted the collection.", 'success');
      setOpen(false);
      navigate('/dashboard', {replace: true});
    },
  })

  const handleDelete = async () => {;
    if(!isLoading) mutate();
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm" className='border-none pr-4'>
          <Trash2 size={16} />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete &quot;{collection.title}&quot;?
          </AlertDialogTitle>
          <AlertDialogDescription className="hidden">{collection.title}</AlertDialogDescription>
          <div className="space-y-2 text-muted-foreground text-sm">
            {/* fixing hydration errors */}
            <p>This will permanently delete:</p>
            <ul className="list-disc list-inside">
              <li>The collection &quot;{collection.title}&quot;</li>
              <li>
                {collection.journalEntries?.length} journal{" "}
                {collection.journalEntries?.length === 1 ? "entry" : "entries"}
              </li>
            </ul>
            <p className="font-semibold text-red-600">
              This action cannot be undone.
            </p>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={() => handleDelete()} disabled={isLoading} className="bg-red-500 hover:bg-red-600">
            {isLoading ? "Deleting..." : "Delete Collection"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
