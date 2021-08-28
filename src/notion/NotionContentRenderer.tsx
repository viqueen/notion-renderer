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
        case 'column':
            const blocks = item.content.map(
                (dataId: string) => content.recordMap.block[dataId].value
            );
            const renderedBlocks = blocks.map((block: any, index: number) => {
                return (
                    <NotionBlock
                        content={props.content}
                        item={block}
                        key={index}
                    />
                );
            });
            return <>{renderedBlocks}</>;
        case 'column_list':
            const columns = item.content.map((columnId: string) => {
                return content.recordMap.block[columnId]?.value;
            });
            const renderedColumns = columns.map(
                (column: any, index: number) => {
                    if (!column) {
                        return undefined;
                    }
                    return (
                        <NotionBlock
                            content={props.content}
                            item={column}
                            key={index}
                        />
                    );
                }
            );
            return <>{renderedColumns}</>;
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
        return <NotionBlock content={props} item={item} key={index} />;
    });

    return <div>{renderedItems}</div>;
};

export default NotionContentRenderer;
