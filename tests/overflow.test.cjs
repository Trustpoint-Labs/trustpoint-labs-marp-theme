const assert = require('node:assert/strict');
const { execFile } = require('node:child_process');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { promisify } = require('node:util');
const { test } = require('node:test');

const run = promisify(execFile);
const content = `# FOUR CORE APPLICATION AREAS

## Certificate lifecycle management across different OT assets

**01 — OPC UA Certificate Management**${'  '}
Manage compatible OPC UA application certificates and trust lists through suitable GDS-based workflows.

**02 — Automated Enrollment (EST / CMP)**${'  '}
Provision and renew certificates on devices that support the selected enrollment protocol.

**03 — Brownfield Certificate Management**${'  '}
Automate validated, device-specific certificate operations where modern enrollment interfaces are missing.

**04 — Industrial Edge & Gateway Security**${'  '}
Establish consistent TLS identities and trust-store lifecycles for edge gateways and industrial applications.
`;

test('overflow checker measures content and preserves the compact regression slide', async t => {
  const temp = await fs.mkdtemp(path.join(os.tmpdir(), 'marp-overflow-test-'));
  t.after(() => fs.rm(temp, { recursive: true, force: true }));
  async function check(markdown) {
    const input = path.join(temp, 'deck.md');
    await fs.writeFile(input, `---\nmarp: true\ntheme: trustpoint-labs\n---\n\n${markdown}`);
    try {
      const result = await run(process.execPath, [path.join(__dirname, '../scripts/check-overflow.cjs'), input]);
      return { code: 0, ...result };
    } catch (error) {
      return error;
    }
  }
  await t.test('reported content overflows at the default size', async () => {
    const result = await check(content);
    assert.equal(result.code, 1);
    assert.match(result.stderr, /Slide 1 .*bottom:/);
  });
  await t.test('compact fits all four areas', async () => {
    const result = await check(`<!-- _class: compact -->\n\n${content}`);
    assert.equal(result.code, 0, result.stderr);
    assert.match(result.stdout, /No content overflow/);
  });
  await t.test('too much compact content still fails', async () => {
    const result = await check(`<!-- _class: compact -->\n\n${content}\n${content}`);
    assert.equal(result.code, 1);
    assert.match(result.stderr, /exceeds the content area/);
  });
  await t.test('wide tables fail the horizontal bounds check', async () => {
    const row = '| ' + Array(16).fill('CertificateManagement').join(' | ') + ' |';
    const separator = '| ' + Array(16).fill('---').join(' | ') + ' |';
    const result = await check(`# Table\n\n${row}\n${separator}\n${row}`);
    assert.equal(result.code, 1);
    assert.match(result.stderr, /right:/);
  });
});
