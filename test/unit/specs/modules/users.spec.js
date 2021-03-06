import { cloneDeep } from 'lodash'

import { defaultState, mutations } from '../../../../src/modules/users.js'

describe('The users module', () => {
  it('adds new users to the set, merging in new information for old users', () => {
    const state = cloneDeep(defaultState)
    const user = { id: 1, name: 'Guy' }
    const modUser = { id: 1, name: 'Dude' }

    mutations.addNewUsers(state, [user])
    expect(state.users).to.have.length(1)
    expect(state.users).to.eql([user])

    mutations.addNewUsers(state, [modUser])
    expect(state.users).to.have.length(1)
    expect(state.users).to.eql([user])
    expect(state.users[0].name).to.eql('Dude')
  })

  it('sets a mute bit on users', () => {
    const state = cloneDeep(defaultState)
    const user = { id: 1, name: 'Guy' }

    mutations.addNewUsers(state, [user])
    mutations.setMuted(state, {user, muted: true})

    expect(user.muted).to.eql(true)

    mutations.setMuted(state, {user, muted: false})

    expect(user.muted).to.eql(false)
  })
})
