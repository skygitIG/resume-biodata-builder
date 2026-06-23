import { useState } from 'react';

interface Personal {
  name: string; email: string; phone: string;
  location: string; linkedin: string; summary: string;
}
interface WorkEntry { id: string; title: string; company: string; startDate: string; endDate: string; description: string; }
interface EduEntry  { id: string; degree: string; school: string; year: string; grade: string; }
interface ResumeData { personal: Personal; work: WorkEntry[]; education: EduEntry[]; skills: string; }

const blank: ResumeData = {
  personal: { name: '', email: '', phone: '', location: '', linkedin: '', summary: '' },
  work: [{ id: '1', title: '', company: '', startDate: '', endDate: '', description: '' }],
  education: [{ id: '1', degree: '', school: '', year: '', grade: '' }],
  skills: '',
};

const input = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300';

export default function ResumeBuilder() {
  const [data, setData] = useState<ResumeData>(blank);
  const [tab, setTab] = useState('personal');

  const setP = (k: keyof Personal, v: string) =>
    setData(d => ({ ...d, personal: { ...d.personal, [k]: v } }));

  const setW = (id: string, k: keyof WorkEntry, v: string) =>
    setData(d => ({ ...d, work: d.work.map(w => w.id === id ? { ...w, [k]: v } : w) }));

  const addWork = () =>
    setData(d => ({ ...d, work: [...d.work, { id: Date.now().toString(), title: '', company: '', startDate: '', endDate: '', description: '' }] }));

  const removeWork = (id: string) =>
    setData(d => ({ ...d, work: d.work.filter(w => w.id !== id) }));

  const setE = (id: string, k: keyof EduEntry, v: string) =>
    setData(d => ({ ...d, education: d.education.map(e => e.id === id ? { ...e, [k]: v } : e) }));

  const addEdu = () =>
    setData(d => ({ ...d, education: [...d.education, { id: Date.now().toString(), degree: '', school: '', year: '', grade: '' }] }));

  const removeEdu = (id: string) =>
    setData(d => ({ ...d, education: d.education.filter(e => e.id !== id) }));

  const tabs = [
    { id: 'personal',   label: 'Personal' },
    { id: 'experience', label: 'Experience' },
    { id: 'education',  label: 'Education' },
    { id: 'skills',     label: 'Skills' },
  ];

  return (
    <>
      <style>{`
        @media print {
          @page { size: A4; margin: 10mm; }
          body > * { display: none !important; }
          #resume-print { display: block !important; }
        }
        #resume-print { display: none; }
      `}</style>

      {/* Builder UI */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">QuickResume Builder</h1>
          <p className="text-sm text-gray-500 mt-1">Fill in your details on the left — the preview updates live on the right.</p>
        </div>

        <div className="flex gap-8 items-start">
          {/* Form */}
          <div className="w-full lg:w-1/2 space-y-4">
            <div className="flex gap-2 flex-wrap">
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    tab === t.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300'
                  }`}>
                  {t.label}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              {tab === 'personal' && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">Personal Information</h3>
                  {(['name', 'email', 'phone', 'location', 'linkedin'] as const).map(f => (
                    <div key={f}>
                      <label className="block text-xs text-gray-500 mb-1 capitalize">
                        {f === 'linkedin' ? 'LinkedIn / Website' : f}
                      </label>
                      <input value={data.personal[f]} onChange={e => setP(f, e.target.value)}
                        placeholder={
                          f === 'name' ? 'Your Full Name' :
                          f === 'email' ? 'email@example.com' :
                          f === 'phone' ? '+91 98765 43210' :
                          f === 'location' ? 'City, State' :
                          'linkedin.com/in/yourname'
                        }
                        className={input} />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Professional Summary</label>
                    <textarea value={data.personal.summary} onChange={e => setP('summary', e.target.value)}
                      placeholder="A brief overview of your professional background and key strengths..."
                      rows={4} className={`${input} resize-none`} />
                  </div>
                </div>
              )}

              {tab === 'experience' && (
                <div className="space-y-6">
                  <h3 className="font-semibold text-gray-800">Work Experience</h3>
                  {data.work.map((w, i) => (
                    <div key={w.id} className="border border-gray-100 rounded-xl p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Experience {i + 1}</span>
                        {data.work.length > 1 && (
                          <button onClick={() => removeWork(w.id)} className="text-xs text-red-400 hover:text-red-600">Remove</button>
                        )}
                      </div>
                      <input value={w.title} onChange={e => setW(w.id, 'title', e.target.value)} placeholder="Job Title" className={input} />
                      <input value={w.company} onChange={e => setW(w.id, 'company', e.target.value)} placeholder="Company Name" className={input} />
                      <div className="grid grid-cols-2 gap-3">
                        <input value={w.startDate} onChange={e => setW(w.id, 'startDate', e.target.value)} placeholder="Start (e.g. Jan 2022)" className={input} />
                        <input value={w.endDate} onChange={e => setW(w.id, 'endDate', e.target.value)} placeholder="End or Present" className={input} />
                      </div>
                      <textarea value={w.description} onChange={e => setW(w.id, 'description', e.target.value)}
                        placeholder="Key responsibilities and achievements..." rows={3} className={`${input} resize-none`} />
                    </div>
                  ))}
                  <button onClick={addWork} className="text-indigo-600 text-sm font-medium hover:text-indigo-800">+ Add Experience</button>
                </div>
              )}

              {tab === 'education' && (
                <div className="space-y-6">
                  <h3 className="font-semibold text-gray-800">Education</h3>
                  {data.education.map((e, i) => (
                    <div key={e.id} className="border border-gray-100 rounded-xl p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Education {i + 1}</span>
                        {data.education.length > 1 && (
                          <button onClick={() => removeEdu(e.id)} className="text-xs text-red-400 hover:text-red-600">Remove</button>
                        )}
                      </div>
                      <input value={e.degree} onChange={ev => setE(e.id, 'degree', ev.target.value)} placeholder="Degree / Course" className={input} />
                      <input value={e.school} onChange={ev => setE(e.id, 'school', ev.target.value)} placeholder="School / University" className={input} />
                      <div className="grid grid-cols-2 gap-3">
                        <input value={e.year} onChange={ev => setE(e.id, 'year', ev.target.value)} placeholder="Year (e.g. 2020)" className={input} />
                        <input value={e.grade} onChange={ev => setE(e.id, 'grade', ev.target.value)} placeholder="Grade / CGPA" className={input} />
                      </div>
                    </div>
                  ))}
                  <button onClick={addEdu} className="text-indigo-600 text-sm font-medium hover:text-indigo-800">+ Add Education</button>
                </div>
              )}

              {tab === 'skills' && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">Skills</h3>
                  <label className="block text-xs text-gray-500">Enter skills separated by commas</label>
                  <textarea value={data.skills} onChange={e => setData(d => ({ ...d, skills: e.target.value }))}
                    placeholder="JavaScript, React, Node.js, Python, Communication, Team Leadership..."
                    rows={6} className={`${input} resize-none`} />
                </div>
              )}
            </div>

            <button onClick={() => window.print()}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-sm">
              ⬇ Download as PDF
            </button>
            <p className="text-xs text-center text-gray-400">
              Tip: In the print dialog, select "Save as PDF" and set margins to "None" for best results.
            </p>
          </div>

          {/* Preview */}
          <div className="hidden lg:block w-1/2">
            <div className="sticky top-6 bg-gray-200 rounded-2xl p-4 overflow-auto" style={{ maxHeight: '85vh' }}>
              <p className="text-xs text-gray-500 text-center mb-3 font-medium uppercase tracking-wide">Live Preview</p>
              <div className="bg-white shadow-lg" style={{ minHeight: '400px' }}>
                <ResumeTemplate data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print-only output */}
      <div id="resume-print">
        <ResumeTemplate data={data} />
      </div>
    </>
  );
}

function ResumeTemplate({ data }: { data: ResumeData }) {
  const skills = data.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="p-10 font-sans text-gray-900 text-sm leading-relaxed">

      {/* Header */}
      <div className="border-b-2 border-indigo-600 pb-5 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {data.personal.name || <span className="text-gray-300">Your Name</span>}
        </h1>
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-gray-500 text-xs">
          {data.personal.email    && <span>✉ {data.personal.email}</span>}
          {data.personal.phone    && <span>📞 {data.personal.phone}</span>}
          {data.personal.location && <span>📍 {data.personal.location}</span>}
          {data.personal.linkedin && <span>🔗 {data.personal.linkedin}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.personal.summary && (
        <Section title="Summary">
          <p className="text-gray-700">{data.personal.summary}</p>
        </Section>
      )}

      {/* Work */}
      {data.work.some(w => w.title || w.company) && (
        <Section title="Work Experience">
          <div className="space-y-4">
            {data.work.filter(w => w.title || w.company).map(w => (
              <div key={w.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-semibold text-gray-900">{w.title}</span>
                    {w.company && <span className="text-indigo-600 ml-2">@ {w.company}</span>}
                  </div>
                  {(w.startDate || w.endDate) && (
                    <span className="text-gray-400 text-xs whitespace-nowrap ml-4">
                      {w.startDate}{w.endDate ? ` – ${w.endDate}` : ''}
                    </span>
                  )}
                </div>
                {w.description && <p className="text-gray-600 mt-1">{w.description}</p>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Education */}
      {data.education.some(e => e.degree || e.school) && (
        <Section title="Education">
          <div className="space-y-3">
            {data.education.filter(e => e.degree || e.school).map(e => (
              <div key={e.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-semibold text-gray-900">{e.degree}</span>
                  {e.school && <span className="text-gray-500 ml-2">· {e.school}</span>}
                </div>
                <div className="text-right ml-4">
                  {e.year  && <span className="text-gray-400 text-xs block">{e.year}</span>}
                  {e.grade && <span className="text-indigo-600 text-xs block">{e.grade}</span>}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <Section title="Skills">
          <div className="flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <span key={i} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium">{s}</span>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-3 border-b border-indigo-100 pb-1">{title}</h2>
      {children}
    </div>
  );
}
