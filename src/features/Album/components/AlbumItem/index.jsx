import './styles.scss';
import React from 'react';
import PropTypes from 'prop-types';

AlbumItem.propTypes = {

};

function AlbumItem({ album }) {
    return (
        <div className="album">
            <div className="album__thumbnail">
                <img src={album.thumbnailUrl} alt={album.name} />
            </div>
            <p>{album.name}</p>
        </div>
    );
}

export default AlbumItem;