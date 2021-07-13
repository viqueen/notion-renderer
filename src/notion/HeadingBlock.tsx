import React from 'react';
import BlankBlock from './BlankBlock';

const HeaderBlock = (header: { properties: any }) => {
    if (!header.properties) {
        return <BlankBlock />;
    }
    return <h3>{header.properties.title}</h3>;
};

const SubHeaderBlock = (subHeader: { properties: any }) => {
    if (!subHeader.properties) {
        return <BlankBlock />;
    }
    return <h4>{subHeader.properties.title}</h4>;
};

const SubSubHeaderBlock = (subSubHeader: { properties: any }) => {
    if (!subSubHeader.properties) {
        return <BlankBlock />;
    }
    return <h5>{subSubHeader.properties.title}</h5>;
};

export { HeaderBlock, SubHeaderBlock, SubSubHeaderBlock };
