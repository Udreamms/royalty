import React, { useState } from "react";

export default function BusinessProfilePage() {
  // Estados para los checkboxes y switches
  const [mergeFacebook, setMergeFacebook] = useState(false);
  const [disableTimezone, setDisableTimezone] = useState(false);
  const [botDetection, setBotDetection] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [makeCompliant, setMakeCompliant] = useState(true);
  const [allowDuplicateContact, setAllowDuplicateContact] = useState(false);

  // Estados para los formularios
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [repEmail, setRepEmail] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [repPhone, setRepPhone] = useState("");

  const [street, setStreet] = useState("470 W 200 NUnit 115");
  const [city, setCity] = useState("Salt Lake City");
  const [zip, setZip] = useState("84103");
  const [state, setState] = useState("Utah");
  const [country, setCountry] = useState("United States");
  const [timezone, setTimezone] = useState("GMT-06:00 America/Denver (MDT)");
  const [platformLang, setPlatformLang] = useState("English (United States)");
  const [outboundLang, setOutboundLang] = useState("");

  const [businessRegNum, setBusinessRegNum] = useState("");
  const [notRegistered, setNotRegistered] = useState(false);
  const [regions, setRegions] = useState<string[]>([]);
  const [brandedDomain, setBrandedDomain] = useState("");
  const [businessWebsite, setBusinessWebsite] = useState("");
  const [businessNiche, setBusinessNiche] = useState("");
  const [businessCurrency, setBusinessCurrency] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [businessIndustry, setBusinessIndustry] = useState("");
  const [businessRegIdType, setBusinessRegIdType] = useState("");

  // Estados para la información general
  const [friendlyName, setFriendlyName] = useState("Udreamms LLC");
  const [legalName, setLegalName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("joseph.flores.jc@gmail.com");
  const [businessPhone, setBusinessPhone] = useState("(650) 784-0581");

  // Estados para la imagen
  const [logo, setLogo] = useState<File | null>(null);

  // Opciones de ejemplo
  const regionOptions = ["Africa", "Asia", "Europe", "Latin America", "USA and Canada"];
  const jobPositions = ["CEO", "Manager", "Sales", "Job Position"];
  const businessTypes = ["Pick Business Type"];
  const businessIndustries = ["Pick Business Industry"];
  const businessRegIdTypes = ["Pick Business Registration ID Type"];
  const currencies = ["Choose one..", "USD", "EUR", "MXN"];
  const timezones = ["GMT-06:00 America/Denver (MDT)", "GMT-05:00 America/Chicago (CDT)"];
  const platformLanguages = ["English (United States)", "Spanish (Latin America)"];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Título principal */}
      <h1 className="text-3xl font-bold mb-1">Business Profile Settings</h1>
      <p className="text-gray-500 mb-6">Manage your business profile information &amp; settings</p>

      {/* General Information */}
      <div className="bg-white rounded border shadow mb-8">
        <div className="flex justify-between items-center border-b px-6 py-4">
          <span className="font-semibold text-lg">General Information</span>
          <span className="text-xs text-gray-500">Location ID <b>3wYQAKdN2qE3Nzo1KB4I</b></span>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="flex flex-col items-center justify-center w-48 h-32 bg-gray-100 rounded">
              {logo ? (
                <img src={URL.createObjectURL(logo)} alt="Business Logo" className="w-32 h-20 object-contain" />
              ) : (
                <span className="text-5xl text-gray-400">+</span>
              )}
              <div className="text-xs text-gray-500 mt-2 text-center">
                Business Logo<br />
                The proposed size is 350px * 180px. No bigger than 2.5 MB
              </div>
              <div className="flex gap-2 mt-2">
                <label className="cursor-pointer text-blue-600 text-sm">
                  <input type="file" className="hidden" onChange={e => setLogo(e.target.files?.[0] || null)} />
                  Upload
                </label>
                <button
                  className="text-blue-600 text-sm"
                  onClick={() => setLogo(null)}
                  disabled={!logo}
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Friendly Business Name</label>
                <input className="w-full border rounded px-3 py-2" value={friendlyName} onChange={e => setFriendlyName(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Legal Business Name <span title="Enter the exact legal business name, as registered with the EIN" className="text-gray-400 cursor-pointer">&#9432;</span></label>
                <input className="w-full border rounded px-3 py-2" value={legalName} onChange={e => setLegalName(e.target.value)} />
                <div className="text-xs text-gray-400 mt-1">Enter the exact legal business name, as registered with the EIN</div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Business Email</label>
                  <input className="w-full border rounded px-3 py-2" value={businessEmail} onChange={e => setBusinessEmail(e.target.value)} />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Business Phone</label>
                  <input className="w-full border rounded px-3 py-2" value={businessPhone} onChange={e => setBusinessPhone(e.target.value)} />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Branded Domain <span title="" className="text-gray-400 cursor-pointer">&#9432;</span></label>
                  <input className="w-full border rounded px-3 py-2" value={brandedDomain} onChange={e => setBrandedDomain(e.target.value)} />
                </div>
                <button className="self-end mt-5 border px-3 py-1 rounded text-gray-500 text-sm" disabled>+ Add Domain</button>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Business Website</label>
                <input className="w-full border rounded px-3 py-2" value={businessWebsite} onChange={e => setBusinessWebsite(e.target.value)} />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Business Niche</label>
                  <select className="w-full border rounded px-3 py-2" value={businessNiche} onChange={e => setBusinessNiche(e.target.value)}>
                    <option>Business Niche</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Business Currency <span title="" className="text-gray-400 cursor-pointer">&#9432;</span></label>
                  <select className="w-full border rounded px-3 py-2" value={businessCurrency} onChange={e => setBusinessCurrency(e.target.value)}>
                    {currencies.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <label className="block text-sm font-medium">API Key <span title="" className="text-gray-400 cursor-pointer">&#9432;</span></label>
                <input className="border rounded px-3 py-2 flex-1" value={apiKey} readOnly />
                <button className="text-blue-600 text-sm" type="button" onClick={() => setApiKey("GENERATED_KEY")}>Generate Key</button>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded font-medium">Update Information</button>
          </div>
        </div>
      </div>

      {/* General Section */}
      <div className="bg-white rounded border shadow mb-8">
        <div className="border-b px-6 py-4 font-semibold text-lg">General</div>
        <div className="p-6">
          <div className="bg-orange-50 border border-orange-200 rounded p-4 mb-6 flex items-center gap-4">
            <span className="text-orange-500 text-2xl">&#9888;</span>
            <div>
              <div className="font-medium text-orange-700 mb-1">Looking for Allow Duplicate Opportunity Settings?</div>
              <div className="text-sm text-orange-700 mb-2">
                You can now find these settings under Objects &gt; Opportunities &gt; Details, alongside other opportunity-specific configurations.
              </div>
              <button className="border border-orange-500 text-orange-700 rounded px-4 py-1 font-medium flex items-center gap-2">
                Go to Opportunities Settings <span className="text-lg">&#8594;</span>
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={mergeFacebook} onChange={() => setMergeFacebook(v => !v)} />
              Merge Facebook Contacts By Name <span className="text-gray-400 cursor-pointer" title="Merge Facebook contacts by name">&#9432;</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={disableTimezone} onChange={() => setDisableTimezone(v => !v)} />
              Disable Contact Timezone
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={botDetection} onChange={() => setBotDetection(v => !v)} />
              Bot Detection Preventing Statistics Increment and Automation Execution <span className="text-gray-400 cursor-pointer" title="Bot detection">&#9432;</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={verifyEmail} onChange={() => setVerifyEmail(v => !v)} />
              Verify Email Address when first email is sent to a new contact. <span className="text-gray-400 cursor-pointer" title="Verify email">&#9432;</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={makeCompliant} onChange={() => setMakeCompliant(v => !v)} />
              Make Email compliant by adding an Unsubscribe link in your email. <span className="text-gray-400 cursor-pointer" title="How does it work?">&#9432;</span>
              <a href="#" className="text-blue-600 text-sm ml-1">How does it work?</a>
            </label>
            <div className="flex items-center gap-2">
              <input
                className="flex-1 border rounded px-3 py-2 bg-gray-100"
                value="If you no longer wish to receive these emails you may /*unsubscribe*/, Udreamms LLC"
                readOnly
                disabled={!makeCompliant}
              />
              <button className="border px-3 py-1 rounded text-gray-500 text-sm" disabled={!makeCompliant}>Customize</button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Deduplication Preferences */}
      <div className="bg-white rounded border shadow mb-8">
        <div className="border-b px-6 py-4 font-semibold text-lg">Contact Deduplication Preferences</div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <label className="font-medium">Allow Duplicate Contact</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={allowDuplicateContact} onChange={() => setAllowDuplicateContact(v => !v)} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 transition-all"></div>
              <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow-md transition-all ${allowDuplicateContact ? "translate-x-5" : ""}`}></div>
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Find existing contacts based on</label>
            <select className="w-full border rounded px-3 py-2">
              <option>Email</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Second preference for search (Optional)</label>
            <select className="w-full border rounded px-3 py-2">
              <option>Phone</option>
            </select>
          </div>
        </div>
      </div>

      {/* Authorized Representative */}
      <div className="bg-white rounded border shadow mb-8">
        <div className="border-b px-6 py-4 font-semibold text-lg">Authorized Representative</div>
        <div className="p-6">
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input className="w-full border rounded px-3 py-2" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input className="w-full border rounded px-3 py-2" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Representative Email</label>
            <input className="w-full border rounded px-3 py-2" value={repEmail} onChange={e => setRepEmail(e.target.value)} placeholder="Representative Email" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Job Position</label>
            <select className="w-full border rounded px-3 py-2" value={jobPosition} onChange={e => setJobPosition(e.target.value)}>
              {jobPositions.map(j => <option key={j}>{j}</option>)}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Phone Number (With Country Code)</label>
            <input className="w-full border rounded px-3 py-2" value={repPhone} onChange={e => setRepPhone(e.target.value)} placeholder="Phone Number (With Country Code)" />
          </div>
          <div className="flex justify-end">
            <button className="bg-blue-600 text-white px-6 py-2 rounded font-medium">Update Information</button>
          </div>
        </div>
      </div>

      {/* Dirección y otros datos */}
      <div className="bg-white rounded border shadow mb-8">
        <div className="p-6">
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Street Address <span className="text-gray-400 cursor-pointer">&#9432;</span></label>
              <input className="w-full border rounded px-3 py-2" value={street} onChange={e => setStreet(e.target.value)} />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">City</label>
              <input className="w-full border rounded px-3 py-2" value={city} onChange={e => setCity(e.target.value)} />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Postal/Zip Code</label>
              <input className="w-full border rounded px-3 py-2" value={zip} onChange={e => setZip(e.target.value)} />
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">State / Prov / Region</label>
              <input className="w-full border rounded px-3 py-2" value={state} onChange={e => setState(e.target.value)} />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Country</label>
              <select className="w-full border rounded px-3 py-2" value={country} onChange={e => setCountry(e.target.value)}>
                <option>United States</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Time Zone <span className="text-red-500">*</span></label>
              <select className="w-full border rounded px-3 py-2" value={timezone} onChange={e => setTimezone(e.target.value)}>
                {timezones.map(tz => <option key={tz}>{tz}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Platform Language <span className="text-gray-400 cursor-pointer">&#9432;</span></label>
              <select className="w-full border rounded px-3 py-2" value={platformLang} onChange={e => setPlatformLang(e.target.value)}>
                {platformLanguages.map(lang => <option key={lang}>{lang}</option>)}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Outbound communication language for custom values <span className="text-gray-400 cursor-pointer">&#9432;</span></label>
              <input className="w-full border rounded px-3 py-2" value={outboundLang} onChange={e => setOutboundLang(e.target.value)} />
            </div>
          </div>
          <div className="flex justify-end">
            <button className="bg-blue-600 text-white px-6 py-2 rounded font-medium">Update</button>
          </div>
        </div>
      </div>

      {/* Business Registration Number y regiones */}
      <div className="bg-white rounded border shadow mb-8">
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Business Registration Number</label>
            <input className="w-full border rounded px-3 py-2" value={businessRegNum} onChange={e => setBusinessRegNum(e.target.value)} placeholder="Business Registration Number" />
            <label className="flex items-center gap-2 mt-2">
              <input type="checkbox" checked={notRegistered} onChange={() => setNotRegistered(v => !v)} />
              My business is Not registered
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Business Regions of Operations</label>
            <div className="flex flex-col gap-1">
              {regionOptions.map(region => (
                <label key={region} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={regions.includes(region)}
                    onChange={() =>
                      setRegions(regions =>
                        regions.includes(region)
                          ? regions.filter(r => r !== region)
                          : [...regions, region]
                      )
                    }
                  />
                  {region}
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button className="bg-blue-600 text-white px-6 py-2 rounded font-medium">Update Information</button>
          </div>
        </div>
      </div>

      {/* Alerta Call & Voicemail */}
      <div className="bg-orange-50 border border-orange-200 rounded p-4 mb-8 flex items-center gap-4">
        <span className="text-orange-500 text-2xl">&#9888;</span>
        <div>
          <div className="font-medium text-orange-700 mb-1">Looking for Call &amp; Voicemail Settings?</div>
          <div className="text-sm text-orange-700 mb-2">
            You can now find these settings under 'Voicemail and Missed Call Text-Back' in 'Advanced Settings'
          </div>
          <button className="border border-orange-500 text-orange-700 rounded px-4 py-1 font-medium flex items-center gap-2">
            Go to Call &amp; Voicemail Settings <span className="text-lg">&#8594;</span>
          </button>
        </div>
      </div>

      {/* Business Physical Address */}
      <div className="bg-white rounded border shadow mb-8">
        <div className="border-b px-6 py-4 font-semibold text-lg">Business Physical Address <span className="text-gray-400 cursor-pointer">&#9432;</span></div>
        <div className="p-6">
          <label className="block text-sm font-medium mb-1">Street Address <span className="text-gray-400 cursor-pointer">&#9432;</span></label>
          <input className="w-full border rounded px-3 py-2 mb-4" value={street} onChange={e => setStreet(e.target.value)} />
        </div>
      </div>

      {/* Business Information */}
      <div className="bg-white rounded border shadow mb-8">
        <div className="border-b px-6 py-4 font-semibold text-lg">Business Information</div>
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Business Type</label>
            <select className="w-full border rounded px-3 py-2" value={businessType} onChange={e => setBusinessType(e.target.value)}>
              {businessTypes.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Business Industry</label>
            <select className="w-full border rounded px-3 py-2" value={businessIndustry} onChange={e => setBusinessIndustry(e.target.value)}>
              {businessIndustries.map(i => <option key={i}>{i}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Business Registration ID Type</label>
            <select className="w-full border rounded px-3 py-2" value={businessRegIdType} onChange={e => setBusinessRegIdType(e.target.value)}>
              {businessRegIdTypes.map(i => <option key={i}>{i}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
