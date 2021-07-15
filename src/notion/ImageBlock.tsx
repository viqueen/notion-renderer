import React from 'react';

interface ImageBlockProps {
    id: string;
    properties: any;
    format: any;
    imageSource: (url: string) => string;
}

const ImageBlock = (props: ImageBlockProps) => {
    return (
        <div>
            <img
                src={props.imageSource(props.format.display_source)}
                style={{
                    maxWidth: '100%',
                    height: 'auto'
                }}
            />
        </div>
    );
};

export default ImageBlock;
