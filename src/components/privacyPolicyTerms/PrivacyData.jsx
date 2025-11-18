import React from "react";

const PrivacyData = () => {
  return (
    <div className="w-full min-h-screen bg-[var(--dark)]">
      {/* Header Section */}
      <div className="w-full bg-[var(--lighter-dark)] py-10">
        <div className="max-w-6xl mx-auto px-5">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--white)] mb-4">
            Privacy Policy
          </h1>
          <p className="text-[var(--gray)] text-lg">
            Last Updated: May 5, 2025
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mt-7">
        <div className="bg-[var(--lighter-dark)] p-6 md:p-10 rounded-lg shadow-lg text-[var(--gray)]">
          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[var(--white)] mb-4">
              1. INTRODUCTION
            </h2>
            <p className="mb-4">
              STACKED LLC ("we," "our," or "us") respects your privacy and is
              committed to protecting it through our compliance with this
              Privacy Policy. This policy describes:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                The types of information we may collect from you or that you may
                provide when you use our STACKED platform and website (our
                "Service").
              </li>
              <li>
                Our practices for collecting, using, maintaining, protecting,
                and disclosing that information.
              </li>
            </ul>
            <p>
              Please read this policy carefully to understand our policies and
              practices regarding your information and how we will treat it. By
              accessing or using our Service, you agree to this Privacy Policy.
              If you do not agree with our policies and practices, your choice
              is not to use our Service.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[var(--white)] mb-4">
              2. INFORMATION WE COLLECT
            </h2>
            <p className="mb-4">
              We collect several types of information from and about users of
              our Service, including:
            </p>

            <h3 className="text-xl font-medium text-[var(--white)] mb-3">
              2.1 Information You Provide to Us
            </h3>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                <span className="text-[var(--primary-color)]">
                  Account Information:
                </span>{" "}
                Information that you provide by filling in forms on our Service,
                including your name, postal address, email address, telephone
                number, username, password, and billing information.
              </li>
              <li>
                <span className="text-[var(--primary-color)]">
                  Client Data:
                </span>{" "}
                Information about your clients, properties, and business
                relationships that you input into the Service, including contact
                information, property details, transaction information, and
                communication logs.
              </li>
              <li>
                <span className="text-[var(--primary-color)]">
                  Communications:
                </span>{" "}
                Records and copies of your correspondence (including email
                addresses) if you contact us.
              </li>
              <li>
                <span className="text-[var(--primary-color)]">
                  Profile Information:
                </span>{" "}
                Your profile information including your name, photograph, and
                other details you choose to include in your profile.
              </li>
              <li>
                <span className="text-[var(--primary-color)]">
                  Transaction Information:
                </span>{" "}
                Details of transactions you carry out through our Service and of
                the fulfillment of your orders.
              </li>
            </ul>

            <h3 className="text-xl font-medium text-[var(--white)] mb-3">
              2.2 Information We Collect Through Automatic Data Collection
              Technologies
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <span className="text-[var(--primary-color)]">
                  Usage Details:
                </span>{" "}
                Details of your visits to our Service, including traffic data,
                location data, logs, and other communication data and the
                resources that you access and use on the Service.
              </li>
              <li>
                <span className="text-[var(--primary-color)]">
                  Device Information:
                </span>{" "}
                Information about your computer, mobile device, and internet
                connection, including your IP address, operating system, and
                browser type.
              </li>
              <li>
                <span className="text-[var(--primary-color)]">
                  Cookies and Similar Technologies:
                </span>{" "}
                We may use cookies, web beacons, pixels, and other tracking
                technologies to collect information about your browsing
                activities.
              </li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[var(--white)] mb-4">
              3. HOW WE USE YOUR INFORMATION
            </h2>
            <p className="mb-4">
              We use information that we collect about you or that you provide
              to us, including any personal information:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>To present our Service and its contents to you.</li>
              <li>
                To provide you with information, products, or services that you
                request from us.
              </li>
              <li>To fulfill any other purpose for which you provide it.</li>
              <li>
                To provide you with notices about your account, including
                expiration and renewal notices.
              </li>
              <li>
                To carry out our obligations and enforce our rights arising from
                any contracts entered into between you and us, including for
                billing and collection.
              </li>
              <li>
                To notify you about changes to our Service or any products or
                services we offer or provide through it.
              </li>
              <li>
                To improve our Service and to deliver a better and more
                personalized service.
              </li>
              <li>To estimate our audience size and usage patterns.</li>
              <li>
                In any other way we may describe when you provide the
                information.
              </li>
              <li>For any other purpose with your consent.</li>
            </ul>
          </section>

          {/* Disclosure of Your Information */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[var(--white)] mb-4">
              4. DISCLOSURE OF YOUR INFORMATION
            </h2>
            <p className="mb-4">
              We may disclose personal information that we collect or you
              provide as described in this Privacy Policy:
            </p>

            <h3 className="text-xl font-medium text-[var(--white)] mb-3">
              4.1 To Subsidiaries and Affiliates
            </h3>
            <p className="mb-4">
              We may share your information with our subsidiaries and affiliates
              for purposes consistent with this Privacy Policy.
            </p>

            <h3 className="text-xl font-medium text-[var(--white)] mb-3">
              4.2 To Contractors, Service Providers, and Other Third Parties
            </h3>
            <p className="mb-4">
              We may disclose your information to contractors, service
              providers, and other third parties we use to support our business
              and who are bound by contractual obligations to keep personal
              information confidential and use it only for the purposes for
              which we disclose it to them.
            </p>

            <h3 className="text-xl font-medium text-[var(--white)] mb-3">
              4.3 To Fulfill the Purpose for Which You Provide It
            </h3>
            <p className="mb-4">
              For example, if you give us an email address to use the "email a
              friend" feature of our Service, we will transmit the contents of
              that email and your email address to the recipients.
            </p>

            <h3 className="text-xl font-medium text-[var(--white)] mb-3">
              4.4 For Business Transfers
            </h3>
            <p className="mb-4">
              If we are involved in a merger, acquisition, or sale of all or a
              portion of our assets, your information may be transferred as part
              of that transaction. We will notify you via email and/or a
              prominent notice on our Service of any change in ownership or uses
              of your personal information.
            </p>

            <h3 className="text-xl font-medium text-[var(--white)] mb-3">
              4.5 For Legal Purposes
            </h3>
            <p>We may disclose your information:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                To comply with any court order, law, or legal process, including
                to respond to any government or regulatory request.
              </li>
              <li>
                To enforce or apply our terms of use and other agreements,
                including for billing and collection purposes.
              </li>
              <li>
                If we believe disclosure is necessary or appropriate to protect
                the rights, property, or safety of STACKED LLC, our customers,
                or others.
              </li>
            </ul>
          </section>

          {/* Continue with remaining sections */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[var(--white)] mb-4">
              5. DATA SECURITY
            </h2>
            <p className="mb-4">
              We have implemented measures designed to secure your personal
              information from accidental loss and from unauthorized access,
              use, alteration, and disclosure. All information you provide to us
              is stored on our secure servers behind firewalls.
            </p>
            <p className="mb-4">
              The safety and security of your information also depends on you.
              Where we have given you (or where you have chosen) a password for
              access to certain parts of our Service, you are responsible for
              keeping this password confidential. We ask you not to share your
              password with anyone.
            </p>
            <p>
              Unfortunately, the transmission of information via the internet is
              not completely secure. Although we do our best to protect your
              personal information, we cannot guarantee the security of your
              personal information transmitted to our Service. Any transmission
              of personal information is at your own risk. We are not
              responsible for circumvention of any privacy settings or security
              measures contained on the Service.
            </p>
          </section>

          {/* Sections 6-10 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[var(--white)] mb-4">
              6. CLIENT DATA
            </h2>
            <p className="mb-4">
              Our Service allows you to store and manage information about your
              clients and their properties. You represent and warrant that you
              have obtained all necessary rights, consents, and permissions to
              share any client data with us, and to permit us to use such client
              data in accordance with this Privacy Policy. You are responsible
              for ensuring that your collection and use of client data complies
              with all applicable laws, including privacy laws.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[var(--white)] mb-4">
              7. DATA RETENTION
            </h2>
            <p className="mb-4">
              We will retain your personal information for as long as your
              account is active or as needed to provide you with our Service. We
              will retain and use your personal information as necessary to
              comply with our legal obligations, resolve disputes, and enforce
              our agreements.
            </p>
            <p>
              If you wish to cancel your account or request that we no longer
              use your information to provide you services, contact us at the
              email address listed at the end of this Privacy Policy. Even after
              you deactivate your account, we will retain certain information as
              necessary to comply with our legal obligations, resolve disputes,
              and enforce our agreements.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[var(--white)] mb-4">
              8. YOUR CHOICES ABOUT OUR COLLECTION, USE, AND DISCLOSURE OF YOUR
              INFORMATION
            </h2>
            <p className="mb-4">
              We strive to provide you with choices regarding the personal
              information you provide to us. We have created mechanisms to
              provide you with the following control over your information:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <span className="text-[var(--primary-color)]">
                  Tracking Technologies and Advertising:
                </span>{" "}
                You can set your browser to refuse all or some browser cookies,
                or to alert you when cookies are being sent. If you disable or
                refuse cookies, please note that some parts of this site may
                then be inaccessible or not function properly.
              </li>
              <li>
                <span className="text-[var(--primary-color)]">
                  Promotional Offers from the Company:
                </span>{" "}
                If you do not wish to have your email address used by the
                Company to promote our own or third parties' products or
                services, you can opt-out by checking the relevant box located
                on the form on which we collect your data or by sending us an
                email stating your request to the address listed at the end of
                this Privacy Policy.
              </li>
              <li>
                <span className="text-[var(--primary-color)]">
                  Targeted Advertising:
                </span>{" "}
                If you do not want us to use information that we collect or that
                you provide to us to deliver advertisements according to our
                advertisers' target-audience preferences, you can opt-out by
                sending us an email stating your request to the address listed
                at the end of this Privacy Policy.
              </li>
            </ul>
            <p>
              We do not control third parties' collection or use of your
              information to serve interest-based advertising. However, these
              third parties may provide you with ways to choose not to have your
              information collected or used in this way.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[var(--white)] mb-4">
              9. ACCESSING AND CORRECTING YOUR INFORMATION
            </h2>
            <p className="mb-4">
              You can review and change your personal information by logging
              into the Service and visiting your account profile page.
            </p>
            <p>
              You may also send us an email to the address listed at the end of
              this Privacy Policy to request access to, correct or delete any
              personal information that you have provided to us. We cannot
              delete your personal information except by also deleting your user
              account. We may not accommodate a request to change information if
              we believe the change would violate any law or legal requirement
              or cause the information to be incorrect.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[var(--white)] mb-4">
              10. CHILDREN UNDER THE AGE OF 13
            </h2>
            <p className="mb-4">
              Our Service is not intended for children under 13 years of age. No
              one under age 13 may provide any information to or on the Service.
              We do not knowingly collect personal information from children
              under 13. If you are under 13, do not use or provide any
              information on this Service or on or through any of its features,
              register on the Service, make any purchases through the Service,
              use any of the interactive or public comment features of this
              Service, or provide any information about yourself to us,
              including your name, address, telephone number, email address, or
              any screen name or user name you may use.
            </p>
            <p>
              If we learn we have collected or received personal information
              from a child under 13 without verification of parental consent, we
              will delete that information. If you believe we might have any
              information from or about a child under 13, please contact us at
              the email address listed at the end of this Privacy Policy.
            </p>
          </section>

          {/* Sections 11-14 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[var(--white)] mb-4">
              11. CHANGES TO OUR PRIVACY POLICY
            </h2>
            <p className="mb-4">
              We may update our Privacy Policy from time to time. If we make
              material changes to how we treat our users' personal information,
              we will post the new Privacy Policy on this page.
            </p>
            <p>
              The date the Privacy Policy was last revised is identified at the
              top of the page. You are responsible for ensuring we have an
              up-to-date active and deliverable email address for you, and for
              periodically visiting our Service and this Privacy Policy to check
              for any changes.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[var(--white)] mb-4">
              12. INTERNATIONAL USERS
            </h2>
            <p>
              This Privacy Policy is intended to cover collection of information
              from residents of the United States. If you are accessing our
              Service from outside the United States, please be aware that your
              information may be transferred to, stored, and processed in the
              United States where our servers are located and our central
              database is operated. The data protection and other laws of the
              United States might not be as comprehensive as those in your
              country. By using our Service, you understand that your
              information may be transferred to our facilities and those third
              parties with whom we share it as described in this Privacy Policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[var(--white)] mb-4">
              13. CALIFORNIA PRIVACY RIGHTS
            </h2>
            <p className="mb-4">
              California Civil Code Section § 1798.83 permits users of our
              Service that are California residents to request certain
              information regarding our disclosure of personal information to
              third parties for their direct marketing purposes. To make such a
              request, please send an email to the address listed at the end of
              this Privacy Policy.
            </p>
            <p>
              Further, if you are a California resident, the California Consumer
              Privacy Act ("CCPA") may provide you with additional rights
              regarding our use of your personal information. To learn more
              about your California privacy rights, please visit our CCPA
              Privacy Notice for California Residents.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-[var(--white)] mb-4">
              14. CONTACT INFORMATION
            </h2>
            <p className="mb-2">
              To ask questions or comment about this privacy policy and our
              privacy practices, contact us at:
            </p>
            <div className="bg-[var(--dark)] p-4 rounded-md mt-2">
              <p className="text-[var(--white)]">STACKED LLC</p>
              <p>1850 Popps Ferry Rd, Apt F611</p>
              <p>Biloxi, MS 39532</p>
              <p className="mt-2">
                <a
                  href="mailto:stackedcare@gmail.com"
                  className="text-[var(--primary-color)] hover:underline"
                >
                  stackedcare@gmail.com
                </a>
              </p>
            </div>
          </section>

          {/* Return to Home Button */}
          <div className="flex justify-center mt-12">
            <a
              href="/"
              className="bg-[var(--primary-color)] hover:opacity-90 transition-opacity text-[var(--white)] py-3 px-6 rounded-md font-medium"
            >
              Return to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyData;
