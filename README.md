# notion-renderer

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-white.svg)](https://sonarcloud.io/dashboard?id=viqueen_notion-renderer)

## what ?

Simple and naive Notion react renderer, not as advanced as [react-notion-x](https://github.com/NotionX/react-notion-x)

```bash
npm install notion-renderer react --save
```

```javascript
import { NotionContentRenderer } from "notion-renderer";
import fetch from "cross-fetch";

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
- I stumbled upon Notion and thought I'd make friends with its API
- I figured it would make a great NodeJS and react frontend refresher ... since I trapped myself in
  Java/Maven backend world for way too long
- so I ended up re-inventing one or two wheels for sake of unlearning old habits and picking up new ones.

## how ?

```bash
git clone git@github.com:viqueen/notion-renderer.git
cd notion-renderer
nvm use

npm ci
npm run build
npm test
```
