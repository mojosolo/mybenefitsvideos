import Features from "@/components/features-horizontal";
import Section from "@/components/section";
import { Video, Users, Globe, Palette } from "lucide-react";

const data = [
  {
    id: 1,
    title: "Foundation Videos",
    content: "2-minute comprehensive videos explaining your entire benefits package clearly and engagingly.",
    image: "/dashboard.png",
    icon: <Video className="h-6 w-6 text-primary" />,
  },
  {
    id: 2,
    title: "Employee Engagement",
    content: "Increase benefits engagement by 3x with visual storytelling that employees actually watch.",
    image: "/dashboard.png",
    icon: <Users className="h-6 w-6 text-primary" />,
  },
  {
    id: 3,
    title: "Multi-Language Support",
    content: "Reach diverse employee populations with professional translations and voiceovers.",
    image: "/dashboard.png",
    icon: <Globe className="h-6 w-6 text-primary" />,
  },
  {
    id: 4,
    title: "Custom Branding",
    content: "Every video matches your company's visual identity with custom graphics and animations.",
    image: "/dashboard.png",
    icon: <Palette className="h-6 w-6 text-primary" />,
  },
];

export default function Component() {
  return (
    <Section title="Our Services" subtitle="Professional Benefits Video Production">
      <Features collapseDelay={5000} linePosition="bottom" data={data} />
    </Section>
  );
}
