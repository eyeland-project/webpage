import { AlertColor } from '@mui/material';
import { log } from 'console';
import { createContext, useState, useEffect } from 'react';

interface AlertContextValues {
	alertText: string;
	alertSeverity: AlertColor;
	alertOpen: boolean;
	handleAlert: (text: string, severity: AlertColor) => void;
}

const AlertContext = createContext<AlertContextValues | null>(null);

function AlertProvider({ children }: { children: React.ReactNode }) {
	const [alertText, setAlertText] = useState('');
	const [alertSeverity, setAlertSeverity] = useState<AlertColor>('success');
	const [alertOpen, setAlertOpen] = useState(false);

	const handleAlert = (text: string, severity: AlertColor) => {
		setAlertText(text);
		setAlertSeverity(severity);
		setAlertOpen(true);
	};

	useEffect(() => {
		if (alertOpen) {
			const timer = setTimeout(() => {
				setAlertOpen(false);
			}, 2000);

			return () => {
				clearTimeout(timer);
			};
		}
	}, [alertOpen]);


	return (
		<AlertContext.Provider
			value={{ alertText, alertSeverity, alertOpen, handleAlert }}
		>
			{children}
		</AlertContext.Provider>
	);
}

export { AlertContext, AlertProvider };
