'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user1 = {
      email: 'joe@fakemail.com',
      username: 'joebro',
      passwordDigest: 'abcd1234',
      createdAt: '2022-01-02',
      updatedAt: '2022-01-03'
    }

    const user2 = {
      email: 'ally@fakemail.com',
      username: 'allycat',
      passwordDigest: 'abcd1234',
      createdAt: '2022-01-02',
      updatedAt: '2022-01-03'
    }

    const user3 = {
      email: 'coolio@fakemail.com',
      username: 'coolio98',
      passwordDigest: 'abcd1234',
      createdAt: '2022-01-02',
      updatedAt: '2022-01-03'
    }

    let users = [user1, user2, user3]

    await queryInterface.bulkInsert('users', users)

    const project = {
      name: 'Cool Shirts',
      startDate: '2022-06-01',
      endDate: '2022-06-30',
      goal: 1000.0,
      campaign: 'Lorem ipsum et cetera',
      description: 'Cool Shirts for Cool Folks',
      tags: 'Apparel',
      publishReady: true,
      userId: 1,
      createdAt: '2022-01-02',
      updatedAt: '2022-01-03'
    }

    await queryInterface.bulkInsert('projects', [project])

    const pledge = {
      tier: 'tier1',
      amount: 100.0,
      stripeData: 'none yet',
      collected: false,
      userId: 3,
      projectId: 1,
      createdAt: '2022-01-02',
      updatedAt: '2022-01-03'
    }

    await queryInterface.bulkInsert('pledges', [pledge])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    })
    //that should cascade and delete everything
  }
}
