const http = require('http');
const https = require('https');
const { URL } = require('url');

const PROXY_PORT = 8080;

const server = http.createServer((req, res) => {
    const targetUrl = new URL(req.url.slice(1));
    const protocol = targetUrl.protocol === 'https:' ? https : http;

    console.log(`Proxy Request: ${req.method} ${targetUrl.href}`);

    const options = {
        hostname: targetUrl.hostname,
        port: targetUrl.port || (targetUrl.protocol === 'https:' ? 443 : 80),
        path: targetUrl.pathname + targetUrl.search,
        method: req.method,
        headers: {
            ...req.headers,
            host: targetUrl.hostname,
            origin: targetUrl.origin,
        },
    };

    delete options.headers['cookie'];
    delete options.headers['referer'];
    delete options.headers['host'];
    delete options.headers['origin'];

    const proxyReq = protocol.request(options, (proxyRes) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res);

        let responseBody = '';
        proxyRes.on('data', (chunk) => {
            responseBody += chunk.toString();
        });

        proxyRes.on('end', () => {
            console.log(`Response: ${req.method} ${targetUrl.href} - Status: ${proxyRes.statusCode}`);
            console.log(`Response Content:\n${responseBody.substring(0, 500)}...\n`);
        });
    });

    proxyReq.on('error', (err) => {
        console.error(`Proxy error for ${targetUrl.href}:`, err.message);
        res.writeHead(500);
        res.end('Internal proxy error.');
    });

    req.pipe(proxyReq);
});

server.listen(PROXY_PORT, () => {
    console.log(`Proxy running on http://localhost:${PROXY_PORT}`);
});
