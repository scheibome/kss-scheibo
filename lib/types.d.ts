type KSSBuildOptions = {
    /**
     * The title of the styleguide.
     */
    title: string,

    /**
     * The builder base path.
     */
    builder: string,

    custom: string[],

    /**
     * The source directory
     */
    source: string,

    /**
     * The destination directory for the styleguide
     */
    destination: string,

    /**
     * Link to the markdown homepage of the styleguide
     */
    homepage: string,

    /**
     * HTML lang attribute of the styleguide
     */
    htmllang: string,

    /**
     * Navigation depth of the styleguide
     */
    'nav-depth': string,

    /**
     * CSS files to include in the styleguide
     */
    css: string[],

    /**
     * JS files to include in the styleguide
     */
    js: string[],

    /**
     * Should the JavaScript be loaded with type="module"?
     */
    scriptModule: boolean,

    /**
     * Enable if the styleguide is built using Vite and vite-plugin-pug
     */
    isVitePugEnabled: boolean,
}

declare module 'kss-scheibo' {
    const build: (options: KSSBuildOptions) => Promise<void>
    const watch: (pattern: string, callback: () => void) => void
    export { build, watch }
}
