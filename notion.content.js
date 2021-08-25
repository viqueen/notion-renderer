const fetch = require('cross-fetch');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

// noinspection JSValidateTypes
fetch(`https://www.notion.so/api/v3/loadPageChunk`, {
    method: 'POST',
    headers: {
        cookie: `token_v2=${process.env.NOTION_TOKEN}`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        page: {
            id: `${process.env.NOTION_CONTENT_ID}`,
        },
        chunkNumber: 0,
        cursor: { stack: [] },
        limit: 100,
        verticalColumns: true,
    }),
})
    .then((response) => response.json())
    .then((data) => {
        const { recordMap } = data;
        const sanitizedRecordMap = {
            block: {},
        };
        for (const [key, block] of Object.entries(recordMap.block)) {
            sanitizedRecordMap.block[`${key}`] = {
                value: {
                    properties: block.value.properties,
                    content: block.value.content,
                    type: block.value.type,
                    format: block.value.format,
                },
            };
        }
        const testData = {
            id: `${process.env.NOTION_CONTENT_ID}`,
            recordMap: sanitizedRecordMap,
        };
        fs.writeFileSync(
            'notion-renderer.data.json',
            JSON.stringify(testData, null, 2)
        );
    });
