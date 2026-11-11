// Written by the sourcing audit, 2026-11-11.
// ADR-001 commits this project to no runtime dependencies and no build step.
// These checks keep that true instead of restating it: they fail the moment a
// CDN script, a runtime dependency, or a credential appears in what ships.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";

const pkg = JSON.parse(readFileSync("package.json", "utf8"));

test("ADR-001: no runtime dependencies", () => {
  const runtime = Object.keys(pkg.dependencies ?? {});
  assert.deepEqual(
    runtime, [],
    `ADR-001 says this project ships no runtime dependencies. Found: ${runtime.join(", ")}`,
  );
});

test("sourcing audit: wrangler is pinned to an exact version", () => {
  const w = (pkg.devDependencies ?? {}).wrangler;
  assert.ok(w, "wrangler should be a declared devDependency");
  assert.match(
    w, /^\d+\.\d+\.\d+$/,
    `wrangler is "${w}". The audit pinned it exactly because it publishes from a single npm account, so an upgrade should be a decision rather than an install`,
  );
});

test("ADR-001: no page loads a script from a CDN", () => {
  const html = readdirSync(".").filter((f) => f.endsWith(".html"));
  assert.ok(html.length > 0, "expected at least one HTML file at the repository root");
  for (const file of html) {
    const text = readFileSync(file, "utf8");
    const external = [...text.matchAll(/<script[^>]*\ssrc=["']([^"']+)["']/gi)]
      .map((m) => m[1])
      .filter((src) => /^(https?:)?\/\//.test(src));
    assert.deepEqual(external, [], `${file} loads a script from off-site: ${external.join(", ")}`);
  }
});

test("no credential is assigned a real value in anything that ships", () => {
  // Two kinds of match have to be told apart. A comment saying "the key is a
  // secret, set it with wrangler secret put" is correct practice and must not
  // fail. A key assigned an actual value must. The first version of this test
  // failed on the comments in worker/wrangler.toml, which was the test being
  // wrong rather than the repository.
  const assignedSecret = /(api[_-]?key|token|secret|password)\s*[:=]\s*["'][^"'<\s][^"']*["']/i;
  const rawCredential = /(AKIA[0-9A-Z]{16}|eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,})/;

  const stripComments = (text, file) =>
    text
      .split("\n")
      .filter((line) => !(file.endsWith(".toml") && line.trim().startsWith("#")))
      .join("\n");

  const files = [
    ...readdirSync(".").filter((f) => /\.(html|css|js)$/.test(f)),
    ...(existsSync("worker/wrangler.toml") ? ["worker/wrangler.toml"] : []),
  ];

  for (const file of files) {
    const text = stripComments(readFileSync(file, "utf8"), file);
    assert.ok(!assignedSecret.test(text), `${file} assigns a value to something named like a credential`);
    assert.ok(!rawCredential.test(text), `${file} contains a raw credential`);
  }
});
