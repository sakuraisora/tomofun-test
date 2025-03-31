## File Structure

```
├── app/                     # Next.js App Router for pages and layouts
|   ├── breeds
|   │   └──[breed]
│   │       └── page.tsx
│   ├── favicon.ico          # Favicon
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Root page
├── components/              # Reusable UI components
│   ├── breed-image/        
│   │    └── breed-image.tsx # Image components
│   ├── breed-list/          
│   │    ├── breed-item.tsx  # Item components
│   │    ├── breed-list.tsx  # List components
│   │    ├── image-grid.tsx  # Grid components
│   │    └── search-box.tsx  # Search components
│   ├── carousel/            
│   │    └── carousel.tsx    # Carousel components
│   ├── layout/              # Layout-related components
│   │   ├── header.tsx       # Header
│   │   └── footer.tsx       # Footer
├── lib/                     # Utility functions and libraries
│   ├── api.ts               # API(fetch)
│   └── search-state.ts      # Cache states
├── public/                  # Static assets
├── package.json             # Dependencies
├── next.config.ts           # Next.js config
├── tailwind.config.ts       # Tailwind config
├── postcss.config.mjs       # Postcss config
├── tsconfig.json            # TypeScript config
└── README.md                # Project docs
```

Localhost:3000:

```bash
npm run install
npm run dev
```
