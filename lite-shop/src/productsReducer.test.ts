import assert from 'node:assert/strict'
import { test } from 'node:test'
import { productsReducer, type NewProduct } from './productsReducer.ts'

const newProduct: NewProduct = {
  name: 'Wool Beanie',
  category: 'Accessories',
  image: 'https://example.com/beanie.jpg',
  rating: 0,
  badge: { label: 'New Arrival', tone: 'amber' },
  stockStatus: 'in-stock',
  stockText: 'In Stock',
  price: 250,
}

test('added puts the product first with the next free id', () => {
  const start = [{ ...newProduct, id: 7 }, { ...newProduct, id: 3 }]
  const result = productsReducer(start, { type: 'added', product: newProduct })
  assert.deepEqual(result.map((product) => product.id), [8, 7, 3])
  assert.equal(start.length, 2, 'state must not be mutated')
})

test('added to an empty list gets id 1', () => {
  assert.equal(productsReducer([], { type: 'added', product: newProduct })[0].id, 1)
})

test('deleted removes only the matching product', () => {
  const start = [{ ...newProduct, id: 1 }, { ...newProduct, id: 2 }]
  assert.deepEqual(
    productsReducer(start, { type: 'deleted', id: 1 }).map((product) => product.id),
    [2],
  )
})
