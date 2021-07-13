import React from 'react';
import TextBlock from './TextBlock';
import BlankBlock from './BlankBlock';

const NotionContentRenderer = (props: { blocks: any; id: string }) => {
    const { blocks, id } = props;
    const content = blocks.block[`${id}`].value.content;
    const items = content.map((item: string) => {
        const data = blocks.block[`${item}`];
        if (data) {
            return data.value;
        }
    });

    const renderedItems = items.map((item: any, index: number) => {
        if (!item) {
            return undefined;
        }
        switch (item.type) {
            case 'text':
                return <TextBlock properties={item.properties} key={index} />;
            default:
                return <BlankBlock key={index} />;
        }
    });

    return <div>{renderedItems}</div>;
};

export default NotionContentRenderer;
