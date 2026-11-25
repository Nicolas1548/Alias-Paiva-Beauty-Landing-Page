# Alias Paiva Beauty

Site institucional e editorial da **Alias Paiva Beauty** — estúdio de extensão de cílios, design de sobrancelhas, brow lamination e **Curso VIP presencial** em Ipatinga, MG.

🌐 **Acesse o site:** [aliaspaivabeauty.tech](https://aliaspaivabeauty.tech)

---

## Sobre o projeto

Desenvolvido com foco em estética editorial, navegação fluida e conversão direta via WhatsApp, o site utiliza a paleta **Lavanda Editorial** (superfícies em ameixa profundo `#0f0b16`, off-white lavanda `#f2eef9`, acentos lilás `#c9b8ff` / `#6c4fd6` e destaque verde padrão do WhatsApp `#25d366` nas pílulas flutuantes).

### Páginas e recursos

- **`/` (Início)**
  - Hero cinematográfico com vídeo (`apresentar.mp4` otimizado em H.264 `+faststart`) e máscara tipográfica animada no scroll.
  - Cards interativos com vídeo em loop para os dois caminhos principais: **quero agendar** (`servicos_vid.mp4`) e **quero aprender** (`curso_vid.mp4`), com posters dedicados e autoplay reforçado para iOS e WebView do Instagram.
  - Grade de canais diretos (**whatsapp**, **instagram**, **google** e **estúdio**).
  - Galeria responsiva com 22 fotos reais e lightbox com navegação por teclado e gestos.
  - Seção de história com retrato expansível no scroll e biografia com revelação progressiva por palavra.
  - Avaliações verificadas do Google (`★ 5.0`), FAQ em acordeão e rodapé com CTA de agendamento.
- **`/servicos`**
  - Apresentação editorial dos procedimentos (Extensão de Cílios Fio a Fio, Design de Sobrancelhas e Brow Lamination), formas de pagamento, endereço completo no Bairro Canaã e FAQ de atendimento.
- **`/curso-vip`**
  - Página dedicada à formação individual presencial em Ipatinga: colagem de abertura, 4 módulos do conteúdo programático, depoimento de aluna, card **Imersão Presencial** com foto oficial do certificado e FAQ do curso.

---

## Stack utilizada

- **React 19** + **TypeScript**
- **Vite 6** (build de produção otimizado)
- **React Router DOM v7** (roteamento multipágina SPA)
- **Lenis** (scroll suave)
- **Lucide React** (ícones)
- **CSS modular por tokens** (`tokens.css` + `global.css`)

---

## Estrutura publicada (GitHub Pages)

Este repositório armazena o build estático pronto para publicação via **GitHub Pages** com domínio personalizado:

```text
.
├── assets/             # Bundles JS e CSS minificados gerados pelo Vite
├── icons/              # Favicons (32x32 e Apple Touch Icon 180x180)
├── images/
│   ├── studio/         # Fotos do estúdio, retrato, macro hero, certificado e posters dos vídeos
│   ├── servicos/       # Imagens dos procedimentos
│   └── galeria/        # 22 fotos do portfólio
├── videos/             # apresentar.mp4, servicos_vid.mp4 e curso_vid.mp4 (H.264 +faststart)
├── index.html          # Entrada principal com meta tags OG/Twitter e JSON-LD
├── 404.html            # Fallback SPA para recarregamento em /servicos e /curso-vip
├── CNAME               # Domínio personalizado (aliaspaivabeauty.tech)
├── .nojekyll           # Desativa processamento Jekyll no GitHub Pages
├── robots.txt          # Diretivas de indexação
├── sitemap.xml         # Mapa de rotas para mecanismos de busca
└── README.md
```

---

## SEO e Performance

- Metadados **Open Graph**, **Twitter Cards**, tag canônica e geolocalização (`Ipatinga, MG`).
- Dados estruturados **Schema.org JSON-LD** (`BeautySalon` e `FAQPage`).
- Verificação Google Search Console, `robots.txt` e `sitemap.xml` configurados.
- Vídeos re-encodificados em **H.264 (`+faststart`)** sem faixa de áudio para carregamento rápido no mobile, com posters próprios.
- Layout responsivo para mobile, tablet e desktop.

---

## Contato

- **Instagram:** [@_aliaspaiva](https://www.instagram.com/_aliaspaiva)
- **Localização:** Av. Selim José de Sales, 1435 – Sala 103, Bairro Canaã, Ipatinga – MG
