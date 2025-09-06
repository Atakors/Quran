import { Surah, Step } from './types';

export const SURAHS_DATA: Surah[] = [
  {
    id: 103,
    name: "العصر",
    englishName: "Al-Asr",
    frenchName: "Al-Asr",
    ayahs: [
      { id: 1, arabic: "وَالْعَصْرِ", english: "By time," },
      { id: 2, arabic: "إِنَّ الْإِنسَانَ لَفِي خُsسْرٍ", english: "Indeed, mankind is in loss," },
      { id: 3, arabic: "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ", english: "Except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience." },
    ],
  },
  {
    id: 109,
    name: "الكافرون",
    englishName: "Al-Kafirun",
    frenchName: "Al-Kafirun",
    ayahs: [
      { id: 1, arabic: "قُلْ يَا أَيُّهَا الْكَافِرُونَ", english: "Say, 'O disbelievers," },
      { id: 2, arabic: "لَا أَعْبُدُ مَا تَعْبُدُونَ", english: "I do not worship what you worship." },
      { id: 3, arabic: "وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ", english: "Nor are you worshippers of what I worship." },
      { id: 4, arabic: "وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ", english: "Nor will I be a worshipper of what you worship." },
      { id: 5, arabic: "وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ", english: "Nor will you be worshippers of what I worship." },
      { id: 6, arabic: "لَكُمْ دِينُكُمْ وَلِيَ دِينِ", english: "For you is your religion, and for me is my religion.'" },
    ],
  },
  {
    id: 110,
    name: "النصر",
    englishName: "An-Nasr",
    frenchName: "An-Nasr",
    ayahs: [
      { id: 1, arabic: "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ", english: "When the victory of Allah has come and the conquest," },
      { id: 2, arabic: "وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا", english: "And you see the people entering into the religion of Allah in multitudes," },
      { id: 3, arabic: "فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا", english: "Then exalt [Him] with praise of your Lord and ask forgiveness of Him. Indeed, He is ever Accepting of repentance." },
    ],
  },
  {
    id: 111,
    name: "المسد",
    englishName: "Al-Masad",
    frenchName: "Al-Masad",
    ayahs: [
      { id: 1, arabic: "تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ", english: "May the hands of Abu Lahab be ruined, and ruined is he." },
      { id: 2, arabic: "مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ", english: "His wealth will not avail him or that which he gained." },
      { id: 3, arabic: "سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ", english: "He will [enter to] burn in a Fire of [blazing] flame" },
      { id: 4, arabic: "وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ", english: "And his wife [as well] - the carrier of firewood." },
      { id: 5, arabic: "فِي جِيدِهَا حَبْلٌ مِّن مَّسَدٍ", english: "Around her neck is a rope of [twisted] fiber." },
    ],
  },
  {
    id: 112,
    name: "الإخلاص",
    englishName: "Al-Ikhlas",
    frenchName: "Al-Ikhlas",
    ayahs: [
      { id: 1, arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ", english: "Say, He is Allah, [who is] One." },
      { id: 2, arabic: "اللَّهُ الصَّمَدُ", english: "Allah, the Eternal Refuge." },
      { id: 3, arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ", english: "He neither begets nor is born," },
      { id: 4, arabic: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", english: "Nor is there to Him any equivalent." },
    ],
  },
  {
    id: 113,
    name: "الفلق",
    englishName: "Al-Falaq",
    frenchName: "Al-Falaq",
    ayahs: [
      { id: 1, arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", english: "Say, I seek refuge in the Lord of daybreak" },
      { id: 2, arabic: "مِن شَرِّ مَا خَلَقَ", english: "From the evil of that which He created" },
      { id: 3, arabic: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", english: "And from the evil of darkness when it settles" },
      { id: 4, arabic: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", english: "And from the evil of the blowers in knots" },
      { id: 5, arabic: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", english: "And from the evil of an envier when he envies." },
    ],
  },
  {
    id: 114,
    name: "الناس",
    englishName: "An-Nas",
    frenchName: "An-Nas",
    ayahs: [
      { id: 1, arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", english: "Say, I seek refuge in the Lord of mankind," },
      { id: 2, arabic: "مَلِكِ النَّاسِ", english: "The Sovereign of mankind." },
      { id: 3, arabic: "إِلَٰهِ النَّاسِ", english: "The God of mankind," },
      { id: 4, arabic: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", english: "From the evil of the retreating whisperer," },
      { id: 5, arabic: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", english: "Who whispers [evil] into the breasts of mankind," },
      { id: 6, arabic: "مِنَ الْجِنَّةِ وَالنَّاسِ", english: "From among the jinn and mankind." },
    ],
  },
];

export function getLocalizedSurahName(surah: Surah, lang: string): string {
  switch (lang) {
    case 'fr':
      return surah.frenchName;
    case 'ar':
      return surah.name;
    case 'en':
    default:
      return surah.englishName;
  }
}

export const WUDU_STEPS: Step[] = [
  { id: 1, title: "Niyyah (Intention)", description: "Make the intention in your heart to perform Wudu for purification.", imageUrl: "https://picsum.photos/seed/wudu1/300/200" },
  { id: 2, title: "Say Bismillah", description: "Begin by saying 'Bismillah' (In the name of Allah).", imageUrl: "https://picsum.photos/seed/wudu2/300/200" },
  { id: 3, title: "Wash Hands", description: "Wash both hands up to the wrists three times, starting with the right.", imageUrl: "https://picsum.photos/seed/wudu3/300/200" },
  { id: 4, title: "Rinse Mouth", description: "Rinse your mouth with water three times.", imageUrl: "https://picsum.photos/seed/wudu4/300/200" },
  { id: 5, title: "Sniff Water into Nose", description: "Gently sniff water into your nostrils and blow it out three times.", imageUrl: "https://picsum.photos/seed/wudu5/300/200" },
  { id: 6, title: "Wash Face", description: "Wash your entire face from forehead to chin and ear to ear three times.", imageUrl: "https://picsum.photos/seed/wudu6/300/200" },
  { id: 7, title: "Wash Arms", description: "Wash your right arm up to the elbow three times, then your left arm similarly.", imageUrl: "https://picsum.photos/seed/wudu7/300/200" },
  { id: 8, title: "Wipe Head (Masah)", description: "Wipe your head with wet hands from front to back and then back to front once.", imageUrl: "https://picsum.photos/seed/wudu8/300/200" },
  { id: 9, title: "Wipe Ears", description: "Wipe the inside and outside of your ears with wet fingers once.", imageUrl: "https://picsum.photos/seed/wudu9/300/200" },
  { id: 10, title: "Wash Feet", description: "Wash your right foot up to the ankle three times, then your left foot similarly.", imageUrl: "https://picsum.photos/seed/wudu10/300/200" },
  { id: 11, title: "Recite Shahada", description: "Conclude by reciting the Shahada.", imageUrl: "https://picsum.photos/seed/wudu11/300/200" },
];

export const PRAYER_STEPS_FAJR: Step[] = [ // Example for Fajr
  { id: 1, title: "Niyyah (Intention)", description: "Make the intention for Fajr prayer.", imageUrl: "https://picsum.photos/seed/salah1/300/200" },
  { id: 2, title: "Takbiratul Ihram", description: "Say 'Allahu Akbar' raising hands to ears/shoulders.", imageUrl: "https://picsum.photos/seed/salah2/300/200" },
  { id: 3, title: "Qiyam (Standing)", description: "Recite Surah Al-Fatiha and another Surah.", imageUrl: "https://picsum.photos/seed/salah3/300/200" },
  { id: 4, title: "Ruku (Bowing)", description: "Bow down, saying 'Subhana Rabbiyal Adheem' (3 times).", imageUrl: "https://picsum.photos/seed/salah4/300/200" },
  { id: 5, title: "Stand up from Ruku", description: "Say 'Sami'Allahu liman hamidah', then 'Rabbana wa lakal hamd'.", imageUrl: "https://picsum.photos/seed/salah5/300/200" },
  { id: 6, title: "Sujud (Prostration)", description: "Prostrate, saying 'Subhana Rabbiyal A'la' (3 times).", imageUrl: "https://picsum.photos/seed/salah6/300/200" },
  { id: 7, title: "Jalsa (Sitting between Sujud)", description: "Sit briefly, say 'Rabbighfir li'.", imageUrl: "https://picsum.photos/seed/salah7/300/200" },
  { id: 8, title: "Second Sujud", description: "Prostrate again, saying 'Subhana Rabbiyal A'la' (3 times).", imageUrl: "https://picsum.photos/seed/salah8/300/200" },
  { id: 9, title: "Second Rak'ah", description: "Stand up for the second unit and repeat steps 3-8.", imageUrl: "https://picsum.photos/seed/salah9/300/200" },
  { id: 10, title: "Tashahhud", description: "After the second Sujud of the second Rak'ah, sit for Tashahhud.", imageUrl: "https://picsum.photos/seed/salah10/300/200" },
  { id: 11, title: "Tasleem (Salutations)", description: "Turn head to the right saying 'Assalamu Alaikum wa Rahmatullah', then to the left similarly.", imageUrl: "https://picsum.photos/seed/salah11/300/200" },
];

export const GEMINI_API_KEY = process.env.API_KEY; // Will be undefined in browser, must be handled.
export const GEMINI_MODEL_TEXT = 'gemini-2.5-flash';
// No image generation model used in this app.

export const ARABIC_NORMALIZATION_MAP: Record<string, string> = {
  'أ': 'ا', 'إ': 'ا', 'آ': 'ا', 'ٱ': 'ا', // Alifs
  'ى': 'ي', // Alef Maksura to Ya
  // Basic diacritics (vowels) - often best to remove for comparison if source text may or may not have them
  'َ': '', 'ُ': '', 'ِ': '', 'ً': '', 'ٌ': '', 'ٍ': '', 'ْ': '', 'ّ': ''
};

export function normalizeArabicText(text: string): string {
  let normalized = text;
  for (const char in ARABIC_NORMALIZATION_MAP) {
    normalized = normalized.replace(new RegExp(char, 'g'), ARABIC_NORMALIZATION_MAP[char]);
  }
  // Remove all other diacritics (covers more than the map for simplicity here)
  normalized = normalized.replace(/[\u064B-\u065F]/g, '');
  // Remove Tatweel
  normalized = normalized.replace(/\u0640/g, '');
  // Optional: remove small alifs, etc. if necessary
  return normalized.trim();
}