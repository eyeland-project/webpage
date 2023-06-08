import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import ReactModal from 'react-modal';
import App from './App';
import './index.css';
import './i18n';

import { AuthStorageProvider } from '@contexts/AuthStorageContext';

// https://reactcommunity.org/react-modal/accessibility/
ReactModal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Router>
			<AuthStorageProvider>
				<App />
			</AuthStorageProvider>
		</Router>
	</React.StrictMode>
);
