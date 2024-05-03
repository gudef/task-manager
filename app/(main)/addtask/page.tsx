"use client";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { todoSchema } from "@/actions/todo-schema";
import { z } from "zod";
import { addTask } from "@/actions/todo-action";
import Link from "next/link";
import { useTransition } from "react";
import { useToast } from "@/components/ui/use-toast"


const AddTaskPage = () => {
    const { toast } = useToast()
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof todoSchema>>({
        resolver: zodResolver(todoSchema),
        defaultValues: {
            text: "",
        },
    })

    const onSubmit = (values: z.infer<typeof todoSchema>) => {

        startTransition(() => {
            addTask(values)
                .then((success) => {
                    console.log(success);
                    toast({
                        title: "AddTask Success",
                      });
                })
                .then((error) => {
                    console.log(error);

                })
            form.reset({ text: ""});
        });
    }

    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <div className="p-10 border-2 border-purple-300">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            disabled={isPending}
                            control={form.control}
                            name="text"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your Task</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your task" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your task tag.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
            <div className="mt-10 flex flex-col items-center justify-center">
                <Button asChild className="w-30">
                    <Link href="/task">
                        Go to Task table
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export default AddTaskPage