const Lspi = require("./lspi")

class RejsStore {
  constructor(initialState = {}) {
    this.lspi = new Lspi()
    this.init(initialState)
    this.mainStore = this.fetchState()
  }

  init(initialState) {
    const init = this.lspi.setRecord('rejs-store', initialState)
    if (init) return init
    return false
  }

  fetchState() {
    const state = this.lspi.getRecord('rejs-store')
    if (state) return state
    return false
  }
}

module.exports = RejsStore