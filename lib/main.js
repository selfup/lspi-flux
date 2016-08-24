const Lspi = require("./lspi")

class RejsStore {
  constructor(initialState = {}, storeName = 'rejs-store') {
    this.storeName = storeName
    this.lspi = new Lspi()
    this.setState(initialState)
    this.mainStore = this.fetchState().state
  }

  setState(initialState) {
    const init = this.lspi.setRecord(this.storeName, initialState)
    if (init === undefined) {
      this.mainStore = this.fetchState().state
      return { status: true, state: this.mainStore }
    }
    return { status: false, state: this.mainStore }
  }

  fetchState() {
    const state = this.lspi.getRecord(this.storeName)
    if (state) return { status: true, state: state }
    return { status: false, state: this.mainStore }
  }
}

module.exports = RejsStore