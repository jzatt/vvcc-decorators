import { createDecorator } from 'vue-class-component'
import _get from 'lodash/get'

interface DecoratorArgs {
  namespace?: string
  key?: string
}

const defineArgs = (
  args?: DecoratorArgs | string,
  key?: string
): DecoratorArgs => {
  if (args && typeof args !== 'string') {
    return args
  }
  return {
    namespace: args,
    key: key,
  }
}

const setPath = (key: string, args: DecoratorArgs) => {
  const namespace = args.namespace || null
  const endpoint = args.key || key

  return namespace ? `${namespace}/${endpoint}` : endpoint
}

function method(type: string, args?: DecoratorArgs | string, key?: string) {
  const decoratorArgs = defineArgs(args, key)

  return createDecorator((options: any, key: any) => {
    if (!options.methods) options.methods = {}

    options.methods[key] = function(payload: any): string {
      return this.$store[type](setPath(key, decoratorArgs), payload)
    }
  })
}

function computed(type: string, args?: DecoratorArgs | string, key?: string) {
  const decoratorArgs = defineArgs(args, key)

  return createDecorator((options: any, key: string) => {
    if (!options.computed) options.computed = {}

    const path = setPath(key, decoratorArgs)
    options.computed[key] = function() {
      if (type === 'state') {
        return _get(this.$store.state, path.replace('/', '.'))
      } else {
        return this.$store.getters[path]
      }
    }
  })
}

export function State(args?: DecoratorArgs | string, key?: string) {
  return computed('state', args, key)
}

export function Getter(args?: DecoratorArgs | string, key?: string) {
  return computed('getter', args, key)
}

export function Action(args?: DecoratorArgs | string, key?: string) {
  return method('dispatch', args, key)
}

export function Mutation(args?: DecoratorArgs | string, key?: string) {
  return method('commit', args, key)
}

export default {
  State,
  Action,
  Getter,
  Mutation,
}
