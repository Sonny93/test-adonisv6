import { configApp } from '@adonisjs/eslint-config';

export default configApp({
	files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
	ignores: ['**/node_modules/**', 'graphql/*.ts'],
});
