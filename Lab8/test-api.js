const assert = require('node:assert/strict');
const base = 'http://localhost:3000';

let passed = 0;
let failed = 0;

async function test(method, path, status, body, check) {
    try {
        const response = await fetch(base + path, {
            method,
            ...(body ? {
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            } : {})
        });

        const text = await response.text();
        const data = text ? JSON.parse(text) : null;

        assert.equal(response.status, status);

        if (check) {
            assert.ok(check(data));
        }

        console.log('PASS', method, path, response.status);
        passed++;
        if (method === 'GET') {
          console.log('Data:', data);
}
    } catch (error) {
        console.log('FAIL', method, path, error.message);
        failed++;
    }
}

async function run() {
    // Test users
    await test('GET', '/users', 200, null,
        d => d.length === 0);

    await test('POST', '/users', 201,
        {name: 'Test User'}, d => d.id === 1);

    await test('GET', '/users/1', 200, null,
        d => d.name === 'Test User');

    // Test posts
    await test('GET', '/posts', 200, null,
        d => d.length === 0);

    await test('POST', '/posts', 201,
        {title: 'First post', content: 'Hello'},
        d => d.id === 1 && d.likes === 0);

    await test('GET', '/posts/1', 200, null,
        d => d.title === 'First post');

    await test('GET', '/posts', 200, null,
        d => d.length === 1);

    await test('PUT', '/posts/1', 200,
        {title: 'Edited post', content: 'Updated'},
        d => d.title === 'Edited post');

    // Test likes
    await test('POST', '/posts/1/like', 200, null,
        d => d.likes === 1);

    await test('DELETE', '/posts/1/like', 200, null,
        d => d.likes === 0);

    // Test comments
    await test('POST', '/posts/1/comments', 201,
        {content: 'Nice post!'},
        d => d.id === 1);

    await test('GET', '/posts/1/comments', 200, null,
        d => d.length === 1);

    await test('DELETE', '/posts/1/comments/1', 204);

    await test('GET', '/posts/1/comments', 200, null,
        d => d.length === 0);

    // Test deleting posts
    await test('DELETE', '/posts/1', 204);

    await test('GET', '/posts', 200, null,
        d => d.length === 0);

    // Test invalid requests
    await test('GET', '/posts/1', 404);

    await test('POST', '/posts', 400,
        {title: 'Missing content'});

    console.log('\nRESULT:', passed, 'passed,', failed, 'failed');
}

run();