/** 
 * Fakes api access
 * not async
*/
class TaskApi {

  static async make(task) {
    return {
      ...task,
      done: false
    }
  }

  static async put(task) {
    return task
  }

  static async all() {
    return new Promise(resolve => {
      setTimeout(() => resolve(payload), 500)
    })
  }
}

const payload = [
  {
    id: 1,
    group: "Purchases",
    name: "Go to the bank",
    dependencyIds: [],
    done: null,
  },
  {
    id: 2,
    group: "Purchases",
    name: "Buy hammer",
    dependencyIds: [1],
    done: null,
  },
  {
    id: 3,
    group: "Purchases",
    name: "Buy wood",
    dependencyIds: [1],
    done: null,
  },
  {
    id: 4,
    group: "Purchases",
    name: "Buy nails",
    dependencyIds: [1],
    done: null,
  },
  {
    id: 5,
    group: "Purchases",
    name: "Buy paint",
    dependencyIds: [1],
    done: null,
  },
  {
    id: 6,
    group: "Build Airplane",
    name: "Hammer nails into wood",
    dependencyIds: [2, 3, 4],
    done: null,
  },
  {
    id: 7,
    group: "Build Airplane",
    name: "Paint wings",
    dependencyIds: [5, 6],
    done: null,
  },
  {
    id: 8,
    group: "Build Airplane",
    name: "Have a snack",
    dependencyIds: [],
    done: null,
  }
]