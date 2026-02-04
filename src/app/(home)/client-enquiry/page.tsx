import ContainerLayout from "@/layouts/ContainerLayout";
import ClientEnquiryForm from "@/components/forms/ClientEnquiryForm";
import React from "react";

export default function ClientEnquiryPage() {
  return (
    <ContainerLayout>
      <div className="px-4 sm:px-12">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Client Enquiry
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Tell us about your requirements and our team will get back to you
            shortly.
          </p>
        </div>

        {/* Form */}
        <div className="max-w-3xl mx-auto bg-secondary-background border border-white/10 rounded-2xl p-8">
          <ClientEnquiryForm />
        </div>
      </div>
    </ContainerLayout>
  );
}
