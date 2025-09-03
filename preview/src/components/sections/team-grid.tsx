"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { Card } from "@/components/ui/card";
import { BLUR_FADE_DELAY } from "@/lib/config";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Twitter, Mail } from "lucide-react";
import Image from "next/image";

const teamMembers = [
  {
    name: "Sarah Chen",
    role: "Creative Director",
    bio: "Former HBO documentary producer with 12+ years creating compelling visual narratives. Specializes in transforming complex information into engaging video content.",
    image: "/author.jpg", // Using existing placeholder
    expertise: ["Video Production", "Storytelling", "Animation"],
    social: {
      linkedin: "https://linkedin.com/in/sarahchen",
      twitter: "https://twitter.com/sarahchen",
      email: "sarah@mojosolo.com",
    },
  },
  {
    name: "Marcus Rodriguez",
    role: "Benefits Strategy Lead",
    bio: "Former HR executive at Fortune 500 companies. Expert in employee benefits communication and engagement strategies that drive real results.",
    image: "/author.jpg", // Using existing placeholder
    expertise: ["Benefits Strategy", "HR Communications", "Employee Engagement"],
    social: {
      linkedin: "https://linkedin.com/in/marcusrodriguez",
      email: "marcus@mojosolo.com",
    },
  },
  {
    name: "Jessica Park",
    role: "Animation Director",
    bio: "Award-winning motion graphics designer from Pixar. Creates beautiful animations that make complex benefits information visually compelling and memorable.",
    image: "/author.jpg", // Using existing placeholder
    expertise: ["Motion Graphics", "3D Animation", "Visual Design"],
    social: {
      linkedin: "https://linkedin.com/in/jessicapark",
      twitter: "https://twitter.com/jessicapark",
      email: "jessica@mojosolo.com",
    },
  },
  {
    name: "David Kim",
    role: "Technology Director",
    bio: "Full-stack developer and video technology expert. Builds custom microsites and interactive tools that complement our video content perfectly.",
    image: "/author.jpg", // Using existing placeholder
    expertise: ["Web Development", "Interactive Media", "Video Technology"],
    social: {
      linkedin: "https://linkedin.com/in/davidkim",
      email: "david@mojosolo.com",
    },
  },
  {
    name: "Amanda Wright",
    role: "Client Success Manager",
    bio: "Dedicated to ensuring every client gets maximum value from their benefits videos. Manages timelines, coordinates reviews, and drives project success.",
    image: "/author.jpg", // Using existing placeholder
    expertise: ["Project Management", "Client Relations", "Process Optimization"],
    social: {
      linkedin: "https://linkedin.com/in/amandawright",
      email: "amanda@mojosolo.com",
    },
  },
  {
    name: "Tom Mitchell",
    role: "Voice & Audio Specialist",
    bio: "Professional voice actor and audio engineer. Creates clear, engaging narration and pristine audio that makes every video sound professionally polished.",
    image: "/author.jpg", // Using existing placeholder
    expertise: ["Voice Acting", "Audio Engineering", "Sound Design"],
    social: {
      linkedin: "https://linkedin.com/in/tommitchell",
      email: "tom@mojosolo.com",
    },
  },
];

export default function TeamGrid() {
  return (
    <section className="py-24 lg:py-32 bg-gray-50/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-oklch(240.325 30% 70%)/10 border border-oklch(240.325 30% 70%)/20 mb-6">
              <span className="text-sm font-medium text-oklch(240.325 100% 35%)">
                Our Team
              </span>
            </div>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Meet the Experts Behind Your
              <span className="block text-oklch(240.325 100% 50%)">
                Benefits Videos
              </span>
            </h2>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <p className="text-xl text-gray-600 leading-relaxed">
              Our diverse team combines video production expertise with deep benefits knowledge 
              to create content that truly resonates with your employees.
            </p>
          </BlurFade>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {teamMembers.map((member, index) => (
            <BlurFade key={member.name} delay={BLUR_FADE_DELAY * (4 + index * 0.5)}>
              <Card className="group p-6 h-full bg-white hover:shadow-xl transition-shadow duration-300 border-0 shadow-sm">
                {/* Profile Image */}
                <div className="relative mb-6 flex justify-center">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-oklch(240.325 100% 50%)/10 group-hover:ring-oklch(240.325 100% 50%)/20 transition-colors duration-300">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Member Info */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-oklch(240.325 100% 50%) font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>
                </div>

                {/* Expertise Tags */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {member.expertise.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="secondary"
                      className="bg-oklch(240.325 100% 50%)/5 text-oklch(240.325 100% 40%) hover:bg-oklch(240.325 100% 50%)/10 text-xs"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex justify-center space-x-3">
                  {member.social.linkedin && (
                    <a 
                      href={member.social.linkedin}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-oklch(240.325 100% 50%) hover:text-white transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a 
                      href={member.social.twitter}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-oklch(240.325 100% 50%) hover:text-white transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                  )}
                  <a 
                    href={`mailto:${member.social.email}`}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-oklch(240.325 100% 50%) hover:text-white transition-colors duration-300"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </Card>
            </BlurFade>
          ))}
        </div>

        {/* Bottom CTA */}
        <BlurFade delay={BLUR_FADE_DELAY * 10}>
          <div className="text-center mt-16 p-8 bg-gradient-to-r from-oklch(240.325 100% 50%)/5 to-oklch(240.325 100% 60%)/5 rounded-2xl border border-oklch(240.325 100% 50%)/10">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Work Together?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our team is excited to learn about your benefits communication challenges 
              and create videos that truly engage your employees.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 45%) text-white font-medium rounded-lg transition-colors duration-300">
                Start Your Project
              </button>
              <button className="px-6 py-3 border border-oklch(240.325 100% 50%) text-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 50%)/5 font-medium rounded-lg transition-colors duration-300">
                Schedule a Call
              </button>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}