# 💰 Tudo Contado

**Tudo Contado** é um aplicativo web de controle financeiro doméstico que combina **tecnologia de ponta** e **inteligência artificial** para proporcionar uma experiência simples, intuitiva e eficiente.  
O projeto é desenvolvido com foco em **Clean Code**, **responsividade**, **escalabilidade** e **alta performance**, ajudando você a gerenciar suas finanças de forma inteligente, em qualquer dispositivo.

---

## 🚀 Tecnologias Utilizadas

- **[Next.js](https://nextjs.org/)** — Framework React para aplicações modernas.
- **[TypeScript](https://www.typescriptlang.org/)** — Tipagem estática para maior segurança e produtividade.
- **[TailwindCSS](https://tailwindcss.com/)** — Estilização rápida e responsiva.
- **[Radix UI](https://www.radix-ui.com/)** — Componentes acessíveis e personalizáveis.
- **[Lucide Icons](https://lucide.dev/)** — Ícones otimizados para web.
- **[React Query](https://tanstack.com/query/latest)** — Gerenciamento avançado de estado assíncrono.
- **[Prisma](https://www.prisma.io/)** — ORM moderno para banco de dados.
- **[MUI Charts](https://mui.com/x/react-charts/)** — Visualização de dados e estatísticas.
- **[Groq SDK](https://console.groq.com/)** — Integração de IA para melhorar o UX.
- **[NextAuth.js](https://next-auth.js.org/)** — Autenticação segura.
- **[Zod](https://zod.dev/)** — Validação de dados robusta.
- **[React Hook Form](https://react-hook-form.com/)** — Formulários eficientes e performáticos.

---

## 📦 Instalação

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/tudo-contado.git
```

Acesse a pasta do projeto:

```bash
cd tudo-contado
```

Instale as dependências:

```bash
npm install
# ou
yarn install
```

Configure as variáveis de ambiente. Ver [SETUP_AMBIENTE.md](./SETUP_AMBIENTE.md) para detalhes sobre configuração separada de Dev vs Produção.

## ▶️ Executando o Projeto

### Desenvolvimento

Para setup automático:

```bash
pnpm setup
```

Ou manualmente:

```bash
pnpm install
pnpm db:migrate
pnpm db:seed
pnpm dev
```

### Produção

```bash
pnpm build
pnpm start
```

### Comandos de Banco de Dados

```bash
pnpm db:migrate      # Aplicar migrações
pnpm db:seed         # Popular com dados de teste
pnpm db:reset        # Resetar banco (CUIDADO!)
pnpm db:studio       # Abrir Prisma Studio
```

🛠️ Funcionalidades

- 📊 Dashboard com estatísticas e gráficos interativos.

- 💸 Cadastro e controle de ganhos e despesas (fixos e variáveis).

- 🛍️ Controle de produtos com datas de compra e validade (em breve).

- 🤖 IA integrada para sugestões e otimização da experiência do usuário.

- 🔐 Autenticação segura e gerenciamento de contas.

- 📱 Layout 100% responsivo.

🤝 Contribuindo

Contribuições são bem-vindas!
Siga as etapas:

- Fork do projeto.

- Crie uma branch para sua feature (git checkout -b minha-feature).

- Commit suas alterações (git commit -m 'Adicionei minha feature').

- Push para a branch (git push origin minha-feature).

- Abra um Pull Request.

📄 Licença

Este projeto está licenciado sob a MIT License.
Consulte o arquivo LICENSE para mais informações.
