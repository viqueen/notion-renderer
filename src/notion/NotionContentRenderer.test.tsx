import * as fs from 'fs';
import * as path from 'path';
import renderer from 'react-test-renderer';
import React from 'react';
import NotionContentRenderer from './NotionContentRenderer';

test('content is rendered', async () => {
    const testDataFile = path.resolve(
        __dirname,
        '../../notion-renderer.data.json'
    );
    const testData = JSON.parse(fs.readFileSync(testDataFile).toString());
    const { id, recordMap } = testData;
    const imageSource = (url: string) => url;
    const component = renderer.create(
        <NotionContentRenderer
            recordMap={recordMap}
            id={id}
            imageSource={imageSource}
        />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
