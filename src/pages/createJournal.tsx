'use client'

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Loader2 } from "lucide-react";
import * as reactSpinners from "react-spinners";
import { toast } from "sonner";
import CollectionForm from "../components/collection-form";
import FormFieldError from "../components/FormFieldError";
import { journalSchema } from '@/data/zodSchemas'
import { MoodType, MOODS } from '@/data/moods'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useMutation } from "@tanstack/react-query";
import { createJournalFn, updateJournalFn } from "@/lib/axios-calls";
import { JournalEntryInterface } from "@/data/types&Interfaces";
import { AppDispatch, StoreType } from "@/ReduxStore/Store";
import { userDataActions, userDataType } from "@/ReduxStore/Slices/userData.slice";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { nameParseDateIntoMilliSeconds } from "@/lib/ParseDateIntoMilliSeconds";
import SaveAsDraftBtn from "@/components/SaveAsDraftBtn";
import ShowToast from "@/lib/ShowToast";

export default function JournalEntryPage({journalData = undefined, refetchJournalData, isEditable = false}: {journalData?: JournalEntryInterface | undefined, refetchJournalData?: any, isEditable?: boolean}) {
  const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector((state: StoreType) => state.userData) as userDataType;
  const token = localStorage.getItem('reflectToken')
  const draftStorageData = localStorage.getItem('draft');
  const draftValues = draftStorageData && JSON.parse(draftStorageData);

  const { register, handleSubmit, control, reset, formState: { errors, isDirty }, getValues } = useForm({
    defaultValues: {
      title: isEditable ? (journalData?.title || '') : (draftValues?.title || ""),
      mood: isEditable ? (journalData?.mood || '') : (draftValues?.mood || ""),
      content: isEditable ? (journalData?.content || '') : (draftValues?.content || ""),
      collectionId: isEditable ? (journalData?.collection?._id || '') : (draftValues?.collectionId || ""),
    },
    resolver: zodResolver(journalSchema),
  });

  const { isLoading, mutate } = useMutation({
    mutationKey: ['createJournal'],
    mutationFn: createJournalFn,
    onError: () => {
      ShowToast("Something went wrong.", 'error');
      ShowToast("This journal title might have already been taken.", 'info');
    },
    onSuccess: (data: {journalEntry: JournalEntryInterface, message: string}) => {
      localStorage.setItem('draft', '');
      reset();
      ShowToast("Successfuly created the journal entry.", 'success');
      const collectionId = data.journalEntry.collection.toString();
      const createdAt_InMs = nameParseDateIntoMilliSeconds(data.journalEntry.createdAt);
      dispatch(userDataActions.addJournalToCollection({collectionId, journal: {...data.journalEntry, createdAt: createdAt_InMs.toString()}}));
    }
  })
  
  const editMutaion = useMutation({
    mutationKey: ['createJournal'],
    mutationFn: updateJournalFn,
    onError: (error: any) => {
      ShowToast("Something went wrong.", 'error');
      ShowToast("This journal title might have already been taken.", 'info');
    },
    onSuccess: (data: {journalEntry: JournalEntryInterface, message: string}) => {
      ShowToast("The journal has successfuly been updated .", 'success');
      const createdAt_InMs = nameParseDateIntoMilliSeconds(data.journalEntry.createdAt);
      dispatch(userDataActions.updateJournal({collectionId: (journalData as JournalEntryInterface).collection._id, journal: {...data.journalEntry, createdAt: createdAt_InMs.toString()}}));
      refetchJournalData();
    }
  })

  const submitCreateJournalForm = (data: z.infer<typeof journalSchema>) => {
    if(!isLoading && token && !editMutaion.isLoading) {
      if(journalData){
        return editMutaion.mutate({journalEntryId: journalData._id, title: data.title, content: data.content, mood: data.mood, token});
      }
      mutate({collectionId: data.collectionId, title: data.title, content: data.content, mood: data.mood, token});
    }
  }

  const handleSaveDraft = () => {
    if(!isDirty) return;
    let formValues = getValues();
    if(formValues) {
      localStorage.setItem('draft', JSON.stringify(formValues));
      ShowToast("The journal has been saved successfuly.", 'success');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit(submitCreateJournalForm)} className="space-y-2  mx-auto">
        <h1 className="text-5xl md:text-6xl gradient-title">{journalData ? "Edit The Journal" : "What's on your mind?"}</h1>

        {(isLoading || editMutaion.isLoading) && (
          <reactSpinners.BarLoader className="mb-4" width={"100%"} color="orange" />
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input {...register("title")} placeholder="Give your entry a title..." className='py-5 md:text-md outline-none' />
          <FormFieldError message={errors.title?.message || ''} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">How are you feeling?</label>
          <Controller
            name="mood"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className={errors.mood ? "border-red-500 outline-none" : ""}>
                  <SelectValue placeholder="Select a mood..." />
                </SelectTrigger>
                <SelectContent>
                  {MOODS.map((mood: MoodType) => (
                    <SelectItem key={mood.id} value={mood.id}>
                      <span className="flex items-center gap-2">
                        <span className='text-[20px]'>{mood.emoji}</span> {mood.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FormFieldError message={errors.mood?.message || ''} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Write about your journal
          </label>
          <Controller
            name="content"
            control={control}
            render={({field}) => (
              <ReactQuill
                theme="snow"
                value={field.value}
                onChange={(value) => field.onChange(value)}
                modules={{
                  toolbar: [
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    ['bold', 'italic', 'underline','strike', 'blockquote'],
                    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                    ['link'],
                    ['clean']
                  ],
                }} 
              />
            )}
          />
          <FormFieldError message={errors.content?.message || ''} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Add to Collection (Optional)
          </label>
          <Controller
            name="collectionId"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={(value) => {
                if(value == 'new'){
                  setIsCollectionDialogOpen(true);
                } else field.onChange(value);
              }}>
                <SelectTrigger className="outline-none">
                  <SelectValue placeholder="Choose a collection..." />
                </SelectTrigger>
                <SelectContent>
                  {userData?.collections && <>
                    {[{title: 'new', _id: 'new'}, ...userData?.collections].map((collection) => (
                      <SelectItem value={collection._id} key={collection._id}>
                        <span className="text-orange-600">
                          {collection._id == 'new' ? '+ Create New Collection' : collection.title}
                        </span>
                      </SelectItem>
                    ))}
                  </>}
                </SelectContent>
              </Select>
            )}
          />
          <FormFieldError message={errors.collectionId?.message || ''} />
        </div>

        <div className="gap-x-4 flex">
          {!journalData && (
            <SaveAsDraftBtn handleSaveDraft={handleSaveDraft} />
          )}
          <Button type="submit" variant="journal">
            {(isLoading || editMutaion.isLoading) && <Loader2 className="r-2 h-4 w-4 animate-spin" />}
            {journalData ? (editMutaion.isLoading ? 'Updating' : "Update") : (isLoading ? "Publishing" : "Publish")}
          </Button>
        </div>
        <FormFieldError message={errors.root?.message || ''} />
      </form>

      <CollectionForm
        open={isCollectionDialogOpen}
        setOpen={setIsCollectionDialogOpen}
      />
    </div>
  );
}
