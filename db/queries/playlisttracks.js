import db from "#db/client";

export async function createPlaylistTrack(playlistId, trackId) {
    const sql = `
        INSERT INTO playlist_tracks (playlist_id, track_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
        RETURNING *
        `;
    const { rows } = await db.query(sql, [playlistId, trackId]);
    return rows[0] || null;
}

//get playlist/:id/tracks----sends tacks in playlist

export async function getTracksInPlaylist(playlistId) {
    const sql = `
    SELECT t.*
    FROM playlist_tracks pt
    JOIN tracks t ON pt.track_id = t.id
    WHERE pt.playlist_id = $1
    `;
    const { rows } = await db.query(sql, [playlistId]);
    return rows;
}

//post playlist(id)/tracks adds new track to playlist
//track id sent in body & returns status (201)

/** 

export async function postTrackToPlaylist(id) {
    const sql = `
    INSERT INTO playlist_tracks (playlist_id)
    VALUES ($1, $2)
WHERE playlist_id = id
RETURNING *
    `;
    const { rows: [playlisttracks] } = await db.query(sql, [playlisttracks]);
    return playlisttracks;
}
*/