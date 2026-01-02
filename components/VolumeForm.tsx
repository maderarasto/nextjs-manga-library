import React, {forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState} from 'react';
import DefaultVolumeCover from "@/components/DefaultVolumeCover";
import {cn} from "@/lib/utils";
import {FieldPath, useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Collection, Volume} from "@/generated/prisma/client";
import {VolumeState} from "@/generated/prisma/enums";
import {ActionError, createVolume, getCollections, ServerResult, updateVolume} from "@/lib/actions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {volumeSchema, VolumeSchemaType} from "@/lib/schemas";

export interface VolumeFormMethods {
  submit: () => void
  reset: () => void
  isDirty: () => boolean
}

type VolumeFormProps = {
  volume?: Volume
  className?: string
  onSuccess?: () => void
  onError?: (err: Error) => void
}

const VolumeForm = forwardRef<VolumeFormMethods, VolumeFormProps>(({
  volume,
  className,
  onSuccess,
  onError,
}: VolumeFormProps, ref) => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const loadCollections = async () => {
      const collections = await getCollections();
      setCollections(collections);
    }

    loadCollections();
  }, []);

  const form = useForm<VolumeSchemaType>({
    resolver: zodResolver(volumeSchema),
    defaultValues: {
      collectionId: volume?.collectionId ?? 0,
      name: volume?.name ?? '',
      summary: volume?.summary ?? '',
      pages: volume?.pages ?? 0,
      state: VolumeState.RELEASED
    },
  });

  const onSubmit = async (values: VolumeSchemaType) => {
    const {error} = volume ? (
      await updateVolume(volume.id, values)
    ) : (
      await createVolume(values)
    );

    console.log(onSuccess);

    if (!error) {
      onSuccess?.();
    } else {
      form.setError(error.type as FieldPath<VolumeSchemaType>, {
        type: 'custom',
        message: `Error: ${error.message}`,
      });
    }
  }

  useImperativeHandle(ref, () => ({
    submit: async () => {
      await form.handleSubmit(onSubmit)();
    },

    reset: () => {
      form.reset();
    },

    isDirty: () => {
      return form.formState.isDirty;
    }
  }));

  return (
    <div className={cn('p-4 overflow-y-auto', className)}>
      <div className="flex justify-center mb-12">
        <DefaultVolumeCover className="w-32 md:w-48 h-48 md:h-72 text-sm md:text-base" />
      </div>
      <Form {...form}>
        <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="collectionId"
            render={({ field }) => (
              <FormItem className="mb-4 space-y-1">
                <FormLabel>Collection</FormLabel>
                <FormControl>
                  <Select
                    name={field.name}
                    value={field.value.toString()}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select collection..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Collections</SelectLabel>
                        {collections.map((collection) => (
                          <SelectItem key={collection.id} value={collection.id.toString()}>
                            {collection.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-4 space-y-1">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input className="text-sm md:text-base" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem className="mb-4 space-y-1">
                <FormLabel>Summary</FormLabel>
                <FormControl>
                  <Textarea
                    rows={10}
                    className="resize-none text-sm md:text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          <FormField
            control={form.control}
            name="pages"
            render={({ field }) => (
              <FormItem className="mb-4 space-y-1">
                <FormLabel>Pages</FormLabel>
                <FormControl>
                  <Input className="text-sm md:text-base" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="mb-4 space-y-1">
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Select
                    name={field.name}
                    value={field.value.toString()}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full capitalize">
                      <SelectValue className="text-sm md:text-base" placeholder="Select state..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Collections</SelectLabel>
                        {Object.values(VolumeState).map((state) => (
                          <SelectItem key={state} value={state.toString()} className="capitalize">
                            {state.toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
        </form>
      </Form>
    </div>
  );
})

VolumeForm.displayName = "VolumeForm";
export default VolumeForm;