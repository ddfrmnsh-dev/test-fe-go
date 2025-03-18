# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

### Run Project di Local

Clone terlebih dahulu project ini

```bash
  git clone https://github.com/ddfrmnsh-dev/test-fe-go.git
```

Masuk kedalam direktori

```bash
  cd test-fe-go
```

Install depedensi yang dibutuhkan

```bash
  npm install
```

Jalankan server

```bash
  npm run dev
```

### Environment Variables

Untuk menjalankan project ini, anda harus menyesuaikan BaseUrl di dalam `app-ui\src\api\axiosInstance.js` file ganti BaseUrl sesuai dengan environment yang anda gunakan.

Selain itu juga ganti endpoint BaseUrl pada halaman login `app-ui\src\pages\LoginPage.jsx` sesuai dengan environment yang anda gunakan.
