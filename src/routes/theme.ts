// Makes some of the css theme colors available to components
import { readable, derived } from "svelte/store";
import type { Readable } from "svelte/store";
import { browser } from "$app/environment";


interface Theme {
    dark: boolean;
    textColor1: string;
    textColor2: string;
    surfaceColor1: string;
    surfaceColor2: string;
    surfaceColor3: string;
};
type Scheme = "light" | "dark";

function getTheme(scheme: Scheme, alterTheme: boolean): Theme {
    const style = getComputedStyle(document.body);
    return {
        dark: alterTheme ? scheme === 'light' : scheme === 'dark',
        textColor1: style.getPropertyValue('--text-color'),
        textColor2: style.getPropertyValue('--text-color-2'),
        surfaceColor1: style.getPropertyValue('--surface-color-1'),
        surfaceColor2: style.getPropertyValue('--surface-color-2'),
        surfaceColor3: style.getPropertyValue('--surface-color-3'),
    }
}

let preferredScheme: Readable<Scheme> = readable("light" as Scheme, (set) => {
    if (!browser) return;

    // Set current scheme preference
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.matches ? set("dark") : set("light");

    // Watch for preferred scheme changes 
    mq.addEventListener('change', callback);
    function callback(event: MediaQueryListEvent) {
        const newColorScheme = event.matches ? "dark" : "light";
        set(newColorScheme)
    }

    return () => {
        mq.removeEventListener("change", callback);
    }
});

let alterTheme: boolean | undefined = undefined;

// Current theme, derived from preferred scheme
export let theme: Readable<Theme> = derived(preferredScheme, ($preferredScheme, set) => {
    if (!browser) return;
    alterTheme = document.body.classList.contains('alter-theme');
    set(getTheme($preferredScheme as Scheme, alterTheme));

    const callback = (mutationList: any, observer: any) => {
        for (const mutation of mutationList) {
            if (mutation.type === 'attributes') {
                const themeChange = alterTheme !== document.body.classList.contains('alter-theme');
                if (themeChange) {
                    alterTheme = !alterTheme;
                    set(getTheme($preferredScheme as Scheme, alterTheme));
                }
            }
        }
    }

    const observer = new MutationObserver(callback);

    const config = { attributes: true, childList: false, subtree: false };
    observer.observe(document.body, config);

    return () => {
        observer.disconnect();
    }
});
