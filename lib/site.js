// ===== वेबसाइट की मुख्य सेटिंग — नाम, लिंक, सोशल हैंडल यहीं बदलें =====
export const site = {
  name: "देवभूमि कथा",
  nameHinglish: "Devbhoomi Katha",
  tagline: "गढ़वाल, हिमाचल और उत्तराखंड के देवी-देवताओं, धामों और लोक कथाओं का संग्रह",
  taglineHinglish: "Garhwal, Himachal aur Uttarakhand ke devi-devtaon, dhamon aur lok kathaon ka sangrah",
  // Vercel पर होस्ट होने के बाद अपना असली लिंक यहाँ डालें (या Vercel में NEXT_PUBLIC_SITE_URL सेट करें)
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://katha.creatorkitly.com",
  // अपने सोशल अकाउंट के लिंक डालें — खाली छोड़ेंगे तो footer में नहीं दिखेंगे
  social: {
    whatsapp: "",
    instagram: "",
    youtube: "https://www.youtube.com/@Charakot_village_kulbir",
    facebook: "https://www.facebook.com/kulbir.singhrawat.37",
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
  { slug: "samachar", hi: "धाम समाचार", hg: "Dham Samachar", icon: "ख़बर", descHi: "गढ़वाल और पहाड़ के मंदिरों, यात्राओं और मेलों की ताज़ा ख़बरें", descHg: "Garhwal aur pahad ke mandiron, yatraon aur melon ki taaza khabrein" },
];

// क्षेत्र (region) — हर कथा के frontmatter में `region: garhwal` / `[garhwal, kumaon]`
export const regions = [
  {
    slug: "garhwal",
    hi: "गढ़वाल",
    hg: "Garhwal",
    icon: "ग",
    descHi: "केदारनाथ, बद्रीनाथ, तुंगनाथ और देवी के सिद्धपीठों की धरती — गढ़वाल के देवी-देवताओं की कथाएँ और धामों की ख़बरें।",
    descHg: "Kedarnath, Badrinath, Tungnath aur Devi ke siddhpeethon ki dharti — Garhwal ke devi-devtaon ki kathayein aur dhamon ki khabrein.",
    introHi: "गढ़वाल उत्तराखंड का वह हिस्सा है जहाँ चारधाम, पंचकेदार, पंचबदरी और अनगिनत देवी मंदिर हैं। चमोली, रुद्रप्रयाग, उत्तरकाशी, टिहरी, पौड़ी, देहरादून और हरिद्वार ज़िलों में फैली इस धरती के हर गाँव का अपना देवता और अपनी जात-यात्रा है। यहाँ पढ़िए गढ़वाल के धामों, देवी-देवताओं, लोक मान्यताओं और यात्राओं से जुड़ी कथाएँ।",
    introHg: "Garhwal Uttarakhand ka woh hissa hai jahan Chardham, Panch Kedar, Panch Badri aur anginat Devi mandir hain. Chamoli, Rudraprayag, Uttarkashi, Tehri, Pauri, Dehradun aur Haridwar zilon mein phaili is dharti ke har gaon ka apna devta aur apni jaat-yatra hai. Yahan padhiye Garhwal ke dhamon, devi-devtaon, lok manyataon aur yatraon se judi kathayein.",
  },
  {
    slug: "himachal",
    hi: "हिमाचल",
    hg: "Himachal",
    icon: "हि",
    descHi: "देवभूमि हिमाचल के देवता, काठकुणी मंदिर और पहाड़ी मान्यताएँ — कुल्लू, मनाली, कांगड़ा और शिमला की कथाएँ।",
    descHg: "Devbhoomi Himachal ke devta, Kath-Kuni mandir aur pahadi manyatayein — Kullu, Manali, Kangra aur Shimla ki kathayein.",
    introHi: "हिमाचल प्रदेश को भी देवभूमि कहा जाता है। कुल्लू घाटी में सैकड़ों ग्राम देवता हैं जो दशहरे पर एक साथ जुटते हैं, और लकड़ी-पत्थर से बने काठकुणी शैली के मंदिर पहाड़ की अनोखी पहचान हैं। यहाँ पढ़िए हिमाचल के देवी-देवताओं, मंदिरों और उनसे जुड़ी मान्यताओं की कथाएँ।",
    introHg: "Himachal Pradesh ko bhi Devbhoomi kaha jaata hai. Kullu ghati mein saikdon gram devta hain jo Dussehre par ek saath jutte hain, aur lakdi-patthar se bane Kath-Kuni shaili ke mandir pahad ki anokhi pehchaan hain. Yahan padhiye Himachal ke devi-devtaon, mandiron aur unse judi manyataon ki kathayein.",
  },
  {
    slug: "kumaon",
    hi: "कुमाऊँ",
    hg: "Kumaon",
    icon: "कु",
    descHi: "गोलू देवता, जागेश्वर और कुमाऊँनी लोक पर्वों की कथाएँ।",
    descHg: "Golu Devta, Jageshwar aur Kumaoni lok parvon ki kathayein.",
    introHi: "कुमाऊँ के अल्मोड़ा, नैनीताल, बागेश्वर, पिथौरागढ़ और चंपावत में न्याय के देवता गोलू, जागेश्वर धाम और घुघुतिया-हरेला जैसे लोक पर्वों की समृद्ध परंपरा है।",
    introHg: "Kumaon ke Almora, Nainital, Bageshwar, Pithoragarh aur Champawat mein nyay ke devta Golu, Jageshwar Dham aur Ghughutiya-Harela jaise lok parvon ki samriddh parampara hai.",
  },
];
export const getRegion = (slug) => regions.find((r) => r.slug === slug);

// हेडर में दिखने वाले लिंक (बाकी श्रेणियाँ मोबाइल मेनू, होमपेज और फ़ुटर में)
export const navLinks = [
  { href: "/kshetra/garhwal", hi: "गढ़वाल", hg: "Garhwal" },
  { href: "/kshetra/himachal", hi: "हिमाचल", hg: "Himachal" },
  { href: "/shreni/pavan-dham", hi: "पावन धाम", hg: "Pavan Dham" },
  { href: "/shreni/devi-devta", hi: "देवी-देवता", hg: "Devi-Devta" },
  { href: "/shreni/aisa-kyon", hi: "ऐसा क्यों?", hg: "Aisa Kyon?" },
  { href: "/shreni/samachar", hi: "समाचार", hg: "Samachar" },
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
