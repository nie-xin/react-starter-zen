import {
  REQUEST_ZEN,
  RECIEVE_ZEN,
  SAVE_CURRENT_ZEN,
  requestZen,
  recieveZen,
  saveCurrentZen,
  fetchZen,
  default as zenReducer
} from 'routes/Zen/modules/zen'

describe('(Redux Module) Zen', () => {
  it('Should export a constant REQUEST_ZEN', () => {
    expect(REQUEST_ZEN).to.equal('REQUEST_ZEN')
  })

  it('Should export a constant RECIEVE_ZEN', () => {
    expect(RECIEVE_ZEN).to.equal('RECIEVE_ZEN')
  })

  it('Should export a constant SAVE_CURRENT_ZEN', () => {
    expect(SAVE_CURRENT_ZEN).to.equal('SAVE_CURRENT_ZEN')
  })

  describe('(Reducer)', () => {
    it('Should be a function', () => {
      expect(zenReducer).to.be.a('function')
    })

    it('Should initialize with a state of object { fetching: false, current: null, zens: [], saved: [] }', () => {
      const initialState = { fetching: false, current: null, zens: [], saved: [] }
      let state = zenReducer(undefined, {})
      expect(state).to.be.a('object')
      expect(state).to.deep.equal(initialState)
    })

    it('Should return previous state if action not matched', () => {
      const initialState = { fetching: false, current: null, zens: [], saved: [] }
      let state = zenReducer(undefined, {})
      expect(state).to.deep.equal(initialState)

      state = zenReducer(state, {type: '@@@@@@@'})
      expect(state).to.deep.equal(initialState)

      state = zenReducer(state, recieveZen('test zen'))
      expect(state.current).to.equal(0)
      expect(state.zens).to.deep.equal([{value: 'test zen', id: 0}])
    })
  })

  describe('(Action creator) requestZen', () => {
    it('Should be exported as a function', () => {
      expect(requestZen).to.be.a('function')
    })

    it('Should renturn an action with type "REQUEST_ZEN"', () => {
      expect(requestZen()).to.have.property('type', REQUEST_ZEN)
    })

  })

  describe('(Action creator) recieveZen', () => {
    it('Should be exported as a function', () => {
      expect(recieveZen).to.be.a('function')
    })

    it('Should return an action with type "RECIEVE_ZEN"', () => {
      expect(recieveZen()).to.have.property('type', RECIEVE_ZEN)
    })

    it('Should assign first argument to "payload.value" property', () => {
      expect(recieveZen('test zen')).to.have.property('payload').to.have.property('value', 'test zen')
    })
  })

  describe('(Action creator) fetchZen', () => {
    // let _globalState, _dispatchSpy, _getStateSpy
    //
    // beforeEach(() => {
    //   _globalState = zenReducer(undefined, {})
    //
    //   _dispatchSpy = sinon.spy((action) => {
    //     _globalState = {
    //       ..._globalState,
    //       ...zenReducer(_globalState, action)
    //     }
    //   })
    //
    //   _getStateSpy = sinon.spy(() => {
    //     return _globalState
    //   })
    // })

    it('Should be exported as a function', () => {
      expect(fetchZen).to.be.a('function')
    })

    it('Should return a function (thunk)', () => {
      expect(fetchZen()).to.be.a('function')
    })

    // http://rjzaworski.com/2015/06/testing-api-requests-from-window-fetch

    // it('Should return a  promise from that thunk that gets fulfilled', () => {
    //   sinon.stub(window, 'fetch')
    //
    //   return fetchZen()(_dispatchSpy, _getStateSpy)
    //     .then(() => {
    //       _dispatchSpy.should.have.been.calledOnce
    //       _getStateSpy.should.have.been.calledOnce
    //     })
    // })
  })

  describe('(Action creator) saveCurrentZen', () => {
    it('Should be exported as a function', () => {
      expect(saveCurrentZen).to.be.a('function')
    })

    it('Should return an action with type "SAVE_CURRENT_ZEN"', () => {
      expect(saveCurrentZen()).to.have.property('type', SAVE_CURRENT_ZEN)
    })
  })

  describe('(Action handler) ZEN_ACTION_HANDLERS', () => {
    it('Should change state fetching value with action type REQUEST_ZEN', () => {
      let _state = zenReducer(undefined, {})
      _state = zenReducer(_state, requestZen())
      expect(_state).to.have.property('fetching', true)
    })

    it('Should append recieved zen to state zens with action type RECIEVE_ZEN', () => {
      let _state = zenReducer(undefined, {})
      _state = zenReducer(_state, recieveZen('test zen'))
      expect(_state).to.have.property('zens').to.have.length(1)
    })

    it('Should append zen to saved with action type SAVE_CURRENT_ZEN', () => {
      let _state = zenReducer(undefined, {})
      _state = zenReducer(_state, recieveZen('test zen'))
      _state = zenReducer(_state, saveCurrentZen())
      expect(_state).to.have.property('saved').to.have.length(1)
    })
  })
})
