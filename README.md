# notion-renderer

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=viqueen_notion-renderer&metric=alert_status)](https://sonarcloud.io/dashboard?id=viqueen_notion-renderer)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=viqueen_notion-renderer&metric=coverage)](https://sonarcloud.io/dashboard?id=viqueen_notion-renderer)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=viqueen_notion-renderer&metric=security_rating)](https://sonarcloud.io/dashboard?id=viqueen_notion-renderer)
[![Known Vulnerabilities](https://snyk.io/test/github/viqueen/notion-renderer/badge.svg?targetFile=package.json)](https://snyk.io/test/github/viqueen/notion-renderer?targetFile=package.json)

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
