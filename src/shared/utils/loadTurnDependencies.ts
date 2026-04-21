let turnDependenciesPromise: Promise<void> | null = null;

declare global {
  interface Window {
    $: any;
    jQuery: any;
  }
}

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);

    if (existingScript) {
      if (existingScript.dataset.loaded === "true") {
        resolve();
        return;
      }

      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", () => reject(new Error(`Failed to load script: ${src}`)), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.addEventListener("load", () => {
      script.dataset.loaded = "true";
      resolve();
    }, { once: true });
    script.addEventListener("error", () => reject(new Error(`Failed to load script: ${src}`)), { once: true });
    document.body.appendChild(script);
  });
}

export async function loadTurnDependencies() {
  if (window.$?.fn?.turn) {
    return;
  }

  if (!turnDependenciesPromise) {
    turnDependenciesPromise = (async () => {
      if (!window.$) {
        const jqueryModule = await import("jquery");
        const jquery = jqueryModule.default;
        window.$ = jquery;
        window.jQuery = jquery;
      }

      await loadScript("/libs/turn.min.js");
    })().catch((error) => {
      turnDependenciesPromise = null;
      throw error;
    });
  }

  await turnDependenciesPromise;
}
