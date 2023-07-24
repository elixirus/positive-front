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
                request: 'request'
            }
        },
        ru: {
            translation: {
                blog: 'блог',
                request: 'запросить услуги'
            }
        },
    },
  });

export default i18n;