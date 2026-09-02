# AURA Coffee Co.

Loja virtual de café especial. React + Vite + Tailwind, servida como estático via nginx.

## Rodar localmente

```bash
npm install
npm run dev      # desenvolvimento (http://localhost:5173)
npm run build    # gera dist/
npm run preview  # serve o build
```

## Deploy no Coolify (via Git)

1. Suba este projeto para um repositório Git (GitHub, GitLab, Gitea ou Git público).

   ```bash
   git init
   git add .
   git commit -m "AURA Coffee Co."
   git branch -M main
   git remote add origin <URL_DO_SEU_REPO>
   git push -u origin main
   ```

2. No Coolify: **+ New** → **Resource** → escolha o seu servidor/projeto.
3. Selecione **Public Repository** (ou **GitHub App** se for repo privado) e cole a URL do repo.
4. Em **Build Pack**, escolha **Dockerfile**. O Coolify detecta o `Dockerfile` na raiz automaticamente.
5. **Port**: defina `80` (a porta que o nginx expõe neste container).
6. Configure o domínio em **Domains** (o Coolify provisiona HTTPS via Let's Encrypt automaticamente).
7. **Deploy**. Nos próximos `git push`, o auto-deploy dispara sozinho via webhook.

### Observações

- O build baixa dependências de `registry.npmjs.org`; o servidor de build do Coolify precisa de acesso à internet.
- As fontes (Playfair Display + Outfit) são carregadas do Google Fonts em runtime, no navegador do visitante.
- Nenhuma variável de ambiente é necessária.

## Estrutura

```
├── Dockerfile          # multi-stage: build (node) → serve (nginx)
├── nginx.conf          # SPA fallback + cache de assets
├── index.html
├── src/
│   ├── App.jsx         # toda a loja (Hero, Cafés, Origem, Notas, Marca, Footer)
│   ├── main.jsx
│   └── index.css       # Tailwind + animações (reveal, marquee, grão)
├── tailwind.config.js  # paleta terrosa + tipografia
├── vite.config.js
└── postcss.config.js
```
