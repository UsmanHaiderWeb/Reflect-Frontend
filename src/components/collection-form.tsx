'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { collectionSchema } from '@/data/zodSchemas'
import * as reactSpinners from "react-spinners";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import type { z } from "zod";
import FormFieldError from "./FormFieldError";
import { useMutation } from "@tanstack/react-query";
import { createCollection } from "@/lib/axios-calls";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/ReduxStore/Store";
import { userDataActions } from "@/ReduxStore/Slices/userData.slice";
import { collectionsInterface } from "@/data/types&Interfaces";
import { nameParseDateIntoMilliSeconds } from "@/lib/ParseDateIntoMilliSeconds";
import ShowToast from "@/lib/ShowToast";

const CollectionForm = ({ open, setOpen }: { open: boolean, setOpen: any }) => {
  let token = localStorage.getItem('reflectToken') || ''
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit, formState: { errors }, reset, setError } = useForm({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { isLoading, mutate } = useMutation({
    mutationKey: ['createCollection'],
    mutationFn: createCollection,
    onError: () => {
      setError('root', {message: 'Something went wrong.'});
      ShowToast("Something went wrong.", 'error');
      ShowToast("This collection name might have already been taken.", 'info');
    },
    onSuccess: (data: {collection: collectionsInterface, message: string}) => {
      ShowToast("Collection has been created successfully.", 'success');
      let createdAt_InMs = data.collection.createdAt && nameParseDateIntoMilliSeconds(data.collection.createdAt) || 0;
      dispatch(userDataActions.addCollection({...data.collection, createdAt: createdAt_InMs.toString()}));
      setOpen(false)
      reset();
    }
  })

  const onSubmit = async (data: z.infer<typeof collectionSchema>) => {
    if(!isLoading) mutate({ description: data.description, title: data.name, token })
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create New Collection</AlertDialogTitle>
          <AlertDialogDescription className='hidden'>Description</AlertDialogDescription>
        </AlertDialogHeader>
        {isLoading && (
          <reactSpinners.BarLoader className="mb-4" width={"100%"} color="orange" />
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-3 space-y-2'>
            <label className="text-sm font-medium">Collection Name</label>
            <Input
              {...register("name")}
              minLength={5}
              placeholder="Enter collection name..."
              className='text-[14px]'
            />
            <FormFieldError message={errors.name?.message || ''} />
          </div>

          <div className="space-y-2 mb-5">
            <label className="text-sm font-medium">
              Description
            </label>
            <textarea
              {...register("description")}
              placeholder="Describe your collection..."
              minLength={20}
              className="w-full py-2 px-3 text-[14px] border-black border-[2px] border-solid border-opacity-20 focus:border-opacity-100 rounded-md outline-none h-36 resize-none"
            ></textarea>
            <FormFieldError message={errors.description?.message || ''} />
            <FormFieldError message={errors.root?.message || ''} />
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" onClick={() => setOpen(false)} disabled={isLoading}>Cancel</Button>
            <Button type="submit" variant="journal" disabled={isLoading} className="outline-none border-none">{isLoading ? 'Creating' : 'Create Collection'}</Button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CollectionForm;