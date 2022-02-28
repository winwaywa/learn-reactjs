import React from 'react';
import PropTypes from 'prop-types';
import AlbumList from './components/AlbumList';

AlbumFeature.propTypes = {
    albumList: PropTypes.array.isRequired,
};
AlbumFeature.defaultProps = {
    albumList: []
}

function AlbumFeature(props) {
    const albumList = [
        {
            id: 1,
            name: "Chạy về nơi phía anh",
            thumbnailUrl: "https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/6/3/0/d/630d20b0a79917e1545b4e2ada081040.jpg",
        },
        {
            id: 2,
            name: "Chạy về nơi phía anh 2",
            thumbnailUrl: "https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/6/3/0/d/630d20b0a79917e1545b4e2ada081040.jpg",
        },
        {
            id: 3,
            name: "Chạy về nơi phía anh 3",
            thumbnailUrl: "https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/6/3/0/d/630d20b0a79917e1545b4e2ada081040.jpg",
        },
        {
            id: 4,
            name: "Chạy về nơi phía anh 4",
            thumbnailUrl: "https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/6/3/0/d/630d20b0a79917e1545b4e2ada081040.jpg",
        },
    ]
    return (
        <div>
            <h2>Có thể bạn sẽ thích</h2>
            <AlbumList albumList={albumList} />
        </div>
    );
}

export default AlbumFeature;