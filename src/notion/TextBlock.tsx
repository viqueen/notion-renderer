import React from 'react';
import BlankBlock from './BlankBlock';

const TextBlock = (text: { properties: any }) => {
    if (!text.properties) {
        return <BlankBlock />;
    }
    const { title } = text.properties;
    const output = title.map(
        ([value, format]: [string, any], index: number) => {
            if (!format) {
                return <span key={index}>{value}</span>;
            }
            return format.reduce((item: string, style: any) => {
                switch (style[0]) {
                    case 'b':
                        return <b key={index}>{item}</b>;
                    case 'i':
                        return <i key={index}>{item}</i>;
                    case '_':
                        return <u key={index}>{item}</u>;
                    case 's':
                        return <s key={index}>{item}</s>;
                    case 'c':
                        return (
                            <span
                                key={index}
                                className="pt-1 pb-1 p-2 text-danger"
                                style={{
                                    backgroundColor: '#F0F0F0',
                                    borderRadius: '3px'
                                }}
                            >
                                {item}
                            </span>
                        );
                    case 'a':
                        return (
                            <span key={index}>
                                <a href={style[1]} target="_blank">
                                    {item}
                                </a>
                            </span>
                        );
                }
            }, value);
        }
    );
    return <p>{output}</p>;
};

export default TextBlock;
