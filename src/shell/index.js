import cfonts from 'cfonts'

// TODO: auto load every js file in this directory

export default function shell(args){
    const cmd = cmds[args[0]]
    if (!cmd) {
     return   cmds['commandNotFound'](args)
    }
    return cmd(args)
}

const cmds = {
    banner: banner,
    commandNotFound: commandNotFound,
}

function commandNotFound(args){
    return `command not found: ${args[0]}`
}

function banner(_){
    return cfonts.render('simbafs.cc', {
        font: 'slick',
        letterSpacing: 2,
        space: false,
        env: 'browser',
    }).string.replaceAll('<br>', '')
}
