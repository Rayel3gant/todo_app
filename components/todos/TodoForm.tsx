"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { todoFormSchema } from "@/formSchemas/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import { createTodoAction } from "@/actions/todos";
type TodoFormProps = {
  userId: string | null;
};

export const TodoForm = ({ userId }: TodoFormProps) => {
  const form = useForm<z.infer<typeof todoFormSchema>>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      title: "",
      date: new Date(),
    },
  });
  const [open, setOpen] = useState(false);
  async function onSubmit(values: z.infer<typeof todoFormSchema>) {
    if (!userId) {
      return;
    }
    const res = await createTodoAction({
      userId,
      title: values.title,
      date: values.date.toISOString(),
    });
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="visit shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date & Time</FormLabel>
                <div className="flex gap-4">
                  {/* Date picker */}
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-32 justify-between"
                      >
                        {field.value
                          ? field.value.toLocaleDateString()
                          : "Select date"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(selectedDate) => {
                          if (!selectedDate) return;
                          // preserve time if user already picked one
                          const merged = new Date(field.value || new Date());
                          merged.setFullYear(
                            selectedDate.getFullYear(),
                            selectedDate.getMonth(),
                            selectedDate.getDate()
                          );
                          field.onChange(merged);
                          setOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>

                  <Input
                    type="time"
                    step="60"
                    className="w-fit"
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value
                        .split(":")
                        .map(Number);
                      const updated = new Date(field.value || new Date());
                      updated.setHours(hours, minutes);
                      field.onChange(updated);
                    }}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create</Button>
        </form>
      </Form>
    </div>
  );
};
