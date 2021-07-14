import React from 'react';
import TextBlock from './TextBlock';
import BlankBlock from './BlankBlock';
import BulletedList from './BulletedList';
import CodeBlock from './CodeBlock';
import { HeaderBlock, SubHeaderBlock, SubSubHeaderBlock } from './HeadingBlock';

const NotionContentRenderer = (props: { recordMap: any; id: string }) => {
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
                return <hr />;
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
            default:
                return <BlankBlock key={index} />;
        }
    });

    return <div>{renderedItems}</div>;
};

export default NotionContentRenderer;