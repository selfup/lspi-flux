  const _matchOrNot = Symbol('matchOrNot')

  class ScopedLspi {
    setRecord(recordName, data) {
      try {
        localStorage.setItem(recordName, JSON.stringify(data))
      } catch (error) {
        return false
      }
    }

    setRecords(args) {
      args.forEach(arg => this.setRecord(arg[0], arg[1]))
    }

    setJSONRecord(recordName, string) {
      try {
        localStorage.setItem(recordName, string)
      } catch (error) {
        return false
      }
    }

    getRecord(recordName) {
      try {
        const  obj = JSON.parse(localStorage.getItem(recordName))
        return obj
      } catch (error) {
        return false
      }
    }

    getRecords() {
      return Array.from(arguments).map(arg => this.getRecord(arg))
    }

    where(recordName, key, equals) {
      let   result = []
      const record = this.getRecord(recordName)

      if (!record) return false
      
      record.forEach(obj => { obj[key] === equals && result.push(obj) })
      
      if (!result[0]) return false
                      return result
    }

    getJSONRecord(recordName) {
      try {
        const  json = localStorage.getItem(recordName)
        return json
      } catch (error) {
        return false
      }
    }

    whereEitherOr(recordName, keys, value) {
      let   result = []
      const record = this.getRecord(recordName)

      if (!record) return false

      record.forEach(obj => {
        obj[key[0]] === equals || obj[key[1]] === equals && result.push(obj)
      })

      if (!result[0]) return this[_matchOrNot](key, equals)
                      return result
    }

    arrayWeakMatch(recordName, query) {
      let   result = []
      const record = this.getRecord(recordName)

      if (!record) return false

      record.forEach(el => { query.includes(el) && result.push(el) })

      if (!result[0]) return false
                      return result
    }

    arrayStrongMatch(recordName, query) {
      let   result = []
      const record = this.getRecord(recordName)

      record.forEach(el => { query === el && result.push(el) })
      
      if (!result[0]) return false
                      return result
    }

    deleteRecord(recordName) {
      localStorage.removeItem(recordName)
    }

    deleteRecords() {
      Array.from(arguments).forEach(arg => this.deleteRecord(arg))
    }

    dropAll() {
      localStorage.clear()
    }

    // ** private
    [_matchOrNot](key, equals) {
      return false
    }
  }

  module.exports = ScopedLspi
