import React, { useRef } from "react";
import { Link } from "react-router-dom";
import Input from "../Form/Input";
import SelectInput from "../Form/SelectInput";
import TextAreaInput from "../Form/TextAreaInput";
import Button from "../Button";
import useNotification from "../notifications/useNotification";
import { useSendAffiliateEmailMutation } from "../../store/apis/user.api";
import { FaArrowRight } from "react-icons/fa";

const AffiliateForm = () => {
  const formRef = useRef(null);

  const experienceOptions = [
    { value: "", label: "Select your experience" },
    { value: "0-1", label: "0-1 years" },
    { value: "1-3", label: "1-3 years" },
    { value: "3-5", label: "3-5 years" },
    { value: "5+", label: "5+ years" },
  ];

  const notify = useNotification();

  const [sendAffiliateEmail] = useSendAffiliateEmailMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e?.target);
      const data = Object.fromEntries(formData.entries());
      if (!data?.name || !data?.email)
        throw new Error("Name and email are required fields");

      const response = await sendAffiliateEmail(data);
      if (response?.data && response.data?.success) {
        notify({
          message: "Form submitted successfully",
          type: "success",
        });
        formRef.current.reset();
      } else {
        throw new Error("Form submission failed.");
      }
    } catch (error) {
      notify({
        message: error?.message || "Form submission failed, please try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="flex-1 min-w-[300px] bg-[var(--lighter-dark)] p-[15px] sm:p-[30px] rounded-[10px]">
      <h4 className="heading-4 text-center text-[var(--primary-color)]">
        Affiliate Application
      </h4>
      <form
        className="flex flex-col gap-[15px]"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <Input
          label="Full Name"
          placeholder="Your name"
          type="text"
          name="fullName"
        />
        <Input
          label="Email"
          placeholder="Your email"
          type="email"
          name="email"
        />
        <Input
          label="Website/Social Media (optional)"
          placeholder="Your website or social media"
          type="text"
          name="website"
        />
        <SelectInput
          label="Real Estate Experience"
          placeholder="Select you experience"
          name="experience"
          options={experienceOptions}
        />
        <TextAreaInput
          label="Why you want to be an affiliate"
          placeholder="Tell us about yourself and your audience"
          name="whyAffiliate"
        />

        <Button type="submit" className="mt-3">
          Submit Application
        </Button>
      </form>
    </div>
  );
};

const StackedAffiliate = () => {
  return (
    <div className="container">
      <h2 className="heading-2">Become a Stacked Affiliate</h2>
      <div className="flex flex-wrap gap-[30px] sm:gap-[20px] items-center justify-center max-w-[1100px] my-0 mx-auto">
        <div className="flex-1 min-w-[300px]">
          <h3 className="heading-3 text-[var(--primary-color)]">
            Partner With Us
          </h3>
          <p className="sub-heading text-left! mb-[25px]">
            Interested in partnering with Stacked as an affiliate? Fill out our
            quick application and we'll reach out shortly. Join us for a
            rewarding partnership!
          </p>

          <span className="flex items-center gap-3 group heading-5 text-[var(--primary-color)]">
            Apply Now{" "}
            <FaArrowRight className="w-6 h-6 group-hover:translate-x-0.5" />
          </span>
        </div>
        <AffiliateForm />
      </div>
    </div>
  );
};

export default StackedAffiliate;
