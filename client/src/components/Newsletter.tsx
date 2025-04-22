import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof formSchema>;

const Newsletter: React.FC = () => {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: FormValues) {
    toast({
      title: "Subscribed!",
      description: "You will now receive our latest offers via email.",
    });
    form.reset();
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-[#4361EE] rounded-2xl p-8 md:p-12 text-center">
          <h2 className="font-bold text-3xl md:text-4xl text-white mb-4">
            Stay Updated with the Latest Offers
          </h2>
          <p className="text-white opacity-90 max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter and be the first to know about exclusive deals and promotions
          </p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="Enter your email address" 
                        className="px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-left text-white text-sm mt-1" />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="bg-[#FF9933] text-white font-medium px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors h-12"
              >
                Subscribe
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
