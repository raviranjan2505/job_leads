import RecentJobs from "@/components/home/RecentJobs";
import PostCardSkeleton from "@/components/skeletons/PostCardSkeleton";
import ContainerLayout from "@/layouts/ContainerLayout";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { LuArrowRight } from "react-icons/lu";

export default function Home() {
  return (
    <ContainerLayout>
      {/* Hero Heading */}
      <h1 className="text-3xl lg:text-5xl xl:text-7xl text-center text-gray-200 tracking-wide leading-snug lg:leading-tight xl:leading-tight">
        <span className="font-bold">Welcome to Job Leads!</span> <br />
        <p className="text-3xl">Connecting Talent with the Right Opportunities</p>
      </h1>

      <div className="py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Image */}
          <div className="relative">
            <Image
              src="/images/about1.png"
              alt="Job consultancy services"
              width={600}
              height={600}
              className="rounded-2xl border border-white/10"
            />

            {/* glow */}
            <div className="absolute -inset-4 bg-indigo-500/10 blur-3xl -z-10" />
          </div>

          {/* Content */}
          <div className="max-w-xl">
            <span className="text-sm uppercase tracking-widest text-indigo-400">
              About Job Leads
            </span>

            <h3 className="mt-3 text-2xl lg:text-3xl xl:text-4xl font-semibold tracking-tight text-white">
              Your Trusted Partner in Recruitment & Career Growth
            </h3>

            <p className="mt-6 text-gray-400 leading-relaxed">
              Job Leads is a professional job consultancy and manpower solution
              provider, helping employers find skilled talent and candidates
              secure the right job at the right time. We specialize in matching
              qualified professionals with trusted companies across multiple
              industries.
            </p>

            <div className="mt-10">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-secondary-background border border-white/10 text-gray-200 font-semibold hover:bg-white/10 transition-colors"
              >
                Know More About Us
                <LuArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Jobs */}
      <Suspense fallback={<PostCardSkeleton />}>
        <RecentJobs />
      </Suspense>

      {/* How It Works Section */}
      <div className="py-16 lg:py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            How Job Leads Works
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A simple and transparent process to connect you with your perfect job opportunity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="bg-secondary-background border border-white/10 rounded-xl p-6 text-center hover:border-indigo-500/50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center mx-auto mb-4 text-xl font-bold text-indigo-400">
              1
            </div>
            <h3 className="text-white font-semibold mb-2">Create Profile</h3>
            <p className="text-gray-400 text-sm">
              Build your professional profile with your skills, experience, and career goals
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-secondary-background border border-white/10 rounded-xl p-6 text-center hover:border-indigo-500/50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center mx-auto mb-4 text-xl font-bold text-indigo-400">
              2
            </div>
            <h3 className="text-white font-semibold mb-2">Browse Jobs</h3>
            <p className="text-gray-400 text-sm">
              Explore curated job openings that match your skills and career aspirations
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-secondary-background border border-white/10 rounded-xl p-6 text-center hover:border-indigo-500/50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center mx-auto mb-4 text-xl font-bold text-indigo-400">
              3
            </div>
            <h3 className="text-white font-semibold mb-2">Apply & Discuss</h3>
            <p className="text-gray-400 text-sm">
              Submit your application and connect with our team for personalized guidance
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-secondary-background border border-white/10 rounded-xl p-6 text-center hover:border-indigo-500/50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center mx-auto mb-4 text-xl font-bold text-indigo-400">
              4
            </div>
            <h3 className="text-white font-semibold mb-2">Get Placed</h3>
            <p className="text-gray-400 text-sm">
              Secure your dream job and start your journey with a trusted employer
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-16 lg:py-24">
        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Job Leads Impact
            </h2>
            <p className="text-gray-400">
              Trusted by thousands of job seekers and employers across the country
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-indigo-400 mb-2">5000+</div>
              <p className="text-gray-300 font-semibold">Jobs Placed</p>
              <p className="text-gray-400 text-sm mt-1">Successfully matching candidates with opportunities</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-indigo-400 mb-2">1000+</div>
              <p className="text-gray-300 font-semibold">Active Clients</p>
              <p className="text-gray-400 text-sm mt-1">Trusted employers across multiple industries</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-indigo-400 mb-2">95%</div>
              <p className="text-gray-300 font-semibold">Satisfaction Rate</p>
              <p className="text-gray-400 text-sm mt-1">Highly rated by candidates and employers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Job Leads Section */}
      <div className="py-16 lg:py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Why Choose Job Leads?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We offer comprehensive recruitment solutions tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-secondary-background border border-white/10 rounded-xl p-6">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-white font-semibold mb-3">Expert Matching</h3>
            <p className="text-gray-400">
              Our experienced team carefully matches candidates with roles that align with their skills, experience, and career goals
            </p>
          </div>

          <div className="bg-secondary-background border border-white/10 rounded-xl p-6">
            <div className="text-3xl mb-4">💼</div>
            <h3 className="text-white font-semibold mb-3">Industry Network</h3>
            <p className="text-gray-400">
              Access to a vast network of leading employers and exclusive job opportunities not available elsewhere
            </p>
          </div>

          <div className="bg-secondary-background border border-white/10 rounded-xl p-6">
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-white font-semibold mb-3">Career Development</h3>
            <p className="text-gray-400">
              Get personalized career guidance, interview preparation, and professional development support
            </p>
          </div>

          <div className="bg-secondary-background border border-white/10 rounded-xl p-6">
            <div className="text-3xl mb-4">🤝</div>
            <h3 className="text-white font-semibold mb-3">Dedicated Support</h3>
            <p className="text-gray-400">
              Our team is committed to supporting you at every step of your job search journey
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-16 lg:py-24 text-center">
        <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/50 rounded-2xl p-8 lg:p-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Find Your Next Opportunity?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Browse our current job openings and take the first step towards your dream career. Our team is here to support you every step of the way.
          </p>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-semibold"
          >
            Explore All Jobs
            <LuArrowRight size={18} />
          </Link>
        </div>
      </div>
    </ContainerLayout>
  );
}
