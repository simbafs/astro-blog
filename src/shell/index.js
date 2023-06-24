import cfonts from 'cfonts'

// TODO: auto load every js file in this directory
// maybe this https://stackoverflow.com/questions/75126196/dynamically-import-all-images-from-a-folder-in-astro
// or this https://stackoverflow.com/questions/44987464/import-all-modules-from-a-directory-at-once-node
// or this https://stackoverflow.com/questions/5364928/node-js-require-all-files-in-a-folder

export default function shell(args) {
    const cmd = cmds[args[0]]
    if (!cmd) {
        return cmds['commandNotFound'](args)
    }
    return cmd(args)
}

const cmds = {
    banner: banner,
    commandNotFound: commandNotFound,
}

function commandNotFound(args) {
    return `command not found: ${args[0]}`
}

function banner(_) {
    /** 
    * @desc render link
    * @param {string} url
    * @param {object} opt
    * @param {string} opt.text
    * @param {boolean} opt.external
    */
    const link = (url, opt) => `<a class="underline hover:underline-offset-1" href="${url}" ${opt.external && 'target="_blank"'}>${opt.text ? opt.text : url}</a>`

    return cfonts.render('simbafs.cc', {
        font: 'slick',
        letterSpacing: 2,
        space: false,
        env: 'browser',
    }).string.replaceAll('<br>', '') + '<br>' +
        '# Social' + '<br>' +
        '• ' + link('https://github.com/simbafs', { text: 'GitHub', external: true }) + '<br>' +
        '• ' + link('https://twitter.com/simbafs', { text: 'Twitter', external: true }) + '<br>'
}
