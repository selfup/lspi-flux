const ScopedLspi = require("./lspi")

class LspiFlux {
  constructor(initialState = {}, storeName = 'lspi-flux') {
    this.storeName = storeName
    this.lspi = new ScopedLspi()
    this.setState(initialState)
    this.mainStore = this.fetchState.state
  }

  get fetchState() {
    const state = this.lspi.getRecord(this.storeName)
    if (state) return { status: true, state: state }
    return { status: false, state: this.mainStore }
  }

  setState(state) {
    const init = this.lspi.setRecord(this.storeName, state)
    if (init === undefined) {
      this.mainStore = this.fetchState.state
      return { status: true, state: this.mainStore }
    }
    return { status: false, state: this.mainStore }
  }

  whereState(key, equals) {
    const whereMatch = this.lspi.where(this.storeName, key, equals)
    if (whereMatch) return { status: true, match: whereMatch }
    return { status: false, match: whereMatch }
  }
}

module.exports = LspiFlux