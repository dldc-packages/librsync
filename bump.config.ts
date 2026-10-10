import { defineConfig } from "bumpp";

export default defineConfig({
  commit: "chore: release {tag}", // tokens: {version} {oldVersion} {tag} {releaseType} {date}
  tag: "v{version}", // must match the publish workflow's tag trigger (v*)
});
