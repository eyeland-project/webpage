import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/',
	plugins: [react()],
	resolve: {
		alias: {
			'@fonts': `${path.resolve(__dirname, './src/assets/fonts/')}`,
			'@images': `${path.resolve(__dirname, './src/assets/images/')}`,
			'@animations': `${path.resolve(
				__dirname,
				'./src/assets/animations/'
			)}`,
			'@icons': `${path.resolve(__dirname, './src/assets/icons/')}`,
			'@sounds': `${path.resolve(__dirname, './src/assets/sounds/')}`,
			'@contexts': `${path.resolve(__dirname, './src/core/contexts/')}`,
			'@hooks': `${path.resolve(__dirname, './src/core/hooks/')}`,
			'@utils': `${path.resolve(__dirname, './src/core/utils/')}`,
			'@pages': `${path.resolve(__dirname, './src/pages/')}`,
			'@enums': `${path.resolve(__dirname, './src/shared/enums/')}`,
			'@interfaces': `${path.resolve(
				__dirname,
				'./src/shared/interfaces/'
			)}`,
			'@mocks': `${path.resolve(__dirname, './src/shared/mocks/')}`,
			'@components': `${path.resolve(
				__dirname,
				'./src/shared/components/'
			)}`,
			'@environments': `${path.resolve(__dirname, './src/environments/')}`
		}
	}
});
