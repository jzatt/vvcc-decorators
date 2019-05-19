# Vue Class Component Vuex Decorators

Simple Typescript decorators for usage with [Vue Class Component](https://github.com/vuejs/vue-class-component) and [Vuex](https://vuex.vuejs.org).

## Installation

```
npm i vvcc-decorators
```

## Usage

```
import { Action, Mutation, State } from 'vvcc-decorators'

export default class MyComponent extends Vue {
  @Action(namespace, name) alias/name!: IMyInterface
  @Mutation(namespae, name) alias/name!: IAnotherInterface
  @State(namespae, name) alias/name?: IAndAnotherInterface
}
```


### Variables

**Namespace** `string`

The Vuex namespace.

**Name** `string` *optional

The actual name of the Vuex action, mutation or state variable.

**Alias/name** `string`

If the name is entered in the decorator options, you can use whatever alias you want to be called locally in your component. If the name is omittied the name must match a Vuex action, mutation or state name.

#### Example

```
<template>
  {{ posts }}
</template>

<script lang="ts">
interface IPost {
  id: number
  title: string
}

interface IMutation {
  (): void
}

interface IAction {
  (): Promise<IPost[]>
}

export default class MyComponent extends Vue {
  @Action('api', 'getLatestNewsPosts') getPosts!: IAction
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