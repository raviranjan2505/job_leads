import ContainerLayout from "@/layouts/ContainerLayout";
import { LuMail, LuPhone, LuMapPin } from "react-icons/lu";

export default function ContactUsPage() {
  return (
    <ContainerLayout>
      <div className="px-4 sm:px-12">
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We’d love to hear from you. Reach out to us for any queries,
            recruitment needs, or support.
          </p>
        </div>

        {/* Contact Content */}
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Email */}
            <div className="bg-secondary-background border border-white/10 rounded-2xl p-6 text-center">
              <LuMail className="mx-auto text-indigo-500 mb-4" size={32} />
              <h3 className="text-lg font-semibold text-white mb-2">
                Email Us
              </h3>
              <p className="text-gray-400">
                support@jobleads.com
              </p>
              <p className="text-gray-400">
                hr@jobleads.com
              </p>
            </div>

            {/* Phone */}
            <div className="bg-secondary-background border border-white/10 rounded-2xl p-6 text-center">
              <LuPhone className="mx-auto text-indigo-500 mb-4" size={32} />
              <h3 className="text-lg font-semibold text-white mb-2">
                Call Us
              </h3>
              <p className="text-gray-400">
                +91 79030 10311
              </p>
              <p className="text-gray-400">
                +91 79030 10311
              </p>
            </div>

            {/* Address */}
            <div className="bg-secondary-background border border-white/10 rounded-2xl p-6 text-center">
              <LuMapPin className="mx-auto text-indigo-500 mb-4" size={32} />
              <h3 className="text-lg font-semibold text-white mb-2">
                Office Address
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Job Leads Pvt. Ltd.<br />
                Muzaffarpur, Bihar<br />
                India – 842002
              </p>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center pt-10">
            <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Our team is available Monday to Saturday, 10:00 AM – 6:00 PM.
              We aim to respond to all enquiries within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </ContainerLayout>
  );
}
