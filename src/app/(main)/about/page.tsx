"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/atoms/breadcrumb";
import { Card, CardContent } from "@/components/atoms/card";
import { Separator } from "@/components/atoms/separator";

const values = [
  {
    title: "Artisan First",
    description:
      "Every piece tells a story. We partner directly with skilled artisans, ensuring fair wages and dignified livelihoods across the Islamic world.",
  },
  {
    title: "Heritage Preservation",
    description:
      "We are committed to keeping centuries-old crafts alive, supporting master artisans in passing their knowledge to the next generation.",
  },
  {
    title: "Ethical Sourcing",
    description:
      "Transparency and integrity guide everything we do. From raw materials to final delivery, every step meets our rigorous ethical standards.",
  },
  {
    title: "Community Impact",
    description:
      "A portion of every sale funds educational initiatives and workshop development in artisan communities across the globe.",
  },
];

const team = [
  { name: "Ahmad Hassan", role: "Founder & CEO" },
  { name: "Fatima Al-Rashid", role: "Head of Artisan Relations" },
  { name: "Omar Khalil", role: "Creative Director" },
  { name: "Yasmin Ibrahim", role: "Head of Operations" },
];

export default function AboutPage() {
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
              <BreadcrumbPage>About</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">
              Our Story
            </p>
            <h1 className="text-4xl font-bold font-heading tracking-tight sm:text-5xl lg:text-6xl">
              Rooted in Heritage,{"\n"}Built for the World
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              We are a bridge between the master artisans of the Islamic world
              and those who appreciate the beauty of handcrafted heritage. Each
              piece in our collection is a testament to centuries of skill,
              patience, and devotion.
            </p>
          </div>
        </section>

        <Separator className="mb-16" />

        {/* Mission */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">
              Mission
            </p>
            <h2 className="text-3xl font-bold font-heading tracking-tight lg:text-4xl">
              Preserving Craft, Empowering Communities
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Our mission is to create sustainable economic opportunities for
              artisan communities while delivering authentic, handcrafted goods
              to customers worldwide. We believe that preserving traditional
              crafts is not just about products — it is about protecting
              cultural identity and human dignity.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 lg:py-24">
          <div className="text-center mb-16">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">
              Values
            </p>
            <h2 className="text-3xl font-bold font-heading tracking-tight lg:text-4xl">
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title} className="rounded-none">
                <CardContent className="p-6">
                  <h3 className="text-base font-bold font-heading mb-3">
                    {value.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-16" />

        {/* Team */}
        <section className="py-16 lg:py-24">
          <div className="text-center mb-16">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">
              Team
            </p>
            <h2 className="text-3xl font-bold font-heading tracking-tight lg:text-4xl">
              The People Behind the Mission
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <Card key={member.name} className="rounded-none text-center">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 size-20 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-2xl font-bold font-heading text-muted-foreground">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold font-heading">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                    {member.role}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
