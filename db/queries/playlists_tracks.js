import db from "#db/client";

export async function createPlaylistTrack({ playlist_id, track_id }) {
  const sql = `
  INSERT INTO playlists_tracks
    (playlist_id, track_id)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  const {
    rows: [playlist_track],
  } = await db.query(sql, [playlist_id, track_id]);
  return playlist_track;
}

export async function getTracksInPlaylist(playlist_id) {
  const sql = `SELECT * FROM playlist_tracks WHERE playlist_id = $1`;
  const { rows: tracks } = db.query(sql, [playlist_id]);
  return tracks;
}
