const chai      = require('chai')
const assert    = chai.assert
const RejsStore = require('../lib/main')

describe('lspi as db for store', function () {

  it('should load defualts correctly', () => {
    this.scopedStore = new RejsStore()

    assert.deepEqual(this.scopedStore.init({}).state, {})
    assert.deepEqual(this.scopedStore.mainStore, {})
    assert.deepEqual(this.scopedStore.fetchState().state, {})
  })

  it('should be able to store valid Object Literals', () => {
    this.scopedStore = new RejsStore({"ok": "wow"})

    assert.deepEqual(this.scopedStore.mainStore, {"ok": "wow"})
  })

})