const chai      = require('chai')
const assert    = chai.assert
const LspiFlux = require('../lib/main')

describe('scoped lspi as state manager for lspi-flux', function () {

  it('should load default state correctly', () => {
    this.scopedStore = new LspiFlux()

    assert.equal(this.scopedStore.storeName, 'lspi-flux')

    assert.deepEqual(this.scopedStore.setState({}).state, {})
    assert.deepEqual(this.scopedStore.setState({}).status, true)

    assert.deepEqual(this.scopedStore.mainStore, {})
    
    assert.deepEqual(this.scopedStore.fetchState.state, {})
    assert.deepEqual(this.scopedStore.fetchState.status, true)
  })

  it('should have truthy status returns', () => {
    this.scopedStore = new LspiFlux()

    assert.deepEqual(this.scopedStore.setState({}).status, true)
    assert.deepEqual(this.scopedStore.fetchState.status, true)
  })

  it('should be able to store valid Object Literals', () => {
    this.scopedStore = new LspiFlux({"ok": "wow"})

    assert.deepEqual(this.scopedStore.mainStore, {"ok": "wow"})
  })

  it('feels fairly natural to use the API', () => {
    this.scopedStore = new LspiFlux({"ok": "wow"})

    assert.deepEqual(this.scopedStore.mainStore, {"ok": "wow"})

    let appState = {main: {}}
    const currentState = this.scopedStore.fetchState

    if (currentState.status) appState.main = currentState.state

    /* for the next if (line 49) */
    /* handle error and pick to either modify state with old state or keep it as is */
    /* example below on how to reset state to old state provided by the API if you want to */
    /* up to you! */

    if (!currentState.status) {
      console.error("Please try again. Something went wrong!")
      appState.main = currentState.state
    }

    assert.deepEqual(appState, {main: {"ok": "wow"}})
  })

  it('feels fairly natural to handle an error and maintain previous state', () => {
    this.scopedStore = new LspiFlux({before: "failure"})

    assert.deepEqual(this.scopedStore.mainStore, {before: "failure"})

    const currentState  = this.scopedStore.fetchState.state
    const appState = {main: currentState}

    assert.deepEqual(appState, {main: {before: "failure"}})

    this.scopedStore.setState({trying: "new change"})

    /* this will pretend to be the false state response from the API */
    currentState.status = false
    currentState.state  = {before: "failure"}
    /* this is jut mocking a response */

    // ************************************************************** //
    // **** This block will mock how a dev should handle the API **** //

      /* this will not pass - the next `if` is going to be truthy */
      if (currentState.status) appState.main = currentState.state

      /* handle error and reset state to previous state given by the api */
      const handleErrorAndResetState = () => {
        console.error("TEST MOCK RESPONSE: Please try again. Something went wrong!")
        /* you could throw an alert, or pop up a modal here for a better user experience */
        /* using console.log for testing purposes only */
        appState.main = currentState.state
      }

      /* call handle error function since this `if` statement will pass */
      if (!currentState.status) handleErrorAndResetState()
    
    // **** End of mock block **** //
    // *************************** //

    assert.deepEqual(appState, {main: {before: "failure"}})
  })

  it('can make multiple stores', () => {
    this.ideaStore    = new LspiFlux({"ok": "wow"}, 'ideas')
    this.thoughtStore = new LspiFlux({"wow": "ok"}, 'thoughts')

    assert.equal(this.ideaStore.storeName, 'ideas')
    assert.equal(this.thoughtStore.storeName, 'thoughts')    
  })

  it('should find matches on a where statement', () => {
    const ideas = new LspiFlux({}, 'ideas')

    ideas.setState([{wow: "ok"}, {wow: "ok"}, {wow: "nope"}])

    const okResult = ideas.whereState('wow', 'ok')
    const okMatch  = okResult.match

    assert.deepEqual(okMatch, [{wow: "ok"}, {wow: "ok"}])

    const nopeResult = ideas.whereState('wow', 'nope')
    const nopeMatch  = nopeResult.match

    assert.deepEqual(nopeMatch, [{wow: "nope"}])
  })

})