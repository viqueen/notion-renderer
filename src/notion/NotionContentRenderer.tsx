import React from 'react';
import TextBlock from './TextBlock';
import BlankBlock from './BlankBlock';
import BulletedListBlock from './BulletedListBlock';
import CodeBlock from './CodeBlock';
import { HeaderBlock, SubHeaderBlock, SubSubHeaderBlock } from './HeadingBlock';
import ImageBlock from './ImageBlock';
import CalloutBlock from './CalloutBlock';

interface NotionContentRendererProps {
    recordMap: any;
    id: string;
    imageSource: (url: string) => string;
}

interface NotionBlockProps {
    content: NotionContentRendererProps;
    item: any;
    index: number;
}

const NotionBlock = (props: NotionBlockProps) => {
    const { item, content } = props;
    switch (item.type) {
        case 'bulleted_list':
            return <BulletedListBlock properties={item.properties} />;
        case 'callout':
            return (
                <CalloutBlock
                    properties={item.properties}
                    format={item.format}
                />
            );
        case 'code':
            return <CodeBlock properties={item.properties} />;
        case 'divider':
            return <hr />;
        case 'header':
            return <HeaderBlock properties={item.properties} />;
        case 'sub_header':
            return <SubHeaderBlock properties={item.properties} />;
        case 'sub_sub_header':
            return <SubSubHeaderBlock properties={item.properties} />;
        case 'text':
            return <TextBlock properties={item.properties} />;
        case 'image':
            return (
                <ImageBlock
                    id={item.id}
                    properties={item.properties}
                    format={item.format}
                    imageSource={content.imageSource}
                />
            );
        default:
            console.log(item.type);
            return <BlankBlock />;
    }
};

const NotionContentRenderer = (props: NotionContentRendererProps) => {
    const { recordMap, id } = props;
    const content = recordMap.block[`${id}`].value.content;
    const items = content.map((item: string) => {
        const data = recordMap.block[`${item}`];
        if (data) {
            return data.value;
        }
    });

    const renderedItems = items.map((item: any, index: number) => {
        if (!item) {
            return undefined;
        }
        return (
            <NotionBlock
                content={props}
                item={item}
                index={index}
                key={index}
            />
        );
    });

    return <div>{renderedItems}</div>;
};

export default NotionContentRenderer;
