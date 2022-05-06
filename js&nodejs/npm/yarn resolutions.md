## Why would you need resolutions?

- You may be depending on a package that is not updated frequently, which depends on another package that got an important upgrade. In this case, if the version range specified by your direct dependency does not cover the new sub-dependency version, you are stuck waiting for the author.
- A sub-dependency of your project got an important security update and you don’t want to wait for your direct-dependency to issue a minimum version update.
- You are relying on an unmaintained but working package and one of its dependencies got upgraded. You know the upgrade would not break things and you also don’t want to fork the package you are relying on, just to update a minor dependency.
- Your dependency defines a broad version range and your sub-dependency just got a problematic update so you want to pin it to an earlier version.

## Resolutions

Each sub-field of the `resolutions` field is called a _resolution_. It is a JSON field expressed by two strings: the package designation on the left and a version specification on the right.

### Package designation

A _resolution_ contains on the left-hand side a glob pattern applied to the dependency tree (and not to the `node_modules` directory tree, since the latter is the result of yarn resolution being influenced by the _resolution_).

- `a/b` denotes the directly nested dependency `b` of the project's dependency `a`.
- `**/a/b` denotes the directly nested dependency `b` of all the dependencies and nested dependencies `a` of the project.
- `a/**/b` denotes all the nested dependencies `b` of the project's dependency `a`.
- `**/a` denotes all the nested dependencies `a` of the project.
- `a` is an alias for `**/a` (for retro-compatibility, see below, and because if it wasn't such an alias, it wouldn't mean anything as it would represent one of the non-nested project dependencies, which can't be overridden as explained below).
- `**` denotes all the nested dependencies of the project (a bad idea mostly, as well as all other designations ending with `**`).

Note on single star: `*` is not authorized in a package resolution because it would introduce too much non-determinism. For example, there is the risk of a referring to `package-*` at one point to match `package-a` and `package-b`, and later on, this would match a new nested dependency `package-c` that wasn't intended to be matched.


npm与之相对应的，则是overrides属性
