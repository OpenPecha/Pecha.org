export const SignUpModalKind = {
  AddConnection: Symbol("Add Connection"),
  AddToSheet: Symbol("Add to Sheet"),
  AddTranslation: Symbol("Add Translation"),
  Follow: Symbol("Follow"),
  Notes: Symbol("Notes"),
  Save: Symbol("Save"),
  Default: Symbol("Default"),
};

const signUpModalContent = {
  [SignUpModalKind.AddConnection]: {
    h2: {
      en: "Want to document a connection to another text?",
      he: "רוצים לתעד חיבור לטקסט נוסף?",
    },
    h3: {
      en: "Create a free account to do more on Sefaria",
      he: "פתחו חשבון משתמש בחינם - ותוכלו לעשות הרבה יותר עם ספריא",
    },
    contentList: [
      {
        icon: "tools-add-connection-white.svg",
        bulletContent: {
          en: "Add interconnections & translations",
          he: "הוסיפו תרגומים וחיבורים בין טקסטים",
        },
      },
      {
        icon: "sheetsplus-white.svg",
        bulletContent: {
          en: "Build & share source sheets",
          he: "בנו ושתפו דפי מקורות",
        },
      },
      {
        icon: "note-white.png",
        bulletContent: { en: "Take notes", he: "མཆན་བཀོད།" },
      },
      {
        icon: "email-white.png",
        bulletContent: {
          en: "Get updates on new texts",
          he: "התעדכנו בטקסטים חדשים הנוספים לספרייה",
        },
      },
    ],
  },
  [SignUpModalKind.AddToSheet]: {
    h2: {
      en: "Want to make your own source sheet?",
      he: "ཁྱེད་རང་ཉིད་ཀྱི་ཤོག་ངོས་བཟོ་འདོད་དམ།",
    },
    h3: {
      en: "Create a free account to join the conversation",
      he: "རིན་མེད་ཁ་བྱང་ཞིག་བཟོས་ཏེ་གླེང་མོལ་ནང་མཉམ་གཞུགས་བྱོས།",
    },
    contentList: [
      {
        icon: "sheetsplus-white.svg",
        bulletContent: {
          en: "Build & share source sheets",
          he: "ཤོག་ངོས་བཟོས་ཏེ་བརྒྱུད་སྐུར་བྱོས།",
        },
      },
      {
        icon: "star-white.png",
        bulletContent: { en: "Save texts", he: "ཟིན་བྲིས་ཉར་ཚགས།"},
      },
      {
        icon: "note-white.svg",
        bulletContent: { en: "Take notes", he: "མཆན་བཀོད།" },
      },
      {
        icon: "share-icon-white.svg",
        bulletContent: {
          en: "Connect with other users",
          he: "གཞན་དང་མཉམ་དུ་སྦྲེལ་མཐུད་བྱེད།",
        },
      },
    ],
  },
  [SignUpModalKind.AddTranslation]: {
    h2: {
      en: "Have your own translation of this text?",
      he: "יש לכם תרגום משלכם לטקסט זה?",
    },
    h3: {
      en: "Create a free account to add it to the library & do more on Sefaria",
      he: "פתחו חשבון משתמש בחינם כדי להוסיף אותו לספרייה - ועוד:",
    },
    contentList: [
      {
        icon: "sheetsplus-white.svg",
        bulletContent: {
          en: "Build & share source sheets",
          he: "בנו ושתפו דפי מקורות",
        },
      },
      {
        icon: "star-white.png",
        bulletContent: { en: "Save texts", he: "ཟིན་བྲིས་ཉར་ཚགས།" },
      },
      {
        icon: "note-white.svg",
        bulletContent: { en: "Take notes", he: "མཆན་བཀོད།" },
      },
      {
        icon: "share-icon-white.svg",
        bulletContent: {
          en: "Connect with other users",
          he: "התחברו עם משתמשי ספריא אחרים",
        },
      },
    ],
  },
  [SignUpModalKind.Follow]: {
    h2: {
      en: "Want to connect with other Sefaria users?",
      he: "רוצים להתחבר עם משתמשים אחרים בספריא?",
    },
    h3: {
      en: "Create a free account to join the conversation",
      he: "פתחו חשבון משתמש בחינם והצטרפו לשיח",
    },
    contentList: [
      {
        icon: "profile-white.svg",
        bulletContent: {
          en: "Follow your favorite creators",
          he: "עקבו אחרי היוצרים האהובים עליכם",
        },
      },
      {
        icon: "sheetsplus-white.svg",
        bulletContent: {
          en: "Build & share source sheets",
          he: "בנו ושתפו דפי מקורות",
        },
      },
      {
        icon: "note-white.svg",
        bulletContent: { en: "Send messages", he: "שלחו הודעות דרך ספריא" },
      },
    ],
  },
  [SignUpModalKind.Notes]: {
    h2: { en: "Don’t lose that thought!", he: "ཁྱེད་ཀྱི་གོ་རྟོགས་གསར་པ་དེ་མ་བརླགས་པར་བྱེད་དགོས།" },
    h3: {
      en: "Create a free account to do more on Sefaria",
      he: "དཔེ་ཆ་དྲ་བའི་ཆ་རྐྱེན་ཚང་མ་སྤྱོད་པ་ལ། རིན་མེད་ཐོག་ནས་ཐོ་འགོད་གྱིས།",
    },
    contentList: [
      {
        icon: "note-white.svg",
        bulletContent: {
          en: "Take notes on this text",
          he: "ཡིག་ཆ་འདི་ལ་མཆན་རྒྱོབས།",
        },
      },
      {
        icon: "sheetsplus-white.svg",
        bulletContent: {
          en: "Build & share source sheets",
          he: "ཟིན་བྲིས་གསར་བཟོ་དང་འགྲེམས་སྤེལ།",
        },
      },
      {
        icon: "share-icon-white.svg",
        bulletContent: {
          en: "Connect with other users",
          he: "དཔེ་ཀློག་པ་གཞན་དང་གྲོགས་འབྲེལ་བཟོ་བ།",
        },
      },
      {
        icon: "email-white.png",
        bulletContent: {
          en: "Get updates on new features",
          he: "ཁྱད་ཆོས་ཁ་སྣོན་བྱས་པ་སོགས་ལ་ལྟོས།",
        },
      },
    ],
  },
  [SignUpModalKind.Save]: {
    h2: { en: "Want to return to this text?", he: "רוצים לחזור לטקסט הזה?" },
    h3: {
      en: "Create a free account to do more on Sefaria",
      he: "פתחו חשבון משתמש בחינם כדי לעשות יותר עם ספריא",
    },
    contentList: [
      {
        icon: "star-white.png",
        bulletContent: { en: "Save texts", he: "ཟིན་བྲིས་ཉར་ཚགས།" },
      },
      {
        icon: "note-white.svg",
        bulletContent: { en: "Take notes", he: "མཆན་བཀོད།" },
      },
      {
        icon: "clock-white.svg",
        bulletContent: {
          en: "View your reading history",
          he: "צפו בהיסטוריית הקריאה שלכם",
        },
      },
      {
        icon: "sheetsplus-white.svg",
        bulletContent: {
          en: "Build & share source sheets",
          he: "צרו ושתפו דפי מקורות",
        },
      },
    ],
  },
  [SignUpModalKind.Default]: {
    h2: { en: "Love Learning?", he: "སློབ་གཉེར་ལ་དགའ་བོ་ཡོད་དམ།" },
    h3: {
      en: "Sign up to get more from Sefaria",
      he: "དཔེ་ཆ་དྲ་ཐོག་དཔེ་མཛོད་ནས་འདི་ལས་མང་བ་ཐོབ་པ་ལ་ཞུགས་ཐོ་གསར་འགོད་བྱོས།",
    },
    contentList: [
      {
        icon: "star-white.png",
        bulletContent: { en: "Save texts", he: "ཟིན་བྲིས་ཉར་ཚགས།" },
      },
      {
        icon: "sheet-white.png",
        bulletContent: { en: "Make source sheets", he: "הכינו דפי מקורות" },
      },
      {
        icon: "note-white.png",
        bulletContent: { en: "Take notes", he: "མཆན་འགོད་པ།" },
      },
      {
        icon: "email-white.png",
        bulletContent: { en: "Stay in the know", he: "ཤེས་བཞིན་དུ་ནི་གནས་པར་གྱིས།" },
      },
    ],
  },
};

export function generateContentForModal(signUpModalKind) {
  if (signUpModalContent.hasOwnProperty(signUpModalKind)) {
    return signUpModalContent[signUpModalKind];
  } else {
    return signUpModalContent[SignUpModalKind.Default];
  }
}