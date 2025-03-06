'use client';

import { Pentagon, Certificate02 } from 'untitledui-js/react';
import Header from '@/components/header';
import Button from '@/components/button/button';
import Footer from '@/components/footer';
import { useIsMobile } from '@/hooks/use-mobile';

export default function AboutUs() {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col items-center bg-white">
      <Header />
      <div className="flex py-[48px] md:py-[96px] flex-col items-center gap-[24px] md:gap-[40px] w-full">
        <div className="flex max-w-[1280px] px-[16px] md:px-[32px] flex-col items-center gap-[8px] md:gap-[12px]">
          <div className="self-stretch text-brand-700 text-center text-[14px]/normal md:text-base/normal font-semibold">
            About us
          </div>
          <div className="self-stretch text-gray-900 text-center text-[28px]/[36px] md:text-[48px]/[60px] font-semibold -tracking-[0.96px]">
            The Evolution of Human Identity: From Ancient Times to the Digital{' '}
            Age
          </div>
        </div>
      </div>
      <div className="flex py-[48px] md:py-[96px] flex-col items-center gap-[48px] md:gap-[96px] w-full">
        <div className="flex max-w-[1280px] px-[16px] md:px-[6px] flex-col gap-[24px] md:gap-[32px] items-center">
          <div className="flex px-[16px] md:px-[44px] flex-col items-center gap-[16px] md:gap-[20px]">
            <div className="self-stretch text-gray-900 text-center text-[24px]/[32px] md:text-[36px]/[44px] font-semibold -tracking-[0.72px]">
              We&apos;re a mission driven company
            </div>
            <div className="self-stretch text-gray-600 text-[16px]/normal md:text-xl/normal">
              The evolution of human identity is a fascinating journey from
              ancient, community-based recognition to the modern, digital
              systems that shape how we authenticate ourselves today. In the
              early stages, identity was established through personal
              recognition within small, close-knit communities, where
              reputation, oral traditions, and symbols like tattoos and marks
              served as identifiers. As civilizations grew, written records and
              seals became essential tools for verifying identity, laying the
              groundwork for more formalized systems.
              <br />
              <br />
              Now, the future of identity is shifting toward Self-Sovereign
              Identity and Verifiable Credentials, offering individuals greater
              control over their personal data and security, enabled by
              decentralized technologies like blockchain. This new era promises
              to transform how we interact with the digital world, putting
              privacy, security, and trust back into the hands of individuals.
            </div>
          </div>
        </div>

        {/* First content section */}
        <div className="flex flex-col md:flex-row md:h-[770px] w-full max-w-[1280px] px-[16px] md:px-0 items-center">
          <div className="flex py-[16px] md:pr-[64px] justify-center md:justify-end items-center gap-[24px] md:gap-[64px] w-full md:w-1/2">
            <div className="flex max-w-full md:max-w-[560px] px-0 md:px-[32px] w-full">
              <div className="flex flex-col gap-[20px] w-full">
                <div className="flex w-[48px] h-[48px] p-[12px] justify-center items-center rounded-full bg-brand-100">
                  <Pentagon size="24" className="stroke-brand-600" />
                </div>
                <div className="flex flex-col gap-[16px]">
                  <div className="text-gray-900 text-[24px]/[32px] md:text-[30px]/[38px] font-semibold">
                    Ancient Identity: Recognition and Oral Declarations
                  </div>
                  <div className="text-gray-600 text-base/[24px] md:text-lg/[28px]">
                    In the earliest human societies, identity was a matter of
                    personal recognition. People lived in small, close-knit
                    communities where everyone knew each other by face, voice,
                    and reputation. A person&apos;s identity was defined by
                    their role in the group—whether as a hunter, healer, or
                    leader—and their trustworthiness was established through
                    direct interactions and oral traditions. Stories, family
                    lineage, and verbal agreements served as the foundation of
                    identity, passed down through generations without the need
                    for written records.
                    <br />
                    <br />
                    As communities grew, simple markings and symbols emerged to
                    distinguish individuals and groups. Tribal tattoos,
                    scarifications, and ceremonial adornments signified status,
                    achievements, or affiliation. Leaders and warriors bore
                    unique emblems, while merchants and artisans used
                    recognizable tools or crafts as proof of their skills.
                    Identity, though unwritten, was deeply intertwined with
                    personal relationships, reputation, and social standing,
                    making it both fluid and dependent on the collective memory
                    of the community.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 mt-[32px] md:mt-0 flex justify-center md:justify-start">
            <img
              src="/about-us/ancient.png"
              alt="Ancient Identity"
              className="h-auto md:h-full w-auto max-w-full object-contain"
            />
          </div>
        </div>

        {/* Second content section */}
        <div className="flex flex-col md:flex-row-reverse md:h-[640px] w-full max-w-[1280px] px-[16px] md:px-0 items-center">
          <div className="flex py-[16px] md:pl-[120px] justify-center md:justify-start items-center gap-[24px] md:gap-[64px] w-full md:w-1/2">
            <div className="flex max-w-full md:max-w-[560px] px-0 md:px-[32px] w-full">
              <div className="flex flex-col gap-[20px] w-full">
                <div className="flex w-[48px] h-[48px] p-[12px] justify-center items-center rounded-full bg-brand-100">
                  <Certificate02 size="24" className="stroke-brand-600" />
                </div>
                <div className="flex flex-col gap-[16px]">
                  <div className="text-gray-900 text-[24px]/[32px] md:text-[30px]/[38px] font-semibold">
                    The Age of Written Records and Seals
                  </div>
                  <div className="text-gray-600 text-base/[24px] md:text-lg/[28px]">
                    As civilizations expanded and trade networks grew, the need
                    for more formal identity systems became apparent. Ancient
                    societies such as Mesopotamia, Egypt, and Rome began
                    recording births, property ownership, and social status on
                    clay tablets, papyrus, and stone inscriptions. Rulers and
                    officials used unique seals and signet rings to authenticate
                    decrees and legal documents, ensuring that identity and
                    authority could be verified across vast empires. In China
                    and Persia, early forms of travel documents allowed
                    individuals to move between regions under the protection of
                    the state. By the Middle Ages, written records became more
                    widespread, with churches and governments keeping registries
                    of births, marriages, and deaths—laying the groundwork for
                    modern identity systems based on official documentation
                    rather than personal recognition alone.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 mt-[32px] md:mt-0 flex justify-center md:justify-end">
            <img
              src="/about-us/written.png"
              alt="Written Records"
              className="h-auto md:h-full w-auto max-w-full object-contain"
            />
          </div>
        </div>

        {/* Third content section */}
        <div className="flex flex-col md:flex-row md:h-[878px] w-full max-w-[1280px] px-[16px] md:px-0 items-center">
          <div className="flex py-[16px] md:pr-[64px] justify-center md:justify-end items-center gap-[24px] md:gap-[64px] w-full md:w-1/2">
            <div className="flex max-w-full md:max-w-[560px] px-0 md:px-[32px] w-full">
              <div className="flex flex-col gap-[20px] w-full">
                <div className="flex w-[48px] h-[48px] p-[12px] justify-center items-center rounded-full bg-brand-100">
                  <Pentagon size="24" className="stroke-brand-600" />
                </div>
                <div className="flex flex-col gap-[16px]">
                  <div className="text-gray-900 text-[24px]/[32px] md:text-[30px]/[38px] font-semibold">
                    The Rise of Bureaucratic Identity Systems
                  </div>
                  <div className="text-gray-600 text-base/[24px] md:text-lg/[28px]">
                    With the rise of nation-states and expanding bureaucratic
                    institutions, identity systems became more structured and
                    standardized. The Renaissance and early modern period saw
                    governments taking a more active role in recording and
                    regulating identities, driven by the need for taxation,
                    military service, and social order. Census records became
                    common, allowing rulers to track populations, while official
                    birth certificates, property deeds, and passports started to
                    formalize individual identity beyond local recognition. The
                    development of paper-based documentation, made possible by
                    the printing press, allowed for more consistent
                    record-keeping and authentication, reducing reliance on oral
                    testimony or personal seals.
                    <br />
                    <br />
                    By the 19th century, industrialization and mass urbanization
                    further reinforced the need for verifiable identities. As
                    people moved across borders for work, trade, and migration,
                    governments introduced standardized passports and national
                    identification papers to regulate movement and citizenship.
                    These identity documents became essential for accessing
                    public services, proving one&apos;s rights, and securing
                    employment, marking the shift from identity as a social
                    construct to a bureaucratic necessity. Identity was no
                    longer just about reputation within a community—it was now
                    something assigned, recorded, and verified by the state.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 mt-[32px] md:mt-0 flex justify-center md:justify-start">
            <img
              src="/about-us/bureaucratic.png"
              alt="Bureaucratic Identity"
              className="h-auto md:h-full w-auto max-w-full object-contain"
            />
          </div>
        </div>

        {/* Fourth content section */}
        <div className="flex flex-col md:flex-row-reverse md:h-[868px] w-full max-w-[1280px] px-[16px] md:px-0 items-center">
          <div className="flex py-[16px] md:pl-[80px] justify-center md:justify-start items-center gap-[24px] md:gap-[64px] w-full md:w-1/2">
            <div className="flex max-w-full md:max-w-[560px] px-0 md:px-[32px] w-full">
              <div className="flex flex-col gap-[20px] w-full">
                <div className="flex w-[48px] h-[48px] p-[12px] justify-center items-center rounded-full bg-brand-100">
                  <Certificate02 size="24" className="stroke-brand-600" />
                </div>
                <div className="flex flex-col gap-[16px]">
                  <div className="text-gray-900 text-[24px]/[32px] md:text-[30px]/[38px] font-semibold">
                    The Industrial Age and Standardized Identity
                  </div>
                  <div className="text-gray-600 text-base/[24px] md:text-lg/[28px]">
                    The Industrial Age brought rapid urbanization, global
                    migration, and the rise of large-scale institutions, all of
                    which demanded more reliable and standardized identity
                    systems. Governments introduced official identity documents
                    such as birth certificates, driver&apos;s licenses, and
                    national ID cards, ensuring that individuals could be
                    uniquely identified within expanding populations. Social
                    security numbers and tax identification systems linked
                    identity to economic and legal responsibilities, allowing
                    states to manage public services, taxation, and law
                    enforcement more efficiently. As photography became
                    widespread, passports and personal identification cards
                    began incorporating photographs, adding an additional layer
                    of verification to prevent fraud and impersonation.
                    <br />
                    <br />
                    With industrialization also came the growth of large
                    corporations, banks, and financial institutions, all of
                    which required trusted identity verification for employment,
                    banking, and contracts. Identity was no longer just a state
                    concern—it became essential for participating in modern
                    economic and social life. As reliance on centralized
                    databases increased, identity became something managed not
                    only by individuals but by the governments and organizations
                    that issued and stored these records, laying the foundation
                    for today&apos;s digital identity systems.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 mt-[32px] md:mt-0 flex justify-center md:justify-end">
            <img
              src="/about-us/industrial.png"
              alt="Industrial Age"
              className="h-auto md:h-full w-auto max-w-full object-contain"
            />
          </div>
        </div>

        {/* Fifth content section */}
        <div className="flex flex-col md:flex-row md:h-[800px] w-full max-w-[1280px] px-[16px] md:px-0 items-center">
          <div className="flex py-[16px] md:pr-[140px] justify-center md:justify-end items-center gap-[24px] md:gap-[64px] w-full md:w-1/2">
            <div className="flex max-w-full md:max-w-[560px] px-0 md:px-[32px] w-full">
              <div className="flex flex-col gap-[20px] w-full">
                <div className="flex w-[48px] h-[48px] p-[12px] justify-center items-center rounded-full bg-brand-100">
                  <Pentagon size="24" className="stroke-brand-600" />
                </div>
                <div className="flex flex-col gap-[16px]">
                  <div className="text-gray-900 text-[24px]/[32px] md:text-[30px]/[38px] font-semibold">
                    The Digital Age: Centralized and Online Identities
                  </div>
                  <div className="text-gray-600 text-base/[24px] md:text-lg/[28px]">
                    The digital revolution transformed identity from physical
                    documents to centralized databases and online profiles.
                    Governments, financial institutions, and corporations began
                    storing personal information in digital registries, enabling
                    instant verification but also increasing reliance on
                    centralized authorities. Online identity became synonymous
                    with usernames, passwords, and email addresses, allowing
                    people to access services across the internet. Social media
                    platforms and tech companies further reshaped identity,
                    often making it dependent on proprietary systems where user
                    data was collected, analyzed, and monetized. While these
                    digital identities offered convenience, they also introduced
                    new risks—identity theft, data breaches, and loss of
                    privacy—highlighting the growing need for more secure,
                    user-controlled identity solutions.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 mt-[32px] md:mt-0 flex justify-center md:justify-start">
            <img
              src="/about-us/digital.png"
              alt="Digital Age"
              className="h-auto md:h-full w-auto max-w-full object-contain"
            />
          </div>
        </div>

        {/* Future section */}
        <div className="flex flex-col w-full">
          <div className="pt-[48px] md:pt-[96px] pb-[80px] md:pb-[160px] flex flex-col items-center gap-[32px] md:gap-[64px] self-stretch">
            <div className="flex max-w-[1280px] px-[16px] md:px-[32px] flex-col md:flex-row gap-y-[32px] md:gap-y-[48px] gap-x-[32px] md:gap-x-[64px] self-stretch flex-wrap">
              <div className="flex flex-col w-full md:min-w-[480px] md:max-w-[768px] gap-[20px] md:grow-1 md:shrink-0 md:basis-0">
                <div className="flex flex-col gap-[16px]">
                  <div className="text-gray-900 text-[28px]/[36px] md:text-[36px]/[44px] font-semibold -tracking-[0.72px]">
                    The Future: Self-Sovereign Identity & Verifiable Credentials
                  </div>
                  <div className="text-gray-600 text-[16px]/[24px] md:text-xl/normal">
                    The future of identity is moving towards greater personal
                    control and security through Self-Sovereign Identity (SSI)
                    and Verifiable Credentials (VCs). With the limitations of
                    centralized identity systems becoming more apparent—such as
                    privacy concerns, security risks, and the potential for data
                    misuse—the digital identity landscape is shifting towards a
                    model where individuals own and manage their own
                    credentials. In this new paradigm, SSI enables people to
                    have full control over their digital identities, without
                    relying on central authorities to store or validate their
                    personal information. This decentralized approach ensures
                    that individuals can decide what data to share, with whom,
                    and when, all while maintaining privacy and security through
                    advanced cryptography.
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full md:min-w-[480px] md:max-w-[768px] gap-[24px] md:gap-[32px] md:grow-1 md:shrink-0 md:basis-0">
                <div className="text-gray-600 text-[16px]/[24px] md:text-base/normal">
                  Verifiable Credentials further enhance this concept by
                  providing tamper-proof, cryptographically signed proofs of
                  identity and qualifications. Whether it&apos;s a digital badge
                  earned through an online course, a certification from an
                  educational institution, or proof of age for purchasing
                  age-restricted goods, VCs allow users to carry their
                  credentials securely in digital wallets. These credentials are
                  verifiable in real time, without the need for a third-party
                  intermediary, making them both fast and trustworthy.
                  Organizations, businesses, and governments can issue these
                  credentials, while users retain full control over their data,
                  sharing only the necessary information and reducing the risk
                  of fraud or identity theft.
                </div>
                <div className="text-gray-600 text-[16px]/[24px] md:text-base/normal">
                  This shift to decentralized, self-sovereign identity and
                  verifiable credentials also opens the door for new
                  applications in a wide variety of sectors—from healthcare,
                  where patients can securely manage and share their medical
                  records, to education, where students can showcase verified
                  degrees and achievements across borders. The decentralized
                  trust model offered by blockchain technology ensures that
                  these credentials are secure, immutable, and transparent,
                  while enabling a seamless user experience. As we move further
                  into the digital age, SSI and VCs will not only change how we
                  authenticate ourselves online but also empower individuals to
                  take back control of their identity in a way that is more
                  secure, private, and equitable.
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col pb-[48px] md:pb-[96px] items-center -mt-[50px] md:-mt-[100px]">
            <div className="flex max-w-[1280px] px-[16px] md:px-[32px] flex-col items-center">
              <img
                src="/about-us/future.png"
                alt="Future"
                className="w-full md:w-[1280px] h-auto md:h-[560px] shadow-image object-cover rounded-[16px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Join our team section */}
      <div className="flex flex-col py-[48px] md:py-[96px] justify-center items-center gap-[48px] md:gap-[64px] w-full">
        <div className="flex max-w-[1280px] px-[16px] md:px-[32px] flex-col md:flex-row items-center content-center gap-[48px] md:gap-[64px]">
          <div className="max-w-full md:max-w-[768px] gap-[24px] md:gap-[32px] inline-flex flex-col items-start">
            <div className="flex min-w-full md:min-w-[480px] gap-[16px] md:gap-[20px] flex-col">
              <div className="flex flex-col gap-[8px] md:gap-[12px]">
                <div className="text-brand-700 text-base/normal font-semibold -tracking-[0.72px]">
                  Join our team
                </div>
                <div className="text-gray-900 text-[28px]/[36px] md:text-[36px]/[44px] font-semibold">
                  We&apos;re just getting started
                </div>
              </div>
              <div className="text-gray-600 text-[16px]/[24px] md:text-xl/normal">
                Change isn&apos;t instant—it&apos;s a wild ride that takes time
                and shakes up the status quo. But here&apos;s the deal:
                there&apos;s a vibrant crew ready to flip the script. If
                you&apos;re all about pushing boundaries and leading the charge,
                come join us as our ambassador and ride this wave of
                transformation.
              </div>
            </div>
            <Button size={isMobile ? 'lg' : 'xl'} className="w-full md:w-auto">
              Become an ambassador
            </Button>
          </div>

          {/* Photo grid - visible on all devices */}
          <div className="flex flex-col items-center justify-center w-full">
            {/* Top row */}
            <div className="flex flex-wrap justify-center items-end gap-4 mb-4 md:mb-8">
              <img
                src="/about-us/photo-1.png"
                alt="Image 1"
                className="h-auto w-[45%] md:w-auto md:max-w-xs"
              />
              <img
                src="/about-us/photo-2.png"
                alt="Image 2"
                className="h-auto w-[45%] md:w-auto md:max-w-xs"
              />
            </div>

            {/* Bottom row */}
            <div className="flex flex-wrap justify-center items-start gap-4">
              <img
                src="/about-us/photo-3.png"
                alt="Image 3"
                className="h-auto w-[30%] md:w-auto md:max-w-xs"
              />
              <img
                src="/about-us/photo-4.png"
                alt="Image 4"
                className="h-auto w-[30%] md:w-auto md:max-w-xs"
              />
              <img
                src="/about-us/photo-5.png"
                alt="Image 5"
                className="h-auto w-[30%] md:w-auto md:max-w-xs"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
