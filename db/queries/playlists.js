import db from "#db/client";

export async function createPlaylists(name, description) {
    const sql = `
    INSERT INTO playlists (name, description)
    VALUES ($1, $2)
    RETURNING *
    `;
    const { rows: [playlist] } = await db.query(sql, [name, description]);
    return playlist;
}

//get playlist

export async function getPlaylists() {
    const sql = `
    SELECT *
    FROM playlists
    `;
    const { rows } = await db.query(sql);
    return rows;
}

//post playlist

/** 
export async function postPlaylist(name, description) {
        const sql = `
    INSERT INTO playlists (name, description)
    VALUES ($1, $2)
    RETURNING *
    `;
    const { rows: [playlist] } = await db.query(sql, [name, description]);
    return playlist;
}
*/

//get playlist(id)

export async function getPlaylistById(id) {
    const sql = `
    SELECT *
    FROM playlists
    WHERE id = $1
    `;
    const { rows } = await db.query(sql, [id]);
    return rows[0] || null;
}

