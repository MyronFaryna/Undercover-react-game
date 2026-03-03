export const WORD_BANK = {
  Food: [
    { word: "PIZZA", hint: "Food" },
    { word: "SUSHI", hint: "Food" },
    { word: "BURGER", hint: "Food" },
    { word: "PASTA", hint: "Food" },
    { word: "SALAD", hint: "Food" },
    { word: "TACO", hint: "Food" },
    { word: "STEAK", hint: "Food" },
    { word: "OMELETTE", hint: "Food" },
    { word: "ICE CREAM", hint: "Dessert" },
    { word: "PANCAKES", hint: "Dessert" },
  ],
  Places: [
    { word: "PARIS", hint: "City" },
    { word: "ATHENS", hint: "City" },
    { word: "LONDON", hint: "City" },
    { word: "AIRPORT", hint: "Place" },
    { word: "BEACH", hint: "Place" },
    { word: "CINEMA", hint: "Place" },
    { word: "HOSPITAL", hint: "Place" },
    { word: "SCHOOL", hint: "Place" },
    { word: "MUSEUM", hint: "Place" },
    { word: "PARK", hint: "Place" },
  ],
  Jobs: [
    { word: "TEACHER", hint: "Job" },
    { word: "DOCTOR", hint: "Job" },
    { word: "LAWYER", hint: "Job" },
    { word: "CHEF", hint: "Job" },
    { word: "PILOT", hint: "Job" },
    { word: "NURSE", hint: "Job" },
    { word: "PROGRAMMER", hint: "Job" },
    { word: "DESIGNER", hint: "Job" },
  ],
  Animals: [
    { word: "TIGER", hint: "Animal" },
    { word: "DOG", hint: "Animal" },
    { word: "CAT", hint: "Animal" },
    { word: "DOLPHIN", hint: "Animal" },
    { word: "EAGLE", hint: "Animal" },
    { word: "PANDA", hint: "Animal" },
  ],
};

// Helper: flatten all categories into one big list
export const ALL_WORDS = Object.values(WORD_BANK).flat();