const chai      = require('chai')
const assert    = chai.assert
const RejsStore = require('../lib/main')

describe('lspi as db for store', function () {

  beforeEach(() => {
    this.store = new RejsStore()
  })

  it('should load correctly', () => {
    assert.deepEqual(this.store.mainStore, {})
  })

})