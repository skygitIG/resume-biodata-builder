import { useState } from 'react';

interface BiodataData {
  personal: {
    name: string; gender: string; dob: string; tob: string; pob: string;
    height: string; weight: string; complexion: string; bloodGroup: string;
    religion: string; caste: string; subCaste: string; motherTongue: string; maritalStatus: string;
  };
  career: {
    qualification: string; college: string;
    occupation: string; employer: string; income: string; workLocation: string;
  };
  family: {
    fatherName: string; fatherOccupation: string;
    motherName: string; motherOccupation: string;
    brothers: string; sisters: string; familyStatus: string; familyType: string;
  };
  horoscope: {
    rashi: string; nakshatra: string; gotra: string; manglik: string;
  };
  contact: {
    address: string; city: string; state: string; pin: string; mobile: string; email: string;
  };
  preferences: {
    ageRange: string; heightRange: string; education: string; caste: string; other: string;
  };
}

const blank: BiodataData = {
  personal: { name: '', gender: '', dob: '', tob: '', pob: '', height: '', weight: '', complexion: '', bloodGroup: '', religion: '', caste: '', subCaste: '', motherTongue: '', maritalStatus: 'Unmarried' },
  career: { qualification: '', college: '', occupation: '', employer: '', income: '', workLocation: '' },
  family: { fatherName: '', fatherOccupation: '', motherName: '', motherOccupation: '', brothers: '', sisters: '', familyStatus: '', familyType: '' },
  horoscope: { rashi: '', nakshatra: '', gotra: '', manglik: '' },
  contact: { address: '', city: '', state: '', pin: '', mobile: '', email: '' },
  preferences: { ageRange: '', heightRange: '', education: '', caste: '', other: '' },
};

const inp = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300';

const sel = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white';

export default function BiodataBuilder() {
  const [data, setData] = useState<BiodataData>(blank);
  const [tab, setTab] = useState('personal');

  const setSection = <K extends keyof BiodataData>(section: K) =>
    (field: string, value: string) =>
      setData(d => ({ ...d, [section]: { ...d[section], [field]: value } }));

  const sp = setSection('personal');
  const sc = setSection('career');
  const sf = setSection('family');
  const sh = setSection('horoscope');
  const sct = setSection('contact');
  const spr = setSection('preferences');

  const tabs = [
    { id: 'personal',     label: 'Personal' },
    { id: 'career',       label: 'Education & Career' },
    { id: 'family',       label: 'Family' },
    { id: 'horoscope',    label: 'Horoscope' },
    { id: 'contact',      label: 'Contact' },
    { id: 'preferences',  label: 'Preferences' },
  ];

  return (
    <>
      <style>{`
        @media print {
          @page { size: A4; margin: 10mm; }
          body > * { display: none !important; }
          #biodata-print { display: block !important; }
        }
        #biodata-print { display: none; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Marriage Biodata Maker</h1>
          <p className="text-sm text-gray-500 mt-1">Fill in your details — the preview updates live on the right.</p>
        </div>

        <div className="flex gap-8 items-start">
          {/* Form */}
          <div className="w-full lg:w-1/2 space-y-4">
            <div className="flex gap-2 flex-wrap">
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition ${
                    tab === t.id
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-purple-300'
                  }`}>
                  {t.label}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

              {tab === 'personal' && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">Personal Details</h3>
                  <Row>
                    <Field label="Full Name"><input value={data.personal.name} onChange={e => sp('name', e.target.value)} placeholder="Full Name" className={inp} /></Field>
                    <Field label="Gender">
                      <select value={data.personal.gender} onChange={e => sp('gender', e.target.value)} className={sel}>
                        <option value="">Select</option>
                        <option>Male</option><option>Female</option>
                      </select>
                    </Field>
                  </Row>
                  <Row>
                    <Field label="Date of Birth"><input value={data.personal.dob} onChange={e => sp('dob', e.target.value)} placeholder="DD/MM/YYYY" className={inp} /></Field>
                    <Field label="Time of Birth"><input value={data.personal.tob} onChange={e => sp('tob', e.target.value)} placeholder="e.g. 06:30 AM" className={inp} /></Field>
                  </Row>
                  <Field label="Place of Birth"><input value={data.personal.pob} onChange={e => sp('pob', e.target.value)} placeholder="City, State" className={inp} /></Field>
                  <Row>
                    <Field label="Height"><input value={data.personal.height} onChange={e => sp('height', e.target.value)} placeholder='e.g. 5\'7"' className={inp} /></Field>
                    <Field label="Weight"><input value={data.personal.weight} onChange={e => sp('weight', e.target.value)} placeholder="e.g. 65 kg" className={inp} /></Field>
                  </Row>
                  <Row>
                    <Field label="Complexion">
                      <select value={data.personal.complexion} onChange={e => sp('complexion', e.target.value)} className={sel}>
                        <option value="">Select</option>
                        <option>Fair</option><option>Wheatish</option><option>Dusky</option><option>Dark</option>
                      </select>
                    </Field>
                    <Field label="Blood Group"><input value={data.personal.bloodGroup} onChange={e => sp('bloodGroup', e.target.value)} placeholder="e.g. B+" className={inp} /></Field>
                  </Row>
                  <Row>
                    <Field label="Religion"><input value={data.personal.religion} onChange={e => sp('religion', e.target.value)} placeholder="e.g. Hindu" className={inp} /></Field>
                    <Field label="Caste"><input value={data.personal.caste} onChange={e => sp('caste', e.target.value)} placeholder="e.g. Brahmin" className={inp} /></Field>
                  </Row>
                  <Row>
                    <Field label="Sub Caste"><input value={data.personal.subCaste} onChange={e => sp('subCaste', e.target.value)} placeholder="Sub Caste" className={inp} /></Field>
                    <Field label="Mother Tongue"><input value={data.personal.motherTongue} onChange={e => sp('motherTongue', e.target.value)} placeholder="e.g. Hindi" className={inp} /></Field>
                  </Row>
                  <Field label="Marital Status">
                    <select value={data.personal.maritalStatus} onChange={e => sp('maritalStatus', e.target.value)} className={sel}>
                      <option>Unmarried</option><option>Divorced</option><option>Widowed</option>
                    </select>
                  </Field>
                </div>
              )}

              {tab === 'career' && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">Education & Career</h3>
                  <Field label="Highest Qualification"><input value={data.career.qualification} onChange={e => sc('qualification', e.target.value)} placeholder="e.g. B.Tech, MBA" className={inp} /></Field>
                  <Field label="College / University"><input value={data.career.college} onChange={e => sc('college', e.target.value)} placeholder="College name" className={inp} /></Field>
                  <Field label="Occupation"><input value={data.career.occupation} onChange={e => sc('occupation', e.target.value)} placeholder="e.g. Software Engineer" className={inp} /></Field>
                  <Field label="Employer / Business"><input value={data.career.employer} onChange={e => sc('employer', e.target.value)} placeholder="Company or Business name" className={inp} /></Field>
                  <Row>
                    <Field label="Annual Income"><input value={data.career.income} onChange={e => sc('income', e.target.value)} placeholder="e.g. ₹8 LPA" className={inp} /></Field>
                    <Field label="Work Location"><input value={data.career.workLocation} onChange={e => sc('workLocation', e.target.value)} placeholder="City" className={inp} /></Field>
                  </Row>
                </div>
              )}

              {tab === 'family' && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">Family Details</h3>
                  <Row>
                    <Field label="Father's Name"><input value={data.family.fatherName} onChange={e => sf('fatherName', e.target.value)} placeholder="Father's full name" className={inp} /></Field>
                    <Field label="Father's Occupation"><input value={data.family.fatherOccupation} onChange={e => sf('fatherOccupation', e.target.value)} placeholder="Occupation" className={inp} /></Field>
                  </Row>
                  <Row>
                    <Field label="Mother's Name"><input value={data.family.motherName} onChange={e => sf('motherName', e.target.value)} placeholder="Mother's full name" className={inp} /></Field>
                    <Field label="Mother's Occupation"><input value={data.family.motherOccupation} onChange={e => sf('motherOccupation', e.target.value)} placeholder="Occupation / Homemaker" className={inp} /></Field>
                  </Row>
                  <Row>
                    <Field label="Brothers"><input value={data.family.brothers} onChange={e => sf('brothers', e.target.value)} placeholder="e.g. 1 (Married)" className={inp} /></Field>
                    <Field label="Sisters"><input value={data.family.sisters} onChange={e => sf('sisters', e.target.value)} placeholder="e.g. 2 (1 Married)" className={inp} /></Field>
                  </Row>
                  <Row>
                    <Field label="Family Status">
                      <select value={data.family.familyStatus} onChange={e => sf('familyStatus', e.target.value)} className={sel}>
                        <option value="">Select</option>
                        <option>Middle Class</option><option>Upper Middle Class</option><option>Rich</option><option>Affluent</option>
                      </select>
                    </Field>
                    <Field label="Family Type">
                      <select value={data.family.familyType} onChange={e => sf('familyType', e.target.value)} className={sel}>
                        <option value="">Select</option>
                        <option>Nuclear</option><option>Joint</option>
                      </select>
                    </Field>
                  </Row>
                </div>
              )}

              {tab === 'horoscope' && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">Horoscope Details</h3>
                  <Row>
                    <Field label="Rashi (Moon Sign)"><input value={data.horoscope.rashi} onChange={e => sh('rashi', e.target.value)} placeholder="e.g. Mesh / Aries" className={inp} /></Field>
                    <Field label="Nakshatra (Star)"><input value={data.horoscope.nakshatra} onChange={e => sh('nakshatra', e.target.value)} placeholder="e.g. Rohini" className={inp} /></Field>
                  </Row>
                  <Row>
                    <Field label="Gotra"><input value={data.horoscope.gotra} onChange={e => sh('gotra', e.target.value)} placeholder="e.g. Kashyap" className={inp} /></Field>
                    <Field label="Manglik">
                      <select value={data.horoscope.manglik} onChange={e => sh('manglik', e.target.value)} className={sel}>
                        <option value="">Select</option>
                        <option>Yes</option><option>No</option><option>Partial</option>
                      </select>
                    </Field>
                  </Row>
                </div>
              )}

              {tab === 'contact' && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">Contact Details</h3>
                  <Field label="Residential Address">
                    <textarea value={data.contact.address} onChange={e => sct('address', e.target.value)} placeholder="House No, Street, Area" rows={2} className={`${inp} resize-none`} />
                  </Field>
                  <Row>
                    <Field label="City"><input value={data.contact.city} onChange={e => sct('city', e.target.value)} placeholder="City" className={inp} /></Field>
                    <Field label="State"><input value={data.contact.state} onChange={e => sct('state', e.target.value)} placeholder="State" className={inp} /></Field>
                  </Row>
                  <Row>
                    <Field label="PIN Code"><input value={data.contact.pin} onChange={e => sct('pin', e.target.value)} placeholder="PIN Code" className={inp} /></Field>
                    <Field label="Mobile"><input value={data.contact.mobile} onChange={e => sct('mobile', e.target.value)} placeholder="+91 98765 43210" className={inp} /></Field>
                  </Row>
                  <Field label="Email"><input value={data.contact.email} onChange={e => sct('email', e.target.value)} placeholder="email@example.com" className={inp} /></Field>
                </div>
              )}

              {tab === 'preferences' && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">Partner Preferences</h3>
                  <Row>
                    <Field label="Age Range"><input value={data.preferences.ageRange} onChange={e => spr('ageRange', e.target.value)} placeholder="e.g. 24–28 years" className={inp} /></Field>
                    <Field label="Height Range"><input value={data.preferences.heightRange} onChange={e => spr('heightRange', e.target.value)} placeholder='e.g. 5\'4" – 5\'8"' className={inp} /></Field>
                  </Row>
                  <Row>
                    <Field label="Education"><input value={data.preferences.education} onChange={e => spr('education', e.target.value)} placeholder="e.g. Graduate & above" className={inp} /></Field>
                    <Field label="Caste Preference"><input value={data.preferences.caste} onChange={e => spr('caste', e.target.value)} placeholder="e.g. Any / Same caste" className={inp} /></Field>
                  </Row>
                  <Field label="Other Preferences">
                    <textarea value={data.preferences.other} onChange={e => spr('other', e.target.value)} placeholder="Any other preferences..." rows={3} className={`${inp} resize-none`} />
                  </Field>
                </div>
              )}
            </div>

            <button onClick={() => window.print()}
              className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition shadow-sm">
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
              <div className="bg-white shadow-lg">
                <BiodataTemplate data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print-only output */}
      <div id="biodata-print">
        <BiodataTemplate data={data} />
      </div>
    </>
  );
}

function BiodataTemplate({ data }: { data: BiodataData }) {
  return (
    <div className="font-sans text-gray-900 text-sm" style={{ padding: '24px' }}>
      {/* Decorative Header */}
      <div className="text-center mb-6 pb-5 border-b-4 border-double border-purple-300">
        <div className="text-purple-400 text-lg mb-1">✦ ✦ ✦</div>
        <h1 className="text-2xl font-bold text-purple-800 uppercase tracking-widest mb-1">Marriage Biodata</h1>
        <div className="w-32 h-px bg-purple-300 mx-auto mb-3"></div>
        <p className="text-3xl font-bold text-gray-900">{data.personal.name || <span className="text-gray-300">Your Name</span>}</p>
        {data.personal.gender && <p className="text-purple-600 font-medium mt-1">{data.personal.gender}</p>}
      </div>

      {/* Personal Details */}
      <BDSection title="Personal Details" color="purple">
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          <BDRow label="Date of Birth"   value={data.personal.dob} />
          <BDRow label="Time of Birth"   value={data.personal.tob} />
          <BDRow label="Place of Birth"  value={data.personal.pob} />
          <BDRow label="Height"          value={data.personal.height} />
          <BDRow label="Weight"          value={data.personal.weight} />
          <BDRow label="Complexion"      value={data.personal.complexion} />
          <BDRow label="Blood Group"     value={data.personal.bloodGroup} />
          <BDRow label="Religion"        value={data.personal.religion} />
          <BDRow label="Caste"           value={data.personal.caste} />
          <BDRow label="Sub Caste"       value={data.personal.subCaste} />
          <BDRow label="Mother Tongue"   value={data.personal.motherTongue} />
          <BDRow label="Marital Status"  value={data.personal.maritalStatus} />
        </div>
      </BDSection>

      {/* Education & Career */}
      {(data.career.qualification || data.career.occupation) && (
        <BDSection title="Education & Career" color="purple">
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            <BDRow label="Qualification"  value={data.career.qualification} />
            <BDRow label="College"        value={data.career.college} />
            <BDRow label="Occupation"     value={data.career.occupation} />
            <BDRow label="Employer"       value={data.career.employer} />
            <BDRow label="Annual Income"  value={data.career.income} />
            <BDRow label="Work Location"  value={data.career.workLocation} />
          </div>
        </BDSection>
      )}

      {/* Family */}
      {(data.family.fatherName || data.family.motherName) && (
        <BDSection title="Family Details" color="purple">
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            <BDRow label="Father's Name"       value={data.family.fatherName} />
            <BDRow label="Father's Occupation" value={data.family.fatherOccupation} />
            <BDRow label="Mother's Name"       value={data.family.motherName} />
            <BDRow label="Mother's Occupation" value={data.family.motherOccupation} />
            <BDRow label="Brothers"            value={data.family.brothers} />
            <BDRow label="Sisters"             value={data.family.sisters} />
            <BDRow label="Family Status"       value={data.family.familyStatus} />
            <BDRow label="Family Type"         value={data.family.familyType} />
          </div>
        </BDSection>
      )}

      {/* Horoscope */}
      {(data.horoscope.rashi || data.horoscope.nakshatra) && (
        <BDSection title="Horoscope" color="purple">
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            <BDRow label="Rashi"     value={data.horoscope.rashi} />
            <BDRow label="Nakshatra" value={data.horoscope.nakshatra} />
            <BDRow label="Gotra"     value={data.horoscope.gotra} />
            <BDRow label="Manglik"   value={data.horoscope.manglik} />
          </div>
        </BDSection>
      )}

      {/* Contact */}
      {(data.contact.mobile || data.contact.email || data.contact.city) && (
        <BDSection title="Contact Details" color="purple">
          {data.contact.address && <BDRow label="Address" value={`${data.contact.address}${data.contact.city ? `, ${data.contact.city}` : ''}${data.contact.state ? `, ${data.contact.state}` : ''}${data.contact.pin ? ' – ' + data.contact.pin : ''}`} />}
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-2">
            <BDRow label="Mobile" value={data.contact.mobile} />
            <BDRow label="Email"  value={data.contact.email} />
          </div>
        </BDSection>
      )}

      {/* Preferences */}
      {(data.preferences.ageRange || data.preferences.education || data.preferences.other) && (
        <BDSection title="Partner Preferences" color="purple">
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            <BDRow label="Age Range"   value={data.preferences.ageRange} />
            <BDRow label="Height"      value={data.preferences.heightRange} />
            <BDRow label="Education"   value={data.preferences.education} />
            <BDRow label="Caste"       value={data.preferences.caste} />
          </div>
          {data.preferences.other && <p className="mt-2 text-gray-600 text-xs">{data.preferences.other}</p>}
        </BDSection>
      )}

      <div className="text-center mt-6 text-purple-300 text-lg">✦ ✦ ✦</div>
    </div>
  );
}

function BDSection({ title, children, color }: { title: string; children: React.ReactNode; color: string }) {
  return (
    <div className="mb-5">
      <h2 className={`text-xs font-bold uppercase tracking-widest text-${color}-700 bg-${color}-50 px-3 py-1 rounded mb-3 border-l-4 border-${color}-400`}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function BDRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex gap-2 text-xs">
      <span className="text-gray-400 whitespace-nowrap font-medium min-w-[100px]">{label}:</span>
      <span className="text-gray-800 font-semibold">{value}</span>
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-4">{children}</div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-gray-500 mb-1">{label}</label>
      {children}
    </div>
  );
}
