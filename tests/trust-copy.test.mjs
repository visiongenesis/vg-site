import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
const askMy = fs.readFileSync(path.join(root, "ask-my.html"), "utf8");
const css = fs.readFileSync(path.join(root, "assets/site.css"), "utf8");

function assert(condition, message) {
  if (!condition) throw new Error(`ASSERT FAILED: ${message}`);
}

const stale = [
  ["inflated 20+ customer claim", /20\+ organizations/i],
  ["Philippines traction claim", /churches[^<\n]{0,100}Philippines/i],
  ["retired Growth price", /\$249/],
  ["retired Premium price", /\$(?:499|500)/],
  ["retired by-lunch launch promise", /by lunch/i],
  ["retired live-in-hours promise", /live in hours/i],
  ["absolute no-hallucination claim", /(?:can't|cannot) make things up/i],
  ["old workers.dev AskCoach link", /vg-worker\.visiongenesis\.workers\.dev\/ask-coach/i],
];

for (const [label, pattern] of stale) {
  assert(!pattern.test(index + "\n" + askMy), `${label} returned to a public page`);
}

assert(index.includes("Put AI to work where your business is"), "specific owner-operator hero is missing");
assert(index.includes('id="proof"'), "same-page public proof target is missing");
assert(index.includes("Public client") && index.includes("Ken Chertow Wrestling"), "named public client proof is missing");
assert(index.includes("Capability demo"), "demo-versus-customer label is missing");
assert(index.includes('id="anJump"'), "Ask Norris latest-reply control is missing");
assert(index.includes("if(e.deltaY<0){ follow=false"), "reader-initiated scroll release is missing");
assert(index.includes("t.innerHTML=fmt(acc); pin();"), "incremental inline rendering is missing");
assert(index.includes("window.history.replaceState(null,\"\",u.hash)"), "same-page chat link routing is missing");
assert(!/\.an-body\{[^}]*scroll-behavior\s*:\s*smooth/s.test(css), "streaming chat reintroduced smooth-scroll bounce");
assert(/\.an-msg\.bot\{[^}]*background:transparent/s.test(css), "assistant response is still rendered as a framed bubble");

assert(askMy.includes("One complete plan") && askMy.includes("$99 a month"), "one-plan pricing is missing");
assert(askMy.includes("Private preview in under 24 hours"), "private-preview promise is missing");
assert(askMy.includes("https://askmy.business/") && askMy.includes("https://askmy.church/") && askMy.includes("https://askmy.school/"),
  "marketing page does not hand off to all three real product front doors");

for (const [name, html] of [["index.html", index], ["ask-my.html", askMy]]) {
  const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map((match) => match[1]);
  for (const [i, source] of scripts.entries()) {
    try { new Function(source); }
    catch (error) { throw new Error(`${name} inline script ${i + 1} does not parse: ${error.message}`); }
  }
}

console.log("✓ Vision Genesis public trust copy and Ask Norris interaction checks passed");
