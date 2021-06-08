const admin = {
  state: {
    figure: "BarChart"
  },
  mutations: {
    switchFigure(state, type) {
      state.figure = type;
    }
  },
  getters: {
    getFigure: (state) => {
      return state.figure
    }
  }
}

export default admin