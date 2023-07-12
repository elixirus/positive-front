import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
        en: {
            translation: {
                blog: 'blog',
                contact: 'contact'
            }
        },
        ru: {
            translation: {
                blog: 'блог',
                contact: 'контакт'
            }
        },
    },
  });

export default i18n;