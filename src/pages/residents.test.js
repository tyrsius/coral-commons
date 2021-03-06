import { expect } from 'chai'
import System from 'systemjs'

describe('residents page', function() {
    let residents

    before(function () {
        return System.import('pages/residents')
            .then((mod) => residents = mod)
    })

    describe('Module Loading', function() {
        it('should load', function() {
            expect(residents.default).to.not.be.undefined
        })
    })
})