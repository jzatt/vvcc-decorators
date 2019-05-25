# Vuex Vue Class Component Decorators

Simple Typescript decorators for usage with [Vue Class Component](https://github.com/vuejs/vue-class-component) and [Vuex](https://vuex.vuejs.org).

## Installation

```
npm i vvcc-decorators
```

## Usage

```
import { Action, Getter, Mutation, State } from 'vvcc-decorators'

export default class MyComponent extends Vue {
  @Action(namespace, key) alias!: IMyInterface
  @Getter(namespace, key) alias!: IMyInterface
  @Mutation(namespace, key) alias!: IAnotherInterface
  @State(namespace, key) alias?: IAndAnotherInterface

  // Or with object params
  @State({ namespace: 'xxx', key: 'xxx' }) alias?: IMyInterface
  @State({ key: 'xxx' }) alias?: IMyInterface
}
```


### Variables

**Object** `{ namespace?: string, key?: string }`

An object containing `namespace` and/or `key`

**Namespace** `string`

The Vuex namespace.

**Name** `string`

The actual name of the Vuex action, mutation or state variable.

**Alias** `string`

If the key is entered in the decorator options, you can use whatever alias you want your property to be called locally in your component. If the key is omittied the alias **must** match a Vuex action, getter, mutation or state name.

### Example

```
<template>
  {{ posts }}
  Number of posts: {{ totalCount }}
</template>

<script lang="ts">
interface IPost {
  id: number
  title: string
}

interface IMutation {
  (posts: IPost[]): void
}

interface IAction {
  (): Promise<IPost[]>
}

interface IGetter {
  (): number
}

export default class MyComponent extends Vue {
  @Action() getPosts!: IAction
  @Getter({ key: 'getTotalNewPostCount' }) totalCount!: IGetter
  @Mutation('storage') savePosts!: IMutation
  @State('storage', 'newsPosts') posts?: IPost[]

  updatePosts() {
    // Call action to get posts from API
    this.getPosts()
      .then((posts: IPost[]) => {
        // Call mutation to save posts 
        this.savePosts(posts)
      })
  }
}
</script>
```