# PART 2
1- Component is the most common way of building a web application in React, PureComponent adds a layer of logic on top of Component it performs a shallow comparison between old and new props to determine whether it should trigger a render or not.
Even though is optimal to avoid unnecessary rerenders, the other way around is also bad, using PureComponent by default adds more processing load and thus could impact the performance of the application, that's why some of my favorites figures in the industry suggest not to do premature optimizations.

2- It depends on how Context is created/structured, sometimes it's pretty common to do it in a way that we're triggering constant context updates (eg: creating a new object reference each time) and thus creating a whole cascade of component updates which impacts the performance of the application, it's common to memoize the objects that we're passing to context to avoid these situations, but sometimes the issue comes from the structure of the components itself.

3- 
- Through Context API (defining a provider at the top which the parent consumes and the child populates)
- Through raising the state or applying Inversion of control (we provide the handlers, state and logic from the parent and the child is just a dumb component)
- Through Application state (which is being injected to each component), a common example of this is dispatching an action from a child component and listening from a parent component or ancestor (like changing an input in a searchbar could trigger a router change at the top)

4-
- Using shouldComponentUpdate to conditionally determine whether we should trigger a render or not
- By applying memoization to our components (common for SFC)

5- A fragment is a way of rendering multiple components without providing a wrapper component, it doesn't add a tag in the client.
I didn't have a chance to learn how it could break my app, but on the other hand, I used it to avoid breaking the styles and interaction with enclosing div tags.

6-
- react-router-dom -> withRouter
- react-redux -> connect
- react-intl -> injectIntl

7- Handling exceptions in promises and async await is pretty tricky because it's common that the stacktrace is lost in the process if the error is not being catched by promise.catch or try {} catch {}.
It's been a while since I worked with callbacks so no comments on that side.

8- setState has 2 arguments, the first one is the function to update and the second one the callback or function to trigger when the state has been updated, it is async because sometimes the operation could be expensive and therefore there's no way of guaranteeing that the update will finish before the next sentence.

9- Usually it doesn't require that much work, the tricky part is knowing how to emulate or represent the lifecycle of components with hooks, so first is migrating the lifecycles, then migrate the state to hooks, usually the binding of the components methods is not necessary since the usage of arrow functions is widely adopted.

10-
- Using the styles attribute of components to add inline styles
- Using classnames and css
- Using css modules to generate unique classnames for the components
- Using css-in-js solutions like styled-components and emotion

11- If we want to render an HTML string we need to make sure that it has been properly sanitized (ideally before saving as well), then we can use dangerouslySetInnerHTML to render the html string