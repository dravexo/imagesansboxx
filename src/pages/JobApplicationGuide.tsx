import React from 'react';
import PageLayout from '../components/PageLayout';

export default function JobApplicationGuide() {
  return (
    <PageLayout title="Job Application Guide">
      <article className="max-w-3xl w-full mx-auto pb-20 space-y-8 text-slate-700 leading-relaxed text-lg">
        <header className="mb-12 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-tight mt-8">
            Optimizing Your Digital Footprint: A Job Application Document Guide
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            Master the art of preparing resumes, portfolios, and cover letters for Applicant Tracking Systems (ATS) and modern recruiting platforms.
          </p>
        </header>

        <div className="w-full aspect-video rounded-3xl overflow-hidden mb-12 shadow-xl bg-slate-100">
          <img 
            src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1200" 
            alt="Job Application Documents" 
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="text-3xl font-bold font-display text-slate-900 mt-12 mb-6">Introduction: The Invisible Filter</h2>
        <p>
          In the modern job market, your application rarely reaches human eyes first. Before a recruiter ever reviews your qualifications, your documents must pass through an Applicant Tracking System (ATS). These software platforms—such as Workday, Greenhouse, Lever, and Taleo—are designed to parse, organize, and filter millions of resumes.
        </p>
        <p>
          If your documents are improperly formatted, too large, or saved in the wrong file type, they may be entirely unreadable by the ATS. This results in instant, automated rejection. This guide covers how to technically optimize your resumes, portfolios, and headshots to ensure they bypass the digital gatekeepers and reach the hiring manager's desk.
        </p>

        <h2 className="text-3xl font-bold font-display text-slate-900 mt-12 mb-6">1. The ATS Reality: How Parsers Read Your Resume</h2>
        <p>
          An ATS parser is essentially a text-extraction algorithm. It looks for standard headings (Experience, Education, Skills) and attempts to map the text beneath them to database fields. 
        </p>
        <p>
          <strong>Why Complex Formatting Fails:</strong> When you use multi-column layouts, complex tables, invisible text boxes, or heavy graphical elements, the parser gets confused. The text might be extracted out of order, or worse, entirely ignored. A beautiful, highly-designed resume exported from Canva might look great to a human, but to an ATS, it is often a garbled mess of unreadable data.
        </p>

        <h2 className="text-3xl font-bold font-display text-slate-900 mt-12 mb-6">2. Resume Optimization: Formats and Sizes</h2>
        <p>
          Your resume is your most critical asset. Getting the format right is non-negotiable.
        </p>
        <h3 className="text-2xl font-bold font-display text-slate-800 mt-8 mb-4">PDF vs. Word (.docx)</h3>
        <p>
          The golden rule is to always submit your resume as a <strong>PDF</strong> unless the application explicitly asks for a Word document. PDFs preserve your formatting across all devices and operating systems. A Word document might look perfect on your Mac, but the margins could break when a recruiter opens it on a Windows machine.
        </p>
        <h3 className="text-2xl font-bold font-display text-slate-800 mt-8 mb-4">File Size and Naming</h3>
        <ul className="list-disc list-inside space-y-3 ml-4">
          <li><strong>File Size:</strong> Keep your resume under <strong>2 MB</strong>. While some portals allow up to 5 MB, keeping it lightweight ensures it loads instantly when the recruiter opens it. If your PDF resume is larger than 2 MB, you likely have unoptimized images or complex vector graphics embedded in it.</li>
          <li><strong>Naming Convention:</strong> Never name your file <code>Resume_Final_v3.pdf</code>. Use a professional, standard naming convention: <code>Firstname_Lastname_Resume.pdf</code> or <code>Firstname_Lastname_Role.pdf</code>.</li>
        </ul>

        <h2 className="text-3xl font-bold font-display text-slate-900 mt-12 mb-6">3. Portfolios and Work Samples</h2>
        <p>
          For designers, architects, developers, and writers, a portfolio is often more important than the resume. However, portfolios inherently contain high-resolution images, leading to massive file sizes.
        </p>
        <h3 className="text-2xl font-bold font-display text-slate-800 mt-8 mb-4">The 5MB / 10MB Limit</h3>
        <p>
          Most application portals enforce a strict 5 MB or 10 MB limit for supporting documents. A multi-page design portfolio exported directly from Adobe InDesign or Illustrator can easily exceed 50 MB.
        </p>
        <ul className="list-disc list-inside space-y-3 ml-4">
          <li><strong>Compression Strategy:</strong> You must ruthlessly compress your portfolio PDFs. Use our PDF Compressor to reduce the file size. If the text becomes blurry, you may need to export the original document with lower-resolution images (e.g., 150 DPI instead of 300 DPI) rather than relying solely on post-export compression.</li>
          <li><strong>The Link Alternative:</strong> If you cannot get your portfolio under the size limit without sacrificing unacceptable amounts of quality, host your portfolio online (e.g., on a personal website, Behance, or a shared Google Drive link) and submit a 1-page PDF that contains a clickable link and a brief summary of your work.</li>
        </ul>

        <h2 className="text-3xl font-bold font-display text-slate-900 mt-12 mb-6">4. Professional Headshots and Images</h2>
        <p>
          While resumes in North America typically do not include headshots to prevent bias, they are standard in many European and Asian markets. Furthermore, you will need an optimized headshot for your LinkedIn profile and professional websites.
        </p>
        <h3 className="text-2xl font-bold font-display text-slate-800 mt-8 mb-4">LinkedIn Profile Picture Standards</h3>
        <ul className="list-disc list-inside space-y-3 ml-4">
          <li><strong>Dimensions:</strong> 400 x 400 pixels is the recommended minimum, though uploading a slightly larger image (e.g., 800 x 800 pixels) provides better resolution on retina displays.</li>
          <li><strong>Maximum Size:</strong> 8 MB limit.</li>
          <li><strong>Format:</strong> JPEG or PNG.</li>
          <li><strong>Optimization:</strong> Use our Image Compressor to ensure your headshot is sharp but lightweight. A 400x400 PNG can sometimes be surprisingly large if it contains a lot of detail; converting it to an optimized JPEG can save bandwidth.</li>
        </ul>

        <h2 className="text-3xl font-bold font-display text-slate-900 mt-12 mb-6">5. Cover Letters and Merging Documents</h2>
        <p>
          Some rudimentary job portals only provide a single upload field for "Resume/CV," yet you still want to provide a cover letter. In these cases, you must merge your documents.
        </p>
        <p>
          <strong>Best Practice:</strong> Always place the Cover Letter as page 1, and the Resume as page 2. Ensure both documents share the same header styling (your name and contact information) for a cohesive, professional appearance. When merging PDFs, pay attention to the final file size, as merging two 1 MB files might sometimes result in a 3 MB file depending on the software used. Compress the final merged document.
        </p>

        <h2 className="text-3xl font-bold font-display text-slate-900 mt-12 mb-6">6. Platform-Specific Quirks</h2>
        <ul className="list-disc list-inside space-y-3 ml-4">
          <li><strong>Workday:</strong> Notorious for poor parsing. It is highly recommended to upload a plain-text version of your resume to auto-fill the fields, and then attach your beautifully formatted PDF for the recruiter to actually read.</li>
          <li><strong>Greenhouse / Lever:</strong> Generally have excellent parsing engines. They handle standard PDFs very well and rarely require manual correction if your layout is logical.</li>
          <li><strong>Email Applications:</strong> If applying via email, the rules change. Keep total attachments under 10 MB to ensure the email doesn't get blocked by the recipient's spam or corporate firewall filters.</li>
        </ul>

        <blockquote className="border-l-4 border-blue-500 pl-6 my-10 italic text-xl text-slate-700 bg-blue-50/50 py-6 rounded-r-xl">
          "Your resume is a marketing document, not a comprehensive autobiography. Make it easy for the ATS to categorize you, and visually appealing for the recruiter to read you. Technical optimization is the bridge between the two."
        </blockquote>

        <h2 className="text-3xl font-bold font-display text-slate-900 mt-12 mb-6">Conclusion and Final Checklist</h2>
        <p>
          Applying for jobs is stressful enough without having to worry about technical errors and formatting rejections. Before you hit submit on your next application, run through this quick checklist:
        </p>
        <ol className="list-decimal list-inside space-y-4 ml-4">
          <li>Is my resume a PDF?</li>
          <li>Is the file size under 2 MB?</li>
          <li>Is the file named professionally?</li>
          <li>If submitting a portfolio, is it under the portal's specific MB limit?</li>
          <li>Have I removed complex tables or graphics that might confuse an ATS parser?</li>
        </ol>
        <p>
          By following these guidelines and utilizing file compression tools responsibly, you ensure that your qualifications—and not your file sizes—are what dictate your success.
        </p>
      </article>
    </PageLayout>
  );
}
