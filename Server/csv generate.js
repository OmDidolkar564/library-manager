const fs = require('fs');

const levels = ['INFO', 'WARN', 'ERROR', 'DEBUG'];
const messages = [
    'User logged in',
    'Database query executed',
    'Cache miss detected',
    'File upload completed',
    'API request timeout',
    'Memory usage above threshold',
    'Session expired',
    'Invalid input received',
    'Connection pool exhausted',
    'Scheduled task completed'
];

const writeStream = fs.createWriteStream('server.log.csv');

// Write CSV header
writeStream.write('timestamp,level,message,responseTime\n');

const totalEntries = 50000;

for (let i = 0; i < totalEntries; i++) {
    const date = new Date(2025, 0, 1, Math.floor(Math.random() * 24),
        Math.floor(Math.random() * 60), Math.floor(Math.random() * 60));
    const timestamp = date.toISOString();
    const level = levels[Math.floor(Math.random() * levels.length)];
    const message = messages[Math.floor(Math.random() * messages.length)];
    const responseTime = Math.floor(Math.random() * 2000) + 50;

    writeStream.write(`${timestamp},${level},${message},${responseTime}\n`);
}

writeStream.end(() => {
    const size = fs.statSync('server.log.csv').size;
    console.log(`Generated ${totalEntries} log entries (${(size / 1024).toFixed(1)} KB)`);
});