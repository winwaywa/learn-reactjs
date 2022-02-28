import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';
import AlbumItem from '../AlbumItem';

AlbumList.propTypes = {

};

function AlbumList({ albumList }) {
    return (
        <ul className="album-list">
            {albumList.map(album => (
                <li key={album.id}>
                    <AlbumItem album={album} />
                </li>
            ))}
        </ul>
    );
}

export default AlbumList;