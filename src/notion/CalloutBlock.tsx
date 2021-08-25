import React from 'react';
import BlankBlock from './BlankBlock';
import TextBlock from './TextBlock';

const CalloutBlock = (callout: { properties: any; format: any }) => {
    if (!callout.properties) {
        return <BlankBlock />;
    }
    const { block_color } = callout.format;

    return (
        <div className={block_color} style={{ padding: 24, marginBottom: 15 }}>
            <TextBlock properties={callout.properties} />
        </div>
    );
};

export default CalloutBlock;
