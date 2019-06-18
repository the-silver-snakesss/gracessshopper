import React from 'react'
import {expect} from 'chai'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {spy} from 'sinon'

const adapter = new Adapter()
Enzyme.configure({adapter})

import CheckoutForm from '../client/components/checkout-form'

// describe('React', () => {
//   describe('<ChceckoutForm /> component', () => {
//     let checkoutForm;
//     beforeEach('Create componet', () => {
//       checkoutForm = shallow(<CheckoutForm />)
//     })
//     // it('has a firstName field on tis state', () => {
//     //   expect(checkoutForm.state().firstName).to.exist
//     // })
//   })
// })
