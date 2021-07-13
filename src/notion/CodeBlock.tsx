import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import BlankBlock from './BlankBlock';

const CodeBlock = (codeBlock: { properties: any }) => {
    if (!codeBlock.properties) {
        return <BlankBlock />;
    }
    return (
        <SyntaxHighlighter
            language={codeBlock.properties.language[0]}
            className="p-3"
        >
            {codeBlock.properties.title[0]}
        </SyntaxHighlighter>
    );
};

export default CodeBlock;
