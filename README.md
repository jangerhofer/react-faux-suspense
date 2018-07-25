# React Faux Suspense

**An experiment in loading-UX.**

## Inspiration

This is a simple experiment in the upcoming [React Suspense](https://medium.com/@baphemot/understanding-react-suspense-1c73b4b0b1e6) UX model, which should land with React v17. The geist of the feature (really, one facet thereof) is that loading data into an application is an unpredictable process. All manner of network and processing delays mean that a dev can't be certain of when requested data will show up for presentation.

The default solution is to render a loading spinner until the requisite data for a view has arrived. While effective, this solution is less than ideal under more ideal circumstances (i.e. when the data loads quickly -- thank heaven). Loading spinners flash in and out, and interfaces quickly become cluttered as a result. Thus, Suspense is, in part, aimed to standardize the intermediate loading state.

Rather than simply showing a loading spinner until the data is ready, Suspense will make it straightforward to, in effect, render nothing at first from a view which requires data (but has yet to receive it). The implication is that, if you envision an entire tree of React components, an entire branch can render without waiting for a "leaf" to get its data. [Andrew Clark describes it in more detail](https://www.youtube.com/watch?v=z-6JC0_cOns) and gives us the "Count the Placeholders" game (see [5m:30s of the video](https://youtu.be/z-6JC0_cOns?t=5m30s)).

Suspense addresses the problem Andrew highlighted (and many others!) by enabling developers to specify an interval after which and only _after_ which, if the data has still not arrived, the spinner is finally displayed.

## This Library

This library is just a crude mock of this functionality. It provides a component `FauxSuspense` which takes a prop `timeout` (duration in ms) and a "children function" and provides a render-prop object with a `timerExpired` property. `timerExpired` can be used to only display content (e.g. loading spinner) after the specified delay.

## Example Usage

I generally use this component alongside a data loading component, ergo I commonly have a `loading` property available. Used in tandem with `FauxSuspense`, I imitate the upcoming feature release.

```js
import FauxSuspense from 'react-faux-suspense'

...

render () {
    let loading = ...

    <FauxSuspense timeout={500}>
        {
            ({timerExpired}) => {
                if(loading && timerExpired) return <Spinner/>
                if(loading && !timerExpired) return null
                return <ContentWithData/>
            }
        }
    </FauxSuspense>
}
```
