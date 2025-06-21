import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

/*import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 80, // Replace with your desired port
    host: true, // Allows access from external devices
  },
});
*/
