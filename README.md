# Autorouter

This is a very simple Meteor package made to speed up prototyping by automatically adding Iron Router routes. 

Note that as soon as you start adding your own routes, you'll probably want to remove it. 

## Demo

- [Demo](https://github.com/SachaG/Autorouter-Demo)
- [Demo code](https://github.com/SachaG/Autorouter-Demo)

## Usage

Add it with:

```
meteor add sacha:autorouter
```

The package works by automatically setting up a number of useful routes for you.

#### `/`

This route will look for a template named `home` and display it.

#### `/templateName`

This route will look for a template named `templateName`. For example, the route `/about` will display the template named `about`. It's that simple :)

#### `/collectionName`

If the route segment happens to be the name of a **collection**, the package will additionally set the data context of the route, using an object of the same name as the collection.

So if you have a collection named `posts` (as in `Posts = new Mongo.Collection("posts")`), the context for the route `/posts` will be set to:

```js
{
  posts: Posts.find()
}
```

Which then lets you do `{{#each posts}}...{{/each}}` in your `posts` template.

#### `/collectionName/id`

Finally, if you also add an `id` as a second parameter, Autorouter will look for a template named `collectionName`, except without the last letter. So `posts` becomes `post`, `users` becomes `user`, etc.

set the context to the result of `Collection.findOne(id)`.

## A Practical Example

For example, you could have a `posts` collection:

```js
Posts = new Mongo.Collection("posts");
```

A `posts` template:

```html
<template name="posts">
  <h1>Posts</h1>
  <ul>
    {{#each posts}}
      <li><a href=/posts/{{_id}}>{{title}}</a></li>
    {{/each}}
  </ul>
</template>
```

A `post` template:

```html
<template name="post">
  <h1>{{title}}</h1>
  <p>{{body}}</p>
</template>
```

And an `about` template:

```html
<template name="about">
  <h1>About</h1>
  <p>Lorem ipsum dolor sit amet.</p>
</template>
```

And Autorouter will do the rest!

## Thanks

Thanks to @dburles for his help improving and refactoring the code!