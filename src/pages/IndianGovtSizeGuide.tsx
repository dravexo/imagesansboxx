import React from 'react';
import PageLayout from '../components/PageLayout';

export default function IndianGovtSizeGuide() {
  return (
    <PageLayout title="Indian Govt. Size Guide">
      <article className="max-w-3xl w-full mx-auto pb-20 space-y-8 text-slate-700 leading-relaxed text-lg">
        <header className="mb-12 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-tight mt-8">
            The Complete Indian Government Portal Dimension & Size Guide
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            A comprehensive masterclass on navigating the strict photo, signature, and document size requirements for UPSC, SSC, IBPS, and state government portals.
          </p>
        </header>

        <div className="w-full aspect-video rounded-3xl overflow-hidden mb-12 shadow-xl bg-slate-100">
          <img 
            src="https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&q=80&w=1200" 
            alt="Indian Government Documents" 
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="text-3xl font-bold font-display text-slate-900 mt-12 mb-6">Introduction: The Challenge of Indian Portals</h2>
        <p>
          Applying for a government job, a passport, or a PAN card in India involves navigating online portals that are notorious for their strict and often unforgiving document upload requirements. Unlike modern social media sites that automatically compress and crop your images, government portals like those for the Staff Selection Commission (SSC), Union Public Service Commission (UPSC), and Institute of Banking Personnel Selection (IBPS) require you to manually format your files before uploading.
        </p>
        <p>
          A file that is just 1 KB over the limit, or a few pixels off the required dimensions, will trigger an instant "Invalid File Format" or "Size Exceeded" error. This guide provides an exhaustive breakdown of these requirements and how to perfectly optimize your documents using secure compression tools.
        </p>

        <h2 className="text-3xl font-bold font-display text-slate-900 mt-12 mb-6">1. Standard Photograph Requirements</h2>
        <p>
          The passport-sized photograph is the most common requirement across all Indian portals. While slight variations exist, adhering to a "Golden Standard" will ensure your photo is accepted 95% of the time.
        </p>
        <h3 className="text-2xl font-bold font-display text-slate-800 mt-8 mb-4">The Golden Standard for Photos</h3>
        <ul className="list-disc list-inside space-y-3 ml-4">
          <li><strong>Dimensions:</strong> 3.5 cm (width) x 4.5 cm (height). In pixels, this roughly translates to 132 x 170 pixels at standard web resolution.</li>
          <li><strong>File Size:</strong> Between <strong>20 KB and 50 KB</strong>. This is the most crucial metric.</li>
          <li><strong>Format:</strong> JPEG or JPG only. PNGs and PDFs are almost universally rejected for photos.</li>
          <li><strong>Content:</strong> The face should cover about 70-80% of the photograph. Both ears must be clearly visible.</li>
          <li><strong>Background:</strong> White or very light grey. Avoid blue or patterned backgrounds.</li>
          <li><strong>Date and Name:</strong> Many exams (like SSC) now mandate that the date the photo was taken (and sometimes the candidate's name) be printed at the bottom of the photograph. The date should not be older than 3 months from the application date.</li>
        </ul>
        <p>
          <strong>Common Mistake:</strong> Uploading a photo wearing spectacles. Many applications (especially for police or defense forces) strictly prohibit glasses in the photograph to avoid glare hiding the eyes.
        </p>

        <h2 className="text-3xl font-bold font-display text-slate-900 mt-12 mb-6">2. Signature Upload Guidelines</h2>
        <p>
          Signatures are equally tricky because they require a landscape aspect ratio and an extremely small file size. A blurry signature can lead to the outright rejection of your application during the scrutiny phase.
        </p>
        <h3 className="text-2xl font-bold font-display text-slate-800 mt-8 mb-4">The Golden Standard for Signatures</h3>
        <ul className="list-disc list-inside space-y-3 ml-4">
          <li><strong>Dimensions:</strong> 4.0 cm (width) x 2.0 cm (height) or 140 x 60 pixels.</li>
          <li><strong>File Size:</strong> Between <strong>10 KB and 20 KB</strong>. (Some portals allow up to 30 KB).</li>
          <li><strong>Format:</strong> JPEG or JPG.</li>
          <li><strong>Ink Color:</strong> Always use a <strong>Black ink pen</strong>. While blue is sometimes accepted, black provides the best contrast when scanned and compressed, reducing the risk of a "blurry signature" rejection.</li>
          <li><strong>Paper:</strong> Sign on plain white, unruled paper. Do not use notebook paper with lines.</li>
        </ul>

        <h2 className="text-3xl font-bold font-display text-slate-900 mt-12 mb-6">3. Left Thumb Impression (LTI) & Hand-written Declarations</h2>
        <p>
          Banking exams (IBPS, SBI) and several state public service commissions require additional identity verifications in the form of thumb impressions and written declarations.
        </p>
        <h3 className="text-2xl font-bold font-display text-slate-800 mt-8 mb-4">Left Thumb Impression (LTI)</h3>
        <ul className="list-disc list-inside space-y-3 ml-4">
          <li><strong>Dimensions:</strong> 3.0 cm x 3.0 cm.</li>
          <li><strong>File Size:</strong> 20 KB to 50 KB.</li>
          <li><strong>Ink:</strong> Black or Blue ink pad. Ensure the ridges of the fingerprint are clearly visible. Smudged prints are rejected.</li>
        </ul>
        <h3 className="text-2xl font-bold font-display text-slate-800 mt-8 mb-4">Hand-written Declaration</h3>
        <p>
          This is typically a standard text provided in the notification that you must write in your own handwriting.
        </p>
        <ul className="list-disc list-inside space-y-3 ml-4">
          <li><strong>Dimensions:</strong> Usually 10 cm x 5 cm.</li>
          <li><strong>File Size:</strong> 50 KB to 100 KB.</li>
          <li><strong>Ink:</strong> Strictly Black ink on white, unruled paper.</li>
          <li><strong>Rule:</strong> It must NOT be in block/capital letters. It must be in running handwriting.</li>
        </ul>

        <h2 className="text-3xl font-bold font-display text-slate-900 mt-12 mb-6">4. Portal-Specific Breakdowns</h2>
        
        <h3 className="text-2xl font-bold font-display text-slate-800 mt-8 mb-4">A. Staff Selection Commission (SSC)</h3>
        <p>
          SSC portals are notorious for server crashes and strict photo rules. 
          <br/><strong>Photo:</strong> 20-50 KB. Must have the date printed on it. Dimensions: 3.5cm x 4.5cm.
          <br/><strong>Signature:</strong> 10-20 KB. Dimensions: 4.0cm x 2.0cm.
        </p>

        <h3 className="text-2xl font-bold font-display text-slate-800 mt-8 mb-4">B. Union Public Service Commission (UPSC)</h3>
        <p>
          UPSC portals often have different dimensions but similar size constraints.
          <br/><strong>Photo & Signature:</strong> The file size must be less than 300 KB and greater than 20 KB. The resolution must be a minimum of 350 x 350 pixels and a maximum of 1000 x 1000 pixels.
          <br/><strong>ID Proof (PDF):</strong> 20 KB to 300 KB.
        </p>

        <h3 className="text-2xl font-bold font-display text-slate-800 mt-8 mb-4">C. IBPS / SBI (Banking Exams)</h3>
        <p>
          Banking exams require the most documents.
          <br/><strong>Photo:</strong> 20-50 KB (200x230 pixels).
          <br/><strong>Signature:</strong> 10-20 KB (140x60 pixels).
          <br/><strong>LTI:</strong> 20-50 KB (240x240 pixels).
          <br/><strong>Declaration:</strong> 50-100 KB (800x400 pixels).
        </p>

        <h2 className="text-3xl font-bold font-display text-slate-900 mt-12 mb-6">5. Compressing ID Proofs (Aadhaar, PAN, Marksheets)</h2>
        <p>
          When uploading proof of identity or educational qualifications, the format requested is usually PDF, though some allow JPEG. The size limits typically range from 100 KB to 500 KB depending on the portal (e.g., Passport Seva requires PDFs under 1 MB).
        </p>
        <p>
          <strong>Best Practice for PDFs:</strong> Do not just take a photo with your phone and convert it directly to PDF. This often results in a 2MB+ file. Instead, use a document scanner app with a "black and white" or "magic color" filter. This removes unnecessary background shadows and drastically reduces the initial file size. Then, use a PDF compressor to bring it under the 100KB or 300KB limit.
        </p>

        <h2 className="text-3xl font-bold font-display text-slate-900 mt-12 mb-6">6. Step-by-Step Optimization Workflow</h2>
        <p>
          How do you actually achieve these exact sizes without making the image unrecognizable? Follow these steps using our secure compression tool:
        </p>
        <ol className="list-decimal list-inside space-y-4 ml-4">
          <li><strong>Crop First:</strong> Before compressing, crop out all unnecessary background. If it's a signature, crop tightly around the letters. This is the easiest way to reduce file size and meet dimension guidelines simultaneously.</li>
          <li><strong>Set the Target Size:</strong> In our Image Compressor, if the portal requires 20-50 KB, set your target size to <strong>45 KB</strong>. It's safer to aim for the upper end of the limit to retain maximum quality.</li>
          <li><strong>Monitor the Output:</strong> If the output size is 18 KB, the portal will reject it for being "too small." In this case, you need to increase the quality slider or set a higher target size in the tool.</li>
          <li><strong>Verify Dimensions:</strong> Ensure the width-to-height ratio roughly matches the requirement (e.g., a signature should be wider than it is tall).</li>
        </ol>

        <blockquote className="border-l-4 border-blue-500 pl-6 my-10 italic text-xl text-slate-700 bg-blue-50/50 py-6 rounded-r-xl">
          "Always double-check your uploaded documents in the preview pane before submitting the final application. A blurry signature or a photo with the wrong date is the number one cause for application rejection."
        </blockquote>

        <h2 className="text-3xl font-bold font-display text-slate-900 mt-12 mb-6">Conclusion</h2>
        <p>
          While the document requirements for Indian government portals can seem daunting and overly bureaucratic, they are necessary for standardized processing of millions of applications. By understanding the specifications for photos, signatures, thumb impressions, and PDFs, and by using reliable, secure compression tools, you can ensure your applications are submitted smoothly and without errors. Always read the official notification carefully, as rules can change from year to year.
        </p>
      </article>
    </PageLayout>
  );
}

