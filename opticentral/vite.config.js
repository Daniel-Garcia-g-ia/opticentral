import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: '/',  // Ajusta la base según la estructura de tu servidor si es necesario
    plugins: [react()]   
});