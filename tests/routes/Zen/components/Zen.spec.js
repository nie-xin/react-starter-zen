import React from 'react'
import { bindActionCreators } from 'redux'
import { Zen } from 'routes/Zen/components/Zen'
import { shallow } from 'enzyme'

describe('(View) Zen', () => {
  let _component, _spies, _props

  beforeEach(() => {
    _spies = {}
    _props = {
      saved: [],
      ...bindActionCreators({
        fetchZen: (_spies.fetchZen = sinon.spy()),
        saveCurrentZen: (_spies.saveCurrentZen = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }
    _component = shallow(<Zen {..._props} />)
  })

  it('Should render a given zen value', () => {
    const propsWithZen = Object.assign({}, { zen: {value: 'test wisdom'} }, _props)
    const _componentWithZen = shallow(<Zen {...propsWithZen}/>)

    const zenMsg = _componentWithZen.find('h2')
    expect(zenMsg).to.exsit
    expect(zenMsg.text()).to.match(/test wisdom/)
  })

  describe('Fetch button...', () => {
    let _button

    beforeEach(() => {
      _button = _component.find('.fetch')
    })

    it('Should render as a button', () => {
      expect(_button).to.exist
      expect(_button.is('button')).to.equal(true)
    })

    it('Should dispatch a `fetchZen` action when clicked', () => {
      _spies.dispatch.should.have.not.been.called

      _button.simulate('click')

      _spies.dispatch.should.have.been.called
      _spies.fetchZen.should.have.been.called
    })
  })

  describe('Save button...', () => {
    let _button

    beforeEach(() => {
      _button = _component.find('.save')
    })

    it('Should render as a button', () => {
      expect(_button).to.exist
      expect(_button.is('button')).to.equal(true)
    })

    it('Should dispatch a `saveCurrentZen` action when clicked', () => {
      _spies.dispatch.should.have.not.been.called

      _button.simulate('click')

      _spies.dispatch.should.have.been.called
      _spies.saveCurrentZen.should.have.been.called
    })
  })
})
