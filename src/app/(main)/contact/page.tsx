"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/atoms/breadcrumb";
import { Button } from "@/components/atoms/button";
import { Card, CardContent } from "@/components/atoms/card";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { Separator } from "@/components/atoms/separator";
import { Textarea } from "@/components/atoms/textarea";
import { useSubmitContact } from "@/hooks/use-contact";

export default function ContactPage() {
  const submitContact = useSubmitContact();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitContact.mutateAsync({
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        subject: form.subject || undefined,
        message: form.message,
      });
      toast.success("Message sent successfully! We'll get back to you soon.");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Contact</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-12">
          <h1 className="text-3xl font-bold font-heading tracking-tight lg:text-4xl">
            Get in Touch
          </h1>
          <p className="mt-2 text-sm text-muted-foreground uppercase tracking-widest">
            We&apos;d love to hear from you
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            <Card className="rounded-none">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="uppercase tracking-widest text-[10px] font-bold"
                      >
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="uppercase tracking-widest text-[10px] font-bold"
                      >
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        className="h-10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="uppercase tracking-widest text-[10px] font-bold"
                      >
                        Phone{" "}
                        <span className="text-muted-foreground">
                          (optional)
                        </span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="01xxxxxxxxx"
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="subject"
                        className="uppercase tracking-widest text-[10px] font-bold"
                      >
                        Subject{" "}
                        <span className="text-muted-foreground">
                          (optional)
                        </span>
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        className="h-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="uppercase tracking-widest text-[10px] font-bold"
                    >
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us more..."
                      className="min-h-[140px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 text-xs font-bold uppercase tracking-widest"
                    disabled={submitContact.isPending}
                  >
                    {submitContact.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="rounded-none">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="size-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold font-heading mb-1">
                      Address
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      123 Artisan Lane
                      <br />
                      Dhaka, Bangladesh
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-4">
                  <Phone className="size-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold font-heading mb-1">
                      Phone
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      +880 1XXXXXXXXX
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-4">
                  <Mail className="size-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold font-heading mb-1">
                      Email
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      hello@rofaar.com
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-4">
                  <Clock className="size-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold font-heading mb-1">
                      Business Hours
                    </h3>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>Sunday — Thursday: 9:00 AM — 6:00 PM</p>
                      <p>Friday — Saturday: Closed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
