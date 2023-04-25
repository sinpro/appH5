import base from './base'
import init from './init'

export default function(moduleName) {
    return base[moduleName] || init
}