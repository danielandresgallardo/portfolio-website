# Translation Setup Guide

Your portfolio now supports English and Spanish with i18next! Here's how to use it.

## How to Add Translations to Your Pages

### 1. Import the hook in your component:

```tsx
import { useTranslation } from 'react-i18next';

export default function YourComponent() {
  const { t } = useTranslation();
  
  return (
    <h1>{t('hero.title')}</h1>  // "Software Engineer & AI Specialist"
    <p>{t('hero.subtitle')}</p>  // Your subtitle in current language
  )
}
```

### 2. Add the Language Switcher to your navbar:

```tsx
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function YourPage() {
  const [isDark, setIsDark] = useState(false);
  
  return (
    <nav>
      {/* Your nav content */}
      <LanguageSwitcher isDark={isDark} />
    </nav>
  )
}
```

## Translation Keys Available

All translations are in `/public/locales/`:
- `en/common.json` - English
- `es/common.json` - Spanish

Common keys used:
- `nav.home`, `nav.projects`, `nav.experience`, `nav.contact`, `nav.marketplace`
- `hero.title`, `hero.subtitle`, `hero.cta_touch`, `hero.cta_github`
- `about.title`, `about.bio1`, `about.bio2`, `about.education_title`
- `projects.title`, `projects.bmw.title`, `projects.bmw.desc`, etc.
- `experience.title`, `experience.pako.title`, etc.
- `contact.title`, `contact.subtitle`, `contact.email`, `contact.github`
- `marketplace.title`, `marketplace.subtitle`

## Example: Update Your Homepage Navigation

Replace this:
```tsx
<a href="#projects" className={isDark ? 'hover:text-amber-200' : 'hover:text-amber-700'}>Projects</a>
```

With this:
```tsx
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  
  return (
    <a href="#projects" className={isDark ? 'hover:text-amber-200' : 'hover:text-amber-700'}>
      {t('nav.projects')}
    </a>
  )
}
```

## Adding a New Language (e.g., Chinese or German)

### Step 1: Create translation file
```bash
mkdir -p public/locales/zh
# Create: public/locales/zh/common.json
```

### Step 2: Add translations
```json
{
  "nav": {
    "home": "主页",
    "projects": "项目",
    ...
  }
}
```

### Step 3: Update i18n config
In `lib/i18n.ts`, add:
```tsx
const resources = {
  en: { common: require('../public/locales/en/common.json') },
  es: { common: require('../public/locales/es/common.json') },
  zh: { common: require('../public/locales/zh/common.json') }, // Add this
  de: { common: require('../public/locales/de/common.json') }, // And this
};
```

### Step 4: Update LanguageSwitcher
In `components/LanguageSwitcher.tsx`, add:
```tsx
const languages = [
  { code: 'en', name: '🇺🇸 English', label: 'EN' },
  { code: 'es', name: '🇪🇸 Español', label: 'ES' },
  { code: 'zh', name: '🇨🇳 中文', label: 'ZH' },
  { code: 'de', name: '🇩🇪 Deutsch', label: 'DE' },
];
```

## Best Practices

1. **Always use translation keys** instead of hardcoding text
2. **Keep keys organized** - group by section (nav, hero, about, etc.)
3. **Save language preference** - automatically saves to localStorage
4. **Use interpolation** for dynamic content:
   ```tsx
   // In JSON: "greeting": "Hello {{name}}"
   // In component: t('greeting', { name: 'Daniel' })
   ```

## Testing

Click the language switcher (EN/ES buttons) in your navbar to see translations change in real-time!
