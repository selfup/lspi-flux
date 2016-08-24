const chai      = require('chai')
const assert    = chai.assert
const RejsStore = require('../lib/main')

describe('lspi as db for store', function () {

  it('should load default state correctly', () => {
    this.scopedStore = new RejsStore()

    assert.equal(this.scopedStore.storeName, 'rejs-store')

    assert.deepEqual(this.scopedStore.setState({}).state, {})
    assert.deepEqual(this.scopedStore.setState({}).status, true)

    assert.deepEqual(this.scopedStore.mainStore, {})
    
    assert.deepEqual(this.scopedStore.fetchState.state, {})
    assert.deepEqual(this.scopedStore.fetchState.status, true)
  })

  it('should have truthy status returns', () => {
    this.scopedStore = new RejsStore()

    assert.deepEqual(this.scopedStore.setState({}).status, true)
    assert.deepEqual(this.scopedStore.fetchState.status, true)
  })

  it('should be able to store valid Object Literals', () => {
    this.scopedStore = new RejsStore({"ok": "wow"})

    assert.deepEqual(this.scopedStore.mainStore, {"ok": "wow"})
  })

  it('feels fairly natural to use the API', () => {
    this.scopedStore = new RejsStore({"ok": "wow"})

    assert.deepEqual(this.scopedStore.mainStore, {"ok": "wow"})

    let appState = {main: {}}
    const currentState = this.scopedStore.fetchState

    if (currentState.status) appState.main = currentState.state
    if (!currentState.status) {
      /* handle error and pick to either modify state with old state or keep it as is */
      /* example below on how to reset state to old state provided by the API if you want to */
      appState.main = currentState.state
    }

    assert.deepEqual(appState, {main: {"ok": "wow"}})
  })

  it('can make multiple stores', () => {
    this.ideaStore = new RejsStore({"ok": "wow"}, 'ideas')
    this.thoughtStore = new RejsStore({"wow": "ok"}, 'thoughts')

    assert.equal(this.ideaStore.storeName, 'ideas')
    assert.equal(this.thoughtStore.storeName, 'thoughts')    
  })

})