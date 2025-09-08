"use client";

import React, { useState, useEffect } from "react";

export default function BusinessProfilePage() {
  // Initialize theme from localStorage, default to "light" if not set
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  // Effect to toggle the 'dark' class
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

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
  const [jobPosition, setJobPosition] = useState("Job Position"); // Valor inicial actualizado
  const [repPhone, setRepPhone] = useState("");

  const [street, setStreet] = useState("470 W 200 NUnit 115");
  const [city, setCity] = useState("Salt Lake City");
  const [zip, setZip] = useState("84103");
  const [state, setState] = useState("Utah");
  const [country, setCountry] = useState("United States");
  const [timezone, setTimezone] = useState("GMT-06:00 America/Denver (MDT)");
  const [platformLang, setPlatformLang] = useState("English (United States)");
  const [outboundLang, setOutboundLang] = useState("English (United States)"); // Valor inicial actualizado

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
  // Opciones de Job Positions actualizadas según la imagen 2
  const jobPositions = [
    "Job Position",
    "Director",
    "GM",
    "VP",
    "CEO",
    "CFO",
    "General Counsel",
    "Other"
  ];
  const businessTypes = ["Pick Business Type"];
  const businessIndustries = ["Pick Business Industry"];
  const businessRegIdTypes = ["Pick Business Registration ID Type"];
  const timezones = ["GMT-06:00 America/Denver (MDT)", "GMT-05:00 America/Chicago (CDT)"];
  const platformLanguages = ["English (United States)", "Spanish (Latin America)"];
  // Opciones de Outbound Language actualizadas según la imagen 1
  const outboundLanguages = ["English (United States)", "Spanish (United States)"];


  // Business Niche options from the image
  const nicheOptions = [
    "Abarth Dealer",
    "Aboriginal Art Gallery",
    "Abrasives Supplier",
    "Abundant Life Church",
    "Acai Shop",
  ];

  // Business Currency options from A to Z based on the images
  const currencyOptions = [
    "AED - United Arab Emirates Dirham (AED)",
    "AFN - Afghan Afghani (Af)",
    "ALL - Albanian Lek (ALL)",
    "AMD - Armenian Dram (AMD)",
    "ANG - Netherlands Antillean Guilder (ANG)",
    "AOA - Angolan Kwanza (Kz)",
    "ARS - Argentine Peso (ARS)",
    "AUD - Australian Dollar (AUD)",
    "AWG - Aruban Florin (AWG)",
    "AZN - Azerbaijani Manat (man.)",
    "BAM - Bosnia-Herzegovina Convertible Mark (KM)",
    "BBD - Barbados Dollar (Bds$)",
    "BDT - Bangladesh Taka (Tk)",
    "BGN - Bulgarian Lev (BGN)",
    "BHD - Bahraini Dinar (BD)",
    "BIF - Burundian Franc (FBu)",
    "BMD - Bermudian Dollar (BD$)",
    "BND - Brunei Dollar (B$)",
    "BOB - Bolivian Boliviano (Bs)",
    "BRL - Brazilian Real (R$)",
    "BSD - Bahamian Dollar (BSD)",
    "BTN - Bhutanese Ngultrum (Nu.)",
    "BWP - Botswanan Pula (P)",
    "BYN - Belarusian Ruble (Br)",
    "BZD - Belize Dollar (BZ$)",
    "CAD - Canadian Dollar (CA$)",
    "CDF - Congolese Franc (FC)",
    "CHF - Swiss Franc (CHF)",
    "CLP - Chilean Peso (CLP)",
    "CNY - Chinese Yuan (¥)",
    "COP - Colombian Peso (COL$)",
    "CRC - Costa Rican Colón (₡)",
    "CUC - Cuban Convertible Peso (CUC$)",
    "CUP - Cuban Peso (CU$)",
    "CVE - Cape Verdean Escudo (CVE)",
    "CZK - Czech Koruna (Kč)",
    "DJF - Djiboutian Franc (Fdj)",
    "DKK - Danish Krone (DKK)",
    "DOP - Dominican Peso (RD$)",
    "DZD - Algerian Dinar (DA)",
    "EGP - Egyptian Pound (EGP)",
    "ERN - Eritrean Nakfa (Nfk)",
    "ETB - Ethiopian Birr (ETB)",
    "EUR - Euro (€)",
    "FJD - Fijian Dollar (FJD)",
    "FKP - Falkland Islands Pound (FK£)",
    "GBP - British Pound (£)",
    "GEL - Georgian Lari (₾)",
    "GGP - Guernsey Pound (GGP)",
    "GHS - Ghanaian Cedi (GH₵)",
    "GIP - Gibraltar Pound (GIP)",
    "GMD - Gambian Dalasi (D)",
    "GNF - Guinean Franc (FG)",
    "GTQ - Guatemalan Quetzal (Q)",
    "GYD - Guyanese Dollar (GY$)",
    "HKD - Hong Kong Dollar (HK$)",
    "HNL - Honduran Lempira (L)",
    "HRK - Croatian Kuna (HRK)",
    "HTG - Haitian Gourde (G)",
    "HUF - Hungarian Forint (Ft)",
    "IDR - Indonesian Rupiah (Rp)",
    "ILS - Israeli New Shekel (₪)",
    "IMP - Isle of Man Pound (IMP)",
    "INR - Indian Rupee (₹)",
    "IQD - Iraqi Dinar (IQD)",
    "IRR - Iranian Rial (IRR)",
    "ISK - Icelandic Króna (ISK)",
    "JMD - Jamaican Dollar (J$)",
    "JOD - Jordanian Dinar (JD)",
    "JPY - Japanese Yen (¥)",
    "KES - Kenyan Shilling (KSh)",
    "KGS - Kyrgyzstani Som (сом)",
    "KHR - Cambodian Riel (KHR)",
    "KMF - Comorian Franc (CF)",
    "KPW - North Korean Won (KPW)",
    "KRW - South Korean Won (₩)",
    "KWD - Kuwaiti Dinar (KD)",
    "KYD - Cayman Islands Dollar (KY$)",
    "KZT - Kazakhstani Tenge (₸)",
    "LAK - Lao Kip (LAK)",
    "LBP - Lebanese Pound (L£)",
    "LKR - Sri Lankan Rupee (Rs)",
    "LRD - Liberian Dollar (LR$)",
    "LSL - Lesotho Loti (L)",
    "LYD - Libyan Dinar (LD)",
    "MAD - Moroccan Dirham (MAD)",
    "MDL - Moldovan Leu (MDL)",
    "MGA - Malagasy Ariary (Ar)",
    "MKD - Macedonian Denar (MKD)",
    "MMK - Burmese Kyat (K)",
    "MNT - Mongolian Tugrik (₮)",
    "MOP - Macanese Pataca (MOP$)",
    "MRU - Mauritanian Ouguiya (UM)",
    "MUR - Mauritian Rupee (Rs)",
    "MVR - Maldivian Rufiyaa (Rf)",
    "MWK - Malawian Kwacha (MK)",
    "MXN - Mexican Peso (MX$)",
    "MYR - Malaysian Ringgit (RM)",
    "MZN - Mozambican Metical (MT)",
    "NAD - Namibian Dollar (N$)",
    "NGN - Nigerian Naira (₦)",
    "NIO - Nicaraguan Córdoba (C$)",
    "NOK - Norwegian Krone (NOK)",
    "NPR - Nepalese Rupee (Rs)",
    "NZD - New Zealand Dollar (NZ$)",
    "OMR - Omani Rial (OMR)",
    "PAB - Panamanian Balboa (B/.)",
    "PEN - Peruvian Sol (S/.)",
    "PGK - Papua New Guinean Kina (K)",
    "PHP - Philippine Peso (₱)",
    "PKR - Pakistani Rupee (Rs)",
    "PLN - Polish Złoty (zł)",
    "PYG - Paraguayan Guaraní (₲)",
    "QAR - Qatari Riyal (QR)",
    "RON - Romanian Leu (RON)",
    "RSD - Serbian Dinar (RSD)",
    "RUB - Russian Ruble (₽)",
    "RWF - Rwandan Franc (RWF)",
    "SAR - Saudi Riyal (SR)",
    "SBD - Solomon Islands Dollar (SI$)",
    "SCR - Seychellois Rupee (SR)",
    "SDG - Sudanese Pound (SDG)",
    "SEK - Swedish Krona (SEK)",
    "SGD - Singapore Dollar (S$)",
    "SHP - Saint Helena Pound (SHP)",
    "SLL - Sierra Leonean Leone (Le)",
    "SOS - Somali Shilling (Sh)",
    "SRD - Surinamese Dollar (SRD)",
    "SSP - South Sudanese Pound (SSP)",
    "STN - São Tomé and Príncipe Dobra (Db)",
    "SVC - Salvadoran Colón (₡)",
    "SYP - Syrian Pound (LS)",
    "SZL - Swazi Lilangeni (L)",
    "THB - Thai Baht (฿)",
    "TJS - Tajikistani Somoni (SM)",
    "TMT - Turkmenistan Manat (T)",
    "TND - Tunisian Dinar (DT)",
    "TOP - Tongan Paʻanga (T$)",
    "TRY - Turkish Lira (₺)",
    "TTD - Trinidad and Tobago Dollar (TT$)",
    "TWD - New Taiwan Dollar (NT$)",
    "TZS - Tanzanian Shilling (TSh)",
    "UAH - Ukrainian Hryvnia (₴)",
    "UGX - Ugandan Shilling (USh)",
    "USD - US Dollar ($)",
    "UYU - Uruguayan Peso (UY$)",
    "UZS - Uzbekistani Som (UZS)",
    "VES - Venezuelan Bolívar (Bs.S)",
    "VND - Vietnamese Đồng (₫)",
    "VUV - Vanuatu Vatu (VT)",
    "WST - Samoan Tala (WS$)",
    "XAF - Central African CFA Franc (FCFA)",
    "XCD - East Caribbean Dollar (EC$)",
    "XOF - West African CFA Franc (CFA)",
    "XPF - CFP Franc (CFP)",
    "YER - Yemeni Rial (YR)",
    "ZAR - South African Rand (R)",
    "ZMW - Zambian Kwacha (ZK)",
    "ZWL - Zimbabwean Dollar (ZWL)"
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto bg-background text-foreground min-h-screen">
      {/* Título principal */}
      <h1 className="text-3xl font-bold mb-1 text-foreground">Business Profile Settings</h1>
      <p className="text-muted-foreground mb-6">Manage your business profile information &amp; settings</p>

      {/* 1. General Information */}
      <div className="bg-card rounded border border-border shadow-sm mb-8">
        <div className="flex justify-between items-center border-b border-border px-6 py-4">
          <span className="font-semibold text-lg text-foreground">General Information</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Location ID</span>
            <span className="cursor-pointer text-muted-foreground" onClick={() => navigator.clipboard.writeText("3wYQAKdN2qE3Nzo1KB4I")} title="Copy ID">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
              </svg>
            </span>
            <span className="text-xs text-muted-foreground"><b>3wYQAKdN2qE3Nzo1KB4I</b></span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="flex flex-col items-center justify-center w-48 h-32 bg-muted rounded border border-border">
              {logo ? (
                <img src={URL.createObjectURL(logo)} alt="Business Logo" className="w-48 h-32 object-contain" />
              ) : (
                <span className="text-4xl text-muted-foreground">＋</span>
              )}
              <div className="text-xs text-muted-foreground mt-2 text-center">
                Business Logo<br />
                The proposed size is 350px * 180px. No bigger than 2.5 MB
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  className="text-primary text-sm border border-border px-3 py-1 rounded"
                  onClick={() => document.querySelector('input[type="file"]').click()}
                >
                  Upload
                </button>
                <button
                  className="text-destructive text-sm border border-border px-3 py-1 rounded"
                  onClick={() => setLogo(null)}
                  disabled={!logo}
                >
                  Remove
                </button>
                <input type="file" className="hidden" onChange={e => setLogo(e.target.files?.[0] || null)} />
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground">Friendly Business Name</label>
                <input
                  className="w-full border border-border rounded px-3 py-2 bg-input text-foreground focus:ring-primary focus:ring-1"
                  value={friendlyName}
                  onChange={e => setFriendlyName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground">
                  Legal Business Name <span className="cursor-pointer text-muted-foreground">&#9432;</span>
                </label>
                <input
                  className="w-full border border-border rounded px-3 py-2 bg-input text-foreground focus:ring-primary focus:ring-1"
                  value={legalName}
                  onChange={e => setLegalName(e.target.value)}
                />
                <div className="text-xs text-muted-foreground mt-1">
                  Enter the exact legal business name, as registered with the EIN
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1 text-muted-foreground">Business Email</label>
                  <input
                    className="w-full border border-border rounded px-3 py-2 bg-input text-foreground focus:ring-primary focus:ring-1"
                    value={businessEmail}
                    onChange={e => setBusinessEmail(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1 text-muted-foreground">Business Phone</label>
                  <input
                    className="w-full border border-border rounded px-3 py-2 bg-input text-foreground focus:ring-primary focus:ring-1"
                    value={businessPhone}
                    onChange={e => setBusinessPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1 text-muted-foreground">
                    Branded Domain <span className="cursor-pointer text-muted-foreground">&#9432;</span>
                  </label>
                  <input
                    className="w-full border border-border rounded px-3 py-2 bg-input text-foreground focus:ring-primary focus:ring-1"
                    value={brandedDomain}
                    onChange={e => setBrandedDomain(e.target.value)}
                  />
                </div>
                <button
                  className="self-end mt-5 border border-border px-3 py-1 rounded text-muted-foreground text-sm"
                  disabled
                >
                  + Add Domain
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground">Business Website</label>
                <input
                  className="w-full border border-border rounded px-3 py-2 bg-input text-foreground focus:ring-primary focus:ring-1"
                  value={businessWebsite}
                  onChange={e => setBusinessWebsite(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1 text-muted-foreground">Business Niche</label>
                  <select
                    className="w-full border border-border rounded px-3 py-2 bg-input text-foreground focus:ring-primary focus:ring-1 appearance-none"
                    value={businessNiche}
                    onChange={e => setBusinessNiche(e.target.value)}
                  >
                    <option value="">Choose one...</option>
                    {nicheOptions.map(n => <option key={n}>{n}</option>)}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1 text-muted-foreground">
                    Business Currency <span className="cursor-pointer text-muted-foreground">&#9432;</span>
                  </label>
                  <select
                    className="w-full border border-border rounded px-3 py-2 bg-input text-foreground focus:ring-primary focus:ring-1 appearance-none"
                    value={businessCurrency}
                    onChange={e => setBusinessCurrency(e.target.value)}
                  >
                    <option value="">Choose one...</option>
                    {currencyOptions.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <label className="block text-sm font-medium text-muted-foreground">
                  API Key <span className="cursor-pointer text-muted-foreground">&#9432;</span>
                </label>
                <input
                  className="border border-border rounded px-3 py-2 flex-1 bg-input text-foreground"
                  value={apiKey}
                  readOnly
                />
                <button
                  className="text-primary text-sm"
                  type="button"
                  onClick={() => setApiKey("GENERATED_KEY")}
                >
                  Generate Key
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded font-medium">
              Update Information
            </button>
          </div>
        </div>
      </div>

      {/* 2. Business Information */}
      <div className="bg-card rounded border border-border shadow-sm mb-8">
        <div className="border-b border-border px-6 py-4 font-semibold text-lg text-foreground">Business Information</div>
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-muted-foreground">Business Type</label>
            <select
              className="w-full border border-border rounded px-3 py-2 bg-input text-foreground focus:ring-primary focus:ring-1"
              value={businessType}
              onChange={e => setBusinessType(e.target.value)}
            >
              {businessTypes.map(t => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-muted-foreground">Business Industry</label>
            <select
              className="w-full border border-border rounded px-3 py-2 bg-input text-foreground focus:ring-primary focus:ring-1"
              value={businessIndustry}
              onChange={e => setBusinessIndustry(e.target.value)}
            >
              {businessIndustries.map(i => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-muted-foreground">Business Registration ID Type</label>
            <select
              className="w-full border border-border rounded px-3 py-2 bg-input text-foreground focus:ring-primary focus:ring-1"
              value={businessRegIdType}
              onChange={e => setBusinessRegIdType(e.target.value)}
            >
              {businessRegIdTypes.map(i => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-muted-foreground">Business Registration Number</label>
            <input
              className="w-full border border-border rounded px-3 py-2 bg-input text-foreground focus:ring-primary focus:ring-1 disabled:bg-muted disabled:cursor-not-allowed"
              value={businessRegNum}
              onChange={e => setBusinessRegNum(e.target.value)}
              placeholder="Business Registration Number"
              disabled={notRegistered}
            />
            <label className="flex items-center gap-2 mt-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={notRegistered}
                onChange={() => setNotRegistered(v => !v)}
                className="form-checkbox h-4 w-4 rounded bg-input border-border text-primary focus:ring-primary"
              />
              My business is Not registered
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-muted-foreground">Business Regions of Operations</label>
            <div className="flex flex-col gap-2 mt-2">
              {regionOptions.map(region => (
                <label key={region} className="flex items-center gap-2 text-sm text-foreground">
                  <input
                    type="checkbox"
                    checked={regions.includes(region)}
                    onChange={() =>
                      setRegions(prevRegions =>
                        prevRegions.includes(region)
                          ? prevRegions.filter(r => r !== region)
                          : [...prevRegions, region]
                      )
                    }
                    className="form-checkbox h-4 w-4 rounded bg-input border-border text-primary focus:ring-primary"
                  />
                  <span>{region}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded font-medium">
              Update Information
            </button>
          </div>
        </div>
      </div>

      {/* 3. Looking for Call & Voicemail Settings? (Using the existing alert) */}
      <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-700 dark:text-yellow-400 rounded p-4 mb-8 flex items-center gap-4">
        <span className="text-2xl">&#9888;</span>
        <div>
          <div className="font-medium mb-1">Looking for Call &amp; Voicemail Settings?</div>
          <div className="text-sm mb-2">
            You can now find these settings under 'Voicemail and Missed Call Text-Back' in 'Advanced Settings'
          </div>
          <button className="border border-current text-sm rounded px-4 py-1 font-medium flex items-center gap-2 hover:bg-yellow-500/10">
            Go to Call &amp; Voicemail Settings <span className="text-lg">&#8594;</span>
          </button>
        </div>
      </div>

      {/* 4. Business Physical Address (Updated to match Image 1) */}
      <div className="bg-card rounded border border-border shadow-sm mb-8">
        <div className="border-b border-border px-6 py-4 font-semibold text-lg text-foreground">
            Business Physical Address <span className="cursor-pointer text-muted-foreground">&#9432;</span>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-muted-foreground">
              Street Address <span className="cursor-pointer text-muted-foreground">&#9432;</span>
            </label>
            <input
              className="w-full border border-border rounded px-3 py-2 bg-input text-foreground focus:ring-primary focus:ring-1"
              value={street}
              onChange={e => setStreet(e.target.value)}
            />
          </div>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1 text-muted-foreground">City</label>
              <input
                className="w-full border border-border rounded px-3 py-2 bg-input text-foreground focus:ring-primary focus:ring-1"
                value={city}
                onChange={e => setCity(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1 text-muted-foreground">Postal/Zip Code</label>
              <input
                className="w-full border border-border rounded px-3 py-2 bg-input text-foreground focus:ring-primary focus:ring-1"
                value={zip}
                onChange={e => setZip(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-muted-foreground">State / Prov / Region</label>
            <select
                className="w-full border border-border rounded px-3 py-2 bg-input text-foreground focus:ring-primary focus:ring-1"
                value={state}
                onChange={e => setState(e.target.value)}
            >
                <option>Utah</option> {/* Puedes añadir más opciones si es necesario */}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-muted-foreground">Country</label>
            <select
              className="w-full border border-border rounded px-3 py-2 bg-input text-foreground focus:ring-primary focus:ring-1"
              value={country}
              onChange={e => setCountry(e.target.value)}
            >
              <option>United States</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-muted-foreground">
              Time Zone <span className="text-destructive">*</span>
            </label>
            <select
              className="w-full border border-border rounded px-3 py-2 bg-input text-foreground focus:ring-primary focus:ring-1"
              value={timezone}
              onChange={e => setTimezone(e.target.value)}
            >
              {timezones.map(tz => (
                <option key={tz}>{tz}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-muted-foreground">
              Platform Language <span className="cursor-pointer text-muted-foreground">&#9432;</span>
            </label>
            <select
              className="w-full border border-border rounded px-3 py-2 bg-input text-foreground focus:ring-primary focus:ring-1"
              value={platformLang}
              onChange={e => setPlatformLang(e.target.value)}
            >
              {platformLanguages.map(lang => (
                <option key={lang}>{lang}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-muted-foreground">
              Outbound communication language for custom values <span className="cursor-pointer text-muted-foreground">&#9432;</span>
            </label>
            <select
                className="w-full border border-border rounded px-3 py-2 bg-input text-foreground focus:ring-primary focus:ring-1"
                value={outboundLang}
                onChange={e => setOutboundLang(e.target.value)}
            >
                {outboundLanguages.map(lang => (
                    <option key={lang}>{lang}</option>
                ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded font-medium">
              Update
            </button>
          </div>
        </div>
      </div>
      
      {/* 5. Authorized Representative */}
      <div className="bg-card rounded border border-border shadow-sm mb-8">
        <div className="border-b border-border px-6 py-4 font-semibold text-lg text-foreground">Authorized Representative</div>
        <div className="p-6">
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1 text-muted-foreground">First Name</label>
              <input
                className="w-full border border-border rounded px-3 py-2 bg-input text-foreground focus:ring-primary focus:ring-1"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                placeholder="First Name"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1 text-muted-foreground">Last Name</label>
              <input
                className="w-full border border-border rounded px-3 py-2 bg-input text-foreground focus:ring-primary focus:ring-1"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-muted-foreground">Representative Email</label>
            <input
              className="w-full border border-border rounded px-3 py-2 bg-input text-foreground focus:ring-primary focus:ring-1"
              value={repEmail}
              onChange={e => setRepEmail(e.target.value)}
              placeholder="Representative Email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-muted-foreground">Job Position</label>
            <select
              className="w-full border border-border rounded px-3 py-2 bg-input text-foreground focus:ring-primary focus:ring-1"
              value={jobPosition}
              onChange={e => setJobPosition(e.target.value)}
            >
              {jobPositions.map(j => (
                <option key={j}>{j}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-muted-foreground">Phone Number (Con Código de País)</label>
            <input
              className="w-full border border-border rounded px-3 py-2 bg-input text-foreground focus:ring-primary focus:ring-1"
              value={repPhone}
              onChange={e => setRepPhone(e.target.value)}
              placeholder="Número de Teléfono (Con Código de País)"
            />
          </div>
          <div className="flex justify-end">
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded font-medium">
              Update Information
            </button>
          </div>
        </div>
      </div>

      {/* 6. General */}
      <div className="bg-card rounded border border-border shadow-sm mb-8">
        <div className="border-b border-border px-6 py-4 font-semibold text-lg text-foreground">General</div>
        <div className="p-6">
          <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-700 dark:text-yellow-400 rounded p-4 mb-6 flex items-center gap-4">
            <span className="text-2xl">&#9888;</span>
            <div>
              <div className="font-medium mb-1">Looking for Allow Duplicate Opportunity Settings?</div>
              <div className="text-sm mb-2">
                You can now find these settings under Objects &gt; Opportunities &gt; Details, alongside other opportunity-specific configurations.
              </div>
              <button className="border border-current text-sm rounded px-4 py-1 font-medium flex items-center gap-2 hover:bg-yellow-500/10">
                Go to Opportunities Settings <span className="text-lg">&#8594;</span>
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={mergeFacebook}
                onChange={() => setMergeFacebook(v => !v)}
                className="form-checkbox h-4 w-4 rounded bg-input border-border text-primary focus:ring-primary"
              />
              Merge Facebook Contacts By Name <span className="cursor-pointer text-muted-foreground" title="Merge Facebook contacts by name">&#9432;</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={disableTimezone}
                onChange={() => setDisableTimezone(v => !v)}
                className="form-checkbox h-4 w-4 rounded bg-input border-border text-primary focus:ring-primary"
              />
              Disable Contact Timezone
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={botDetection}
                onChange={() => setBotDetection(v => !v)}
                className="form-checkbox h-4 w-4 rounded bg-input border-border text-primary focus:ring-primary"
              />
              Bot Detection Preventing Statistics Increment and Automation Execution <span className="cursor-pointer text-muted-foreground" title="Bot detection">&#9432;</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={verifyEmail}
                onChange={() => setVerifyEmail(v => !v)}
                className="form-checkbox h-4 w-4 rounded bg-input border-border text-primary focus:ring-primary"
              />
              Verify Email Address when first email is sent to a new contact. <span className="cursor-pointer text-muted-foreground" title="Verify email">&#9432;</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={makeCompliant}
                onChange={() => setMakeCompliant(v => !v)}
                className="form-checkbox h-4 w-4 rounded bg-input border-border text-primary focus:ring-primary"
              />
              Make Email compliant by adding an Unsubscribe link in your email. <span className="cursor-pointer text-muted-foreground" title="How does it work?">&#9432;</span>
              <a href="#" className="text-primary text-sm">How does it work?</a>
            </label>
            <div className="flex items-center gap-2">
              <input
                className="flex-1 border border-border rounded px-3 py-2 bg-muted text-muted-foreground"
                value="If you no longer wish to receive these emails you may /*unsubscribe*/, Udreamms LLC"
                readOnly
                disabled={!makeCompliant}
              />
              <button
                className="border border-border px-3 py-1 rounded text-muted-foreground text-sm"
                disabled={!makeCompliant}
              >
                Customize
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Contact Deduplication Preferences */}
      <div className="bg-card rounded border border-border shadow-sm mb-8">
        <div className="border-b border-border px-6 py-4 font-semibold text-lg text-foreground">Contact Deduplication Preferences</div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <label className="font-medium text-foreground">Allow Duplicate Contact</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={allowDuplicateContact}
                onChange={() => setAllowDuplicateContact(v => !v)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:bg-primary transition-all"></div>
              <div
                className="absolute left-1 top-1 bg-background w-4 h-4 rounded-full shadow-md transition-all peer-checked:translate-x-5"
              ></div>
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-muted-foreground">Find existing contacts based on</label>
            <select className="w-full border border-border rounded px-3 py-2 bg-input text-foreground focus:ring-primary focus:ring-1">
              <option>Phone</option> {/* Actualizado según la imagen 3 */}
              <option>Email</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-muted-foreground">Second preference for search (Optional)</label>
            <select className="w-full border border-border rounded px-3 py-2 bg-input text-foreground focus:ring-primary focus:ring-1">
              <option>Phone</option>
            </select>
          </div>
        </div>
      </div>
      
    </div>
  );
}