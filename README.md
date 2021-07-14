# notion-renderer

## what ?

```bash
npm install notion-renderer react --save
```

```javascript
import { NotionContentRenderer } from "notion-renderer";

const contentId = `<NOTION_CONTENT_ID>`;
const data = await fetch(`https://www.notion.so/api/v3/loadPageChunk`, {
  method: "POST",
  headers: {
    cookie: `token_v2=${process.env.NOTION_TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    page: {
      id: contentId,
    },
    chunkNumber: 0,
    cursor: { stack: [] },
    limit: 100,
    verticalColumns: false,
  }),
}).then((response) => response.json());

const { recordMap } = data;

<NotionContentRenderer recordMap={recordMap} id={contentId} />;
```

## why ?

- I was writing some notes and reflections on publishing based on my decade worth of experience in the field
- I stumbled upon Notion
- I thought to make friends with its API using NodeJS, I figured it would make a great refresher
- so I ended up re-inventing one or two wheels

## how ?

```bash
git clone git@github.com:viqueen/notion-renderer.git
cd notion-renderer
nvm use

npm ci
npm run build
npm test
```
