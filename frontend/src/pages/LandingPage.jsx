import { useState } from 'react';
import { ShieldCheckIcon, CodeBracketSquareIcon, CubeTransparentIcon, DocumentTextIcon, BoltIcon, CogIcon } from '@heroicons/react/24/outline';

// Import your new components
import Modal from '../components/ui/Modal';
import ThemeToggle from '../components/ThemeToggle';

// Import your existing Login and Signup components
// Adjust the path if necessary
import Login from './Login'; 
import Signup from './Signup';

const features = [
  { name: 'Nmap & Nessus Scans', description: 'Run comprehensive network and vulnerability scans.', icon: CodeBracketSquareIcon },
  { name: 'n8n Integration', description: 'Automate complex testing workflows with seamless n8n connectivity.', icon: CubeTransparentIcon },
  { name: 'Markdown Reports', description: 'Receive detailed and readable scan reports in markdown format.', icon: DocumentTextIcon },
  { name: 'PDF Export', description: 'Easily download and share professional PDF reports of your findings.', icon: DocumentTextIcon },
  { name: 'Secure Workflows', description: 'All actions are protected and logged, ensuring a secure testing environment.', icon: ShieldCheckIcon },
  { name: 'Customizable Automation', description: 'Tailor scanning workflows to fit your specific infrastructure needs.', icon: CogIcon },
];

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleSwitchToSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const handleSwitchToLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-40">
        <nav className="container mx-auto flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              <ShieldCheckIcon className="inline h-6 w-6" /> Pentest Platform
            </a>
          </div>
          <div className="flex items-center gap-x-4">
            <ThemeToggle />
            <button onClick={() => setShowLogin(true)} className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
              Log in 
            </button>
            <button onClick={() => setShowSignup(true)} className="rounded-md bg-sky-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline-2  focus-visible:outline-sky-600">
              Sign up
            </button>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <div className="relative isolate overflow-hidden pt-14">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -trangray-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#80ff89] to-[#00c4ff] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
          </div>
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                Automated Penetration Testing Made Easy
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                Scan, detect, and secure your infrastructure with automated tools.
              </p>
              <div className="mt-10">
                <button onClick={() => setShowSignup(true)} className="rounded-md bg-sky-600 px-4 py-3 text-base font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline-2  focus-visible:outline-offset-2 focus-visible:outline-sky-600">
                  Start Testing Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-base font-semibold leading-7 text-sky-600 dark:text-sky-400">Everything You Need</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              A Fully-Featured Testing Platform
            </h2>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <feature.icon className="h-6 w-6 flex-none text-sky-600 dark:text-sky-400" aria-hidden="true" />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            {/* Social links can go here */}
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Pentest Platform, Inc. All rights reserved. | 
              <a href="#" className="hover:underline"> Privacy Policy </a> | 
              <a href="#" className="hover:underline"> Terms of Service</a>
            </p>
          </div>
        </div>
      </footer>

      {/* --- MODAL INTEGRATION (Updated) --- */}
      <Modal isOpen={showLogin} onClose={() => setShowLogin(false)}>
        <Login 
          onClose={() => setShowLogin(false)} 
          onSwitchToSignup={handleSwitchToSignup} 
        />
      </Modal>

      <Modal isOpen={showSignup} onClose={() => setShowSignup(false)}>
        <Signup 
          onClose={() => setShowSignup(false)} 
          onSwitchToLogin={handleSwitchToLogin}
        />
      </Modal>

    </div>
  );
}