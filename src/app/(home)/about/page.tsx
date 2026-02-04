import ContainerLayout from '@/layouts/ContainerLayout'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function AboutPage() {
  return (
    <ContainerLayout>
        <div className='px-4 sm:px-12'>
            {/* heading */}
            <div className='text-center mb-16'>
                <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4'>
                    About Job Leads
                </h1>
                <p className='text-gray-400 max-w-2xl mx-auto leading-relaxed'>
                    Connecting Talent with the Right Opportunities – Your Trusted Partner in Recruitment & Career Growth
                </p>
            </div>

            {/* content */}
            <div className='space-y-14'>
                {/* section 1 */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
                    <Image src="/images/about1.png" alt='about-image'width={600}height={600} className='rounded-2xl object-cover'/>
                    <div>
                        <h2 className='text-2xl font-semibold text-gray-200 mb-4'>
                            Why Job Leads?
                        </h2>
                        <p className='text-gray-400 leading-relaxed'>
                            Job Leads is a professional job consultancy and manpower solution provider dedicated to connecting exceptional talent with the right career opportunities. We understand that finding the perfect job is not just about matching qualifications—it&apos;s about aligning your professional goals with companies that value your skills and aspirations.
                        </p>
                    </div>
                </div>

                {/* section 2 */}
                <div className='bg-secondary-background rounded-2xl p-8 border border-white/10'>
                <h2 className='text-2xl font-semibold text-gray-200 mb-4'>
                    What We Do
                </h2>
                <ul className='space-y-3 text-gray-400'>
                        <li>✓ Connect skilled professionals with leading companies across multiple industries</li>
                        <li>✓ Provide personalized job placement services for candidates at all career levels</li>
                        <li>✓ Help employers find the right talent that fits their organizational culture</li>
                        <li>✓ Offer career guidance and professional development support</li>
                        <li>✓ Bridge the gap between job seekers and employers through trusted recruitment solutions</li>
                </ul>
                </div>

                {/* section 3 */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
                    <div>
                        <h2 className='text-2xl font-semibold text-gray-200 mb-4'>
                            Our Commitment
                        </h2>
                        <p className='text-gray-400 leading-relaxed'>
                            At Job Leads, we believe in building lasting relationships with both candidates and employers. Our team is committed to understanding your unique needs, skills, and career aspirations to ensure the best possible match. We pride ourselves on transparency, professionalism, and delivering measurable results.
                        </p>
                    </div>
                    <Image src="/images/about.png" alt='commitment-image'width={600}height={600} className='rounded-2xl object-cover'/>
                </div>

                {/* section 4 */}
                <div className='text-center'>
                    <h2 className='text-2xl font-semibold text-gray-200 mb-4'>
                        Ready to Take the Next Step?
                    </h2>
                    <p className='text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8'>
                        Whether you&apos;re looking for your dream job or seeking top talent for your organization, Job Leads is here to help you succeed. Explore our current job openings and discover opportunities that match your profile.
                    </p>
                    <Link href="/jobs" className='inline-flex items-center justify-center px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-semibold'>
                        Explore Jobs
                    </Link>
                </div>

                {/* section 5 - Why Choose Us */}
                <div className='bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl p-8 border border-indigo-500/30'>
                    <h2 className='text-2xl font-semibold text-gray-200 mb-6 text-center'>
                        Why Choose Job Leads?
                    </h2>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        <div className='text-center'>
                            <div className='text-3xl mb-3'>💼</div>
                            <h3 className='text-white font-semibold mb-2'>Industry Experience</h3>
                            <p className='text-gray-400 text-sm'>Years of expertise in recruitment across diverse sectors</p>
                        </div>
                        <div className='text-center'>
                            <div className='text-3xl mb-3'>🎯</div>
                            <h3 className='text-white font-semibold mb-2'>Personalized Service</h3>
                            <p className='text-gray-400 text-sm'>Customized solutions tailored to your specific needs</p>
                        </div>
                        <div className='text-center'>
                            <div className='text-3xl mb-3'>🤝</div>
                            <h3 className='text-white font-semibold mb-2'>Trusted Network</h3>
                            <p className='text-gray-400 text-sm'>Strong relationships with top employers and candidates</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </ContainerLayout>
  )
}
