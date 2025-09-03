import { notFound } from "next/navigation";
import BlurFade from "@/components/magicui/blur-fade";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BLUR_FADE_DELAY } from "@/lib/config";
import { caseStudies } from "@/lib/case-studies";
import CaseStudyCard from "@/components/ui/case-study-card";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import CTA from "@/components/sections/cta";
import { 
  Building2, 
  Clock, 
  Users, 
  TrendingUp, 
  CheckCircle,
  Target,
  PlayCircle,
  Quote,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Award,
  BarChart3
} from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";
import { constructMetadata } from "@/lib/utils";

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.id,
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = caseStudies.find(study => study.id === slug);
  
  if (!caseStudy) {
    return constructMetadata({
      title: "Case Study Not Found",
      description: "The case study you're looking for could not be found.",
    });
  }

  return constructMetadata({
    title: `${caseStudy.title} - Case Study`,
    description: `${caseStudy.challenge.slice(0, 150)}...`,
    keywords: [
      "benefits video case study",
      caseStudy.industry.toLowerCase(),
      "employee engagement",
      "benefits communication",
      "video production results"
    ],
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = caseStudies.find(study => study.id === slug);
  
  if (!caseStudy) {
    notFound();
  }

  // Get related case studies (same industry or similar company size)
  const relatedCaseStudies = caseStudies
    .filter(study => 
      study.id !== caseStudy.id && 
      (study.industry === caseStudy.industry || study.companySize === caseStudy.companySize)
    )
    .slice(0, 2);

  const metrics = [
    {
      label: "Engagement Increase",
      value: caseStudy.results.engagement,
      icon: <TrendingUp className="h-5 w-5" />,
      color: "green"
    },
    {
      label: "Enrollment Impact", 
      value: caseStudy.results.enrollment,
      icon: <Users className="h-5 w-5" />,
      color: "blue"
    },
    {
      label: "ROI Achievement",
      value: caseStudy.results.roi,
      icon: <BarChart3 className="h-5 w-5" />,
      color: "purple"
    },
    {
      label: "Employee Satisfaction",
      value: caseStudy.results.satisfaction,
      icon: <Award className="h-5 w-5" />,
      color: "orange"
    }
  ];

  return (
    <main>
      <Header />
      
      <article className="py-24 lg:py-32">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="mb-8">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900 p-0">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <a href="/case-studies">Back to Case Studies</a>
              </Button>
            </div>
          </BlurFade>

          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <div className="flex items-center justify-center gap-2 mb-6">
                {caseStudy.featured && (
                  <Badge className="bg-orange-100 text-orange-800">
                    Featured Case Study
                  </Badge>
                )}
                <Badge variant="secondary" className="bg-oklch(240.325 100% 50%)/5 text-oklch(240.325 100% 40%)">
                  {caseStudy.industry}
                </Badge>
                <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                  {caseStudy.companySize} Company
                </Badge>
              </div>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                {caseStudy.title}
              </h1>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <p className="text-2xl text-oklch(240.325 100% 50%) font-medium mb-8">
                {caseStudy.client}
              </p>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
                <div className="text-center">
                  <Building2 className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                  <div className="text-lg font-semibold text-gray-900">{caseStudy.employeeCount}</div>
                  <div className="text-sm text-gray-600">Employees</div>
                </div>
                <div className="text-center">
                  <Clock className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                  <div className="text-lg font-semibold text-gray-900">{caseStudy.timeline}</div>
                  <div className="text-sm text-gray-600">Project Timeline</div>
                </div>
                <div className="text-center">
                  <Calendar className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                  <div className="text-lg font-semibold text-gray-900">
                    {new Date(caseStudy.dateCompleted).toLocaleDateString('en-US', { 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
              </div>
            </BlurFade>
          </div>

          {/* Video Preview */}
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <div className="max-w-4xl mx-auto mb-16">
              <div className="aspect-video bg-gradient-to-br from-oklch(240.325 100% 50%) to-oklch(240.325 100% 40%) rounded-xl overflow-hidden group cursor-pointer relative">
                <Image
                  src={caseStudy.videoThumbnail}
                  alt={`${caseStudy.title} video preview`}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-90 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-black/30"></div>
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-white/90 hover:bg-white transition-colors duration-300 rounded-full p-6 shadow-2xl group-hover:scale-110 transform duration-300">
                    <PlayCircle className="h-12 w-12 text-oklch(240.325 100% 50%)" />
                  </button>
                </div>

                {/* Video Label */}
                <div className="absolute top-6 left-6">
                  <Badge className="bg-white/90 text-gray-900">
                    Case Study Video Preview
                  </Badge>
                </div>
              </div>
            </div>
          </BlurFade>

          {/* Main Content */}
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Content Column */}
              <div className="lg:col-span-2 space-y-12">
                
                {/* Challenge Section */}
                <BlurFade delay={BLUR_FADE_DELAY * 7}>
                  <Card className="p-8 border-l-4 border-l-red-500">
                    <div className="flex items-center gap-3 mb-4">
                      <Target className="h-6 w-6 text-red-500" />
                      <h2 className="text-2xl font-bold text-gray-900">The Challenge</h2>
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {caseStudy.challenge}
                    </p>
                  </Card>
                </BlurFade>

                {/* Solution Section */}
                <BlurFade delay={BLUR_FADE_DELAY * 8}>
                  <Card className="p-8 border-l-4 border-l-blue-500">
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle className="h-6 w-6 text-blue-500" />
                      <h2 className="text-2xl font-bold text-gray-900">Our Solution</h2>
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                      {caseStudy.solution}
                    </p>
                    
                    {/* Services Used */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Services Delivered:</h3>
                      <div className="flex flex-wrap gap-2">
                        {caseStudy.services.map((service, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary"
                            className="bg-blue-50 text-blue-700 border border-blue-200"
                          >
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                </BlurFade>

                {/* Implementation Section */}
                <BlurFade delay={BLUR_FADE_DELAY * 9}>
                  <Card className="p-8 border-l-4 border-l-green-500">
                    <div className="flex items-center gap-3 mb-4">
                      <PlayCircle className="h-6 w-6 text-green-500" />
                      <h2 className="text-2xl font-bold text-gray-900">Implementation</h2>
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {caseStudy.implementation}
                    </p>
                  </Card>
                </BlurFade>

                {/* Before & After */}
                <BlurFade delay={BLUR_FADE_DELAY * 10}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-6 bg-red-50 border border-red-100">
                      <h3 className="font-semibold text-red-800 mb-3">Before Our Solution</h3>
                      <p className="text-red-700 text-sm">
                        {caseStudy.beforeAfter.before}
                      </p>
                    </Card>
                    <Card className="p-6 bg-green-50 border border-green-100">
                      <h3 className="font-semibold text-green-800 mb-3">After Implementation</h3>
                      <p className="text-green-700 text-sm">
                        {caseStudy.beforeAfter.after}
                      </p>
                    </Card>
                  </div>
                </BlurFade>

                {/* Client Testimonial */}
                <BlurFade delay={BLUR_FADE_DELAY * 11}>
                  <Card className="p-8 bg-gradient-to-r from-oklch(240.325 100% 50%)/5 to-oklch(240.325 100% 60%)/5 border border-oklch(240.325 100% 50%)/10">
                    <Quote className="h-8 w-8 text-oklch(240.325 100% 50%) mb-4" />
                    <blockquote className="text-xl text-gray-700 mb-6 leading-relaxed italic">
                      "{caseStudy.quote}"
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-oklch(240.325 100% 50%)/20 rounded-full flex items-center justify-center">
                        <div className="w-10 h-10 bg-oklch(240.325 100% 50%) rounded-full"></div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-lg">{caseStudy.quotePerson}</div>
                        <div className="text-gray-600">{caseStudy.quoteTitle}</div>
                        <div className="text-gray-600 font-medium">{caseStudy.client}</div>
                      </div>
                    </div>
                  </Card>
                </BlurFade>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-8">
                  
                  {/* Results Metrics */}
                  <BlurFade delay={BLUR_FADE_DELAY * 7}>
                    <Card className="p-6">
                      <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-oklch(240.325 100% 50%)" />
                        Key Results
                      </h3>
                      
                      <div className="space-y-4">
                        {metrics.map((metric, index) => (
                          <div key={index} className={`p-4 rounded-lg border ${
                            metric.color === 'green' ? 'bg-green-50 border-green-100' :
                            metric.color === 'blue' ? 'bg-blue-50 border-blue-100' :
                            metric.color === 'purple' ? 'bg-purple-50 border-purple-100' :
                            'bg-orange-50 border-orange-100'
                          }`}>
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`${
                                metric.color === 'green' ? 'text-green-600' :
                                metric.color === 'blue' ? 'text-blue-600' :
                                metric.color === 'purple' ? 'text-purple-600' :
                                'text-orange-600'
                              }`}>
                                {metric.icon}
                              </div>
                              <span className={`text-sm font-medium ${
                                metric.color === 'green' ? 'text-green-700' :
                                metric.color === 'blue' ? 'text-blue-700' :
                                metric.color === 'purple' ? 'text-purple-700' :
                                'text-orange-700'
                              }`}>
                                {metric.label}
                              </span>
                            </div>
                            <div className={`text-2xl font-bold ${
                              metric.color === 'green' ? 'text-green-600' :
                              metric.color === 'blue' ? 'text-blue-600' :
                              metric.color === 'purple' ? 'text-purple-600' :
                              'text-orange-600'
                            }`}>
                              {metric.value}
                            </div>
                          </div>
                        ))}
                        
                        {caseStudy.results.additional && (
                          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <div className="text-sm font-medium text-gray-700 mb-1">
                              Additional Impact
                            </div>
                            <div className="text-sm text-gray-600">
                              {caseStudy.results.additional}
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  </BlurFade>

                  {/* Tags */}
                  <BlurFade delay={BLUR_FADE_DELAY * 8}>
                    <Card className="p-6">
                      <h3 className="font-bold text-gray-900 mb-4">Project Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {caseStudy.tags.map((tag, index) => (
                          <Badge 
                            key={index} 
                            className="bg-oklch(240.325 100% 50%)/10 text-oklch(240.325 100% 50%) border border-oklch(240.325 100% 50%)/20"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  </BlurFade>

                  {/* CTA */}
                  <BlurFade delay={BLUR_FADE_DELAY * 9}>
                    <Card className="p-6 bg-oklch(240.325 100% 50%)/5 border border-oklch(240.325 100% 50%)/20">
                      <h3 className="font-bold text-gray-900 mb-2">Similar Project?</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Get a custom quote for your {caseStudy.industry.toLowerCase()} organization.
                      </p>
                      <Button 
                        size="sm"
                        className="w-full bg-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 45%) text-white"
                      >
                        Request Quote
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </Card>
                  </BlurFade>
                </div>
              </div>
            </div>
          </div>

          {/* Related Case Studies */}
          {relatedCaseStudies.length > 0 && (
            <div className="mt-20">
              <BlurFade delay={BLUR_FADE_DELAY * 12}>
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Related Case Studies
                  </h2>
                  <p className="text-lg text-gray-600">
                    Similar projects in {caseStudy.industry.toLowerCase()} and {caseStudy.companySize.toLowerCase()} companies
                  </p>
                </div>
              </BlurFade>

              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {relatedCaseStudies.map((study, index) => (
                  <BlurFade key={study.id} delay={BLUR_FADE_DELAY * (13 + index)}>
                    <div className="transform hover:scale-105 transition-transform duration-300">
                      <CaseStudyCard caseStudy={study} />
                    </div>
                  </BlurFade>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <CTA />
      <Footer />
    </main>
  );
}