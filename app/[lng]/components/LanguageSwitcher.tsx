'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'bg', label: 'Български', flag: '🇧🇬' },
];

export default function LanguageDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const { i18n } = useTranslation();

  const currentLang = i18n.language || 'en';


  const otherLanguages = languages.filter(({ code }) => code !== currentLang);

  const currentLanguageData = languages.find(({ code }) => code === currentLang) || languages[0];

  const changeLanguage = (lng: string) => {
    if (lng === currentLang) return;

    i18n.changeLanguage(lng);

    const segments = pathname.split('/');
    if (segments.length < 2) {
      router.push(`/${lng}${pathname}`);
      return;
    }
    segments[1] = lng;
    const newPath = segments.join('/');
    router.push(newPath);
  };

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-outline m-1">
        {currentLanguageData.flag}
      </label>

      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box"
      >
        {otherLanguages.map(({ code, flag }) => (
          <li key={code}>
            <button
              className="flex items-center gap-2 w-full"
              onClick={() => changeLanguage(code)}
            >
              <span>{flag}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
