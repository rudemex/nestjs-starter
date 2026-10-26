// Tests read process.env directly (e.g. config()), so load .env.test before any module runs.
process.env.NODE_ENV = 'test';
process.loadEnvFile('.env.test');
