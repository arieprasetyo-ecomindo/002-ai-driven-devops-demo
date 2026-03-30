# 002-ai-driven-devops-demo
AI-driven DevOps demo

## Running the Application Locally

### Prerequisites
- Node.js v18+ (use `nvm use 24.4.0` or compatible version)
- npm 11+
- Git

### Steps
1. Navigate to the app directory:
	```bash
	cd app
	```
2. Install dependencies:
	```bash
	npm install
	```
3. Start development server:
	```bash
	npm run dev
	```
4. Open browser to `http://localhost:5173/`
5. Verify the app shows:
	- A random picture (640x300)
	- A random quote below the picture
	- Updates every 5 seconds

### Build for Production
```bash
npm run build
```
