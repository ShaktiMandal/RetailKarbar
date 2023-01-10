import { defineConfig } from 'cypress';
export default defineConfig({
    e2e:{
        baseUrl: 'http://localhost:3000',
        supportFile: 'e2e/test/support/index.js',
        specPattern: 'e2e/test/specs/**/*.cy.{js, jsx, ts, tsx}'
    }
})