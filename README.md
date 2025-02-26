# Weather App

Сучасний веб-додаток для перегляду погоди, розроблений з використанням Next.js та TypeScript.

## Особливості

- 🌡️ Актуальна інформація про погоду
- 🌅 Час сходу та заходу сонця
- 🌪️ Швидкість вітру та вологість
- 📱 Адаптивний дизайн
- 🎨 Сучасний UI з анімаціями
- 🗺️ Прогноз погоди на 10 днів
- 🇺🇦 Підтримка української мови

## Технології

- Next.js 14
- TypeScript
- Tailwind CSS
- Shadcn/ui
- Framer Motion
- Open-Meteo API

## Встановлення

```bash
# Клонування репозиторію
git clone [URL вашого репозиторію]

# Перехід в директорію проекту
cd weather-app

# Встановлення залежностей
npm install

# Запуск в режимі розробки
npm run dev
```

## Використання

1. Відкрийте додаток у браузері (за замовчуванням http://localhost:3000)
2. Введіть назву міста для перегляду погоди
3. Отримайте детальну інформацію про поточну погоду та прогноз

## Ліцензія

MIT

# Design System

A modern design system built with Next.js, Radix UI, and Storybook.

## 🚀 Quick Start for Designers

### Installation (Mac Only)

1. **Install Cursor**
   - Download Cursor from [cursor.com](https://www.cursor.com/downloads)
   - Open the downloaded file
   - Drag Cursor to your Applications folder
   - Open Cursor

2. **Create Project Directory**
   - When Cursor opens, click "Open Project" (or File → Open Project)
   - Navigate to your Documents folder
   - Click "New Folder" and name it "design"
   - Open this new folder in Cursor

3. **Clone & Setup**
   - Open Cursor's terminal with `Cmd + J`, select "Terminal"
   - Paste in bulk all these commands into terminal:
     ```bash
     # Clone the repository
     git clone https://github.com/yurkomik/designers.git
     
     # Enter the project directory
     cd designers
     
     # Run the setup script
     chmod +x ./setup.sh
     ./setup.sh
     ```
 - Click Enter

 4. **Set Password**
    - in the left sidebar you will see file explorer, rename file env.local to .env.local (right click menu)
    - open this file and set Password youd like to use (SITE_PASSWORD=type_your_password_here)


 5. **RUN**
    - Answer yes to start dev environment OR go to http://localhost:3000/playground/weather-widget to test the app
    - enter the password from .env.local, no username/login or any username 
    

    you may want to reopen cursor and open design folder so you will not need to navigate into it. 
    
    
    **Now you are ready to edit playground pages in Chat. Ask Curor to make changes, implement other content, etc. Check resources for other components you may want to install.** 



That's it! The script will:
- Install Node.js and other tools in your home directory
- Set up the project
- Offer to start the development environment

### 📚 What's Included

- **Theme Editor**: Customize colors, typography, spacing, and effects
- **Component Library**: Browse and test components in Storybook
- **Design Tokens**: Explore subatomic design elements
- **Documentation**: Access comprehensive guides and examples

### 🎨 For Designers

- All components are organized by atomic design principles
- Live preview of changes in both the main app and Storybook
- Interactive documentation with usage examples
- Theme customization tools

### 💡 Need Help?

- Check our [Wiki](your-wiki-url)
- Contact the development team
- Join our Slack channel

## 🛠 Development

### Tech Stack
- Next.js 14.1
- React 18
- Radix UI/Shadcn UI
- Tailwind CSS 3
- Storybook 8

### Available Scripts

- `npm run dev` - Start development environment
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run storybook` - Start Storybook separately

## 🔄 Version Control Setup

### First Time Git Setup

1. **Create a GitHub Account**
   - Visit [github.com](https://github.com) and sign up
   - Verify your email address

2. **Connect to GitHub**
   - In Cursor, click the Accounts icon in the bottom left
   - Click "Sign in with GitHub"
   - Follow the browser prompts to authorize
   - Cursor will automatically configure Git with your GitHub identity

3. **Create Your Repository**
   - Click "New Repository" on GitHub
   - Name it "design-system" (or your preferred name)
   - Keep it private if needed
   - Don't initialize with README (we already have one)



### Daily Git Workflow

You can use Cursor's Git UI (recommended):
- Source Control icon shows all changes
- Type commit message and click ✓ commit and push from dropdown



## 🚀 Deployment

### Deploy to Vercel

1. **Prepare for Deployment**
   - Create account at [vercel.com](https://vercel.com)
   - connect your github account and select the design-system repository, click on the "Import" button, click on deploy 
   - Enable automatic deployments
   - Each push to main will trigger deployment
   - PRs will get preview deployments


   **Alternative method:**
1. Install Vercel CLI:
     ```bash
     npm install -g vercel
     ```

2. **Link to Vercel**
   ```bash
   # Login to Vercel
   vercel login
   
   # Link project
   vercel link
   ```

3. **Deploy**
   ```bash
   # Deploy to preview
   vercel
   
   # Deploy to production
   vercel --prod
   ```

4. **Set Up Automatic Deployments**
   - Connect your GitHub repository in Vercel dashboard
   - Enable automatic deployments
   - Each push to main will trigger deployment
   - PRs will get preview deployments



Add these in Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add each variable from `.env.local`
3. Redeploy if needed




