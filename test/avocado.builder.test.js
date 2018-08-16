const expect = require('chai').expect
const Builder = require('../avocado/Builder')

class Model {
  constructor(data) {
    this.data = data
  }

  toObject() {
    return this.data
  }
}

describe('avocado builder', () => {
  describe('create two "default" singletons', () => {
    let builder1 = Builder.getInstance()
    let builder2 = Builder.getInstance()
    it('builders to be the same', () => {
      expect(builder1).to.equal(builder2)
    })
  })

  describe('create two different singletons', () => {
    let builder1 = Builder.getInstance()
    let builder2 = Builder.getInstance('')
    it('builders to be the same', () => {
      expect(builder1).to.not.equal(builder2)
    })
  })

  describe('convertTo', () => {
    it('should convert data to Model', async () => {
      let builder = Builder.getInstance()
      builder.data({ name: 'John Smith' })
      builder.convertTo(Model)
      let result = await builder.exec()
      expect(result).to.instanceof(Model)
    })
  })

  describe('toObject', () => {
    it('should invoke Model.toObject', async () => {
      let builder = Builder.getInstance()
        .data({ name: 'John Smith' })
        .convertTo(Model)
        .toObject()
      let result = await builder.exec()
      expect(result).to.deep.equal({ name: 'John Smith' })
    })
  })

  describe('inspect', () => {
    it('should inspect data\'s current state', async () => {
      let builder = Builder.getInstance()
      let inspectCalled = false
      builder.addMethod('inspect', function (target, index, items, note = 'Inspect') {
        inspectCalled = true
        return target
      })
      builder.data({ name: 'John Smith' })
        .convertTo(Model)
        .toObject()
        .inspect()
      await builder.exec()
      expect(inspectCalled).to.be.true
    })
  })

  describe('intercept', () => {
    it('should call intercept', async () => {
      let builder = Builder.getInstance()
      let interceptCalled = false
      builder.data({ name: 'John Smith' })
        .convertTo(Model)
        .toObject()
        .intercept((item) => {
          interceptCalled = true
          return item
        })
      await builder.exec()
      expect(interceptCalled).to.be.true
    })
  })
})
