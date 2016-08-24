const Lspi = require("./lspi")

class RejsStore {
  constructor(initialState = {}) {
    this.lspi = new Lspi()
    this.init(initialState)
    this.mainStore = this.fetchState().state
  }

  init(initialState) {
    const init = this.lspi.setRecord('rejs-store', initialState)
    if (init === undefined) {
      this.mainStore = this.fetchState().state
      return { status: true, state: this.mainStore }
    }
    return { status: false, state: this.mainStore }
  }

  fetchState() {
    const state = this.lspi.getRecord('rejs-store')
    if (state) return { status: true, state: state }
    return { status: false, state: this.mainStore }
  }
}

module.exports = RejsStore