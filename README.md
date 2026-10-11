# 📰 News Orbit

A modern Bengali news website built with Next.js, designed to help readers explore the latest news through a clean, organized, and easy-to-use interface.

🔗 **Live Demo:** [https://newsorbit-nu.vercel.app/](https://newsorbit-nu.vercel.app/)

## ✨ Features

- 📰 **News Homepage** — Browse news through an organized homepage layout.
- 🚨 **Breaking News Marquee** — A scrolling news ticker for displaying important updates.
- 🗂️ **News Sections** — Explore news organized into different sections.
- ⭐ **Featured News** — Highlight important news stories.
- 📈 **Most Read News** — Display popular news articles.
- 📰 **Reusable News Cards** — Present news articles with a consistent layout.
- 🇧🇩 **Bengali Language Support** — A Bengali-focused reading experience.
- 🔤 **Bengali Typography** — Uses the Noto Serif Bengali font.
- 📱 **Responsive Interface** — Designed for a convenient news-reading experience across screen sizes.
- ⚡ **Data Revalidation** — Uses Next.js caching and revalidation for efficient data fetching.
- 🎨 **Clean Navigation** — Header and navigation links for browsing the website.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | React framework and application routing |
| React.js | UI development |
| TypeScript | Type-safe development |
| CSS | Styling and layout |
| Noto Serif Bengali | Bengali typography |
| Next.js Fetch API | News data fetching and caching |
| Vercel | Deployment and hosting |

## 📂 Project Structure

```text
news-orbit/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── Navlinks.tsx
│   ├── Marquee.tsx
│   ├── MainNews.tsx
│   ├── NewsCard.tsx
│   └── MostRead.tsx
├── public/
│   └── NO.png
├── package.json
└── README.md
```

*Note: The structure above illustrates the main files and components; your actual project may contain additional files.*

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js
- npm, yarn, pnpm, or bun
- Git

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual GitHub repository URL.

### 2. Navigate to the Project

```bash
cd news-orbit
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Open in Your Browser

Visit [http://localhost:3000](http://localhost:3000).

## ⚡ Performance

News Orbit uses Next.js data-fetching capabilities to retrieve news content. Configured revalidation helps keep cached news data fresh while reducing unnecessary requests.

Example:

```tsx
const res = await fetch(
  "https://news-api-v2.vercel.app/api/news/sections",
  {
    next: { revalidate: 300 },
  }
);
```

This configuration allows cached data to be revalidated after 300 seconds.

## 🌐 Live Website

Visit the deployed application:

**[News Orbit — Live Demo](https://newsorbit-nu.vercel.app/)**

## 🎯 Project Goal

The goal of News Orbit is to provide readers with an accessible, organized, and user-friendly Bengali news-reading experience using modern web technologies.

## 👨‍💻 Developer

Developed with ❤️ using Next.js, React, and TypeScript.

## 📄 License

This project is available for learning and portfolio purposes. Add an appropriate open-source license if you intend to distribute or reuse the source code publicly.
