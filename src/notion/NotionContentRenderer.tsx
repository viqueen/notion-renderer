import React from 'react';
import TextBlock from './TextBlock';
import BlankBlock from './BlankBlock';
import BulletedList from './BulletedList';
import CodeBlock from './CodeBlock';
import { HeaderBlock, SubHeaderBlock, SubSubHeaderBlock } from './HeadingBlock';
import ImageBlock from './ImageBlock';

interface NotionContentRendererProps {
    recordMap: any;
    id: string;
    imageSource: (url: string) => string;
}

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
        switch (item.type) {
            case 'bulleted_list':
                return (
                    <BulletedList properties={item.properties} key={index} />
                );
            case 'code':
                return <CodeBlock properties={item.properties} key={index} />;
            case 'divider':
                return <hr key={index} />;
            case 'header':
                return <HeaderBlock properties={item.properties} key={index} />;
            case 'sub_header':
                return (
                    <SubHeaderBlock properties={item.properties} key={index} />
                );
            case 'sub_sub_header':
                return (
                    <SubSubHeaderBlock
                        properties={item.properties}
                        key={index}
                    />
                );
            case 'text':
                return <TextBlock properties={item.properties} key={index} />;
            case 'image':
                return (
                    <ImageBlock
                        id={item.id}
                        properties={item.properties}
                        format={item.format}
                        imageSource={props.imageSource}
                        key={index}
                    />
                );
            default:
                return <BlankBlock key={index} />;
        }
    });

    return <div>{renderedItems}</div>;
};

export default NotionContentRenderer;
