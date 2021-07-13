import React from 'react';
import BlankBlock from './BlankBlock';
import TextBlock from './TextBlock';

const BulletedList = (list: { properties: any }) => {
    if (!list.properties) {
        return <BlankBlock />;
    }
    return (
        <ul>
            <li>
                <TextBlock properties={list.properties} />
            </li>
        </ul>
    );
};

export default BulletedList;
