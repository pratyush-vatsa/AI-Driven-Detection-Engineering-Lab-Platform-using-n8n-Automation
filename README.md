# Pentesting Automation App

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-v16+-green.svg)
![React](https://img.shields.io/badge/React-v18+-blue.svg)
![N8N](https://img.shields.io/badge/N8N-Workflow-orange.svg)

The **Pentesting Automation App** is a full-stack web application designed to streamline penetration testing workflows. It integrates with [N8N](https://n8n.io/) to execute automated security scans and generate AI-enhanced vulnerability assessment reports. The app features a modern, responsive interface built with React and a secure Node.js backend, making it an essential tool for security professionals, DevOps teams, and organizations.

## Features

- **Secure Authentication**: JWT-based user authentication with bcrypt password hashing.
- **Automated Scans**: Supports multiple scan types (Nmap, Nessus Basic/Advanced/Web App) via N8N integration.
- **AI-Powered Reports**: Generates detailed vulnerability reports using Google Gemini 2.5 Pro.
- **Real-time Results**: Displays scan results in JSON and markdown formats.
- **PDF Report Generation**: Exports professional PDF reports with customizable formatting.
- **Responsive Design**: Mobile-first UI with Tailwind CSS and dark/light theme support.
- **Scalable Architecture**: Client-server model with MongoDB and Dockerized scanning environment.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, React Router
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Workflow Automation**: N8N with Dockerized Kali Linux for scanning
- **AI Integration**: Google Gemini 2.5 Pro for vulnerability analysis
- **Deployment**: PM2 (backend), Nginx (frontend), Let's Encrypt (SSL)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Docker (for N8N and Kali Linux container)
- N8N instance (self-hosted or cloud)
- Google Gemini API key (for AI analysis)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/pentesting-automation-app.git
   cd pentesting-automation-app
   ```

2. **Set Up Backend**

   ```bash
   cd backend
   npm install
   cp .env.example .env
   nano .env
   ```

   Update `.env` with your configuration:

   ```env
   PORT=5000
   DB_URI=mongodb://localhost:27017/pentest
   JWT_SECRET=your_jwt_secret
   N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/scan
   N8N_API_KEY=your_n8n_api_key
   GOOGLE_GEMINI_API_KEY=your_gemini_api_key
   ```

3. **Set Up Frontend**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Set Up N8N Workflow**

   - Deploy an N8N instance (self-hosted or cloud).
   - Import the provided workflow (`pentest-workflow.json`) using:

     ```bash
     n8n import:workflow --input=pentest-workflow.json
     n8n activate:workflow --id=your-workflow-id
     ```

   - Ensure the Kali Linux Docker container is running:

     ```bash
     docker run -d --name kali-scanner --network isolated -v /tmp/scans:/root/scans kalilinux/kali-rolling
     ```

5. **Start Development Servers**

   - **Backend**:

     ```bash
     cd backend
     npm run dev
     ```

   - **Frontend**:

     ```bash
     cd frontend
     npm run dev
     ```

   Access the app at `http://localhost:5173` (default Vite port).

## Usage

1. **Sign Up/Login**: Create an account or log in via `/signup` or `/login`.
2. **Initiate a Scan**:
   - Navigate to the dashboard.
   - Enter a target IP/domain and select a scan type (e.g., Nmap).
   - Submit to trigger the N8N workflow.
3. **View Results**: Real-time scan results are displayed in the dashboard as markdown or JSON.
4. **Generate PDF Report**:
   - Use the `/api/report/pdf` endpoint to download a formatted PDF report.
   - Reports include executive summaries, vulnerabilities, and remediation steps.

## API Endpoints

### Authentication
- `POST /api/signup`: Create a new user account.
- `POST /api/login`: Authenticate a user and receive a JWT.

### Protected (Requires `Authorization: Bearer <jwt_token>`)
- `POST /api/scan`: Initiate a security scan via N8N.
- `POST /api/report/pdf`: Generate a PDF report from scan results.

## Security Considerations

- **JWT Security**: Tokens expire in 1 hour and are stored in `localStorage` (consider `httpOnly` cookies for production).
- **Password Hashing**: Uses bcrypt with 12 salt rounds.
- **N8N Security**: Webhook authentication and rate limiting enabled.
- **Docker Isolation**: Kali Linux container runs with restricted privileges and isolated network.
- **API Protection**: Mongoose prevents NoSQL injection; React escapes JSX to mitigate XSS.

## Deployment

### Backend (Using PM2)

```bash
npm install -g pm2
cd backend
npm install --production
pm2 start server.js --name "pentest-backend"
```

### Frontend (Using Nginx)

1. Build the frontend:

   ```bash
   cd frontend
   npm run build
   ```

2. Configure Nginx to serve `frontend/dist` and proxy `/api` requests to the backend.

### SSL Setup

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Troubleshooting

- **MongoDB Connection Failed**: Verify `DB_URI` in `.env` and ensure MongoDB is running.
- **JWT Errors**: Check `JWT_SECRET` in `.env`.
- **N8N Webhook Issues**: Test connectivity with:

  ```bash
  curl -X POST https://your-n8n-instance.com/webhook/scan -H "Content-Type: application/json" -d '{"target":"192.168.1.1","scanType":"nmap"}'
  ```

- **Docker Issues**: Check container status with `docker ps -a | grep kali`.
- **AI Model Errors**: Verify `GOOGLE_GEMINI_API_KEY` and test API connectivity.

## Contributing

1. Create a branch: `git checkout -b feat/add-new-feature`
2. Commit changes using Conventional Commits (e.g., `feat(auth): add password reset`).
3. Open a pull request for review.

**Security Note**: Never commit secrets to the repository. Run `npm audit` to check for vulnerabilities.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Documentation

For detailed documentation, including N8N workflow setup, API details, and architecture, refer to [Pentesting_Automation_Documentation.md](Pentesting_Automation_Documentation.md).
