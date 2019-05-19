import { createDecorator } from 'vue-class-component'
import _get from 'lodash/get'

const objectPath = (namespace: string, key: string, name?: string) => {
  const base = namespace.replace('/', '.')
  return name ? `${base}.${name}` : `${base}.${key}`
}

const functionPath = (namespace: string, key: string, name?: string) => {
  const base = namespace
  return name ? `${base}/${name}` : `${base}/${key}`
}

function storeMethod(type: string, namespace: string, name?: string) {
  return createDecorator((options: any, key: any) => {
    if (!options.methods) options.methods = {}

    options.methods[key] = function(payload: any): string {
      return this.$store[type](functionPath(namespace, key, name), payload)
    }
  })
}

export function State(namespace: string, name?: string) {
  return createDecorator((options: any, key: any) => {
    if (!options.computed) options.computed = {}

    options.computed[key] = function() {
      return _get(this.$store.state, objectPath(namespace, key, name))
    }
  })
}

export function Action(namespace: string, name?: string) {
  return storeMethod('dispatch', namespace, name)
}

export function Mutation(namespace: string, name?: string) {
  return storeMethod('commit', namespace, name)
}

export default {
  State,
  Action,
  Mutation,
}
