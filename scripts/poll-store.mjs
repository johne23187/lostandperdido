import { DatabaseSync } from 'node:sqlite';

// The unique key is enforced by SQLite, including concurrent requests.
export function createPollStore(filename, clock = () => new Date()) {
  const db = new DatabaseSync(filename);
  db.exec(`PRAGMA journal_mode=WAL;
    CREATE TABLE IF NOT EXISTS daily_votes (
      voter TEXT NOT NULL, day TEXT NOT NULL,
      choice TEXT NOT NULL CHECK(choice IN ('lost','perdido')),
      PRIMARY KEY(voter, day)
    );`);
  const day = () => clock().toISOString().slice(0, 10);
  function snapshot(voter) {
    const today = day();
    const counts = { lost: 0, perdido: 0 };
    for (const row of db.prepare('SELECT choice, COUNT(*) AS total FROM daily_votes GROUP BY choice').all()) counts[row.choice] = row.total;
    const choice = db.prepare('SELECT choice FROM daily_votes WHERE voter=? AND day=?').get(voter, today)?.choice || '';
    return { ...counts, choice, day: today, nextVoteAt: new Date(Date.parse(today) + 86400000).toISOString() };
  }
  return {
    snapshot,
    vote(voter, choice) {
      const result = db.prepare('INSERT INTO daily_votes VALUES (?, ?, ?) ON CONFLICT(voter,day) DO NOTHING').run(voter, day(), choice);
      return { ...snapshot(voter), accepted: result.changes === 1 };
    },
    close() { db.close(); }
  };
}
