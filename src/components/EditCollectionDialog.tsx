"use client";

import { useState } from "react";
import { Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { collectionsInterface } from "@/data/types&Interfaces";
import { useMutation } from "@tanstack/react-query";
import { updateCollectionFn } from "@/lib/axios-calls";
import type { z } from "zod";
import FormFieldError from "./FormFieldError";
import { collectionSchema } from '@/data/zodSchemas'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as reactSpinners from "react-spinners";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/ReduxStore/Store";
import { userDataActions } from "@/ReduxStore/Slices/userData.slice";
import { Input } from "./ui/input";
import { toast } from "sonner";
import ShowToast from "@/lib/ShowToast";

export default function EditCollectionDialog({ collection }: { collection: collectionsInterface }) {
    const [open, setOpen] = useState(false);
    const token = localStorage.getItem('reflectToken');
    const dispatch = useDispatch<AppDispatch>();

    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        resolver: zodResolver(collectionSchema),
        defaultValues: {
            name: collection.title,
            description: collection.description,
        },
    });

    const { isLoading, mutate } = useMutation({
        mutationKey: ['updateCollection', collection._id],
        mutationFn: updateCollectionFn,
        onError: (error: any) => {
            setError('root', {message: 'Something went wrong.'});
            ShowToast("Something went wrong.", 'error');
            ShowToast("This collection name might have already been taken.", 'info');
        },
        onSuccess: (data: any) => {
            console.log("Result updating collection: ", data);
            ShowToast("Collection has been updated successfully.", 'success');
            dispatch(userDataActions.updateCollection(data.collection))
            setOpen(false);
        },
    })

    const submitForm = async (data: z.infer<typeof collectionSchema>) => {
        if(!isLoading && token) mutate({ description: data.description, title: data.name, token, collectionId: collection._id })
    };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
            <Button variant="journal" size="sm" className='border-none pr-4'>
                <Pen size={16} />Edit
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Edit &quot;{collection.title}&quot;?
                </AlertDialogTitle>
                <AlertDialogDescription className="hidden">{collection.title}</AlertDialogDescription>
            </AlertDialogHeader>
            {isLoading && (
                <reactSpinners.BarLoader className="mb-4" width={"100%"} color="orange" />
            )}

            <form onSubmit={handleSubmit(submitForm)}>
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
                    <label className="text-sm font-medium">Description</label>
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
                    <Button type="submit" variant="journal" disabled={isLoading} className="outline-none border-none">{isLoading ? 'Updating' : 'Update Collection'}</Button>
                </div>
            </form>
        </AlertDialogContent>
    </AlertDialog>
  );
}
