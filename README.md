# 🏕️ Daniel Andres Gallardo - Portfolio Website

A modern, responsive portfolio website showcasing my work as a Software Engineer and AI Specialist. Built with Next.js, React, and Tailwind CSS with Supabase backend integration.

🌐 **[Visit Live Website](https://portfolio-website-sage-nine.vercel.app/)**

---

## ✨ Features

### 🎨 User Experience
- **Dark/Light Mode** - Toggle between themes with persistent localStorage
- **Multi-Language Support** - English & Spanish with dropdown selector (ready for Chinese & German)
- **Fully Responsive** - Mobile-first design that works on all screen sizes
- **Smooth Animations** - Transitions and hover effects throughout
- **Nature-Inspired Theme** - Camping/outdoor vibes with warm colors

### 📁 Sections
- **Hero Section** - Eye-catching introduction with call-to-action buttons
- **About Me** - Professional bio with education and tech stack
- **Projects** - Dynamic project showcase fetched from Supabase
- **Experience** - Work history and professional achievements
- **Marketplace** - Buy items from friends and family (Shopee-style interface)
- **Contact** - Email, GitHub, and LinkedIn links with direct email button

### 🗄️ Backend Features
- **Supabase Integration** - PostgreSQL database with real-time capabilities
- **Dynamic Content** - Projects and experience stored in Supabase
- **Marketplace Messages** - Contact form submissions saved to database
- **Row Level Security** - Public read access with secure policies

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.2.9** - React framework with SSR and optimization
- **React 19.2.4** - UI library
- **TypeScript 5.9.3** - Type-safe JavaScript
- **Tailwind CSS 4.3.1** - Utility-first CSS framework
- **i18next 26.3.1** - Internationalization framework

### Backend & Services
- **Supabase** - PostgreSQL database + real-time API
- **@supabase/supabase-js 2.108.2** - Supabase client library

### Development
- **ESLint 9.39.4** - Code linting
- **Geist Fonts** - System fonts from Google

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (free tier available)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/danielandresgallardo/portfolio-website.git
cd portfolio-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Supabase**
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Run the SQL setup queries (see `MARKETPLACE_SETUP.md`)
   - Get your Project URL and Anon Key

4. **Configure environment variables**
```bash
cp .env.local.example .env.local
```

Then fill in your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

5. **Start the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📚 Project Structure

```
portfolio-website/
├── app/
│   ├── layout.tsx              # Root layout with i18n provider
│   ├── page.tsx                # Homepage (projects, experience, contact)
│   ├── globals.css             # Global styles
│   ├── api/                    # API routes
│   └── marketplace/
│       └── page.tsx            # Marketplace page
├── components/
│   ├── I18nProvider.tsx        # i18next provider wrapper
│   ├── LanguageSwitcher.tsx    # Language selector dropdown
│   └── ...
├── lib/
│   ├── supabase.ts             # Supabase client
│   └── i18n.ts                 # i18next configuration
├── public/
│   └── locales/                # Translation files
│       ├── en/common.json
│       └── es/common.json
└── ...
```

---

## 🗄️ Database Schema

### Projects Table
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  icon TEXT NOT NULL,
  description TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  order_by INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Experience Table
```sql
CREATE TABLE experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  order_by INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Marketplace Tables
- `marketplace_items` - Products for sale with images
- `marketplace_messages` - Customer inquiries and contact info

See `MARKETPLACE_SETUP.md` for complete setup instructions.

---

## 🌍 Internationalization

Currently supports:
- 🇺🇸 **English** (en)
- 🇪🇸 **Español** (es)

Ready for:
- 🇨🇳 **中文** (Chinese)
- 🇩🇪 **Deutsch** (German)

### Adding a New Language

1. Create translation file: `public/locales/[code]/common.json`
2. Update `lib/i18n.ts` with the new language resource
3. Add to `LanguageSwitcher.tsx` in the languages array

See `TRANSLATION_GUIDE.md` for detailed instructions.

---

## 📝 How to Update Content

### Update Projects
1. Go to [Supabase Dashboard](https://supabase.com)
2. Open `projects` table
3. Click "Insert row" or edit existing rows
4. Changes appear instantly on the website

### Update Experience
1. Go to Supabase Dashboard
2. Open `experience` table
3. Add, edit, or delete entries
4. Use `order_by` field to control display order

### Update Translations
Edit files in `public/locales/`:
- `en/common.json` - English text
- `es/common.json` - Spanish text

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel via [vercel.com](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy with one click!

**Current Deployment**: [portfolio-website-sage-nine.vercel.app](https://portfolio-website-sage-nine.vercel.app/)

### Other Hosting Options
- Netlify
- AWS Amplify
- GitHub Pages (with static export)

---

## 📖 Additional Documentation

- **Marketplace Setup**: See [`MARKETPLACE_SETUP.md`](./MARKETPLACE_SETUP.md)
- **Translations**: See [`TRANSLATION_GUIDE.md`](./TRANSLATION_GUIDE.md)

---

## 🤝 Contributing

This is a personal portfolio project, but feel free to fork it and customize it for your own use!

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 About Me

**Daniel Andres Gallardo**
- 🎓 Master's Student in Computer Science & Software Engineering
- 🏫 Constructor University Bremen, Germany
- 💼 2+ years of industry experience
- 🏆 Winner: Constructor X BMW Group GenAI Hackathon 2026
- 🎯 Specializing in AI, Backend Infrastructure, and DevOps

### Skills
- **Programming**: Python, C++, JavaScript/TypeScript, SQL, Bash
- **Backend**: Flask, RESTful APIs, Microservices, Docker
- **Frontend**: React, Next.js, Tailwind CSS, TypeScript
- **AI/ML**: OpenAI/Gemini LLMs, YOLO, NLP, Multi-Agent Systems
- **Tools**: Docker, GitHub Actions, Git, Supabase, PostgreSQL

### Connect With Me
- 🌐 [Portfolio Website](https://portfolio-website-sage-nine.vercel.app/)
- 💻 [GitHub](https://github.com/danielandresgallardo)
- 💼 [LinkedIn](https://www.linkedin.com/in/daniel-andres-gallardo/)
- 📧 [Email](mailto:daniel-gallardo@live.com)

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Backend by [Supabase](https://supabase.com/)
- Internationalization with [i18next](https://www.i18next.com/)
- Fonts by [Geist](https://vercel.com/font)
- Deployed on [Vercel](https://vercel.com)

---

**Last Updated**: June 2026  
**Status**: ✅ Live & Maintained  
**Website**: [portfolio-website-sage-nine.vercel.app](https://portfolio-website-sage-nine.vercel.app/)
