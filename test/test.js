const Nightmare = require('nightmare')
const nightmare = Nightmare({
    show: true,
    typeInterval: 150,
    waitTimeout: 5000,
    gotoTimeout: 5000,
    maxHeight:4000, maxWidth:4000,
    width: 4000, height: 4000
})

const start_url = 'http://10.10.10.54:2334/product/SKII-0066'
const login_btn_top = 'html > body.syg-product > div.page-container:nth-child(1) > header.header:nth-child(1) > div.wrapper:nth-child(1) > div.user-option:nth-child(2) > a:nth-child(1) > span:nth-child(1)'
const login_account_input = '#account'
const login_pass_input = '#password'
const login_submit = '#submit_btn'
const six_btn = '#btn > div.btn-switch > button:nth-child(2)'
const twelve_btn = '#btn > div.btn-switch > button:nth-child(3)'
const add_btn = '#item_picker > button.add'
const sub_btn = '#item_picker > button.reduce'
const agreement_check = 'input#agreement'
const order_btn = '#order'

describe('Page', function () {
    // Recommended: 5s locally, 10s to remote server, 30s from airplane ¯\_(ツ)_/¯
    this.timeout('50s')

    let nightmare = null
    beforeEach(() => {
        nightmare = new Nightmare({
            show: true,
            typeInterval: 150,
            waitTimeout: 50000,
            gotoTimeout: 50000,
            maxHeight:4000, maxWidth:4000,
            width: 1440, height: 900
        })
    })

    describe('/ Try to register a new account', () => {
        it('should process without error', done =>{
            nightmare.goto(start_url)
                .wait(login_btn_top)


                .url()
                .wait(3000)
                .end()

                .then(function (result) {
                    done()
                    console.log(result)
                })
                .catch(done)
                .catch(function (error) {
                    console.error('Error:', error);
                })

        })
    })

    describe('/ (Try goto Login Page and back and finish the order with new account)', () => {
        it('should process without error', done => {
            nightmare.goto(start_url)
                // Start with Product Details page
                .wait(login_btn_top)
                .click(login_btn_top)

                // Jump to Login page
                .wait(login_account_input)
                .type(login_account_input, '13800001111')
                .type(login_pass_input, 'a123456')
                .wait(500)
                .click(login_account_input)
                .click(login_pass_input)

                .wait(500)
                .click(login_submit)

                // Jump to Product details page
                .wait(500)

                .wait(twelve_btn)
                .click(twelve_btn)
                .wait(500)
                .click(six_btn)
                .wait(500)
                .click(add_btn)
                .wait(500)
                .click(add_btn)
                .wait(500)
                .click(sub_btn)
                .wait(500)
                .click(agreement_check)
                .wait(300)
                .screenshot('product_details.png')
                .click(order_btn)

                .url()
                .wait(3000)
                .end()

                .then(function (result) {
                    done()
                    console.log(result)
                })
                .catch(done)
                .catch(function (error) {
                    console.error('Error:', error);
                })
            })
        })

})

