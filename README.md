# Alias Paiva Beauty

Site institucional (landing page) de **Alias Paiva**, Lash Designer em Ipatinga, MG. O site apresenta os serviços de extensão de cílios fio a fio e design de sobrancelhas, divulga o Curso VIP para iniciantes e direciona as clientes para o agendamento via WhatsApp.

🔗 **Site:** https://aliaspaivabeauty.tech/

---

## Sobre o projeto

Página única (one-page) com foco em conversão: apresentar o trabalho, mostrar resultados reais e levar a visitante ao WhatsApp com a mensagem de agendamento já preenchida.

### Seções da página

| Seção | Âncora | Descrição |
|-------|--------|-----------|
| Hero | `#top` | Título principal, chamada para agendar no WhatsApp e link para o Instagram |
| Sobre | — | Apresentação do estúdio e da proposta de atendimento personalizado |
| Serviços | — | Extensão de Cílios Fio a Fio e Design de Sobrancelhas |
| Curso VIP | `#curso` | Curso presencial de extensão de cílios para iniciantes, em Ipatinga |
| Galeria | `#galeria` | Trabalhos reais realizados no estúdio |
| FAQ | — | Durabilidade da extensão, pré-requisitos do curso e como agendar |
| Contato | — | CTA final, avaliações do Google, Instagram, WhatsApp e localização |

---

## Serviços

- **Extensão de Cílios Fio a Fio** — aplicação individual, respeitando a quantidade e a direção natural dos cílios (Clássico · Personalizado).
- **Design de Sobrancelhas** — correção de fios, simetria e preenchimento de acordo com o formato do rosto.

## Curso VIP — Extensão de Cílios para Iniciantes

- Presencial em Ipatinga
- Material e modelo inclusos
- Certificado de conclusão
- Suporte pós-curso
- Conteúdo: técnica fio a fio, mapeamento por formato de olho, escolha de curvatura e espessura, biossegurança, precificação, portfólio, redes sociais e fidelização de clientes
- Vagas limitadas por turma

---

## Funcionalidades

- Layout responsivo (mobile first), com suporte a `viewport-fit=cover`
- Botões de CTA com link direto para o WhatsApp e mensagem pré-preenchida (um texto para agendamento e outro para o Curso VIP)
- Navegação por âncoras (Curso, Galeria)
- Galeria de imagens com textos alternativos descritivos (acessibilidade e SEO)
- Link para avaliações no Google (5.0 · 56 avaliações)
- Localização via Google Maps

## SEO e compartilhamento

- `title` e `meta description` otimizados para busca local ("Lash Designer em Ipatinga, MG")
- URL canônica definida
- Open Graph (`og:title`, `og:description`, `og:image` 1200×630, `og:locale` pt_BR) para pré-visualização em redes sociais e WhatsApp
- Twitter Card (`summary_large_image`)

---

## Estrutura sugerida do repositório

```
.
├── index.html
├── images/
│   ├── og-image.jpg      # imagem de compartilhamento (1200x630)
│   ├── hero.jpg
│   ├── about.jpg
│   └── gallery*.jpg      # fotos da galeria
└── README.md
```

> Ajuste esta seção conforme a estrutura real do projeto (CSS, JS, favicon etc.).

## Como executar localmente

Por ser um site estático, basta abrir o `index.html` no navegador ou subir um servidor local:

```bash
# Python
python -m http.server 8000

# ou Node.js
npx serve .
```

Depois acesse `http://localhost:8000`.

## Como atualizar o conteúdo

- **Galeria:** adicione a nova imagem em `images/`, inclua o item na seção Galeria e escreva um `alt` descritivo.
- **Link/mensagem do WhatsApp:** altere o parâmetro `text` (codificado em URL) nos links `api.whatsapp.com/send`.
- **Imagem de compartilhamento:** substitua `images/og-image.jpg`, mantendo 1200×630 px.
- **Textos de SEO:** edite `title` e as metatags no `<head>`.

---

## Contato

- 📍 Ipatinga — MG
- 📸 Instagram: [@_aliaspaivabeauty](https://www.instagram.com/_aliaspaivabeauty/)
- 💬 WhatsApp: [Agendar horário](https://api.whatsapp.com/send/?phone=553180142400&text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20quero%20agendar%20um%20hor%C3%A1rio%20%F0%9F%92%9C)
- ⭐ Avaliações: [Google](https://share.google/A0g5crnLHBTmJMWZh)

---

## Licença e direitos

© Alias Paiva Beauty. Todos os direitos reservados. Textos e imagens (incluindo fotos de clientes) não podem ser reproduzidos sem autorização.
