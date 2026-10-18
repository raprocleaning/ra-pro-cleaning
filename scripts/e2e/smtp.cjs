// Mock SMTP server for scripts/e2e: accepts every message and writes it to a file.
const net = require('net'), fs = require('fs')
const OUT = process.argv[2], PORT = Number(process.argv[3] || 2525)
net.createServer((sock) => {
  let data = false, buf = '', msg = { to: [] }
  const say = (l) => sock.write(l + '\r\n')
  say('220 stub ESMTP')
  sock.on('data', (chunk) => {
    buf += chunk.toString('latin1')
    let i
    while ((i = buf.indexOf('\r\n')) >= 0) {
      const line = buf.slice(0, i); buf = buf.slice(i + 2)
      if (data) {
        if (line === '.') { data = false; fs.appendFileSync(OUT, JSON.stringify(msg) + '\n'); msg = { to: [] }; say('250 queued') }
        else msg.raw = (msg.raw || '') + line + '\n'
        continue
      }
      const cmd = line.slice(0, 4).toUpperCase()
      if (cmd === 'EHLO') { sock.write('250-stub\r\n250-AUTH PLAIN LOGIN\r\n250 OK\r\n') }
      else if (cmd === 'HELO') say('250 stub')
      else if (cmd === 'AUTH') say('235 ok')
      else if (cmd === 'MAIL') say('250 ok')
      else if (cmd === 'RCPT') { msg.to.push(line.replace(/^RCPT TO:/i, '').trim()); say('250 ok') }
      else if (cmd === 'DATA') { data = true; say('354 go') }
      else if (cmd === 'QUIT') { say('221 bye'); sock.end() }
      else say('250 ok')
    }
  })
}).listen(PORT, '127.0.0.1')
