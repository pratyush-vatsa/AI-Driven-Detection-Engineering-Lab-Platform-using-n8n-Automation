# Network Pentesting Automation Workflow using LLM

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

## Project Architecture

### System Overview
The application follows a microservices architecture with the following components:

1. **Frontend (React/Vite)**: Modern web interface for user interaction
2. **Backend (Node.js/Express)**: RESTful API server with JWT authentication
3. **N8N Workflow Engine**: Orchestrates automated scanning processes
4. **Kali Linux Container**: Isolated environment for security tools
5. **MongoDB**: Database for user data and scan results
6. **Metasploitable2**: Optional vulnerable target for testing

### Docker Services
- **n8n**: Workflow automation server (port 5678)
- **kali**: Pentesting tools container with network capabilities
- **metasploitable**: Vulnerable target system for testing (192.168.100.10)
- **Network**: Isolated bridge network (192.168.100.0/24)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Docker and Docker Compose (for N8N and Kali Linux container)
- N8N instance (self-hosted or cloud)
- Google Gemini API key (for AI analysis)
- Git (for cloning the repository)

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
   # Server Configuration
   PORT=5000
   
   # Database
   DB_URI=mongodb://localhost:27017/pentest
   
   # Authentication
   JWT_SECRET=your_jwt_secret_key_here
   
   # N8N Integration
   N8N_WEBHOOK_URL=http://localhost:5678/webhook/scan
   N8N_API_KEY=your_n8n_api_key
   
   # AI Integration
   GOOGLE_GEMINI_API_KEY=your_gemini_api_key
   
   # Optional: CORS Configuration
   CORS_ORIGIN=http://localhost:5173
   ```

   **Important**: Replace placeholder values with your actual API keys and secrets.

3. **Set Up Frontend**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Set Up Docker Environment**

   ```bash
   # Start all services using Docker Compose
   docker-compose up -d
   ```

   This will start:
   - **N8N** on port 5678 (http://localhost:5678)
   - **Kali Linux** container with pentesting tools
   - **Metasploitable2** for testing (optional target)

5. **Set Up N8N Workflow**

   - Access N8N at `http://localhost:5678` (admin/admin123)
   - Import the provided workflow (`n8nworkflow.json`) using:
     - Go to Workflows → Import from File
     - Select `n8nworkflow.json`
     - Activate the workflow

   **Alternative Method (Command Line)**:
   ```bash
   n8n import:workflow --input=n8nworkflow.json
   n8n activate:workflow --id=your-workflow-id
   ```

6. **Start Development Servers**

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
   - Enter a target IP/domain and select a scan type.
   - Submit to trigger the N8N workflow.
3. **View Results**: Real-time scan results are displayed in the dashboard as markdown or JSON.
4. **Generate PDF Report**:
   - Use the `/api/report/pdf` endpoint to download a formatted PDF report.
   - Reports include executive summaries, vulnerabilities, and remediation steps.

## Supported Scan Types

### Network Scans
- **Nmap**: Port scanning, service detection, OS fingerprinting
- **Nessus Basic**: Quick vulnerability assessment
- **Nessus Advanced**: Comprehensive security audit
- **Nessus Web App**: Web application security testing

### Scan Capabilities
- **Port Discovery**: Identify open ports and services
- **Vulnerability Assessment**: Detect known security flaws
- **Service Enumeration**: Gather information about running services
- **AI Analysis**: Automated vulnerability analysis and recommendations
- **Report Generation**: Professional PDF reports with remediation steps

### Target Options
- **External Targets**: Public IP addresses and domains
- **Internal Network**: Local network scanning (192.168.100.0/24)
- **Metasploitable2**: Built-in vulnerable target for testing (192.168.100.10)

## API Endpoints

### Authentication
- `POST /api/signup`: Create a new user account.
- `POST /api/login`: Authenticate a user and receive a JWT.

### Protected (Requires `Authorization: Bearer <jwt_token>`)
- `POST /api/scan`: Initiate a security scan via N8N.
- `POST /api/report/pdf`: Generate a PDF report from scan results.

## Security Considerations

### Application Security
- **JWT Security**: Tokens expire in 1 hour and are stored in `localStorage` (consider `httpOnly` cookies for production)
- **Password Hashing**: Uses bcrypt with 12 salt rounds
- **N8N Security**: Webhook authentication and rate limiting enabled
- **Docker Isolation**: Kali Linux container runs with restricted privileges and isolated network
- **API Protection**: Mongoose prevents NoSQL injection; React escapes JSX to mitigate XSS

### Network Security
- **Isolated Network**: Docker containers run on isolated bridge network (192.168.100.0/24)
- **Container Capabilities**: Kali container has minimal required capabilities (NET_RAW, NET_ADMIN)
- **Port Exposure**: Only necessary ports are exposed (5678 for N8N, 8834 for Nessus)

### Best Practices
- **Environment Variables**: Never commit `.env` files or API keys to version control
- **Regular Updates**: Keep dependencies updated with `npm audit` and `npm update`
- **Access Control**: Use strong passwords and implement proper user roles
- **Monitoring**: Monitor logs for suspicious activities and failed authentication attempts

## Legal and Ethical Considerations

### Important Disclaimer
This tool is designed for **authorized security testing only**. Users must:

- **Obtain Written Permission**: Always get explicit written permission before scanning any target
- **Follow Local Laws**: Comply with all applicable laws and regulations in your jurisdiction
- **Respect Privacy**: Do not scan systems you don't own or have permission to test
- **Professional Use**: Use only for legitimate security assessments and penetration testing

### Responsible Disclosure
- Report vulnerabilities to system owners through proper channels
- Follow responsible disclosure timelines
- Document all testing activities and results
- Maintain confidentiality of sensitive findings

### Compliance
- **GDPR**: Ensure compliance when scanning systems containing personal data
- **PCI DSS**: Follow appropriate procedures when testing payment systems
- **SOX**: Maintain proper documentation for financial systems testing

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

### Common Issues

- **MongoDB Connection Failed**: 
  - Verify `DB_URI` in `.env` and ensure MongoDB is running
  - Check if MongoDB is accessible: `mongo --eval "db.runCommand('ping')"`

- **JWT Errors**: 
  - Check `JWT_SECRET` in `.env`
  - Ensure the secret is at least 32 characters long

- **N8N Webhook Issues**: 
  - Test connectivity with:
    ```bash
    curl -X POST http://localhost:5678/webhook/scan \
      -H "Content-Type: application/json" \
      -d '{"target":"192.168.100.10","scanType":"nmap"}'
    ```
  - Verify N8N is running: `docker ps | grep n8n`

- **Docker Issues**: 
  - Check container status: `docker ps -a`
  - View logs: `docker logs kali` or `docker logs n8n`
  - Restart services: `docker-compose restart`

- **AI Model Errors**: 
  - Verify `GOOGLE_GEMINI_API_KEY` is valid
  - Test API connectivity with curl or Postman
  - Check API quota and billing status

### Development Tips

- **Hot Reload**: Both frontend and backend support hot reloading during development
- **Database Reset**: Clear MongoDB data: `mongo pentest --eval "db.dropDatabase()"`
- **Container Access**: Access Kali container: `docker exec -it kali bash`
- **N8N Access**: Default credentials are admin/admin123
- **Network Testing**: Use Metasploitable2 (192.168.100.10) for safe testing

## Contributing

1. Create a branch: `git checkout -b feat/add-new-feature`
2. Commit changes using Conventional Commits (e.g., `feat(auth): add password reset`).
3. Open a pull request for review.

**Security Note**: Never commit secrets to the repository. Run `npm audit` to check for vulnerabilities.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Documentation

For detailed documentation, including N8N workflow setup, API details, and architecture, refer to [Pentesting_Automation_Documentation.md](Pentesting_Automation_Documentation.md).
