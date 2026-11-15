// ===== वेबसाइट की मुख्य सेटिंग — नाम, लिंक, सोशल हैंडल यहीं बदलें =====
export const site = {
  name: "देवभूमि कथा",
  nameHinglish: "Devbhoomi Katha",
  tagline: "उत्तराखंड के देवी-देवताओं, लोक कथाओं और रहस्यों का संग्रह",
  taglineHinglish: "Uttarakhand ke devi-devtaon, lok kathaon aur rahasyon ka sangrah",
  // Vercel पर होस्ट होने के बाद अपना असली लिंक यहाँ डालें (या Vercel में NEXT_PUBLIC_SITE_URL सेट करें)
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://devbhoomi-katha.vercel.app",
  // अपने सोशल अकाउंट के लिंक डालें — खाली छोड़ेंगे तो footer में नहीं दिखेंगे
  social: {
    whatsapp: "",
    instagram: "",
    youtube: "",
    facebook: "",
    telegram: "",
    x: "",
  },
};

export const categories = [
  { slug: "devi-devta", hi: "देवी-देवता", hg: "Devi-Devta", icon: "ॐ", descHi: "उत्तराखंड के कुलदेवता, ग्राम देवता और शक्तिपीठ", descHg: "Uttarakhand ke kuldevta, gram devta aur shaktipeeth" },
  { slug: "lok-katha", hi: "लोक कथाएँ", hg: "Lok Kathayein", icon: "कथा", descHi: "दादी-नानी से सुनी पहाड़ों की कहानियाँ", descHg: "Dadi-nani se suni pahadon ki kahaniyan" },
  { slug: "pavan-dham", hi: "पावन धाम", hg: "Pavan Dham", icon: "धाम", descHi: "मंदिरों और तीर्थों के पीछे की कथा", descHg: "Mandiron aur teerthon ke peeche ki katha" },
  { slug: "aisa-kyon", hi: "ऐसा क्यों?", hg: "Aisa Kyon?", icon: "?", descHi: "मान्यता, इतिहास और विज्ञान — तीनों नज़रिए से", descHg: "Manyata, itihaas aur vigyan — teeno nazariye se" },
  { slug: "parv-parampara", hi: "पर्व-परंपरा", hg: "Parv-Parampara", icon: "पर्व", descHi: "मेले, यात्राएँ और त्योहार", descHg: "Mele, yatrayein aur tyohar" },
];

export const getCategory = (slug) => categories.find((c) => c.slug === slug) || categories[0];

// अपने आप अनुवाद (Google Translate) के लिए भाषाएँ
export const autoLanguages = [
  { code: "en", label: "English" },
  { code: "mr", label: "मराठी" },
  { code: "gu", label: "ગુજરાતી" },
  { code: "bn", label: "বাংলা" },
  { code: "pa", label: "ਪੰਜਾਬੀ" },
  { code: "ne", label: "नेपाली" },
  { code: "ta", label: "தமிழ்" },
  { code: "te", label: "తెలుగు" },
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "ml", label: "മലയാളം" },
  { code: "ur", label: "اردو" },
];
