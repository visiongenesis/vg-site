import fs from "node:fs";
import vm from "node:vm";

const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");
const css = fs.readFileSync(new URL("../assets/site.css", import.meta.url), "utf8");

function assert(condition, message) {
  if (!condition) throw new Error(`ASSERT FAILED: ${message}`);
}

// Scope guard: this change must not replace the current public website copy.
assert(html.includes("Your business just got <span class=\"glow-text\">superpowers.</span>"), "homepage hero copy changed");
assert(html.includes("This is Vision Genesis running our own product on ourselves"), "Ask Norris section copy changed");
assert(html.includes('data-q="What exactly is Norris?">What is Norris?</button>'), "Ask Norris starter copy changed");
assert(!html.includes("Put AI to work where your business is"), "superseded homepage rewrite returned");
assert(!html.includes("public claim ledger"), "superseded Norris copy returned");

// Assistant replies are prose; user questions remain visually distinct.
assert(/\.an-msg\.bot\{[^}]*background:transparent/.test(css), "assistant response bubble was not removed");
assert(/\.an-msg\.bot\{[^}]*max-width:100%/.test(css), "assistant prose does not use the available width");
assert(css.includes(".an-msg.me{"), "user message treatment is missing");

// Streaming respects reader intent and offers an explicit return to the latest token.
assert(html.includes('id="anJump"'), "Latest reply control is missing");
assert(html.includes('e.deltaY<0'), "upward scrolling does not release auto-follow");
assert(html.includes('if(follow)body.scrollTop=body.scrollHeight'), "streaming follow state is not conditional");
assert(html.includes('t.innerHTML=fmt(acc); pin();'), "streamed markdown is not rendered incrementally");

// Site-owned links stay in the site; same-page hashes preserve the conversation DOM.
assert(html.includes("owned?(u.pathname+u.search+u.hash):u.href"), "site-owned link rewriting is missing");
assert(html.includes("window.history.replaceState(null,\"\",u.hash)"), "same-page link continuity is missing");
assert(html.includes("target=\"_blank\"") && html.includes("(owned?'':' target=\"_blank\""), "external-link isolation is missing");

// Every inline script must still parse.
for (const match of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)) {
  new vm.Script(match[1]);
}

console.log("✓ Ask Norris UI-only formatting and interaction checks passed");
