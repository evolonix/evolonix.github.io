# design-system/

Generated design system for `evolonix.github.io`. Mirrors the production code; proposes consolidation for the style drift surfaced during the audit.

## Files

| File                                   | Purpose                                                                                                                                                  |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [tokens.json](./tokens.json)           | DTCG-compliant design tokens. Source values are OKLCH (preserved in `$description`); `$value` is hex for portability across tools without OKLCH support. |
| [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) | Narrative spec — overview, foundations, components, patterns, templates, drift findings, consolidation proposals.                                        |

## Importing tokens.json into Figma

The token file is structured so the [Tokens Studio for Figma](https://tokens.studio/) plugin can ingest it directly.

1. In Figma, install the **Tokens Studio for Figma** plugin (free version is sufficient).
2. Open the target file → run the plugin → **Tools → Load from file → JSON** → choose `design-system/tokens.json`.
3. The plugin reads the top-level groups (`color`, `spacing`, `typography`, `radius`, `shadow`, `motion`, `breakpoint`, `container`) as **token sets**.
4. For mode-aware semantic aliases, the JSON contains two parallel sub-groups:
   - `semantic.light` — references primitives in their light-mode roles
   - `semantic.dark` — same leaf names, references the dark-mode primitives

   Create two Figma variable modes (Light, Dark). For each, enable the corresponding semantic set in Tokens Studio's "Themes" feature and apply.

5. Tokens Studio writes variables to Figma. Color tokens become `COLOR` variables; dimensions become `FLOAT`; type composite tokens become text styles.

### Compatibility notes

- **Hex over OKLCH.** `$value` is hex so designers in tools without OKLCH support can pick colors directly. The original OKLCH input lives in `$description` for round-trip fidelity.
- **No tokens.config.json.** This file targets the format Tokens Studio reads natively. Style Dictionary `v4` consumers also accept this DTCG layout with no transform.
- **Variable name dots.** Figma variables reject `.` in names. Spacing steps `0.5` / `1.5` are exported as `0_5` / `1_5`. Adjust if your tooling round-trips with dotted names.

## Regenerating the hex values

The hex values were computed from OKLCH via a standard sRGB conversion. To regenerate (e.g. after editing OKLCH inputs in `src/index.css`):

```bash
node -e '
function oklchToHex(L, C, h) {
  const hR = h * Math.PI / 180;
  const a = C * Math.cos(hR), b = C * Math.sin(hR);
  const l_ = L + 0.3963377774*a + 0.2158037573*b;
  const m_ = L - 0.1055613458*a - 0.0638541728*b;
  const s_ = L - 0.0894841775*a - 1.2914855480*b;
  const l3 = l_**3, m3 = m_**3, s3 = s_**3;
  let r =  4.0767416621*l3 - 3.3077115913*m3 + 0.2309699292*s3;
  let g = -1.2684380046*l3 + 2.6097574011*m3 - 0.3413193965*s3;
  let bb= -0.0041960863*l3 - 0.7034186147*m3 + 1.7076147010*s3;
  const sRGB = (x) => x <= 0.0031308 ? 12.92*x : 1.055 * Math.pow(x, 1/2.4) - 0.055;
  const hex = (x) => Math.round(Math.max(0, Math.min(1, sRGB(x))) * 255).toString(16).padStart(2, "0");
  return "#" + hex(r) + hex(g) + hex(bb);
}
console.log(oklchToHex(0.65, 0.20, 300));  // -> #a46bf5 (brand-500)
'
```

## Validating the DTCG structure

Optional spot-check that the JSON parses and matches the DTCG shape:

```bash
node -e 'const t = require("./design-system/tokens.json"); console.log(Object.keys(t).filter(k => !k.startsWith("$")));'
# Expected: color, semantic, spacing, radius, typography, shadow, blur, motion, breakpoint, container
```

For stricter validation, run against a DTCG-aware tool (Style Dictionary v4 build, Tokens Studio's import preview, or [https://design-tokens.github.io/community-group/format/](https://design-tokens.github.io/community-group/format/)).

## Scope reminder

- This directory is **documentation, not production code**. Nothing in `design-system/` is imported by the app.
- The consolidation proposals in [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) have been **implemented** — `Button`, `Field`, `Alert`, `Eyebrow`, `Card`, and `AppLink` now live in `src/app/_components/`, with consumers migrated. See the "Consolidation — implemented" section of [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for the as-built APIs, deviations, and the components intentionally left inline.
- Source-of-truth for runtime tokens remains `src/index.css` (`@theme` block).
